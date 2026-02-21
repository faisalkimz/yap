import { Platform } from 'react-native';

export const typography = {
  // Font Families
  display: Platform.select({
    ios: 'Cochin',
    android: 'serif',
    default: 'serif',
  }),
  body: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'sans-serif',
  }),
  accent: Platform.select({
    ios: 'AvenirNext-Medium',
    android: 'sans-serif-medium',
    default: 'sans-serif-medium',
  }),

  // Sizes
  hero: 44,
  h1: 32,
  h2: 24,
  h3: 20,
  bodyRegular: 16,
  bodySmall: 14,
  caption: 12,

  // Weights
  weightBold: '900' as const,
  weightSemi: '700' as const,
  weightMedium: '600' as const,
  weightRegular: '400' as const,
  weightLight: '300' as const,
};
