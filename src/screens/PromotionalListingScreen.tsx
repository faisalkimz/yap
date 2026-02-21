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
import { RootStackParamList } from '../navigation/types';
import { typography } from '../theme/typography';
import {
    ChevronLeft,
    Heart,
    Star,
    Zap,
    TrendingUp,
    Sparkles,
    Flame,
    Filter
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

type Props = NativeStackScreenProps<RootStackParamList, 'PromotionalListing'>;

const MOCK_PRODUCTS = [
    { id: '1', name: 'Premium Silk Gown', price: '£450', oldPrice: '£720', rating: '4.9', image: 'https://images.unsplash.com/photo-1595152230551-2f4676d0ad94?w=400&q=80', sale: true, category: 'Heritage' },
    { id: '2', name: 'Leather Trench Coat', price: '£850', oldPrice: '£1,100', rating: '4.8', image: 'https://images.unsplash.com/photo-1539533397341-3927b4c74bb6?w=400&q=80', sale: true, category: 'Archive' },
    { id: '3', name: 'Italian Calf Loafers', price: '£320', oldPrice: '£450', rating: '4.7', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80', sale: true, category: 'Footwear' },
    { id: '4', name: 'Cashmere V-Neck', price: '£210', oldPrice: '£290', rating: '5.0', image: 'https://images.unsplash.com/photo-1576871333021-d1d6a622a59f?w=400&q=80', sale: true, category: 'Essentials' },
];

export const PromotionalListingScreen: React.FC<Props> = ({ navigation, route }) => {
    const { collectionType } = route.params;

    const getHeaderIcon = () => {
        switch (collectionType) {
            case 'Flash Sale': return <Zap size={20} color="#FFCC00" fill="#FFCC00" />;
            case 'Best Sellers': return <TrendingUp size={20} color="#1C1C1E" />;
            case 'New Arrivals': return <Sparkles size={20} color="#1C1C1E" />;
            case 'Deal of the Day': return <Flame size={20} color="#FF3B30" fill="#FF3B30" />;
            default: return null;
        }
    };

    const renderProduct = ({ item, index }: any) => {
        const isLeft = index % 2 === 0;
        return (
            <TouchableOpacity
                style={[styles.productCard, isLeft ? { marginRight: 6 } : { marginLeft: 6 }]}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
                activeOpacity={0.9}
            >
                <View style={styles.imageBox}>
                    <Image source={{ uri: item.image }} style={styles.productImg} />
                    {item.sale && (
                        <View style={styles.promoBadge}>
                            <Text style={styles.promoText}>-40%</Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.favBtn}>
                        <Heart size={18} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.itemCat}>{item.category}</Text>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                        {item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
                    </View>
                    <View style={styles.ratingBox}>
                        <Star size={10} color="#FFCC00" fill="#FFCC00" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={28} color="#1C1C1E" />
                    </TouchableOpacity>
                    <View style={styles.titleRow}>
                        {getHeaderIcon()}
                        <Text style={styles.headerTitle}>{collectionType.toUpperCase()}</Text>
                    </View>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Filter size={20} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>

                {collectionType === 'Flash Sale' && (
                    <View style={styles.timerBar}>
                        <Text style={styles.timerText}>CURATION ENDS IN 02:45:12</Text>
                    </View>
                )}

                <FlatList
                    data={MOCK_PRODUCTS}
                    renderItem={renderProduct}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.listHeader}>
                            <Text style={styles.heroTitle}>{collectionType}</Text>
                            <Text style={styles.heroSub}>A meticulously curated selection of our finest pieces, now accessible for a limited chapter.</Text>
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
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerTitle: { fontSize: 11, fontWeight: '900', color: '#8E8E93', letterSpacing: 2 },
    filterBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },

    timerBar: { backgroundColor: '#1C1C1E', paddingVertical: 12, alignItems: 'center' },
    timerText: { color: '#FFFFFF', fontSize: 10, fontWeight: '900', letterSpacing: 2 },

    list: { paddingHorizontal: 24, paddingBottom: 60, paddingTop: 40 },
    listHeader: { marginBottom: 48 },
    heroTitle: { fontSize: 48, fontWeight: '400', fontFamily: typography.display, color: '#1C1C1E', letterSpacing: -2 },
    heroSub: { fontSize: 15, color: '#8E8E93', fontWeight: '500', marginTop: 12, lineHeight: 22 },

    productCard: { width: ITEM_WIDTH, marginBottom: 32 },
    imageBox: { width: '100%', height: 220, borderRadius: 2, overflow: 'hidden', backgroundColor: '#F9F9F9' },
    productImg: { width: '100%', height: '100%', resizeMode: 'cover' },
    promoBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#FF3B30', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 2 },
    promoText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
    favBtn: { position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },

    infoBox: { marginTop: 16 },
    itemCat: { fontSize: 9, fontWeight: '900', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
    itemName: { fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 8 },
    priceContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
    itemPrice: { fontSize: 15, fontWeight: '900', color: '#C8102E' }, // Luxury red for sale
    oldPrice: { fontSize: 13, color: '#C7C7CC', fontWeight: '500', textDecorationLine: 'line-through' },
    ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingText: { fontSize: 11, fontWeight: '800', color: '#1C1C1E' }
});
