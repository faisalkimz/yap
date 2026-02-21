import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    StatusBar,
    FlatList,
    Dimensions
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChevronLeft, SlidersHorizontal, Heart, Star, Share2 } from 'lucide-react-native';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Brand'>;

const PRODUCTS = [
    { id: '1', name: 'Premium Coat', type: 'Outerwear', price: 'GX 8000', rating: '5.0', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&q=80' },
    { id: '2', name: 'Classic Suit', type: 'Formal', price: 'GX 12500', rating: '4.9', image: 'https://images.unsplash.com/photo-1593030761757-71fae46af504?w=500&q=80' },
    { id: '3', name: 'Leather Bag', type: 'Accessories', price: 'GX 4500', rating: '4.8', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80' },
    { id: '4', name: 'Silk Scarf', type: 'Accessories', price: 'GX 1200', rating: '4.7', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80' },
];

export const BrandScreen: React.FC<Props> = ({ navigation, route }) => {
    const { brandName } = route.params;
    const { isFavorite, toggleFavorite } = useFavorites();

    const renderProduct = ({ item, index }: { item: any, index: number }) => {
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
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item)}
                        activeOpacity={0.8}
                    >
                        <Heart size={18} color={favorited ? '#FFFFFF' : '#1C1C1E'} fill={favorited ? '#FFFFFF' : 'transparent'} />
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
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Brand Hero Banner */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80' }}
                        style={styles.heroImage}
                    />
                    <View style={styles.heroOverlay} />

                    {/* Header Controls */}
                    <SafeAreaView style={styles.headerSafeArea}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
                                <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
                                <Share2 size={20} color="#1C1C1E" strokeWidth={2.5} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                    {/* Brand Info */}
                    <View style={styles.brandInfoAbsolute}>
                        <View style={styles.brandLogoContainer}>
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1545625413-8b77d61fc239?w=200&q=80' }} style={styles.brandLogo} />
                        </View>
                        <Text style={styles.brandTitle}>{brandName}</Text>
                        <Text style={styles.brandSubtitle}>24K Followers • Official Store</Text>
                        <TouchableOpacity style={styles.followBtn}>
                            <Text style={styles.followBtnText}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content Area */}
                <View style={styles.contentContainer}>
                    <View style={styles.filterRow}>
                        <Text style={styles.resultsText}>142 Results</Text>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            onPress={() => navigation.navigate('Filters')}
                        >
                            <Text style={styles.filterBtnText}>Sort & Filter</Text>
                            <SlidersHorizontal size={14} color="#1C1C1E" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={PRODUCTS}
                        renderItem={renderProduct}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: 60, paddingTop: 16 }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false} // Since it's inside a ScrollView
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    heroContainer: { width: width, height: 400, position: 'relative' },
    heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.45)' },
    headerSafeArea: { position: 'absolute', top: 0, left: 0, right: 0, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { paddingHorizontal: 24, paddingTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
    brandInfoAbsolute: { position: 'absolute', bottom: 40, left: 24, right: 24, alignItems: 'center' },
    brandLogoContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFFFFF', padding: 4, marginBottom: 16 },
    brandLogo: { width: '100%', height: '100%', borderRadius: 36 },
    brandTitle: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', letterSpacing: -1, marginBottom: 4 },
    brandSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: 16 },
    followBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 100 },
    followBtnText: { color: '#1C1C1E', fontWeight: '800', fontSize: 15 },
    contentContainer: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -32, paddingTop: 24, paddingHorizontal: 24, minHeight: 500 },
    filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    resultsText: { fontSize: 14, fontWeight: '700', color: '#8E8E93' },
    filterBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, gap: 8 },
    filterBtnText: { fontSize: 13, fontWeight: '800', color: '#1C1C1E' },
    productCard: { flex: 1, marginBottom: 32 },
    imageContainer: { width: '100%', height: 220, borderRadius: 24, overflow: 'hidden', marginBottom: 16, backgroundColor: '#F0F0F0', position: 'relative' },
    productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    favoriteButton: { position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
    ratingBadge: { position: 'absolute', bottom: 12, left: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.95)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
    ratingText: { marginLeft: 4, fontSize: 13, fontWeight: '800', color: '#1C1C1E' },
    productInfo: { paddingHorizontal: 4 },
    productName: { fontSize: 16, fontWeight: '800', color: '#1C1C1E', marginBottom: 4, letterSpacing: -0.2 },
    productPrice: { fontSize: 16, fontWeight: '900', color: '#FF6B4A' },
});
