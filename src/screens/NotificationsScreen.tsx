import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
    ChevronLeft,
    Bell,
    ShoppingBag,
    Tag,
    CreditCard,
    Info
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Order Delivered',
        message: 'Your order #ORD-1234567 has been delivered at your doorstep. Enjoy!',
        time: '2h ago',
        type: 'order',
        unread: true
    },
    {
        id: '2',
        title: 'New Collection Live',
        message: 'The Winter Luxury drop is finally here. Exclusive access for Titanium members.',
        time: '5h ago',
        type: 'promo',
        unread: true
    },
    {
        id: '3',
        title: 'Payment Successful',
        message: 'We have received your payment for order #ORD-7654321.',
        time: '1d ago',
        type: 'payment',
        unread: false
    },
    {
        id: '4',
        title: 'Price Drop Alert',
        message: 'An item in your wishlist "Oversized Cotton T-Shirt" is now 20% off.',
        time: '2d ago',
        type: 'promo',
        unread: false
    }
];

export const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'order': return <ShoppingBag size={20} color="#FFFFFF" />;
            case 'promo': return <Tag size={20} color="#FFFFFF" />;
            case 'payment': return <CreditCard size={20} color="#FFFFFF" />;
            default: return <Info size={20} color="#FFFFFF" />;
        }
    };

    const getIconBg = (type: string) => {
        switch (type) {
            case 'order': return '#1C1C1E';
            case 'promo': return '#FF6B4A';
            case 'payment': return '#34C759';
            default: return '#8E8E93';
        }
    };

    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => (
        <TouchableOpacity style={[styles.notiCard, item.unread && styles.unreadCard]}>
            <View style={[styles.iconBox, { backgroundColor: getIconBg(item.type) }]}>
                {getIcon(item.type)}
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.notiHeader}>
                    <Text style={styles.notiTitle}>{item.title}</Text>
                    <Text style={styles.notiTime}>{item.time}</Text>
                </View>
                <Text style={styles.notiMessage} numberOfLines={2}>
                    {item.message}
                </Text>
            </View>
            {item.unread && <View style={styles.unreadDot} />}
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
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <TouchableOpacity style={styles.clearButton}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={NOTIFICATIONS}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Bell size={64} color="#E0E0E0" strokeWidth={1} />
                            <Text style={styles.emptyTitle}>All caught up!</Text>
                            <Text style={styles.emptyText}>New activities and promotions will appear here.</Text>
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
    clearButton: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100 },
    clearText: { fontSize: 13, fontWeight: '800', color: '#FF6B4A' },
    listContent: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },

    notiCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, marginBottom: 16, borderWidth: 1, borderColor: '#F0F0F0' },
    unreadCard: { backgroundColor: '#F8F8F8', borderColor: 'transparent' },
    iconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    notiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    notiTitle: { fontSize: 16, fontWeight: '800', color: '#1C1C1E', flex: 1, marginRight: 8 },
    notiTime: { fontSize: 12, fontWeight: '700', color: '#8E8E93' },
    notiMessage: { fontSize: 13, color: '#8E8E93', fontWeight: '500', lineHeight: 20 },
    unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF6B4A', marginLeft: 12 },

    emptyContainer: { alignItems: 'center', marginTop: 100 },
    emptyTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', marginTop: 24, marginBottom: 8 },
    emptyText: { fontSize: 15, color: '#8E8E93', textAlign: 'center', paddingHorizontal: 40, lineHeight: 22 }
});
