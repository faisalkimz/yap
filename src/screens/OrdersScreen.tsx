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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, Package, Truck, CheckCircle2, Clock } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const ORDERS = [
    {
        id: 'ORD-7654321',
        date: 'Today, 10:30 AM',
        status: 'Processing',
        total: 'GX 4,500',
        items: 2,
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80',
            'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=200&q=80',
        ]
    },
    {
        id: 'ORD-9876543',
        date: 'Yesterday, 04:15 PM',
        status: 'Shipped',
        total: 'GX 12,000',
        items: 3,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
        ]
    },
    {
        id: 'ORD-1234567',
        date: 'Jan 28, 2024',
        status: 'Delivered',
        total: 'GX 8,500',
        items: 1,
        images: [
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&q=80',
        ]
    },
    {
        id: 'ORD-7788990',
        date: 'Jan 15, 2024',
        status: 'Delivered',
        total: 'GX 3,200',
        items: 1,
        images: [
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80',
        ]
    }
];

const TABS = ['Active', 'Completed', 'Cancelled'] as const;
type TabType = typeof TABS[number];

export const OrdersScreen: React.FC<Props> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<TabType>('Active');

    const filteredOrders = ORDERS.filter(order => {
        if (activeTab === 'Active') return ['Processing', 'Shipped'].includes(order.status);
        if (activeTab === 'Completed') return order.status === 'Delivered';
        if (activeTab === 'Cancelled') return order.status === 'Cancelled';
        return false;
    });

    const renderStatusBadge = (status: string) => {
        let color = colors.primary;
        let icon = Clock;
        let bgColor = '#FFF5F2';

        if (status === 'Shipped') {
            color = '#2196F3';
            icon = Truck;
            bgColor = '#E3F2FD';
        } else if (status === 'Delivered') {
            color = '#4CD964';
            icon = CheckCircle2;
            bgColor = '#E8F5E9';
        }

        const Icon = icon;

        return (
            <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
                <Icon size={14} color={color} style={{ marginRight: 4 }} />
                <Text style={[styles.statusText, { color: color }]}>{status}</Text>
            </View>
        );
    };

    const renderOrder = ({ item }: { item: typeof ORDERS[0] }) => (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderSuccess')} // For demo, assuming this shows logic. Could go to a dedicated OrderDetail
        >
            <View style={styles.orderHeader}>
                <View>
                    <Text style={styles.orderId}>{item.id}</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                {renderStatusBadge(item.status)}
            </View>

            <View style={styles.divider} />

            <View style={styles.orderDetails}>
                <View style={styles.imagesContainer}>
                    {item.images.slice(0, 3).map((img, idx) => (
                        <Image key={idx} source={{ uri: img }} style={[styles.orderImage, { zIndex: 10 - idx, left: idx * -15 }]} />
                    ))}
                    {item.items > item.images.length && (
                        <View style={[styles.moreItemsBadge, { left: item.images.length * -15 }]}>
                            <Text style={styles.moreItemsText}>+{item.items - item.images.length}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.orderInfoRight}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalAmount}>{item.total}</Text>
                </View>
            </View>

            {item.status !== 'Delivered' && (
                <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('OrderSuccess')}>
                    <Text style={styles.trackButtonText}>Track Order</Text>
                </TouchableOpacity>
            )}
            {item.status === 'Delivered' && (
                <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.reorderButtonText}>Leave Review</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    {TABS.map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                            {activeTab === tab && <View style={styles.activeTabIndicator} />}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Content */}
                <FlatList
                    data={filteredOrders}
                    renderItem={renderOrder}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Package size={64} color="#E0E0E0" />
                            <Text style={styles.emptyStateTitle}>No {activeTab} Orders</Text>
                            <Text style={styles.emptyStateText}>
                                You don't have any {activeTab.toLowerCase()} orders at this time.
                            </Text>
                        </View>
                    }
                />
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: typography.weightBold,
        color: colors.text,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    tab: {
        marginRight: 24,
        paddingVertical: 16,
        position: 'relative',
    },
    activeTab: {
    },
    tabText: {
        fontSize: 15,
        color: colors.muted,
        fontWeight: '600',
    },
    activeTabText: {
        color: colors.text,
        fontWeight: 'bold',
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: colors.primary,
        borderRadius: 1.5,
    },
    listContent: {
        padding: 24,
    },
    orderCard: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 12,
        color: colors.muted,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginBottom: 16,
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    imagesContainer: {
        flexDirection: 'row',
        paddingLeft: 10, // Offset for the negative margin effect
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.white,
        backgroundColor: '#F0F0F0',
    },
    moreItemsBadge: {
        width: 50,
        height: 50,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.white,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    moreItemsText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    orderInfoRight: {
        alignItems: 'flex-end',
    },
    totalLabel: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: 4,
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    trackButton: {
        backgroundColor: colors.text,
        borderRadius: 14,
        paddingVertical: 12,
        alignItems: 'center',
    },
    trackButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    reorderButton: {
        backgroundColor: '#FAFAFA',
        borderRadius: 14,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    reorderButtonText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        color: colors.muted,
        textAlign: 'center',
        maxWidth: 250,
        lineHeight: 20,
    },
});
