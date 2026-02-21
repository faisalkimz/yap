import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Platform,
    StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import {
    ChevronLeft,
    MoreHorizontal,
    Trash2,
    Minus,
    Plus,
    CreditCard,
    ShoppingCart
} from 'lucide-react-native';

import { BottomNav } from '../components/BottomNav';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

// Mock Data
const INITIAL_CART_ITEMS = [
    {
        id: '1',
        name: 'Abracadabra Shirt',
        type: 'Unisex Wear',
        price: 4000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
        qty: 2,
    },
    {
        id: '2',
        name: 'Panther Jacket',
        type: 'Unisex Wear',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&q=80',
        qty: 1,
    },
    {
        id: '3',
        name: 'Paul Elite Shoe',
        type: 'Men Wear',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
        qty: 1,
    },
    {
        id: '4',
        name: 'Sambizza Fitz',
        type: 'Men Wear',
        price: 6340,
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80',
        qty: 4,
    },
];

export const CartScreen: React.FC<Props> = ({ navigation }) => {
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);

    const updateQty = (id: string, delta: number) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    // Calculations
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vat = 350; // Fixed for demo
    const delivery = 150; // Fixed for demo
    const total = subtotal > 0 ? subtotal + vat + delivery : 0;

    const renderItem = ({ item }: { item: typeof INITIAL_CART_ITEMS[0] }) => (
        <View style={styles.cartItemContainer} key={item.id}>
            <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                    <Text style={styles.itemType}>{item.type}</Text>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemPrice}>GX {item.price.toLocaleString()}</Text>
                </View>

                <View style={styles.controlsContainer}>
                    <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
                        <Trash2 size={20} color="#FF3B30" />
                    </TouchableOpacity>
                    <View style={styles.qtyControls}>
                        <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyButton}>
                            <Minus size={16} color="#1C1C1E" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.qty}</Text>
                        <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyButton}>
                            <Plus size={16} color="#1C1C1E" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                {/* Modern Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Shopping Bag</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <MoreHorizontal size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Items List */}
                    <View style={styles.listContainer}>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => renderItem({ item }))
                        ) : (
                            <View style={styles.emptyCart}>
                                <ShoppingCart size={64} color="#E0E0E0" />
                                <Text style={styles.emptyCartText}>Your bag is empty</Text>
                            </View>
                        )}
                    </View>

                    {cartItems.length > 0 && (
                        <>
                            {/* Promo Code Styled */}
                            <View style={styles.promoContainer}>
                                <Text style={styles.sectionTitle}>Promo Code</Text>
                                <View style={styles.promoInputWrapper}>
                                    <TextInput
                                        placeholder="Enter your code"
                                        style={styles.promoInput}
                                        placeholderTextColor="#A0A0A0"
                                    />
                                    <TouchableOpacity style={styles.applyButton}>
                                        <Text style={styles.applyButtonText}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Summary Styled */}
                            <View style={styles.summaryContainer}>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
                                    <Text style={styles.summaryValue}>GX {subtotal.toLocaleString()}</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>VAT</Text>
                                    <Text style={styles.summaryValue}>GX {vat}</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Delivery Fee</Text>
                                    <Text style={styles.summaryValue}>GX {delivery}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.totalRow}>
                                    <Text style={styles.totalLabel}>Total</Text>
                                    <Text style={styles.totalValue}>GX {total.toLocaleString()}</Text>
                                </View>
                            </View>
                        </>
                    )}
                </ScrollView>

                {/* Fixed Bottom Checkout */}
                {cartItems.length > 0 && (
                    <View style={styles.bottomCheckoutBar}>
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={() => navigation.navigate('Checkout', { total: total.toString() })}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.checkoutButtonText}>Checkout — GX {total.toLocaleString()}</Text>
                            <CreditCard size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                )}

                <BottomNav />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#1C1C1E',
        letterSpacing: -0.5,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 200, // Space for BottomNav + Checkout Bar
    },
    listContainer: {
        gap: 16,
    },
    cartItemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 15,
        elevation: 4,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    itemType: {
        fontSize: 12,
        color: '#A0A0A0',
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 6,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FF6B4A',
    },
    controlsContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 80,
    },
    deleteButton: {
        padding: 4,
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 100,
        padding: 4,
    },
    qtyButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    qtyText: {
        width: 28,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 12,
    },
    promoContainer: {
        marginTop: 32,
    },
    promoInputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    promoInput: {
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
        fontSize: 15,
        fontWeight: '500',
        color: '#1C1C1E',
    },
    applyButton: {
        backgroundColor: '#1C1C1E',
        paddingHorizontal: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 14,
    },
    summaryContainer: {
        marginTop: 32,
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.03,
        shadowRadius: 15,
        elevation: 4,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#8E8E93',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FF6B4A',
    },
    bottomCheckoutBar: {
        position: 'absolute',
        bottom: 100, // Just above BottomNav
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: 'rgba(250, 250, 250, 0.95)',
    },
    checkoutButton: {
        backgroundColor: '#1C1C1E',
        height: 64,
        borderRadius: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 12,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        marginRight: 10,
    },
    emptyCart: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyCartText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: '700',
        color: '#A0A0A0',
    },
});
