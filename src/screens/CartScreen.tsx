import React, { useState } from 'react';
import { Button } from '../components/Button';
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
    Dimensions
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import {
    ChevronLeft,
    Trash2,
    Minus,
    Plus,
    CreditCard,
    ShoppingCart,
    MoveRight
} from 'lucide-react-native';

import { BottomNav } from '../components/BottomNav';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const INITIAL_CART_ITEMS = [
    {
        id: '1',
        name: 'Mulberry Silk Blouse',
        type: 'Signature Silk',
        price: 280,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
        qty: 1,
    },
    {
        id: '2',
        name: 'Titanium Slim Trouser',
        type: 'Architectural',
        price: 450,
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80',
        qty: 1,
    }
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

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    const renderItem = (item: typeof INITIAL_CART_ITEMS[0]) => (
        <View style={styles.cartItem} key={item.id}>
            <Image source={{ uri: item.image }} style={styles.itemThumb} />
            <View style={styles.itemCore}>
                <Text style={styles.itemTag}>{item.type}</Text>
                <Text style={styles.itemName}>{item.name}</Text>

                <View style={styles.qtyBox}>
                    <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
                        <Minus size={16} color="#1C1C1E" strokeWidth={1} />
                    </TouchableOpacity>
                    <Text style={styles.qtyVal}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
                        <Plus size={16} color="#1C1C1E" strokeWidth={1} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemRight}>
                <Text style={styles.itemPrice}>£{item.price}</Text>
                <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteBtn}>
                    <Trash2 size={18} color="#8E8E93" strokeWidth={1.5} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={28} color="#1C1C1E" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>YOUR BAG</Text>
                    <View style={{ width: 44 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.intro}>
                        <Text style={styles.introTitle}>Selection</Text>
                        <Text style={styles.introSub}>{cartItems.length} items curated in your bag.</Text>
                    </View>

                    <View style={styles.itemList}>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => renderItem(item))
                        ) : (
                            <View style={styles.empty}>
                                <ShoppingCart size={48} color="#F0F0F0" />
                                <Text style={styles.emptyText}>Your curation is empty.</Text>
                            </View>
                        )}
                    </View>

                    {cartItems.length > 0 && (
                        <View style={styles.summarySection}>
                            <View style={styles.promo}>
                                <TextInput
                                    placeholder="ACCESS CODE"
                                    placeholderTextColor="#A0A0A0"
                                    style={styles.promoInput}
                                />
                                <TouchableOpacity style={styles.applyBtn}>
                                    <Text style={styles.applyText}>APPLY</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.summaryCard}>
                                <View style={styles.sumRow}>
                                    <Text style={styles.sumLabel}>SUBTOTAL</Text>
                                    <Text style={styles.sumVal}>£{subtotal.toFixed(2)}</Text>
                                </View>
                                <View style={styles.sumRow}>
                                    <Text style={styles.sumLabel}>ESTIMATED TAX</Text>
                                    <Text style={styles.sumVal}>£{tax.toFixed(2)}</Text>
                                </View>
                                <View style={styles.sumDivider} />
                                <View style={styles.totalRow}>
                                    <Text style={styles.totalLabel}>TOTAL</Text>
                                    <Text style={styles.totalVal}>£{total.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    <View style={{ height: 160 }} />
                </ScrollView>

                {cartItems.length > 0 && (
                    <View style={styles.fixedBottom}>
                        <Button
                            title="PROCEED TO SECURE CHECKOUT"
                            onPress={() => navigation.navigate('Checkout', { total: total.toString() })}
                            icon={<MoveRight size={20} color={colors.white} />}
                        />
                    </View>
                )}
                <BottomNav />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 12 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 13, fontWeight: '900', color: '#1C1C1E', letterSpacing: 2 },

    scrollContent: { paddingBottom: 60 },
    intro: { paddingHorizontal: 32, paddingTop: 40, marginBottom: 40 },
    introTitle: { fontSize: 44, fontWeight: '400', fontFamily: typography.display, color: '#1C1C1E', letterSpacing: -2 },
    introSub: { fontSize: 16, color: '#8E8E93', fontWeight: '500', marginTop: 8 },

    itemList: { paddingHorizontal: 24 },
    cartItem: { flexDirection: 'row', marginBottom: 40, gap: 20 },
    itemThumb: { width: 100, height: 130, backgroundColor: '#F9F9F9', borderRadius: 2 },
    itemCore: { flex: 1, justifyContent: 'center' },
    itemTag: { fontSize: 10, fontWeight: '900', color: '#8E8E93', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 },
    itemName: { fontSize: 18, fontWeight: '800', color: '#1C1C1E', marginBottom: 16 },
    qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', alignSelf: 'flex-start', padding: 4, borderRadius: 2 },
    qtyBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
    qtyVal: { paddingHorizontal: 12, fontSize: 14, fontWeight: '800', color: '#1C1C1E' },
    itemRight: { alignItems: 'flex-end', justifyContent: 'center', gap: 20 },
    itemPrice: { fontSize: 16, fontWeight: '900', color: '#1C1C1E' },
    deleteBtn: { padding: 4 },

    empty: { alignItems: 'center', paddingVertical: 100 },
    emptyText: { fontSize: 16, color: '#C7C7CC', fontWeight: '700', marginTop: 20 },

    summarySection: { paddingHorizontal: 24, marginTop: 20 },
    promo: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingVertical: 12, marginBottom: 40 },
    promoInput: { flex: 1, fontSize: 14, fontWeight: '800', letterSpacing: 1, color: '#1C1C1E' },
    applyBtn: { paddingHorizontal: 16, justifyContent: 'center' },
    applyText: { fontSize: 12, fontWeight: '900', color: '#1C1C1E' },

    summaryCard: {},
    sumRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    sumLabel: { fontSize: 11, fontWeight: '900', color: '#8E8E93', letterSpacing: 1 },
    sumVal: { fontSize: 14, fontWeight: '800', color: '#1C1C1E' },
    sumDivider: { height: 1, backgroundColor: '#F8F8F8', marginVertical: 20 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontSize: 13, fontWeight: '900', color: '#1C1C1E', letterSpacing: 1 },
    totalVal: { fontSize: 24, fontWeight: '900', color: '#1C1C1E' },

    fixedBottom: { position: 'absolute', bottom: 100, left: 0, right: 0, paddingHorizontal: 24, backgroundColor: 'rgba(255,255,255,0.95)', paddingVertical: 16 },
    checkoutBtn: { height: 64, backgroundColor: colors.secondary, borderRadius: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16 },
    checkoutText: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 1.5 }
});
