import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SafeAreaView,
    TextInput,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import {
    Search,
    Bell,
    Heart,
    SlidersHorizontal,
    MoveRight,
    Star,
    Plus,
    Flame,
    Zap,
    Crown,
    ShoppingBag
} from 'lucide-react-native';
import { BottomNav } from '../components/BottomNav';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = (width - 60) / 2;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CATEGORIES = [
    { id: '1', name: 'Apparel', icon: '👕' },
    { id: '2', name: 'Footwear', icon: '👟' },
    { id: '3', name: 'Timepieces', icon: '⌚' },
    { id: '4', name: 'Accessories', icon: '👜' },
    { id: '5', name: 'Gifts', icon: '🎁' },
];

const COLLECTIONS = [
    { id: '1', name: 'Winter Archive', label: 'NEW SEASON', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80' },
    { id: '2', name: 'Tailored Suiting', label: 'SIGNATURES', image: 'https://images.unsplash.com/photo-1594932224528-a4603e236124?w=800&q=80' },
];

const FEATURED_PRODUCTS = [
    {
        id: '1',
        name: 'Velvet Evening Blazer',
        price: '£420.00',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1594932224528-a4603e236124?w=800&q=80',
        category: 'Formal'
    },
    {
        id: '2',
        name: 'Obsidian Leather boots',
        price: '£310.00',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1638247025967-b4e38f6893b4?w=800&q=80',
        category: 'Footwear'
    },
    {
        id: '101',
        name: 'Mulberry Silk Shirt',
        price: '£215.00',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
        category: 'Heritage'
    },
    {
        id: '102',
        name: 'Technical Trench',
        price: '£890.00',
        rating: '5.0',
        image: 'https://images.unsplash.com/photo-1539533397341-3927b4c74bb6?w=800&q=80',
        category: 'Winter'
    }
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = useCart();
    const [activeCategory, setActiveCategory] = useState('1');

    const renderProduct = (product: typeof FEATURED_PRODUCTS[0], index: number) => (
        <TouchableOpacity
            key={product.id}
            style={[styles.productCard, index % 2 === 0 ? { marginLeft: 24 } : { marginRight: 24 }]}
            activeOpacity={0.9}
            onPress={() => {
                navigation.navigate('ProductDetails', { product: product as any });
                addToRecentlyViewed(product as any);
            }}
        >
            <View style={styles.imageBox}>
                <Image source={{ uri: product.image }} style={styles.productImg} />
                <TouchableOpacity
                    style={styles.cardFav}
                    onPress={() => toggleFavorite(product as any)}
                >
                    <Heart
                        size={18}
                        color={isFavorite(product.id) ? colors.accent : colors.secondary}
                        fill={isFavorite(product.id) ? colors.accent : 'transparent'}
                    />
                </TouchableOpacity>
                <View style={styles.ratingBadge}>
                    <Star size={10} color="#FFCC00" fill="#FFCC00" />
                    <Text style={styles.ratingVal}>{product.rating}</Text>
                </View>
            </View>
            <Text style={styles.cardCat}>{product.category}</Text>
            <Text style={styles.cardName} numberOfLines={1}>{product.name}</Text>
            <View style={styles.cardPriceRow}>
                <Text style={styles.cardPrice}>{product.price}</Text>
                <TouchableOpacity style={styles.addGhost}>
                    <Plus size={16} color={colors.secondary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderRecentItem = (product: any) => (
        <TouchableOpacity
            key={product.id}
            style={styles.recentItem}
            onPress={() => navigation.navigate('ProductDetails', { product })}
        >
            <Image source={{ uri: product.image }} style={styles.recentImg} />
            <Text style={styles.recentName} numberOfLines={1}>{product.name}</Text>
            <Text style={styles.recentPrice}>{product.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                {/* Ecommerce Header */}
                <View style={styles.header}>
                    <View style={styles.brandBox}>
                        <Text style={styles.brandTitle}>YAP</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('SearchResults', { query: '' })}>
                            <Search size={20} color={colors.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconCircle}>
                            <Bell size={20} color={colors.secondary} />
                            <View style={styles.notifDot} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Cart')}>
                            <ShoppingBag size={20} color={colors.secondary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                    {/* Search Bar - Permanent */}
                    <View style={styles.searchSection}>
                        <View style={styles.searchBar}>
                            <Search size={18} color={colors.muted} />
                            <TextInput
                                placeholder="Search our catalog of curated attire..."
                                placeholderTextColor="#A0A0A0"
                                style={styles.searchInput}
                            />
                            <TouchableOpacity style={styles.filterBtn}>
                                <SlidersHorizontal size={18} color={colors.secondary} strokeWidth={2} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Category Shelf */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.catScroll}
                    >
                        {CATEGORIES.map(cat => (
                            <TouchableOpacity
                                key={cat.id}
                                style={[styles.catBtn, activeCategory === cat.id && styles.catBtnActive]}
                                onPress={() => setActiveCategory(cat.id)}
                            >
                                <Text style={styles.catIcon}>{cat.icon}</Text>
                                <Text style={[styles.catLabel, activeCategory === cat.id && styles.catLabelActive]}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Main Promotion */}
                    <TouchableOpacity
                        style={styles.mainPromo}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('PromotionalListing', { collectionType: 'Flash Sale' })}
                    >
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80' }} style={styles.promoImg} />
                        <View style={styles.promoOverlay}>
                            <View style={styles.flashBadge}>
                                <Flame size={12} color="#FFF" fill="#FFF" />
                                <Text style={styles.flashText}>LIMITED RELEASE</Text>
                            </View>
                            <Text style={styles.promoTitle}>Winter Sale</Text>
                            <Text style={styles.promoSub}>Access up to 40% privilege on select pieces.</Text>
                            <Button
                                title="Shop Collection"
                                onPress={() => navigation.navigate('PromotionalListing', { collectionType: 'Flash Sale' })}
                                variant="outline"
                                style={styles.promoBtn}
                                textStyle={styles.promoBtnText}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Popular Collections */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>COLLECTIONS</Text>
                        <TouchableOpacity><Text style={styles.seeAll}>SEE ALL</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colScroll}>
                        {COLLECTIONS.map(col => (
                            <TouchableOpacity key={col.id} style={styles.colCard} activeOpacity={0.8}>
                                <Image source={{ uri: col.image }} style={styles.colImg} />
                                <View style={styles.colOverlay}>
                                    <Text style={styles.colLabel}>{col.label}</Text>
                                    <Text style={styles.colTitle}>{col.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Product Grid: Featured */}
                    <View style={[styles.sectionHeader, { marginTop: 40 }]}>
                        <View style={styles.titleRow}>
                            <Zap size={18} color={colors.primary} fill={colors.primary} />
                            <Text style={styles.sectionTitle}>TRENDING NOW</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('PromotionalListing', { collectionType: 'Best Sellers' })}>
                            <Text style={styles.seeAll}>VIEW ALL</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.productGrid}>
                        {FEATURED_PRODUCTS.map((p, idx) => renderProduct(p, idx))}
                    </View>

                    {recentlyViewed.length > 0 && (
                        <View style={styles.recentSection}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>RECENTLY VIEWED</Text>
                                <TouchableOpacity onPress={() => clearRecentlyViewed()}>
                                    <Text style={styles.seeAll}>CLEAR</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentScroll}>
                                {recentlyViewed.map(renderRecentItem)}
                            </ScrollView>
                        </View>
                    )}

                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>
            <BottomNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 12 },
    brandBox: { height: 44, justifyContent: 'center' },
    brandTitle: { fontSize: 24, fontWeight: '900', color: colors.secondary, letterSpacing: -1, fontFamily: typography.display },
    headerActions: { flexDirection: 'row', gap: 8 },
    iconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.lightGray, justifyContent: 'center', alignItems: 'center' },
    notifDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.lightGray },

    scroll: { paddingBottom: 40 },
    searchSection: { paddingHorizontal: 24, marginTop: 16 },
    searchBar: { height: 56, backgroundColor: colors.lightGray, borderRadius: 2, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 12 },
    searchInput: { flex: 1, fontSize: 14, fontWeight: '500', color: colors.secondary },
    filterBtn: { padding: 4 },

    catScroll: { paddingHorizontal: 24, paddingVertical: 24, gap: 10 },
    catBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.lightGray, borderRadius: 2, gap: 10, borderWidth: 1, borderColor: colors.border },
    catBtnActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
    catIcon: { fontSize: 16 },
    catLabel: { fontSize: 13, fontWeight: '800', color: colors.muted },
    catLabelActive: { color: colors.white },

    mainPromo: { marginHorizontal: 24, height: 220, borderRadius: 2, overflow: 'hidden', marginBottom: 32 },
    promoImg: { width: '100%', height: '100%' },
    promoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)', padding: 24, justifyContent: 'center' },
    flashBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.accent, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 2, gap: 6, marginBottom: 12 },
    flashText: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    promoTitle: { color: colors.white, fontSize: 36, fontWeight: '400', fontFamily: typography.display, marginBottom: 4 },
    promoSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500', marginBottom: 20 },
    promoBtn: { alignSelf: 'flex-start', backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 2 },
    promoBtnText: { fontSize: 13, fontWeight: '900', color: colors.secondary, letterSpacing: 0.5 },

    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 20 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    sectionTitle: { fontSize: 13, fontWeight: '900', color: colors.secondary, letterSpacing: 1.5 },
    seeAll: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 1 },

    colScroll: { paddingHorizontal: 24, gap: 16 },
    colCard: { width: 200, height: 260, borderRadius: 2, overflow: 'hidden', backgroundColor: colors.lightGray },
    colImg: { width: '100%', height: '100%' },
    colOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', padding: 20, justifyContent: 'flex-end' },
    colLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginBottom: 4 },
    colTitle: { color: colors.white, fontSize: 20, fontWeight: '400', fontFamily: typography.display },

    productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingBottom: 40 },
    productCard: { width: PRODUCT_CARD_WIDTH, marginBottom: 32 },
    imageBox: { width: '100%', height: 220, backgroundColor: colors.lightGray, borderRadius: 2, overflow: 'hidden', marginBottom: 12 },
    productImg: { width: '100%', height: '100%', resizeMode: 'cover' },
    cardFav: { position: 'absolute', top: 12, right: 12, width: 32, height: 32, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    ratingBadge: { position: 'absolute', bottom: 12, left: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 2, gap: 4 },
    ratingVal: { fontSize: 10, fontWeight: '800', color: colors.secondary },
    cardCat: { fontSize: 9, fontWeight: '900', color: colors.muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
    cardName: { fontSize: 15, fontWeight: '700', color: colors.secondary, marginBottom: 8 },
    cardPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardPrice: { fontSize: 15, fontWeight: '900', color: colors.secondary },
    addGhost: { padding: 4 },

    recentSection: { marginTop: 40 },
    recentScroll: { paddingHorizontal: 24, gap: 16 },
    recentItem: { width: 140, marginBottom: 20 },
    recentImg: { width: 140, height: 180, borderRadius: 2, backgroundColor: colors.lightGray, marginBottom: 12 },
    recentName: { fontSize: 13, fontWeight: '700', color: colors.secondary, marginBottom: 4 },
    recentPrice: { fontSize: 13, fontWeight: '900', color: colors.secondary }
});
