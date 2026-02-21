import React from 'react';
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
    Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
    ChevronLeft,
    Heart,
    Star,
    ShoppingBag,
    TrendingUp,
    Zap,
    Sparkles,
    Flame
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'PromotionalListing'>;

const MOCK_PRODUCTS = [
    { id: '1', name: 'Premium Silk Gown', price: '£450', oldPrice: '£720', rating: '4.9', image: 'https://images.unsplash.com/photo-1595152230551-2f4676d0ad94?w=400&q=80', sale: true },
    { id: '2', name: 'Leather Trench Coat', price: '£850', oldPrice: '£1,100', rating: '4.8', image: 'https://images.unsplash.com/photo-1539533397341-3927b4c74bb6?w=400&q=80', sale: true },
    { id: '3', name: 'Italian Calfskin Loafers', price: '£320', oldPrice: '£450', rating: '4.7', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80', sale: true },
    { id: '4', name: 'Cashmere V-Neck', price: '£210', oldPrice: '£290', rating: '5.0', image: 'https://images.unsplash.com/photo-1576871333021-d1d6a622a59f?w=400&q=80', sale: true },
];

export const PromotionalListingScreen: React.FC<Props> = ({ navigation, route }) => {
    const { collectionType } = route.params;

    const getHeaderIcon = () => {
        switch (collectionType) {
            case 'Flash Sale': return <Zap size={24} color="#FF6B4A" fill="#FF6B4A" />;
            case 'Best Sellers': return <TrendingUp size={24} color="#1C1C1E" />;
            case 'New Arrivals': return <Sparkles size={24} color="#1C1C1E" />;
            case 'Deal of the Day': return <Flame size={24} color="#FF3B30" fill="#FF3B30" />;
            default: return null;
        }
    };

    const renderProduct = ({ item, index }: any) => {
        const isLeft = index % 2 === 0;
        return (
            <TouchableOpacity
                style={[styles.productCard, isLeft ? { marginRight: 8 } : { marginLeft: 8 }]}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
                activeOpacity={0.9}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <View style={styles.saleBadge}>
                        <Text style={styles.saleText}>-40%</Text>
                    </View>
                    <TouchableOpacity style={styles.favBtn}>
                        <Heart size={18} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.productPrice}>{item.price}</Text>
                        <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        {getHeaderIcon()}
                        <Text style={styles.headerTitle}>{collectionType}</Text>
                    </View>
                    <View style={{ width: 48 }} />
                </View>

                {collectionType === 'Flash Sale' && (
                    <View style={styles.timerBar}>
                        <Text style={styles.timerText}>Ending in: 02h 45m 12s</Text>
                    </View>
                )}

                <FlatList
                    data={MOCK_PRODUCTS}
                    renderItem={renderProduct}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    ListHeaderComponent={
                        <View style={styles.listHeader}>
                            <Text style={styles.listCount}>Exclusive selection for your lifestyle.</Text>
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
    headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },

    timerBar: { backgroundColor: '#1C1C1E', paddingVertical: 10, alignItems: 'center' },
    timerText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', letterSpacing: 1 },

    listContent: { paddingHorizontal: 24, paddingBottom: 60, paddingTop: 16 },
    listHeader: { marginBottom: 24 },
    listCount: { fontSize: 13, fontWeight: '700', color: '#8E8E93', letterSpacing: 0.5 },

    productCard: { flex: 1, marginBottom: 24 },
    imageContainer: { width: '100%', height: 220, borderRadius: 24, overflow: 'hidden', backgroundColor: '#F5F5F5', position: 'relative' },
    productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    saleBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#FF6B4A', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
    saleText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
    favBtn: { position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },

    productInfo: { marginTop: 12, paddingHorizontal: 4 },
    productName: { fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 4 },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    productPrice: { fontSize: 17, fontWeight: '900', color: '#FF6B4A' },
    oldPrice: { fontSize: 13, color: '#C7C7CC', fontWeight: '500', textDecorationLine: 'line-through' }
});
