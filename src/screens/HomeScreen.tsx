import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import {
    Search,
    Bell,
    ShoppingBag,
    Heart,
    SlidersHorizontal,
    Shirt,
    Footprints,
    Star,
    TrendingUp,
    Zap,
    Sparkles,
    Eye,
    Clock,
    Flame
} from 'lucide-react-native';
import { BottomNav } from '../components/BottomNav';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CATEGORIES = [
    { id: 'all', name: 'All Items', icon: ShoppingBag },
    { id: 'clothes', name: 'Clothes', icon: Shirt },
    { id: 'shoes', name: 'Shoes', icon: Footprints },
];

const PRODUCTS = [
    {
        id: '1',
        name: 'Oversized Cotton T-Shirt',
        price: 'GX 45,000.00',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80',
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80',
        ],
        category: 'Men'
    },
    {
        id: '2',
        name: 'Classic Denim Jacket',
        price: 'GX 120,000.00',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
            'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&q=80',
            'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&q=80',
        ],
        category: 'Women'
    },
    {
        id: '3',
        name: 'Casual Linen Pants',
        price: 'GX 55,000.00',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80',
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80',
        ],
        category: 'Men'
    },
    {
        id: '4',
        name: 'Abstract Print Shirt',
        price: 'GX 65,000.00',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
            'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80',
            'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=500&q=80',
        ],
        category: 'Men'
    },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = useState('All Items');
    const { isFavorite, toggleFavorite } = useFavorites();

    const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => {
        const Icon = item.icon;
        const isActive = activeCategory === item.name;
        return (
            <TouchableOpacity
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setActiveCategory(item.name)}
                activeOpacity={0.8}
            >
                <View style={[styles.categoryIconCircle, isActive && { backgroundColor: '#FFFFFF' }]}>
                    <Icon size={16} color={isActive ? '#1C1C1E' : colors.text} strokeWidth={2.5} />
                </View>
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderProduct = ({ item, index }: { item: typeof PRODUCTS[0], index: number }) => {
        const favorited = isFavorite(item.id);
        const isLeft = index % 2 === 0;

        return (
            <TouchableOpacity
                style={[styles.productCard, isLeft ? { marginRight: 8 } : { marginLeft: 8 }]}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
                activeOpacity={0.9}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <LinearGradientOverlay />
                    <TouchableOpacity
                        style={[styles.favoriteButton, favorited && styles.favoriteButtonActive]}
                        onPress={() => toggleFavorite(item as any)}
                        activeOpacity={0.8}
                    >
                        <Heart size={18} color={favorited ? colors.white : '#1C1C1E'} fill={favorited ? colors.white : 'transparent'} />
                    </TouchableOpacity>
                    <View style={styles.ratingBadge}>
                        <Star size={12} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' }}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={styles.subGreeting}>Good morning, </Text>
                            <Text style={styles.greetingText}>Faisal Kimz</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
                        <Bell size={22} color="#1C1C1E" />
                        <View style={styles.badge} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search size={22} color="#A0A0A0" style={{ marginRight: 12 }} />
                        <Text style={styles.placeholderText}>Find your style...</Text>
                    </View>
                    <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
                        <SlidersHorizontal size={22} color={colors.white} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                    {/* Banners */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.bannersList}
                        snapToInterval={width * 0.85 + 16}
                        decelerationRate="fast"
                    >
                        {/* Banner 1 */}
                        <TouchableOpacity
                            style={[styles.bannerContainer, { backgroundColor: '#1C1C1E' }]}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('PromotionalListing', { collectionType: 'New Arrivals' })}
                        >
                            <View style={styles.bannerTextContainer}>
                                <Text style={styles.newCollectionText}>NEW DROPS</Text>
                                <Text style={styles.discountText}>Winter{'\n'}Collection</Text>
                                <View style={styles.shopNowButton}>
                                    <Text style={styles.shopNowText}>Explore</Text>
                                </View>
                            </View>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' }}
                                style={styles.bannerImage}
                            />
                        </TouchableOpacity>

                        {/* Banner 2 */}
                        <TouchableOpacity
                            style={[styles.bannerContainer, { backgroundColor: '#FF6B4A' }]}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('PromotionalListing', { collectionType: 'Flash Sale' })}
                        >
                            <View style={styles.bannerTextContainer}>
                                <Text style={styles.newCollectionText}>FLASH SALE</Text>
                                <Text style={styles.discountText}>Up to 50%{'\n'}Off Today</Text>
                                <View style={styles.shopNowButton}>
                                    <Text style={[styles.shopNowText, { color: '#FF6B4A' }]}>Shop All</Text>
                                </View>
                            </View>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80' }}
                                style={styles.bannerImage}
                            />
                        </TouchableOpacity>
                    </ScrollView>

                    {/* Categories */}
                    <FlatList
                        data={CATEGORIES}
                        renderItem={renderCategory}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />

                    {/* Recommended */}
                    <View style={styles.sectionHeader}>
                        <View style={styles.titleWithIcon}>
                            <Sparkles size={20} color="#1C1C1E" style={{ marginRight: 8 }} />
                            <Text style={styles.sectionTitle}>Just For You</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('PromotionalListing', { collectionType: 'New Arrivals' })}>
                            <Text style={styles.seeAllText}>Browse all</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.productsGrid}>
                        <FlatList
                            data={PRODUCTS}
                            renderItem={renderProduct}
                            numColumns={2}
                            scrollEnabled={false}
                            keyExtractor={item => item.id}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                        />
                    </View>

                    {/* Recently Viewed */}
                    <View style={[styles.sectionHeader, { marginTop: 40 }]}>
                        <View style={styles.titleWithIcon}>
                            <Clock size={20} color="#1C1C1E" style={{ marginRight: 8 }} />
                            <Text style={styles.sectionTitle}>Continue Browsing</Text>
                        </View>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    >
                        {PRODUCTS.slice(0, 3).map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.recentItem}
                                onPress={() => navigation.navigate('ProductDetails', { product: item })}
                            >
                                <Image source={{ uri: item.image }} style={styles.recentImage} />
                                <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Marketing Triggers */}
                    <View style={styles.discoveryGrid}>
                        <TouchableOpacity
                            style={[styles.discoveryCard, { backgroundColor: '#F0F9F4' }]}
                            onPress={() => navigation.navigate('PromotionalListing', { collectionType: 'Best Sellers' })}
                        >
                            <TrendingUp size={24} color="#34C759" />
                            <Text style={styles.discoveryTitle}>Best Sellers</Text>
                            <Text style={styles.discoverySubtitle}>Most loved pieces</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.discoveryCard, { backgroundColor: '#FFF5F2' }]}
                            onPress={() => navigation.navigate('PromotionalListing', { collectionType: 'Deal of the Day' })}
                        >
                            <Flame size={24} color="#FF6B4A" />
                            <Text style={styles.discoveryTitle}>Daily Deals</Text>
                            <Text style={styles.discoverySubtitle}>24h limited offers</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </SafeAreaView>
            <BottomNav />
        </View>
    );
};

// Mini helper to avoid heavy dependency if expo-linear-gradient isn't imported everywhere
const LinearGradientOverlay = () => (
    <View style={styles.gradientOverlay} />
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    subGreeting: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
        marginBottom: 2,
    },
    greetingText: {
        fontSize: 22,
        fontWeight: typography.weightBold,
        color: '#1C1C1E',
        letterSpacing: -0.5,
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 14,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF3B30',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 28,
        gap: 12,
    },
    searchBar: {
        flex: 1,
        height: 56,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 15,
        elevation: 2,
    },
    placeholderText: {
        color: '#A0A0A0',
        fontSize: 16,
        fontWeight: '500',
    },
    filterButton: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 6,
    },
    bannersList: {
        paddingHorizontal: 24,
        paddingBottom: 32,
        gap: 16,
    },
    bannerContainer: {
        width: width * 0.85,
        height: 180,
        borderRadius: 28,
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 12,
    },
    bannerTextContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        zIndex: 2,
    },
    newCollectionText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    discountText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '900',
        lineHeight: 32,
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    shopNowButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    shopNowText: {
        color: '#1C1C1E',
        fontWeight: '800',
        fontSize: 13,
        letterSpacing: 0.5,
    },
    bannerImage: {
        position: 'absolute',
        right: -30,
        bottom: -20,
        width: 200,
        height: 200,
        transform: [{ rotate: '-10deg' }]
    },
    categoryList: {
        paddingHorizontal: 24,
        marginBottom: 32,
        gap: 12,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingRight: 16,
        paddingVertical: 6,
        borderRadius: 100,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    categoryChipActive: {
        backgroundColor: '#1C1C1E',
    },
    categoryIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    categoryText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#8E8E93',
    },
    categoryTextActive: {
        color: '#FFFFFF',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1C1C1E',
        letterSpacing: -0.5,
    },
    seeAllText: {
        fontSize: 15,
        color: '#FF6B4A',
        fontWeight: '700',
        marginBottom: 2,
    },
    productsGrid: {
        paddingHorizontal: 24,
    },
    productCard: {
        flex: 1,
        marginBottom: 24,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#F0F0F0',
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.03)',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    favoriteButtonActive: {
        backgroundColor: '#FF6B4A',
    },
    ratingBadge: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    productInfo: {
        paddingHorizontal: 4,
    },
    productName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 6,
        letterSpacing: -0.2,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FF6B4A',
    },
    titleWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizontalList: {
        paddingHorizontal: 24,
        gap: 16,
        marginBottom: 32,
    },
    recentItem: {
        width: 140,
    },
    recentImage: {
        width: 140,
        height: 180,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        marginBottom: 10,
    },
    recentName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
        paddingHorizontal: 4,
    },
    discoveryGrid: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 16,
        marginTop: 16,
    },
    discoveryCard: {
        flex: 1,
        padding: 20,
        borderRadius: 24,
        gap: 8,
    },
    discoveryTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#1C1C1E',
        marginTop: 4,
    },
    discoverySubtitle: {
        fontSize: 12,
        color: '#8E8E93',
        fontWeight: '600',
    },
});
