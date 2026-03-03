import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'customer' | 'vendor' | null;

interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer' | 'vendor';
    avatar?: string;
    vendorId?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isVendor: boolean;
    login: (email: string, password: string, role: 'customer' | 'vendor') => Promise<boolean>;
    vendorLogin: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    switchToVendor: () => Promise<void>;
    switchToCustomer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@yap_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    React.useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setUser(parsed);
            }
        } catch (error) {
            console.error('Error loading auth:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveAuth = async (userData: User) => {
        try {
            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error('Error saving auth:', error);
        }
    };

    const login = async (email: string, password: string, role: 'customer' | 'vendor'): Promise<boolean> => {
        try {
            setIsLoading(true);
            // Simulate API call - in real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser: User = {
                id: '1',
                email,
                name: email.split('@')[0],
                role,
                vendorId: role === 'vendor' ? 'vendor_001' : undefined,
            };

            setUser(newUser);
            await saveAuth(newUser);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const vendorLogin = async (email: string, password: string): Promise<boolean> => {
        return login(email, password, 'vendor');
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const switchToVendor = async () => {
        if (user) {
            const updatedUser = { ...user, role: 'vendor' as const, vendorId: 'vendor_001' };
            setUser(updatedUser);
            await saveAuth(updatedUser);
        }
    };

    const switchToCustomer = async () => {
        if (user) {
            const updatedUser = { ...user, role: 'customer' as const };
            setUser(updatedUser);
            await saveAuth(updatedUser);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isVendor: user?.role === 'vendor',
            login,
            vendorLogin,
            logout,
            switchToVendor,
            switchToCustomer
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
