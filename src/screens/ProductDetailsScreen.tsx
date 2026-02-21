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
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { ChevronLeft, Heart, ShoppingCart, Star } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const SIZES = ['M', 'S', 'L', 'XXL'];
const COLORS = [
    { name: 'Brown', code: '#8D6E63' },
    { name: 'Black', code: '#212121' },
    { name: 'Blue', code: '#1976D2' },
];

export const ProductDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
    const { product } = route.params;
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Product Details</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <Heart size={20} color={colors.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Main Product Image Carousel */}
                    <View style={styles.carouselContainer}>
                        <FlatList
                            data={product.images || [product.image]}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(_, index) => index.toString()}
                            onScroll={({ nativeEvent }) => {
                                const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
                                if (slide !== activeIndex) {
                                    setActiveIndex(slide);
                                }
                            }}
                            renderItem={({ item }) => (
                                <View style={styles.imageWrapper}>
                                    <Image source={{ uri: item }} style={styles.productImage} />
                                </View>
                            )}
                        />

                        {/* Pagination Dots */}
                        <View style={styles.pagination}>
                            {(product.images || [product.image]).map((_, index) => (
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



                    <View style={styles.detailsContainer}>
                        <View style={styles.titleRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productType}>Unisex Wear</Text>
                            </View>
                            <Text style={styles.price}>{product.price.replace('$', 'GX ')}</Text>
                        </View>

                        <View style={styles.ratingRow}>
                            <Star size={16} color="#FFD700" fill="#FFD700" />
                            <Text style={styles.rating}>{product.rating}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Details</Text>
                        <Text style={styles.description}>
                            Crafted with attention to detail and designed for everyday confidence, this item blends comfort, style, and versatility. Made from high-quality fabric, it offers a smooth feel on the skin while maintaining a structured... <Text style={styles.readMore}>Read more...</Text>
                        </Text>

                        <Text style={styles.sectionTitle}>Product Size</Text>
                        <View style={styles.sizeContainer}>
                            {SIZES.map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.sizeChip,
                                        selectedSize === size && styles.activeSizeChip
                                    ]}
                                    onPress={() => setSelectedSize(size)}
                                >
                                    <Text style={[
                                        styles.sizeText,
                                        selectedSize === size && styles.activeSizeText
                                    ]}>
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.sectionTitle}>Select Color</Text>
                        <View style={styles.colorContainer}>
                            {COLORS.map((color) => (
                                <TouchableOpacity
                                    key={color.name}
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: color.code },
                                        selectedColor.name === color.name && styles.activeColorCircle
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                >
                                    {selectedColor.name === color.name && (
                                        <View style={styles.activeColorDot} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Action Bar */}
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.cartButton}>
                        <ShoppingCart size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Text style={styles.buyButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>

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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: typography.weightBold,
        color: colors.text,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    carouselContainer: {
        marginBottom: 24,
    },
    imageWrapper: {
        width: width,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    imageContainer: { // Keeping legacy style just in case, but overridden mostly
        width: width - 48,
        height: 400,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 24,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 24,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },

    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    pagination: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 20,
        height: 6,
        backgroundColor: colors.primary,
    },
    detailsContainer: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    productName: {
        fontSize: 24,
        fontWeight: typography.weightBold,
        color: colors.text,
        marginBottom: 4,
    },
    productType: {
        fontSize: 14,
        color: colors.muted,
    },
    price: {
        fontSize: 22,
        fontWeight: typography.weightBold,
        color: colors.text,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    rating: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: typography.weightBold,
        color: colors.text,
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: colors.muted,
        lineHeight: 22,
        marginBottom: 24,
    },
    readMore: {
        color: colors.primary,
        fontWeight: '600',
    },
    sizeContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    sizeChip: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    activeSizeChip: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    sizeText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    activeSizeText: {
        color: colors.white,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    cartButton: {
        width: 56,
        height: 56,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: '#FFF5F2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    buyButton: {
        flex: 1,
        height: 56,
        backgroundColor: colors.primary,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    buyButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    colorContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeColorCircle: {
        borderWidth: 2,
        borderColor: colors.text,
    },
    activeColorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.white,
    },
});

