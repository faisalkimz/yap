import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    StatusBar,
    FlatList
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChevronLeft, Search, SlidersHorizontal, Heart, Star, X } from 'lucide-react-native';
import { useFavorites } from '../context/FavoritesContext';

type Props = NativeStackScreenProps<RootStackParamList, 'SearchResults'>;

const PRODUCTS = [
    { id: '1', name: 'Abracadabra Shirt', type: 'Unisex', price: 'GX 4000', rating: '4.8', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
    { id: '2', name: 'Panther Jacket', type: 'Outwear', price: 'GX 2500', rating: '4.9', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&q=80' },
    { id: '3', name: 'White Sneakers', type: 'Shoes', price: 'GX 3500', rating: '4.5', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { id: '4', name: 'Denim Jeans', type: 'Pants', price: 'GX 2800', rating: '4.6', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80' },
];

export const SearchResultsScreen: React.FC<Props> = ({ navigation, route }) => {
    const defaultQuery = route.params?.query || '';
    const [searchQuery, setSearchQuery] = useState(defaultQuery);
    const { isFavorite, toggleFavorite } = useFavorites();

    const [results, setResults] = useState(PRODUCTS); // MOCK FILTERING

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
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                {/* Search Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>

                    <View style={styles.searchBar}>
                        <Search size={20} color="#8E8E93" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor="#A0A0A0"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus={true}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <X size={20} color="#8E8E93" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Filters')}
                        activeOpacity={0.8}
                    >
                        <SlidersHorizontal size={20} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>

                {/* Search Meta Info */}
                <View style={styles.searchMeta}>
                    <Text style={styles.resultsTitle}>
                        {searchQuery.length > 0 ? `Results for "${searchQuery}"` : 'Recommended for you'}
                    </Text>
                    <Text style={styles.resultsCount}>{results.length} items found</Text>
                </View>

                {/* Results Grid */}
                <View style={styles.productsGrid}>
                    {results.length > 0 ? (
                        <FlatList
                            data={results}
                            renderItem={renderProduct}
                            numColumns={2}
                            keyExtractor={item => item.id}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            contentContainerStyle={{ paddingBottom: 60, paddingTop: 16 }}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <View style={styles.emptyState}>
                            <Search size={64} color="#E0E0E0" strokeWidth={1.5} />
                            <Text style={styles.emptyTitle}>No results found</Text>
                            <Text style={styles.emptySub}>Try searching with different keywords or filters.</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
    iconButton: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    searchBar: { flex: 1, height: 48, backgroundColor: '#FFFFFF', borderRadius: 24, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
    searchInput: { flex: 1, marginLeft: 12, marginRight: 8, fontSize: 16, fontWeight: '500', color: '#1C1C1E', height: '100%' },
    searchMeta: { paddingHorizontal: 24, marginBottom: 8 },
    resultsTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5, marginBottom: 4 },
    resultsCount: { fontSize: 14, color: '#8E8E93', fontWeight: '500' },
    productsGrid: { flex: 1, paddingHorizontal: 24 },
    productCard: { flex: 1, marginBottom: 32 },
    imageContainer: { width: '100%', height: 220, borderRadius: 24, overflow: 'hidden', marginBottom: 16, backgroundColor: '#F0F0F0', position: 'relative' },
    productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    favoriteButton: { position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
    ratingBadge: { position: 'absolute', bottom: 12, left: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.95)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
    ratingText: { marginLeft: 4, fontSize: 13, fontWeight: '800', color: '#1C1C1E' },
    productInfo: { paddingHorizontal: 4 },
    productName: { fontSize: 16, fontWeight: '800', color: '#1C1C1E', marginBottom: 4, letterSpacing: -0.2 },
    productPrice: { fontSize: 16, fontWeight: '900', color: '#FF6B4A' },
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
    emptyTitle: { fontSize: 20, fontWeight: '800', color: '#1C1C1E', marginTop: 16, marginBottom: 8 },
    emptySub: { fontSize: 15, color: '#8E8E93', textAlign: 'center', paddingHorizontal: 40, lineHeight: 22 },
});
