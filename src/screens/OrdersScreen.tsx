import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChevronLeft, Package, Truck, CheckCircle2, Clock, Trash2 } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const ORDERS = [
    {
        id: 'ORD-7654321',
        date: '18 Aug, 2024',
        status: 'Processing',
        total: '£450.00',
        items: 2,
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80',
            'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=200&q=80',
        ]
    },
    {
        id: 'ORD-9876543',
        date: '15 Aug, 2024',
        status: 'In Transit',
        total: '£1,200.00',
        items: 3,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
        ]
    },
    {
        id: 'ORD-1234567',
        date: '28 Jul, 2024',
        status: 'Delivered',
        total: '£85.00',
        items: 1,
        images: [
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&q=80',
        ]
    }
];

const TABS = ['Active', 'Delivered', 'Cancelled'] as const;
type TabType = typeof TABS[number];

export const OrdersScreen: React.FC<Props> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<TabType>('Active');

    const filteredOrders = ORDERS.filter(order => {
        if (activeTab === 'Active') return ['Processing', 'In Transit'].includes(order.status);
        if (activeTab === 'Delivered') return order.status === 'Delivered';
        if (activeTab === 'Cancelled') return order.status === 'Cancelled';
        return false;
    });

    const renderOrder = ({ item }: { item: typeof ORDERS[0] }) => (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderTracking')}
            activeOpacity={0.9}
        >
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.orderId}>Order {item.id}</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                <View style={[styles.statusBadge, item.status === 'Processing' ? styles.statusBadgeActive : styles.statusBadgeDone]}>
                    <Text style={[styles.statusText, item.status === 'Processing' ? styles.statusTextActive : styles.statusTextDone]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.imagesGrid}>
                    {item.images.slice(0, 3).map((img, idx) => (
                        <Image key={idx} source={{ uri: img }} style={styles.productThumbnail} />
                    ))}
                    {item.items > item.images.length && (
                        <View style={styles.moreThumbnail}>
                            <Text style={styles.moreText}>+{item.items - item.images.length}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.totalLabel}>Grand Total</Text>
                    <Text style={styles.totalPrice}>{item.total}</Text>
                </View>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity
                    style={styles.detailsBtn}
                    onPress={() => navigation.navigate('OrderTracking')}
                >
                    <Text style={styles.detailsBtnText}>View Details</Text>
                </TouchableOpacity>
                {item.status === 'Processing' && (
                    <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('OrderTracking')}>
                        <Text style={styles.trackBtnText}>Track Order</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <View style={{ width: 44 }} />
                </View>

                <View style={styles.tabBar}>
                    {TABS.map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.tabActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <FlatList
                    data={filteredOrders}
                    renderItem={renderOrder}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Package size={64} color="#E0E0E0" strokeWidth={1} />
                            <Text style={styles.emptyTitle}>No {activeTab} Orders</Text>
                            <Text style={styles.emptyText}>Items you purchase will appear here for tracking.</Text>
                        </View>
                    }
                />
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
    tabBar: { flexDirection: 'row', paddingHorizontal: 24, marginBottom: 24, gap: 12 },
    tab: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, backgroundColor: '#F5F5F5' },
    tabActive: { backgroundColor: '#1C1C1E' },
    tabLabel: { fontSize: 14, fontWeight: '700', color: '#8E8E93' },
    tabLabelActive: { color: '#FFFFFF' },
    listContent: { paddingHorizontal: 24, paddingBottom: 40 },
    orderCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.03, shadowRadius: 15, elevation: 4 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
    orderId: { fontSize: 16, fontWeight: '900', color: '#1C1C1E', marginBottom: 4 },
    orderDate: { fontSize: 13, color: '#8E8E93', fontWeight: '500' },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
    statusBadgeActive: { backgroundColor: '#FFF5F2' },
    statusBadgeDone: { backgroundColor: '#F0F9F4' },
    statusText: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
    statusTextActive: { color: '#FF6B4A' },
    statusTextDone: { color: '#4CD964' },
    cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 },
    imagesGrid: { flexDirection: 'row', gap: 8 },
    productThumbnail: { width: 56, height: 56, borderRadius: 12, backgroundColor: '#F8F8F8' },
    moreThumbnail: { width: 56, height: 56, borderRadius: 12, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0' },
    moreText: { fontSize: 14, fontWeight: '800', color: '#1C1C1E' },
    priceContainer: { alignItems: 'flex-end' },
    totalLabel: { fontSize: 13, color: '#8E8E93', fontWeight: '500', marginBottom: 4 },
    totalPrice: { fontSize: 18, fontWeight: '900', color: '#1C1C1E' },
    actionRow: { flexDirection: 'row', gap: 12 },
    detailsBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    detailsBtnText: { fontSize: 14, fontWeight: '800', color: '#1C1C1E' },
    trackBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center' },
    trackBtnText: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
    emptyContainer: { alignItems: 'center', marginTop: 100 },
    emptyTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', marginTop: 24, marginBottom: 8 },
    emptyText: { fontSize: 15, color: '#8E8E93', textAlign: 'center', paddingHorizontal: 40, lineHeight: 22 }
});
