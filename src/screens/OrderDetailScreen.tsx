import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
    ChevronLeft,
    Download,
    RefreshCcw,
    Truck,
    MapPin,
    CreditCard,
    MessageSquare
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

export const OrderDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    // Mock data for order details
    const order = {
        id: 'ORD-7654321',
        date: '18 Aug, 2024 at 10:30 AM',
        status: 'Processing',
        trackingNumber: 'YP-9988-7722',
        shippingAddress: '6, Cole Palmer Avenue, London, UK',
        paymentMethod: 'Visa •••• 4545',
        subtotal: '£420.00',
        shipping: '£25.00',
        tax: '£5.00',
        total: '£450.00',
        items: [
            {
                id: '1',
                name: 'Oversized Cotton T-Shirt',
                variant: 'Black / XL',
                price: '£180.00',
                qty: 1,
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'
            },
            {
                id: '2',
                name: 'Classic Denim Jacket',
                variant: 'Indigo / M',
                price: '£240.00',
                qty: 1,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'
            }
        ]
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order Details</Text>
                    <TouchableOpacity style={styles.invoiceButton}>
                        <Download size={20} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Order Status & ID */}
                    <View style={styles.statusSection}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{order.status}</Text>
                        </View>
                        <Text style={styles.orderIdText}>Order #{order.id}</Text>
                        <Text style={styles.orderDateText}>{order.date}</Text>
                    </View>

                    {/* Items List */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Items</Text>
                        {order.items.map((item) => (
                            <View key={item.id} style={styles.itemCard}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemVariant}>{item.variant}</Text>
                                    <View style={styles.itemPriceRow}>
                                        <Text style={styles.itemPrice}>{item.price}</Text>
                                        <Text style={styles.itemQty}>Qty: {item.qty}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Tracking Info */}
                    <TouchableOpacity
                        style={styles.trackingCard}
                        onPress={() => navigation.navigate('OrderTracking')}
                    >
                        <View style={styles.iconBox}>
                            <Truck size={24} color="#1C1C1E" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardLabel}>Track Shipment</Text>
                            <Text style={styles.cardValue}>{order.trackingNumber}</Text>
                        </View>
                        <ChevronLeft size={20} color="#C7C7CC" style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>

                    {/* Logistics Info */}
                    <View style={styles.infoGrid}>
                        <View style={styles.infoCard}>
                            <MapPin size={20} color="#8E8E93" style={{ marginBottom: 12 }} />
                            <Text style={styles.infoLabel}>Shipping Address</Text>
                            <Text style={styles.infoValue}>{order.shippingAddress}</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <CreditCard size={20} color="#8E8E93" style={{ marginBottom: 12 }} />
                            <Text style={styles.infoLabel}>Payment Method</Text>
                            <Text style={styles.infoValue}>{order.paymentMethod}</Text>
                        </View>
                    </View>

                    {/* Summary */}
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>{order.subtotal}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>{order.shipping}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax</Text>
                            <Text style={styles.summaryValue}>{order.tax}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Price</Text>
                            <Text style={styles.totalValue}>{order.total}</Text>
                        </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.actionSection}>
                        <TouchableOpacity style={styles.returnButton}>
                            <RefreshCcw size={20} color="#1C1C1E" strokeWidth={2.5} style={{ marginRight: 10 }} />
                            <Text style={styles.returnButtonText}>Return or Replace Items</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.supportButton}>
                            <MessageSquare size={20} color="#8E8E93" style={{ marginRight: 10 }} />
                            <Text style={styles.supportButtonText}>Get Help with this Order</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
    backButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    invoiceButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 60 },

    statusSection: { alignItems: 'center', marginTop: 24, marginBottom: 32 },
    statusBadge: { backgroundColor: '#FFF5F2', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, marginBottom: 16 },
    statusText: { fontSize: 13, fontWeight: '900', color: '#FF6B4A', textTransform: 'uppercase' },
    orderIdText: { fontSize: 24, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5, marginBottom: 4 },
    orderDateText: { fontSize: 14, color: '#8E8E93', fontWeight: '500' },

    section: { marginBottom: 32 },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1C1C1E', marginBottom: 16 },
    itemCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: '#F8F8F8', borderRadius: 20, padding: 12 },
    itemImage: { width: 64, height: 64, borderRadius: 12 },
    itemInfo: { flex: 1, marginLeft: 16 },
    itemName: { fontSize: 15, fontWeight: '700', color: '#1C1C1E' },
    itemVariant: { fontSize: 13, color: '#8E8E93', marginTop: 2 },
    itemPriceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
    itemPrice: { fontSize: 15, fontWeight: '800', color: '#1C1C1E' },
    itemQty: { fontSize: 13, color: '#8E8E93', fontWeight: '600' },

    trackingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F0F0F0', marginBottom: 24 },
    iconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    cardLabel: { fontSize: 13, fontWeight: '800', color: '#8E8E93', textTransform: 'uppercase', marginBottom: 4 },
    cardValue: { fontSize: 16, fontWeight: '800', color: '#1C1C1E' },

    infoGrid: { flexDirection: 'row', gap: 16, marginBottom: 24 },
    infoCard: { flex: 1, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F0F0F0' },
    infoLabel: { fontSize: 12, fontWeight: '900', color: '#1C1C1E', textTransform: 'uppercase', marginBottom: 8 },
    infoValue: { fontSize: 13, color: '#8E8E93', fontWeight: '600', lineHeight: 18 },

    summaryCard: { backgroundColor: '#1C1C1E', borderRadius: 28, padding: 24, marginBottom: 32 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
    summaryLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: '600' },
    summaryValue: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 18 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
    totalValue: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },

    actionSection: { gap: 12 },
    returnButton: { height: 64, borderRadius: 32, backgroundColor: '#F5F5F5', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    returnButtonText: { fontSize: 15, fontWeight: '800', color: '#1C1C1E' },
    supportButton: { paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    supportButtonText: { fontSize: 14, fontWeight: '700', color: '#8E8E93' }
});
