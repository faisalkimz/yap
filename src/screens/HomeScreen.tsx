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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import {
    Search,
    Bell,
    ShoppingBag,
    Heart,
    SlidersHorizontal,
    House,
    ShoppingCart,
    User,
    Shirt,
    Footprints
} from 'lucide-react-native';


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


import { BottomNav } from '../components/BottomNav';

// ... (keep logic the same)

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    // ... (keep state and handlers)
    const [activeCategory, setActiveCategory] = useState('All Items');

    // ... (keep render functions)
    const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => {
        const Icon = item.icon;
        const isActive = activeCategory === item.name;
        return (
            <TouchableOpacity
                style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive
                ]}
                onPress={() => setActiveCategory(item.name)}
            >
                <View style={[styles.categoryIconCircle, isActive && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                    <Icon size={16} color={isActive ? colors.white : colors.text} />
                </View>
                <Text style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive
                ]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderProduct = ({ item, index }: { item: typeof PRODUCTS[0], index: number }) => (
        <TouchableOpacity
            style={[
                styles.productCard,
                index % 2 !== 0 ? { marginLeft: spacing.sm } : { marginRight: spacing.sm }
            ]}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.favoriteButton}>
                    <Heart size={18} color={colors.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>★ {item.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' }}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={styles.greetingText}>Hello Faisal Kimz</Text>
                            <Text style={styles.subGreeting}>Welcome back </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Bell size={24} color={colors.text} />
                        <View style={styles.badge} />
                    </TouchableOpacity>
                </View>

                {/* Compact Header Spacing */}
                <View style={{ marginBottom: 12 }} />

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search size={20} color={colors.muted} style={{ marginRight: 10 }} />
                        <Text style={styles.placeholderText}>Search for clothes...</Text>
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <SlidersHorizontal size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Banners - Horizontal Scroll */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.bannersList}
                    >
                        {/* Banner 1 - Orange */}
                        <View style={[styles.bannerContainer, { backgroundColor: colors.primary }]}>
                            <View style={styles.bannerTextContainer}>
                                <View style={styles.newCollectionBadge}>
                                    <Text style={styles.newCollectionText}>New Collection</Text>
                                </View>
                                <Text style={styles.discountText}>20% Discount for the first transaction</Text>
                                <TouchableOpacity style={styles.shopNowButton}>
                                    <Text style={styles.shopNowText}>Shop Now</Text>
                                </TouchableOpacity>
                            </View>
                            <Image
                                source={{ uri: 'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png' }}
                                style={styles.bannerImage}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Banner 2 - Purple */}
                        <View style={[styles.bannerContainer, { backgroundColor: '#6C63FF' }]}>
                            <View style={styles.bannerTextContainer}>
                                <View style={styles.newCollectionBadge}>
                                    <Text style={styles.newCollectionText}>Flash Sale</Text>
                                </View>
                                <Text style={styles.discountText}>50% Discount for the first transaction</Text>
                                <TouchableOpacity style={styles.shopNowButton}>
                                    <Text style={styles.shopNowText}>Shop Now</Text>
                                </TouchableOpacity>
                            </View>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' }}
                                style={[styles.bannerImage, { transform: [{ rotate: '15deg' }] }]}
                                resizeMode="contain"
                            />
                        </View>
                    </ScrollView>

                    {/* Categories */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={CATEGORIES}
                        renderItem={renderCategory}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />

                    {/* Recommended */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recommended for you</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
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
                </ScrollView>

                <BottomNav />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 10,
        marginBottom: 10, // Adjusted
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    greetingText: {
        fontSize: 16,
        fontWeight: typography.weightBold,
        color: colors.text,
    },
    subGreeting: {
        fontSize: 12,
        color: colors.muted,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF4D4D',
        borderWidth: 1,
        borderColor: '#FAFAFA',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 20,
        gap: 12,
    },
    searchBar: {
        flex: 1,
        height: 56,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    placeholderText: {
        color: colors.muted,
        fontSize: 14,
    },
    filterButton: {
        width: 56,
        height: 56,
        borderRadius: 20,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    bannersList: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 16,
    },
    bannerContainer: {
        width: 300,
        height: 170,
        borderRadius: 28,
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    bannerTextContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        zIndex: 2,
    },
    newCollectionBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    newCollectionText: {
        color: colors.white,
        fontSize: 11,
        fontWeight: '700',
    },
    discountText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 12,
        lineHeight: 22,
        width: '85%',
    },
    shopNowButton: {
        backgroundColor: colors.white,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    shopNowText: {
        color: colors.primary,
        fontWeight: '800', // bolder
        fontSize: 11,
    },
    bannerImage: {
        position: 'absolute',
        right: -15,
        bottom: -15,
        width: 170,
        height: 130,
        transform: [{ rotate: '-15deg' }]
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: typography.weightBold,
        color: colors.text,
    },
    seeAllText: {
        fontSize: 13,
        color: colors.muted,
        fontWeight: '600',
    },
    categoryList: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingRight: 18,
        paddingVertical: 8,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        marginRight: 12,
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    categoryChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    categoryIconCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    categoryTextActive: {
        color: colors.white,
    },
    productsGrid: {
        paddingHorizontal: 24,
    },
    productCard: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    imageContainer: {
        width: '100%',
        height: 140,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 12,
        backgroundColor: '#F8F8F8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    productInfo: {
        paddingHorizontal: 4,
    },
    productName: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: typography.weightBold,
        color: colors.primary, // Changed to primary color
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 11,
        color: colors.muted,
        fontWeight: '700',
    },
});

