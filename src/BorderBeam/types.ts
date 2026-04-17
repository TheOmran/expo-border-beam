import type { ReactNode } from 'react';
import type { ColorSchemeName, StyleProp, ViewStyle } from 'react-native';

export type BorderBeamSize = 'sm' | 'md' | 'line';

export type BorderBeamTheme = 'dark' | 'light' | 'auto';

export type BorderBeamColorVariant = 'colorful' | 'mono' | 'ocean' | 'sunset';

export interface SizeConfig {
  borderRadius: number;
  borderWidth: number;
  width?: number;
  height?: number;
}

export interface ThemeColors {
  strokeOpacity: number;
  innerOpacity: number;
  bloomOpacity: number;
  innerShadow: string;
  saturation: number;
}

export interface BorderBeamProps {
  children: ReactNode;

  /**
   * Size/type preset. 'sm' is compact (buttons), 'md' is card-sized,
   * 'line' renders a single traveling glow along the bottom edge.
   */
  size?: BorderBeamSize;

  /** Color variant for the beam effect. */
  colorVariant?: BorderBeamColorVariant;

  /** Theme mode. 'auto' follows the system color scheme. */
  theme?: BorderBeamTheme;

  /** Rotation/travel duration in seconds. Defaults to 1.96 (md/sm) or 2.4 (line). */
  duration?: number;

  /** Whether the animation is active. */
  active?: boolean;

  /** Custom border radius. When omitted, falls back to the size preset. */
  borderRadius?: number;

  /** Brightness multiplier for the glow effect. Default 1.3. */
  brightness?: number;

  /** Saturation multiplier. Default varies by theme. */
  saturation?: number;

  /** Overall strength/opacity of the beam+bloom (0..1). Default 1. */
  strength?: number;

  /** Container style. */
  style?: StyleProp<ViewStyle>;

  /** Fired once when the beam fades in. */
  onActivate?: () => void;

  /** Fired once when the beam fades out. */
  onDeactivate?: () => void;

  /** Override color scheme detection (mostly for testing). */
  colorSchemeOverride?: ColorSchemeName;
}
