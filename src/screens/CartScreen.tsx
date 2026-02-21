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
    FlatList
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
    Plus
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
    const total = subtotal + vat + delivery;

    const renderItem = ({ item }: { item: typeof INITIAL_CART_ITEMS[0] }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemType}>{item.type}</Text>
                <Text style={styles.itemPrice}>GX {item.price.toLocaleString()}</Text>
            </View>

            <View style={styles.controlsContainer}>
                <View style={styles.qtyControls}>
                    <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyButton}>
                        <Minus size={14} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={[styles.qtyButton, styles.activeQtyButton]}>
                        <Plus size={14} color={colors.white} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
                    <Trash2 size={16} color="#FF4D4D" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Cart</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <MoreHorizontal size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Items List */}
                    <View style={styles.listContainer}>
                        {cartItems.map(item => (
                            <View key={item.id}>
                                {renderItem({ item })}
                            </View>
                        ))}
                    </View>

                    {/* Summary */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Price</Text>
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
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>GX {total.toLocaleString()}</Text>
                        </View>
                    </View>

                    {/* Discount Code */}
                    <Text style={styles.discountLabel}>Discount Code (Optional)</Text>
                    <View style={styles.discountInputContainer}>
                        <TextInput
                            placeholder="Enter Code"
                            style={styles.discountInput}
                            placeholderTextColor={colors.muted}
                        />
                    </View>

                    {/* Checkout Button */}
                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => navigation.navigate('Checkout', { total: total.toString() })}
                    >
                        <Text style={styles.checkoutButtonText}>Continue to Pay GX {total.toLocaleString()}</Text>
                    </TouchableOpacity>

                </ScrollView>

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
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: typography.weightBold,
        color: colors.text,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100, // Space for BottomNav
    },
    listContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    itemType: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },
    controlsContainer: {
        alignItems: 'flex-end',
        gap: 8,
    },
    qtyControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        padding: 4,
    },
    qtyButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeQtyButton: {
        backgroundColor: colors.primary,
    },
    qtyText: {
        marginHorizontal: 8,
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.text,
    },
    deleteButton: {
        padding: 4,
    },
    summaryContainer: {
        marginBottom: 24,
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: colors.muted,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        marginBottom: 0,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    discountLabel: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: 8,
    },
    discountInputContainer: {
        backgroundColor: colors.white,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginBottom: 24,
    },
    discountInput: {
        fontSize: 14,
        color: colors.text,
    },
    checkoutButton: {
        backgroundColor: colors.primary,
        height: 58,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
    },
    checkoutButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
