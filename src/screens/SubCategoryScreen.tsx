import React, { useState } from 'react';
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
    FlatList
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChevronLeft, SlidersHorizontal, Heart, Star } from 'lucide-react-native';
import { useFavorites } from '../context/FavoritesContext';

type Props = NativeStackScreenProps<RootStackParamList, 'SubCategory'>;

const PRODUCTS = [
    { id: '1', name: 'Abracadabra Shirt', type: 'Unisex Wear', price: 'GX 4000', rating: '4.8', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
    { id: '2', name: 'Panther Jacket', type: 'Unisex Wear', price: 'GX 2500', rating: '4.9', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&q=80' },
    { id: '3', name: 'Elite Shoe', type: 'Men Wear', price: 'GX 6500', rating: '4.5', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { id: '4', name: 'Samba Fitz', type: 'Men Wear', price: 'GX 3400', rating: '4.7', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80' },
];

export const SubCategoryScreen: React.FC<Props> = ({ navigation, route }) => {
    const { categoryName } = route.params;
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
                    <Text style={styles.productType} numberOfLines={1}>{item.type}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{categoryName}</Text>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Filters')}
                        activeOpacity={0.8}
                    >
                        <SlidersHorizontal size={20} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>

                <View style={styles.productsGrid}>
                    <FlatList
                        data={PRODUCTS}
                        renderItem={renderProduct}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: 60, paddingTop: 16 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    iconButton: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    productsGrid: { flex: 1, paddingHorizontal: 24 },
    productCard: { flex: 1, marginBottom: 32 },
    imageContainer: { width: '100%', height: 220, borderRadius: 24, overflow: 'hidden', marginBottom: 16, backgroundColor: '#F0F0F0', position: 'relative' },
    productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    favoriteButton: { position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
    ratingBadge: { position: 'absolute', bottom: 12, left: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.95)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
    ratingText: { marginLeft: 4, fontSize: 13, fontWeight: '800', color: '#1C1C1E' },
    productInfo: { paddingHorizontal: 4 },
    productName: { fontSize: 16, fontWeight: '800', color: '#1C1C1E', marginBottom: 4, letterSpacing: -0.2 },
    productType: { fontSize: 13, color: '#8E8E93', fontWeight: '500', marginBottom: 8 },
    productPrice: { fontSize: 16, fontWeight: '900', color: '#FF6B4A' },
});
