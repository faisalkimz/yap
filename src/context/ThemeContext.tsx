import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    white: string;
    black: string;
    text: string;
    muted: string;
    border: string;
    lightGray: string;
    inputBackground: string;
    accent: string;
    card: string;
    statusBar: 'dark-content' | 'light-content';
}

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

interface ThemeContextType {
    isDark: boolean;
    colors: ThemeColors;
    toggleTheme: () => void;
    setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@yap_theme_mode';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme !== null) {
                setIsDark(savedTheme === 'dark');
            } else {
                setIsDark(systemColorScheme === 'dark');
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        } finally {
            setIsLoaded(true);
        }
    };

    const toggleTheme = async () => {
        const newValue = !isDark;
        setIsDark(newValue);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newValue ? 'dark' : 'light');
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const setDarkMode = async (value: boolean) => {
        setIsDark(value);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light');
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const colors = isDark ? darkColors : lightColors;

    if (!isLoaded) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ isDark, colors, toggleTheme, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Export colors as default for backward compatibility
export const colors = lightColors;
