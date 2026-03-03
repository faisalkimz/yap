import { ThemeColors } from '../context/ThemeContext';

export const lightColors: ThemeColors = {
  primary: '#E44B1B',
  secondary: '#1C1C1E',
  background: '#ffffff',
  white: '#ffffff',
  black: '#000000',
  text: '#1C1C1E',
  muted: '#8E8E93',
  border: '#F0F0F0',
  lightGray: '#F8F8F8',
  inputBackground: '#F8F8F8',
  accent: '#FF3B30',
  card: '#ffffff',
  statusBar: 'dark-content',
};

export const darkColors: ThemeColors = {
  primary: '#E44B1B',
  secondary: '#FFFFFF',
  background: '#1C1C1E',
  white: '#1C1C1E',
  black: '#FFFFFF',
  text: '#FFFFFF',
  muted: '#8E8E93',
  border: '#2C2C2E',
  lightGray: '#2C2C2E',
  inputBackground: '#2C2C2E',
  accent: '#FF3B30',
  card: '#2C2C2E',
  statusBar: 'light-content',
};

// Default export for backward compatibility
export const colors = lightColors;

// Export type
export type Colors = ThemeColors;
