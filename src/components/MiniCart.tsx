import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
    FlatList,
    Platform,
    Modal,
    SafeAreaView
} from 'react-native';
import { ShoppingBag, X, Minus, Plus, MoveRight, Trash2 } from 'lucide-react-native';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const MiniCart: React.FC = () => {
    const {
        cartItems,
        isMiniCartVisible,
        setMiniCartVisible,
        updateQuantity,
        removeFromCart
    } = useCart();

    const navigation = useNavigation<any>();
    const slideAnim = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        if (isMiniCartVisible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: width,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [isMiniCartVisible]);

    const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('£', '').replace(',', '')) * item.quantity), 0);

    const handleCheckout = () => {
        setMiniCartVisible(false);
        navigation.navigate('Cart');
    };

    if (!isMiniCartVisible) return null;

    return (
        <Modal
            transparent
            visible={isMiniCartVisible}
            onRequestClose={() => setMiniCartVisible(false)}
            animationType="none"
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={() => setMiniCartVisible(false)}
            >
                <Animated.View
                    style={[
                        styles.drawer,
                        { transform: [{ translateX: slideAnim }] }
                    ]}
                >
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
                        <SafeAreaView style={styles.safeArea}>
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    <ShoppingBag size={20} color={colors.secondary} />
                                    <Text style={styles.headerTitle}>YOUR BAG ({cartItems.length})</Text>
                                </View>
                                <TouchableOpacity onPress={() => setMiniCartVisible(false)} style={styles.closeBtn}>
                                    <X size={24} color={colors.secondary} />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={cartItems}
                                keyExtractor={(item) => `${item.id}-${item.selectedSize}`}
                                contentContainerStyle={styles.list}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <View style={styles.item}>
                                        <Image source={{ uri: item.image }} style={styles.itemImg} />
                                        <View style={styles.itemInfo}>
                                            <Text style={styles.itemCat}>{item.category || 'COLLECTION'}</Text>
                                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                            <Text style={styles.itemPrice}>{item.price}</Text>

                                            <View style={styles.itemActions}>
                                                <View style={styles.qtyBox}>
                                                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
                                                        <Minus size={14} color={colors.secondary} />
                                                    </TouchableOpacity>
                                                    <Text style={styles.qtyVal}>{item.quantity}</Text>
                                                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
                                                        <Plus size={14} color={colors.secondary} />
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                                    <Trash2 size={16} color={colors.muted} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                ListEmptyComponent={
                                    <View style={styles.empty}>
                                        <Text style={styles.emptyText}>Your curation is currently empty.</Text>
                                    </View>
                                }
                            />

                            {cartItems.length > 0 && (
                                <View style={styles.footer}>
                                    <View style={styles.subtotalRow}>
                                        <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
                                        <Text style={styles.subtotalVal}>£{subtotal.toFixed(2)}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                                        <Text style={styles.checkoutText}>VIEW FULL BAG</Text>
                                        <MoveRight size={20} color={colors.white} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </SafeAreaView>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    drawer: {
        width: width * 0.85,
        height: height,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: -10, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    headerTitle: { fontSize: 11, fontWeight: '900', color: colors.secondary, letterSpacing: 2 },
    closeBtn: { padding: 4 },

    list: { padding: 24 },
    item: { flexDirection: 'row', gap: 16, marginBottom: 24 },
    itemImg: { width: 80, height: 100, borderRadius: 2, backgroundColor: colors.lightGray },
    itemInfo: { flex: 1, justifyContent: 'center' },
    itemCat: { fontSize: 8, fontWeight: '900', color: colors.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
    itemName: { fontSize: 15, fontWeight: '700', color: colors.secondary, marginBottom: 4 },
    itemPrice: { fontSize: 15, fontWeight: '900', color: colors.secondary, marginBottom: 12 },
    itemActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.lightGray, borderRadius: 2, padding: 4 },
    qtyBtn: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },
    qtyVal: { paddingHorizontal: 10, fontSize: 13, fontWeight: '800', color: colors.secondary },

    empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
    emptyText: { fontSize: 14, color: colors.muted, fontWeight: '600' },

    footer: { padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, borderTopWidth: 1, borderTopColor: colors.lightGray },
    subtotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    subtotalLabel: { fontSize: 11, fontWeight: '900', color: colors.muted, letterSpacing: 1.5 },
    subtotalVal: { fontSize: 20, fontWeight: '900', color: colors.secondary },
    checkoutBtn: { height: 60, backgroundColor: colors.secondary, borderRadius: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16 },
    checkoutText: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 1.5 }
});
