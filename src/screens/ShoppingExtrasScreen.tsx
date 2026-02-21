import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    StatusBar,
    FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
    ChevronLeft,
    Ticket,
    Clock,
    Heart,
    Search,
    ShoppingBag
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ShoppingExtras'>;

export const ShoppingExtrasScreen: React.FC<Props> = ({ navigation, route }) => {
    const [activeTab, setActiveTab] = useState('Coupons');

    const renderCoupons = () => (
        <View style={styles.tabContent}>
            {[
                { code: 'YAPFIRST30', desc: '30% off on your first luxury order', expires: 'Ends in 2 days', color: '#1C1C1E' },
                { code: 'WINTERVIBE', desc: 'Extra 15% off on the Winter Collection', expires: 'Ends in 5 days', color: '#FF6B4A' },
            ].map((item, idx) => (
                <View key={idx} style={[styles.couponCard, { borderColor: item.color }]}>
                    <View style={styles.couponLeft}>
                        <Text style={[styles.couponCode, { color: item.color }]}>{item.code}</Text>
                        <Text style={styles.couponDesc}>{item.desc}</Text>
                        <Text style={styles.couponExpiry}>{item.expires}</Text>
                    </View>
                    <TouchableOpacity style={[styles.applyBtn, { backgroundColor: item.color }]}>
                        <Text style={styles.applyBtnText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );

    const renderRecentlyViewed = () => (
        <View style={styles.tabContent}>
            {[
                { name: 'Oversized Silk Shirt', price: '£220', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
                { name: 'Leather Biker Boots', price: '£450', image: 'https://images.unsplash.com/photo-1512374382149-4332c6c77d4c?w=400&q=80' },
                { name: 'Cashmere Beanie', price: '£95', image: 'https://images.unsplash.com/photo-1576871333021-d1d6a622a59f?w=400&q=80' },
            ].map((item, idx) => (
                <View key={idx} style={styles.productRow}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.cartIcon}>
                        <ShoppingBag size={20} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Essentials</Text>
                    <View style={{ width: 48 }} />
                </View>

                {/* Tabs */}
                <View style={styles.tabBar}>
                    {['Coupons', 'Recently Viewed', 'Saved Later'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {activeTab === 'Coupons' && renderCoupons()}
                    {activeTab === 'Recently Viewed' && renderRecentlyViewed()}
                    {activeTab === 'Saved Later' && (
                        <View style={styles.emptyState}>
                            <Heart size={48} color="#E0E0E0" />
                            <Text style={styles.emptyTitle}>No items saved for later</Text>
                            <Text style={styles.emptySub}>Move items from your cart to save them here.</Text>
                        </View>
                    )}
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

    tabBar: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 24, gap: 8 },
    tabBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100, backgroundColor: '#F5F5F5' },
    tabBtnActive: { backgroundColor: '#1C1C1E' },
    tabText: { fontSize: 13, fontWeight: '800', color: '#8E8E93' },
    tabTextActive: { color: '#FFFFFF' },

    scrollContent: { paddingHorizontal: 24, paddingBottom: 60 },
    tabContent: { gap: 16 },

    couponCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 24, borderStyle: 'dashed', borderWidth: 2, backgroundColor: '#FFFFFF' },
    couponLeft: { flex: 1, marginRight: 16 },
    couponCode: { fontSize: 18, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
    couponDesc: { fontSize: 14, color: '#1C1C1E', fontWeight: '700', marginBottom: 6 },
    couponExpiry: { fontSize: 12, color: '#8E8E93', fontWeight: '600' },
    applyBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
    applyBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },

    productRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 20, padding: 12 },
    productImage: { width: 64, height: 64, borderRadius: 12 },
    productInfo: { flex: 1, marginLeft: 16 },
    productName: { fontSize: 15, fontWeight: '700', color: '#1C1C1E' },
    productPrice: { fontSize: 14, fontWeight: '800', color: '#FF6B4A', marginTop: 4 },
    cartIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },

    emptyState: { alignItems: 'center', marginTop: 100 },
    emptyTitle: { fontSize: 18, fontWeight: '900', color: '#1C1C1E', marginTop: 24, marginBottom: 8 },
    emptySub: { fontSize: 14, color: '#8E8E93', textAlign: 'center', paddingHorizontal: 40, lineHeight: 20 }
});
