import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Product = {
    id: string;
    name: string;
    price: string;
    image: string;
    category?: string;
    rating?: string;
};

type CartItem = Product & {
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    recentlyViewed: Product[];
    addToRecentlyViewed: (product: Product) => void;
    clearRecentlyViewed: () => void;
    isMiniCartVisible: boolean;
    setMiniCartVisible: (visible: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
    const [isMiniCartVisible, setMiniCartVisible] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const storedCart = await AsyncStorage.getItem('@cart_items');
            const storedRecent = await AsyncStorage.getItem('@recently_viewed');
            if (storedCart) setCartItems(JSON.parse(storedCart));
            if (storedRecent) setRecentlyViewed(JSON.parse(storedRecent));
        } catch (e) {
            console.error('Failed to load cart data', e);
        }
    };

    const saveData = async (cart: CartItem[], recent: Product[]) => {
        try {
            await AsyncStorage.setItem('@cart_items', JSON.stringify(cart));
            await AsyncStorage.setItem('@recently_viewed', JSON.stringify(recent));
        } catch (e) {
            console.error('Failed to save cart data', e);
        }
    };

    const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
            let updated;
            if (existing) {
                updated = prev.map(item =>
                    (item.id === product.id && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                updated = [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
            }
            saveData(updated, recentlyViewed);
            return updated;
        });
        setMiniCartVisible(true);
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => {
            const updated = prev.filter(item => item.id !== productId);
            saveData(updated, recentlyViewed);
            return updated;
        });
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCartItems(prev => {
            const updated = prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            );
            saveData(updated, recentlyViewed);
            return updated;
        });
    };

    const addToRecentlyViewed = (product: Product) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(item => item.id !== product.id);
            const updated = [product, ...filtered].slice(0, 10);
            saveData(cartItems, updated);
            return updated;
        });
    };

    const clearRecentlyViewed = () => {
        setRecentlyViewed([]);
        saveData(cartItems, []);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            recentlyViewed,
            addToRecentlyViewed,
            clearRecentlyViewed,
            isMiniCartVisible,
            setMiniCartVisible
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
