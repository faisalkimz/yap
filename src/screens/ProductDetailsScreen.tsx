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
import { ChevronLeft, Heart, ShoppingCart, Star, Minus, Plus, GitCompare, MoveRight } from 'lucide-react-native';
import { useFavorites } from '../context/FavoritesContext';

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
    const favorited = isFavorite(product.id);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

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
                            <ChevronLeft size={28} color="#1C1C1E" />
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
                            <Star size={14} color="#1C1C1E" fill="#1C1C1E" />
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
                        <GitCompare size={20} color="#1C1C1E" strokeWidth={1} />
                        <Text style={styles.compareText}>Compare with other pieces</Text>
                        <MoveRight size={16} color="#8E8E93" />
                    </TouchableOpacity>

                    <View style={{ height: 140 }} />
                </View>
            </ScrollView>

            {/* Action Bar */}
            <View style={styles.actionBar}>
                <View style={styles.quantity}>
                    <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyAction}>
                        <Minus size={20} color="#1C1C1E" strokeWidth={1} />
                    </TouchableOpacity>
                    <Text style={styles.qtyVal}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyAction}>
                        <Plus size={20} color="#1C1C1E" strokeWidth={1} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Text style={styles.addBtnText}>ADD TO COLLECTION</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    showcase: { height: height * 0.65, backgroundColor: '#F9F9F9' },
    fullImage: { width: width, height: '100%', resizeMode: 'cover' },
    navHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 0 : 40 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    favBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    pager: { position: 'absolute', bottom: 40, alignSelf: 'center', flexDirection: 'row', gap: 8 },
    pagerDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.2)' },
    pagerActive: { width: 24, backgroundColor: '#1C1C1E' },

    content: { paddingHorizontal: 32, paddingTop: 40 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    collectionText: { fontSize: 10, fontWeight: '900', color: '#8E8E93', letterSpacing: 2 },
    ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    ratingText: { fontSize: 13, fontWeight: '800', color: '#1C1C1E' },

    productTitle: { fontSize: 36, fontWeight: '400', color: '#1C1C1E', fontFamily: typography.display, letterSpacing: -1, lineHeight: 40, marginBottom: 8 },
    productPrice: { fontSize: 24, fontWeight: '900', color: '#1C1C1E', marginBottom: 24 },
    description: { fontSize: 16, color: '#444', lineHeight: 26, fontWeight: '400', marginBottom: 40 },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 40 },

    selection: { gap: 40 },
    selectionGroup: {},
    selectionLabel: { fontSize: 10, fontWeight: '900', color: '#8E8E93', letterSpacing: 2, marginBottom: 20 },
    sizeGrid: { flexDirection: 'row', gap: 12 },
    sizeBox: { width: 56, height: 56, borderRadius: 2, borderWidth: 1, borderColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
    sizeBoxActive: { backgroundColor: '#1C1C1E', borderColor: '#1C1C1E' },
    sizeText: { fontSize: 15, fontWeight: '600', color: '#1C1C1E' },
    sizeTextActive: { color: '#FFFFFF' },

    colorRow: { flexDirection: 'row', gap: 16 },
    colorRing: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
    colorRingActive: { borderColor: '#1C1C1E' },
    colorDot: { width: 28, height: 28, borderRadius: 14 },

    compareLink: { flexDirection: 'row', alignItems: 'center', marginTop: 60, gap: 12, paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
    compareText: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1C1C1E' },

    actionBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, paddingTop: 20, flexDirection: 'row', gap: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
    quantity: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 2, height: 64, paddingHorizontal: 12 },
    qtyAction: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    qtyVal: { paddingHorizontal: 16, fontSize: 18, fontWeight: '800', color: '#1C1C1E' },
    addBtn: { flex: 1, backgroundColor: '#1C1C1E', borderRadius: 2, justifyContent: 'center', alignItems: 'center' },
    addBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900', letterSpacing: 1.5 }
});
