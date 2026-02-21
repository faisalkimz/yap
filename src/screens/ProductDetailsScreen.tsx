import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions,
    SafeAreaView,
    FlatList,
    Platform,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, Heart, ShoppingCart, Star, Minus, Plus, GitCompare } from 'lucide-react-native';
import { useFavorites } from '../context/FavoritesContext';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
    { name: 'Onyx', code: '#1C1C1E' },
    { name: 'Sand', code: '#E4D5C7' },
    { name: 'Sage', code: '#8B9B88' },
];

export const ProductDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
    const { product } = route.params;
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorited = isFavorite(product.id);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Hero Image Carousel */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        data={product.images || [product.image]}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        onScroll={({ nativeEvent }) => {
                            const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
                            if (slide !== activeIndex) {
                                setActiveIndex(slide);
                            }
                        }}
                        renderItem={({ item }) => (
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: item }} style={styles.productImage} />
                                {/* Bottom gradient overlay for smooth transition */}
                                <View style={styles.imageGradientOverlay} />
                            </View>
                        )}
                    />

                    {/* Floating Header */}
                    <SafeAreaView style={styles.headerSafeArea}>
                        <View style={styles.floatingHeader}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => navigation.goBack()}
                                activeOpacity={0.8}
                            >
                                <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.iconButton, favorited && styles.iconButtonActive]}
                                onPress={() => toggleFavorite(product as any)}
                                activeOpacity={0.8}
                            >
                                <Heart size={22} color={favorited ? colors.white : '#1C1C1E'} fill={favorited ? colors.white : 'transparent'} strokeWidth={2.5} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                    {/* Minimalist Pagination */}
                    <View style={styles.paginationConfig}>
                        {(product.images || [product.image]).map((_: any, index: number) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === activeIndex && styles.activeDot
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Details Section */}
                <View style={styles.detailsContainer}>
                    <View style={styles.titleSection}>
                        <View style={styles.titleHeader}>
                            <Text style={styles.categoryBadge}>{product.category ? product.category.toUpperCase() : 'PREMIUM'}</Text>
                            <TouchableOpacity
                                style={styles.ratingRow}
                                onPress={() => navigation.navigate('ProductReviews')}
                            >
                                <Star size={14} color="#FFD700" fill="#FFD700" />
                                <Text style={styles.ratingText}>{product.rating} (128 Reviews)</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.price}>{product.price}</Text>

                        <Text style={styles.description}>
                            Engineered for perfection, this piece fuses contemporary aesthetics with uncompromising comfort. Crafted from premium, sustainably sourced fibers for a luxurious feel that transcends seasons.
                        </Text>

                        <TouchableOpacity
                            style={styles.compareBtn}
                            onPress={() => navigation.navigate('CompareProducts')}
                        >
                            <GitCompare size={18} color="#1C1C1E" style={{ marginRight: 8 }} />
                            <Text style={styles.compareBtnText}>Compare with other items</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Configurations: Size & Color */}
                    <View style={styles.configSection}>
                        <View style={styles.configRow}>
                            <Text style={styles.sectionTitle}>Size</Text>
                            <TouchableOpacity><Text style={styles.sizeGuideText}>Size Guide</Text></TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizeContainer}>
                            {SIZES.map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.sizeChip,
                                        selectedSize === size && styles.activeSizeChip
                                    ]}
                                    onPress={() => setSelectedSize(size)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[
                                        styles.sizeText,
                                        selectedSize === size && styles.activeSizeText
                                    ]}>
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Color</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorContainer}>
                            {COLORS.map((color) => (
                                <TouchableOpacity
                                    key={color.name}
                                    style={[
                                        styles.colorCircleWrapper,
                                        selectedColor.name === color.name && styles.activeColorCircleWrapper
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.colorCircle, { backgroundColor: color.code }]} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Extra bottom padding to account for the massive floating bottom bar */}
                    <View style={{ height: 130 }} />
                </View>
            </ScrollView>

            {/* Premium Floating Bottom Action Bar */}
            <View style={styles.bottomBarWrapper}>
                <View style={styles.bottomBar}>

                    <View style={styles.quantityWidget}>
                        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                            <Minus size={18} color="#1C1C1E" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{quantity}</Text>
                        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
                            <Plus size={18} color="#1C1C1E" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() => navigation.navigate('Cart')}
                        activeOpacity={0.9}
                    >
                        <ShoppingCart size={20} color={colors.white} style={{ marginRight: 8 }} />
                        <Text style={styles.buyButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    carouselContainer: {
        position: 'relative',
        width: width,
        height: height * 0.6,
        backgroundColor: '#F5F5F5',
    },
    imageWrapper: {
        width: width,
        height: height * 0.6,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageGradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.01)', // To simulate fade
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: -20 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    headerSafeArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    floatingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    iconButtonActive: {
        backgroundColor: '#FF3B30',
    },
    paginationConfig: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 18,
        backgroundColor: '#FFFFFF',
    },
    detailsContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
        paddingTop: 32,
        paddingHorizontal: 24,
        minHeight: height * 0.5,
    },
    titleSection: {
        marginBottom: 32,
    },
    titleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryBadge: {
        fontSize: 12,
        fontWeight: '800',
        color: '#A0A0A0',
        letterSpacing: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    productName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1C1C1E',
        letterSpacing: -1,
        lineHeight: 38,
        marginBottom: 8,
    },
    price: {
        fontSize: 26,
        fontWeight: '900',
        color: '#FF6B4A',
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        color: '#707070',
        lineHeight: 24,
        fontWeight: '400',
    },
    configSection: {
        marginBottom: 16,
    },
    configRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    sizeGuideText: {
        fontSize: 14,
        color: '#FF6B4A',
        fontWeight: '600',
    },
    sizeContainer: {
        gap: 12,
        paddingRight: 24,
    },
    sizeChip: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    activeSizeChip: {
        backgroundColor: '#1C1C1E',
        borderColor: '#1C1C1E',
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    sizeText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    activeSizeText: {
        color: '#FFFFFF',
    },
    colorContainer: {
        gap: 16,
        paddingRight: 24,
        marginTop: 16,
    },
    colorCircleWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeColorCircleWrapper: {
        borderColor: '#1C1C1E',
    },
    colorCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    bottomBarWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 24,
        paddingHorizontal: 24,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    quantityWidget: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 100,
        padding: 6,
        height: 60,
        width: 130,
        justifyContent: 'space-between',
    },
    qtyBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    qtyText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    buyButton: {
        flex: 1,
        height: 60,
        backgroundColor: '#1C1C1E',
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    buyButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    compareBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    compareBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
    },
});
