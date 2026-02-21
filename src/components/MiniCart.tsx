import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
    ScrollView,
    Platform,
} from 'react-native';
import { X, ShoppingBag, ChevronRight, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

interface MiniCartProps {
    isVisible: boolean;
    onClose: () => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({ isVisible, onClose }) => {
    const navigation = useNavigation<any>();

    const cartItems = [
        { id: '1', name: 'Silk Oversized Shirt', price: '£220', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', qty: 1 },
        { id: '2', name: 'Leather Boots', price: '£450', image: 'https://images.unsplash.com/photo-1512374382149-4332c6c77d4c?w=400&q=80', qty: 1 },
    ];

    const handleCheckout = () => {
        onClose();
        navigation.navigate('Cart');
    };

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
                <View style={styles.drawer}>
                    <View style={styles.header}>
                        <View style={styles.headerTitleRow}>
                            <ShoppingBag size={20} color="#1C1C1E" strokeWidth={2.5} />
                            <Text style={styles.headerTitle}>Quick Bag (2)</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <X size={20} color="#1C1C1E" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.itemList}>
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.itemRow}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>{item.price}</Text>
                                    <Text style={styles.itemQty}>Qty: {item.qty}</Text>
                                </View>
                                <TouchableOpacity style={styles.deleteBtn}>
                                    <Trash2 size={18} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.footer}>
                        <View style={styles.subtotalRow}>
                            <Text style={styles.subtotalLabel}>Subtotal</Text>
                            <Text style={styles.subtotalValue}>£670.00</Text>
                        </View>
                        <TouchableOpacity style={styles.viewCartBtn} onPress={handleCheckout}>
                            <Text style={styles.viewCartBtnText}>View Full Bag</Text>
                            <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
    backdrop: { flex: 1 },
    drawer: { width: width * 0.85, backgroundColor: '#FFFFFF', height: '100%', shadowColor: '#000', shadowOffset: { width: -10, height: 0 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 60 : 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
    headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerTitle: { fontSize: 18, fontWeight: '900', color: '#1C1C1E' },
    closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },

    itemList: { padding: 24, gap: 20 },
    itemRow: { flexDirection: 'row', alignItems: 'center' },
    itemImage: { width: 70, height: 70, borderRadius: 14, backgroundColor: '#F5F5F5' },
    itemInfo: { flex: 1, marginLeft: 16 },
    itemName: { fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 4 },
    itemPrice: { fontSize: 15, fontWeight: '800', color: '#FF6B4A' },
    itemQty: { fontSize: 13, color: '#8E8E93', fontWeight: '600', marginTop: 4 },
    deleteBtn: { padding: 8 },

    footer: { padding: 24, borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
    subtotalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    subtotalLabel: { fontSize: 15, fontWeight: '600', color: '#8E8E93' },
    subtotalValue: { fontSize: 18, fontWeight: '900', color: '#1C1C1E' },
    viewCartBtn: { height: 60, backgroundColor: '#1C1C1E', borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
    viewCartBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' }
});
