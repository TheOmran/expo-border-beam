import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { colorPalettes, sizePresets, sizeThemePresets } from './presets';
import type {
  BorderBeamProps,
  BorderBeamTheme,
} from './types';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

function resolveTheme(
  theme: BorderBeamTheme,
  systemScheme: 'dark' | 'light',
): 'dark' | 'light' {
  return theme === 'auto' ? systemScheme : theme;
}

// Approximate perimeter of a rounded rectangle.
function roundedPerimeter(w: number, h: number, r: number): number {
  const clampedR = Math.min(r, w / 2, h / 2);
  const straight = 2 * (w - 2 * clampedR) + 2 * (h - 2 * clampedR);
  const curves = 2 * Math.PI * clampedR;
  return straight + curves;
}

export function BorderBeam({
  children,
  size = 'md',
  colorVariant = 'colorful',
  theme = 'dark',
  duration,
  active = true,
  borderRadius: customBorderRadius,
  brightness = 1.3,
  saturation,
  strength = 1,
  style,
  onActivate,
  onDeactivate,
  colorSchemeOverride,
}: BorderBeamProps) {
  const systemScheme = useColorScheme();
  const resolvedScheme: 'dark' | 'light' =
    colorSchemeOverride === 'dark' || colorSchemeOverride === 'light'
      ? colorSchemeOverride
      : (systemScheme as 'dark' | 'light' | null) ?? 'dark';
  const resolvedTheme = resolveTheme(theme, resolvedScheme);

  const sizeConfig = sizePresets[size];
  const themeConfig = sizeThemePresets[size][resolvedTheme];

  const finalBorderRadius = customBorderRadius ?? sizeConfig.borderRadius;
  const finalDuration = duration ?? (size === 'line' ? 2.4 : 1.96);
  const finalSaturation = saturation ?? themeConfig.saturation;
  const clampedStrength = Math.max(0, Math.min(1, strength));

  const palette = colorPalettes[colorVariant];
  const gradientId = useMemo(
    () => `bb-${Math.random().toString(36).slice(2, 10)}`,
    [],
  );

  const [layout, setLayout] = useState<{ w: number; h: number } | null>(null);
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (layout?.w !== width || layout?.h !== height) {
      setLayout({ w: width, h: height });
    }
  };

  // Rotation progress: 0 -> 1, loops forever
  const progress = useSharedValue(0);
  const opacity = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withRepeat(
      withTiming(1, {
        duration: finalDuration * 1000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    return () => {
      cancelAnimation(progress);
    };
  }, [finalDuration, progress]);

  useEffect(() => {
    opacity.value = withTiming(
      active ? 1 : 0,
      { duration: 320, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (!finished) return;
        if (active && onActivate) runOnJS(onActivate)();
        if (!active && onDeactivate) runOnJS(onDeactivate)();
      },
    );
  }, [active, onActivate, onDeactivate, opacity]);

  const w = layout?.w ?? 0;
  const h = layout?.h ?? 0;
  const r = Math.min(finalBorderRadius, w / 2, h / 2);
  const perimeter = w && h ? roundedPerimeter(w, h, r) : 0;

  // Beam is a bright arc that travels around the perimeter.
  // For 'line' size we show a shorter segment at the bottom edge only.
  const beamLengthRatio = size === 'line' ? 0.28 : 0.22;
  const beamLength = perimeter * beamLengthRatio;

  const animatedBeamProps = useAnimatedProps(() => {
    const offset = -progress.value * perimeter;
    return {
      strokeDashoffset: offset,
    } as any;
  });

  // Opacity of the whole SVG layer (fade in/out)
  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Stroke configuration: a short visible beam, then a long transparent gap.
  const dashArray = `${beamLength} ${Math.max(perimeter - beamLength, 1)}`;

  // Layered bloom: thicker, fainter strokes behind the sharp beam.
  const bloomLayers = useMemo(
    () => [
      {
        width: sizeConfig.borderWidth * 12,
        opacity: themeConfig.bloomOpacity * 0.25 * clampedStrength,
      },
      {
        width: sizeConfig.borderWidth * 6,
        opacity: themeConfig.bloomOpacity * 0.45 * clampedStrength,
      },
      {
        width: sizeConfig.borderWidth * 3,
        opacity: themeConfig.innerOpacity * clampedStrength,
      },
      {
        width: sizeConfig.borderWidth,
        opacity: Math.min(1, themeConfig.strokeOpacity + 0.3) * clampedStrength,
      },
    ],
    [
      sizeConfig.borderWidth,
      themeConfig.bloomOpacity,
      themeConfig.innerOpacity,
      themeConfig.strokeOpacity,
      clampedStrength,
    ],
  );

  // For 'line' we clip the rect to only show the bottom edge by using a
  // shorter visible dash and positioning the beam so it only travels along
  // the lower straight segment.
  const isLine = size === 'line';

  return (
    <View style={[styles.container, { borderRadius: finalBorderRadius }, style]}>
      <View
        style={styles.content}
        onLayout={onLayout}
        pointerEvents="box-none"
      >
        {children}
      </View>

      {w > 0 && h > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[styles.beamLayer, animatedContainerStyle]}
        >
          <Svg width={w} height={h} style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                {palette.map((stop, i) => (
                  <Stop
                    key={i}
                    offset={stop.offset}
                    stopColor={stop.color}
                    stopOpacity={Math.min(1, brightness * finalSaturation)}
                  />
                ))}
              </LinearGradient>
            </Defs>

            {!isLine &&
              bloomLayers.map((layer, idx) => (
                <AnimatedRect
                  key={idx}
                  x={layer.width / 2}
                  y={layer.width / 2}
                  width={Math.max(w - layer.width, 0)}
                  height={Math.max(h - layer.width, 0)}
                  rx={Math.max(r - layer.width / 2, 0)}
                  ry={Math.max(r - layer.width / 2, 0)}
                  stroke={`url(#${gradientId})`}
                  strokeWidth={layer.width}
                  strokeOpacity={layer.opacity}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={dashArray}
                  animatedProps={animatedBeamProps}
                />
              ))}

            {isLine &&
              bloomLayers.map((layer, idx) => (
                <AnimatedRect
                  key={idx}
                  x={layer.width / 2}
                  y={h - layer.width}
                  width={Math.max(w - layer.width, 0)}
                  height={layer.width / 2}
                  rx={layer.width / 4}
                  ry={layer.width / 4}
                  stroke={`url(#${gradientId})`}
                  strokeWidth={layer.width}
                  strokeOpacity={layer.opacity}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={dashArray}
                  animatedProps={animatedBeamProps}
                />
              ))}
          </Svg>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible',
  },
  content: {
    position: 'relative',
  },
  beamLayer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default BorderBeam;
