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
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, Package, MoveRight } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const ORDERS = [
    {
        id: 'YAP-928-11',
        date: 'Oct 21, 2024',
        status: 'MANIFESTED',
        total: '£730.00',
        items: 2,
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
            'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80',
        ]
    }
];

const TABS = ['ONGOING', 'ARCHIVE', 'RETURNS'] as const;
type TabType = typeof TABS[number];

export const OrdersScreen: React.FC<Props> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<TabType>('ONGOING');

    const renderOrder = ({ item }: { item: typeof ORDERS[0] }) => (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate('OrderTracking')}
            activeOpacity={0.9}
        >
            <View style={styles.orderTop}>
                <View>
                    <Text style={styles.orderRef}>MEMBERSHIP NO. {item.id}</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                <Text style={styles.orderStatus}>{item.status}</Text>
            </View>

            <View style={styles.orderVisuals}>
                {item.images.map((img, idx) => (
                    <Image key={idx} source={{ uri: img }} style={styles.orderThumb} />
                ))}
            </View>

            <View style={styles.orderBottom}>
                <View>
                    <Text style={styles.grandText}>GRAND TOTAL</Text>
                    <Text style={styles.totalVal}>{item.total}</Text>
                </View>
                <TouchableOpacity style={styles.viewRow} onPress={() => navigation.navigate('OrderTracking')}>
                    <Text style={styles.viewText}>VIEW ARCHIVE</Text>
                    <MoveRight size={16} color="#1C1C1E" strokeWidth={1} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={28} color="#1C1C1E" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>CURATED PURCHASES</Text>
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
                    data={activeTab === 'ONGOING' ? ORDERS : []}
                    renderItem={renderOrder}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.intro}>
                            <Text style={styles.introTitle}>{activeTab}</Text>
                            <Text style={styles.introSub}>Review the journey of your selected pieces.</Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Package size={48} color="#F5F5F5" strokeWidth={1} />
                            <Text style={styles.emptyTitle}>Empty Chapter</Text>
                            <Text style={styles.emptyText}>No orders found in this section of your archive.</Text>
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 12 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: '#8E8E93', letterSpacing: 2 },

    tabBar: { flexDirection: 'row', paddingHorizontal: 24, marginBottom: 40, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' },
    tab: { paddingVertical: 16, marginRight: 24, borderBottomWidth: 2, borderBottomColor: 'transparent' },
    tabActive: { borderBottomColor: '#1C1C1E' },
    tabLabel: { fontSize: 11, fontWeight: '800', color: '#8E8E93', letterSpacing: 1 },
    tabLabelActive: { color: '#1C1C1E' },

    list: { paddingBottom: 60 },
    intro: { paddingHorizontal: 32, marginBottom: 48 },
    introTitle: { fontSize: 44, fontWeight: '400', fontFamily: typography.display, color: '#1C1C1E', letterSpacing: -2 },
    introSub: { fontSize: 15, color: '#8E8E93', fontWeight: '500', marginTop: 8 },

    orderItem: { marginHorizontal: 24, padding: 32, backgroundColor: '#FBFBFB', borderRadius: 2, marginBottom: 32 },
    orderTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    orderRef: { fontSize: 10, fontWeight: '900', color: '#8E8E93', letterSpacing: 1 },
    orderDate: { fontSize: 14, fontWeight: '700', color: '#1C1C1E', marginTop: 4 },
    orderStatus: { fontSize: 10, fontWeight: '900', color: '#FF6B4A', letterSpacing: 1.5, marginTop: 4 },

    orderVisuals: { flexDirection: 'row', gap: 12, marginBottom: 32 },
    orderThumb: { width: 64, height: 80, backgroundColor: '#F0F0F0', borderRadius: 2 },

    orderBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 24 },
    grandText: { fontSize: 9, fontWeight: '900', color: '#8E8E93', letterSpacing: 1.5, marginBottom: 4 },
    totalVal: { fontSize: 20, fontWeight: '800', color: '#1C1C1E' },
    viewRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    viewText: { fontSize: 11, fontWeight: '900', color: '#1C1C1E', letterSpacing: 1 },

    empty: { alignItems: 'center', marginTop: 100 },
    emptyTitle: { fontSize: 24, fontWeight: '400', fontFamily: typography.display, color: '#1C1C1E', marginTop: 24 },
    emptyText: { fontSize: 14, color: '#8E8E93', textAlign: 'center', paddingHorizontal: 60, marginTop: 8, lineHeight: 22 }
});
