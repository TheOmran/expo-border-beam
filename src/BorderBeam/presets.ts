import type {
  BorderBeamColorVariant,
  SizeConfig,
  ThemeColors,
} from './types';

export const sizePresets: Record<'sm' | 'md' | 'line', SizeConfig> = {
  sm: { borderRadius: 18, borderWidth: 1, width: 70, height: 36 },
  md: { borderRadius: 16, borderWidth: 1 },
  line: { borderRadius: 16, borderWidth: 1 },
};

export const sizeThemePresets: Record<
  'sm' | 'md' | 'line',
  Record<'dark' | 'light', ThemeColors>
> = {
  sm: {
    dark: {
      strokeOpacity: 0.48,
      innerOpacity: 0.7,
      bloomOpacity: 0.8,
      innerShadow: 'rgba(255, 255, 255, 0.3)',
      saturation: 1.2,
    },
    light: {
      strokeOpacity: 0.33,
      innerOpacity: 0.46,
      bloomOpacity: 0.54,
      innerShadow: 'rgba(0, 0, 0, 0.14)',
      saturation: 0.96,
    },
  },
  md: {
    dark: {
      strokeOpacity: 0.48,
      innerOpacity: 0.7,
      bloomOpacity: 0.8,
      innerShadow: 'rgba(255, 255, 255, 0.27)',
      saturation: 1.2,
    },
    light: {
      strokeOpacity: 0.33,
      innerOpacity: 0.46,
      bloomOpacity: 0.54,
      innerShadow: 'rgba(0, 0, 0, 0.14)',
      saturation: 0.96,
    },
  },
  line: {
    dark: {
      strokeOpacity: 0.72,
      innerOpacity: 0.7,
      bloomOpacity: 0.8,
      innerShadow: 'rgba(255, 255, 255, 0.1)',
      saturation: 1.2,
    },
    light: {
      strokeOpacity: 0.72,
      innerOpacity: 0.7,
      bloomOpacity: 0.8,
      innerShadow: 'rgba(0, 0, 0, 0.14)',
      saturation: 1.2,
    },
  },
};

export interface GradientStop {
  offset: number;
  color: string;
}

export const colorPalettes: Record<BorderBeamColorVariant, GradientStop[]> = {
  colorful: [
    { offset: 0, color: 'rgb(255, 50, 100)' },
    { offset: 0.14, color: 'rgb(255, 120, 40)' },
    { offset: 0.28, color: 'rgb(240, 200, 60)' },
    { offset: 0.42, color: 'rgb(50, 200, 80)' },
    { offset: 0.56, color: 'rgb(30, 185, 170)' },
    { offset: 0.7, color: 'rgb(40, 140, 255)' },
    { offset: 0.84, color: 'rgb(100, 70, 255)' },
    { offset: 1, color: 'rgb(240, 50, 180)' },
  ],
  mono: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 0.5, color: 'rgb(200, 200, 200)' },
    { offset: 1, color: 'rgb(255, 255, 255)' },
  ],
  ocean: [
    { offset: 0, color: 'rgb(40, 140, 255)' },
    { offset: 0.33, color: 'rgb(30, 185, 220)' },
    { offset: 0.66, color: 'rgb(100, 70, 255)' },
    { offset: 1, color: 'rgb(180, 40, 240)' },
  ],
  sunset: [
    { offset: 0, color: 'rgb(255, 50, 100)' },
    { offset: 0.33, color: 'rgb(255, 120, 40)' },
    { offset: 0.66, color: 'rgb(240, 200, 60)' },
    { offset: 1, color: 'rgb(240, 50, 180)' },
  ],
};
