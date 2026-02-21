import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, Dimensions, StatusBar, Platform } from 'react-native';
import { Heart, Star, ChevronLeft } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFavorites } from '../context/FavoritesContext';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

import { BottomNav } from '../components/BottomNav';

export const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
    const { favorites, toggleFavorite } = useFavorites();

    const renderProduct = ({ item, index }: { item: any; index: number }) => {
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
                        <Heart size={18} color="#FFFFFF" fill="#FFFFFF" />
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
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.title}>Your Likes</Text>
                        <Text style={styles.subtitle}>{favorites.length} {favorites.length === 1 ? 'item' : 'items'}</Text>
                    </View>
                </View>

                {favorites.length === 0 ? (
                    <View style={styles.content}>
                        <Heart size={80} color="#E0E0E0" strokeWidth={1} style={{ marginBottom: 24 }} />
                        <Text style={styles.placeholder}>Nothing saved yet</Text>
                        <Text style={styles.placeholderSub}>Items you like will appear here</Text>
                    </View>
                ) : (
                    <View style={styles.productsGrid}>
                        <FlatList
                            data={favorites}
                            renderItem={renderProduct}
                            numColumns={2}
                            keyExtractor={item => item.id}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}

                <BottomNav />
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1C1C1E',
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#8E8E93',
        marginTop: 4,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    placeholder: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1C1C1E',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    placeholderSub: {
        fontSize: 16,
        color: '#A0A0A0',
        fontWeight: '500',
        textAlign: 'center',
    },
    productsGrid: {
        flex: 1,
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
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FF6B4A',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
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
});
