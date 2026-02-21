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
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, Heart, ShoppingCart, Star, Minus, Plus, GitCompare, MoveRight } from 'lucide-react-native';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS = [
    { name: 'Onyx', code: '#1C1C1E' },
    { name: 'Parchment', code: '#F5F5F5' },
    { name: 'Deep Moss', code: '#3E423A' },
];

export const ProductDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
    const { product } = route.params;
    const { isFavorite, toggleFavorite } = useFavorites();
    const { addToCart, addToRecentlyViewed, recentlyViewed } = useCart();

    const favorited = isFavorite(product.id);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    React.useEffect(() => {
        addToRecentlyViewed(product as any);
    }, [product]);

    const handleAddToCart = () => {
        addToCart(product as any, quantity, selectedSize, selectedColor.name);
    };

    const renderRecentItem = (item: any) => (
        <TouchableOpacity
            key={item.id}
            style={styles.recentItem}
            onPress={() => navigation.push('ProductDetails', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.recentImg} />
            <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.recentPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Visual Showcase */}
                <View style={styles.showcase}>
                    <FlatList
                        data={product.images || [product.image]}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={({ nativeEvent }) => {
                            const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
                            if (slide !== activeIndex) setActiveIndex(slide);
                        }}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.fullImage} />
                        )}
                    />

                    <SafeAreaView style={styles.navHeader}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                            <ChevronLeft size={28} color={colors.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(product as any)}>
                            <Heart size={24} color={favorited ? colors.accent : colors.secondary} fill={favorited ? colors.accent : 'transparent'} />
                        </TouchableOpacity>
                    </SafeAreaView>

                    <View style={styles.pager}>
                        {(product.images || [product.image]).map((_: any, idx: number) => (
                            <View key={idx} style={[styles.pagerDot, idx === activeIndex && styles.pagerActive]} />
                        ))}
                    </View>
                </View>

                {/* Detail Section */}
                <View style={styles.content}>
                    <View style={styles.metaRow}>
                        <Text style={styles.collectionText}>{product.category ? product.category.toUpperCase() : 'SIGNATURE COLLECTION'}</Text>
                        <TouchableOpacity style={styles.ratingBox} onPress={() => navigation.navigate('ProductReviews')}>
                            <Star size={14} color={colors.secondary} fill={colors.secondary} />
                            <Text style={styles.ratingText}>{product.rating}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.productTitle}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>

                    <Text style={styles.description}>
                        Crafted for the discerning individual. This piece represents the pinnacle of our design philosophy—merging timeless silhouettes with technical excellence. Every seam is a testament to the artisan's touch.
                    </Text>

                    <View style={styles.divider} />

                    {/* Selection Controls */}
                    <View style={styles.selection}>
                        <View style={styles.selectionGroup}>
                            <Text style={styles.selectionLabel}>SELECT SIZE</Text>
                            <View style={styles.sizeGrid}>
                                {SIZES.map(size => (
                                    <TouchableOpacity
                                        key={size}
                                        style={[styles.sizeBox, selectedSize === size && styles.sizeBoxActive]}
                                        onPress={() => setSelectedSize(size)}
                                    >
                                        <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.selectionGroup}>
                            <Text style={styles.selectionLabel}>FINISH</Text>
                            <View style={styles.colorRow}>
                                {COLORS.map(color => (
                                    <TouchableOpacity
                                        key={color.name}
                                        style={[styles.colorRing, selectedColor.name === color.name && styles.colorRingActive]}
                                        onPress={() => setSelectedColor(color)}
                                    >
                                        <View style={[styles.colorDot, { backgroundColor: color.code }]} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.compareLink}
                        onPress={() => navigation.navigate('CompareProducts')}
                    >
                        <GitCompare size={20} color={colors.secondary} strokeWidth={1} />
                        <Text style={styles.compareText}>Compare with other pieces</Text>
                        <MoveRight size={16} color={colors.muted} />
                    </TouchableOpacity>

                    {/* Recommendations */}
                    <View style={styles.recommendSection}>
                        <Text style={styles.selectionLabel}>YOU MAY ALSO LIKE</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {RECENTLY_VIEWED_FALLBACK.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.recentItem}
                                    onPress={() => navigation.push('ProductDetails', { product: item })}
                                >
                                    <Image source={{ uri: item.image }} style={styles.recentImg} />
                                    <Text style={styles.recentName} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.recentPrice}>{item.price}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Recently Viewed */}
                    {recentlyViewed.length > 1 && (
                        <View style={styles.recentSection}>
                            <Text style={[styles.selectionLabel, { marginBottom: 24 }]}>MORE TO EXPLORE</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {recentlyViewed.filter(i => i.id !== product.id).map(renderRecentItem)}
                            </ScrollView>
                        </View>
                    )}

                    <View style={{ height: 160 }} />
                </View>
            </ScrollView>

            {/* Action Bar */}
            <View style={styles.actionBar}>
                <View style={styles.quantity}>
                    <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyAction}>
                        <Minus size={20} color={colors.secondary} strokeWidth={1} />
                    </TouchableOpacity>
                    <Text style={styles.qtyVal}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyAction}>
                        <Plus size={20} color={colors.secondary} strokeWidth={1} />
                    </TouchableOpacity>
                </View>

                <Button
                    title="ADD TO COLLECTION"
                    onPress={handleAddToCart}
                    style={styles.addBtn}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    showcase: { height: height * 0.65, backgroundColor: colors.lightGray },
    fullImage: { width: width, height: '100%', resizeMode: 'cover' },
    navHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 0 : 40 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    favBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    pager: { position: 'absolute', bottom: 40, alignSelf: 'center', flexDirection: 'row', gap: 8 },
    pagerDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.2)' },
    pagerActive: { width: 24, backgroundColor: colors.secondary },

    content: { paddingHorizontal: 32, paddingTop: 40 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    collectionText: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 2 },
    ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    ratingText: { fontSize: 13, fontWeight: '800', color: colors.secondary },

    productTitle: { fontSize: 36, fontWeight: '400', color: colors.secondary, fontFamily: typography.display, letterSpacing: -1, lineHeight: 40, marginBottom: 8 },
    productPrice: { fontSize: 24, fontWeight: '900', color: colors.secondary, marginBottom: 24 },
    description: { fontSize: 16, color: '#444', lineHeight: 26, fontWeight: '400', marginBottom: 40 },
    divider: { height: 1, backgroundColor: colors.border, marginBottom: 40 },

    selection: { gap: 40 },
    selectionGroup: {},
    selectionLabel: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 2, marginBottom: 20 },
    sizeGrid: { flexDirection: 'row', gap: 12 },
    sizeBox: { width: 56, height: 56, borderRadius: 2, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
    sizeBoxActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
    sizeText: { fontSize: 15, fontWeight: '600', color: colors.secondary },
    sizeTextActive: { color: colors.white },

    colorRow: { flexDirection: 'row', gap: 16 },
    colorRing: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
    colorRingActive: { borderColor: colors.secondary },
    colorDot: { width: 28, height: 28, borderRadius: 14 },

    compareLink: { flexDirection: 'row', alignItems: 'center', marginTop: 60, gap: 12, paddingVertical: 20, borderTopWidth: 1, borderTopColor: colors.border },
    compareText: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.secondary },

    actionBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, paddingTop: 20, flexDirection: 'row', gap: 16, borderTopWidth: 1, borderTopColor: colors.border },
    quantity: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.lightGray, borderRadius: 2, height: 64, paddingHorizontal: 12 },
    qtyAction: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    qtyVal: { paddingHorizontal: 16, fontSize: 18, fontWeight: '800', color: colors.secondary },
    addBtn: { flex: 1, backgroundColor: colors.secondary, borderRadius: 2, justifyContent: 'center', alignItems: 'center' },
    addBtnText: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 1.5 },

    recentSection: { marginTop: 60 },
    recentItem: { width: 140, marginRight: 20 },
    recentImg: { width: 140, height: 180, borderRadius: 2, backgroundColor: colors.lightGray, marginBottom: 12 },
    recentName: { fontSize: 13, fontWeight: '700', color: colors.secondary, marginBottom: 4 },
    recentPrice: { fontSize: 13, fontWeight: '900', color: colors.secondary },
    recommendSection: { marginTop: 60, marginBottom: 20 },
});

const RECENTLY_VIEWED_FALLBACK = [
    { id: '101', name: 'Alabaster Silk Dress', price: '£890.00', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80', description: 'Grace in every thread.' },
    { id: '102', name: 'Ivory Tailored Trousers', price: '£450.00', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80', description: 'Modern silhouette.' },
    { id: '103', name: 'Cashmere Overcoat', price: '£1,200.00', image: 'https://images.unsplash.com/photo-1539533377285-b8bd82006351?w=400&q=80', description: 'Ultimate warmth.' }
];
