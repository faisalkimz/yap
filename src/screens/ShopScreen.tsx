import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    StatusBar,
    FlatList
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChevronLeft, Search, SlidersHorizontal, ArrowRight } from 'lucide-react-native';
import { BottomNav } from '../components/BottomNav';

type Props = NativeStackScreenProps<RootStackParamList, 'Shop'>;

const CATEGORIES = [
    { id: '1', name: 'New Arrivals', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80' },
    { id: '2', name: 'Men', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=80' },
    { id: '3', name: 'Women', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80' },
    { id: '4', name: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
];

const BRANDS = [
    { id: '1', name: 'Zara', logo: 'https://images.unsplash.com/photo-1620808269550-b0b9fa4a2ee6?w=200&q=80' },
    { id: '2', name: 'H&M', logo: 'https://images.unsplash.com/photo-1507204900741-61cfcbccf8f6?w=200&q=80' },
    { id: '3', name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' },
    { id: '4', name: 'Gucci', logo: 'https://images.unsplash.com/photo-1545625413-8b77d61fc239?w=200&q=80' },
];

export const ShopScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Storefront</Text>
                    <View style={{ width: 48 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                    {/* Search & Filter Bar */}
                    <View style={styles.searchContainer}>
                        <TouchableOpacity
                            style={styles.searchBar}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('SearchResults', { query: '' })}
                        >
                            <Search size={20} color="#8E8E93" />
                            <Text style={styles.searchText}>Search items, brands...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('Filters')}>
                            <SlidersHorizontal size={20} color="#FFFFFF" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>

                    {/* Featured Collection Banner */}
                    <TouchableOpacity style={styles.featuredBanner} activeOpacity={0.9}>
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80' }} style={styles.bannerImage} />
                        <View style={styles.bannerOverlay}>
                            <Text style={styles.bannerSubtitle}>NEW COLLECTION</Text>
                            <Text style={styles.bannerTitle}>Summer Essentials</Text>
                            <View style={styles.bannerBtn}>
                                <Text style={styles.bannerBtnText}>Shop Now</Text>
                                <ArrowRight size={16} color="#1C1C1E" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Categories Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Shop by Category</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CategoryListing')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                        {CATEGORIES.map(category => (
                            <TouchableOpacity key={category.id} style={styles.categoryCard} activeOpacity={0.8} onPress={() => navigation.navigate('SubCategory', { categoryId: category.id, categoryName: category.name })}>
                                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                                <View style={styles.categoryGradient} />
                                <Text style={styles.categoryName}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Brands Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Top Brands</Text>
                        <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                    </View>
                    <View style={styles.brandsGrid}>
                        {BRANDS.map(brand => (
                            <TouchableOpacity key={brand.id} style={styles.brandCard} activeOpacity={0.8} onPress={() => navigation.navigate('Brand', { brandId: brand.id, brandName: brand.name })}>
                                <Image source={{ uri: brand.logo }} style={styles.brandLogo} />
                                <Text style={styles.brandName}>{brand.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>
                <BottomNav />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    backButton: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    content: { paddingBottom: 120 },
    searchContainer: { flexDirection: 'row', paddingHorizontal: 24, marginBottom: 24, gap: 12 },
    searchBar: { flex: 1, height: 56, backgroundColor: '#FFFFFF', borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
    searchText: { flex: 1, marginLeft: 12, fontSize: 16, color: '#8E8E93', fontWeight: '500' },
    filterButton: { width: 56, height: 56, backgroundColor: '#1C1C1E', borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#1C1C1E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
    featuredBanner: { marginHorizontal: 24, height: 200, borderRadius: 24, overflow: 'hidden', marginBottom: 32 },
    bannerImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    bannerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', padding: 24, justifyContent: 'center' },
    bannerSubtitle: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 4 },
    bannerTitle: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', letterSpacing: -1, marginBottom: 16 },
    bannerBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100 },
    bannerBtnText: { color: '#1C1C1E', fontWeight: '800', fontSize: 14, marginRight: 8 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16, marginTop: 16 },
    sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1C1C1E' },
    seeAll: { fontSize: 14, fontWeight: '700', color: '#FF6B4A' },
    horizontalList: { paddingHorizontal: 24, gap: 16, paddingRight: 48 },
    categoryCard: { width: 140, height: 180, borderRadius: 20, overflow: 'hidden', marginRight: 16 },
    categoryImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    categoryGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(0,0,0,0.4)' },
    categoryName: { position: 'absolute', bottom: 16, left: 16, right: 16, color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
    brandsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 24, gap: 16, justifyContent: 'space-between' },
    brandCard: { width: '47%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2, marginBottom: 16 },
    brandLogo: { width: 60, height: 60, borderRadius: 30, marginBottom: 12, backgroundColor: '#F5F5F5' },
    brandName: { fontSize: 14, fontWeight: '800', color: '#1C1C1E' }
});
