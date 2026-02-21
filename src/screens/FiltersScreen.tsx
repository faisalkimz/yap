import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Platform,
    StatusBar,
    Dimensions
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ChevronLeft, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Filters'>;

const SORT_OPTIONS = ['Recommended', 'Newest', 'Lowest Price', 'Highest Price', 'Top Rated'];
const CATEGORIES = ['All', 'Clothing', 'Shoes', 'Accessories', 'Activewear', 'Loungewear'];
const COLORS = [
    { name: 'Black', hex: '#1C1C1E' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Red', hex: '#FF6B4A' },
    { name: 'Blue', hex: '#4A90E2' },
    { name: 'Green', hex: '#50E3C2' },
    { name: 'Sand', hex: '#E4D5C7' }
];

export const FiltersScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['Clothing']);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const toggleCategory = (cat: string) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    const clearAll = () => {
        setSelectedSort(SORT_OPTIONS[0]);
        setSelectedCategories([]);
        setSelectedColor(null);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Filters</Text>
                    <TouchableOpacity
                        style={styles.clearBtn}
                        onPress={clearAll}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.clearBtnText}>Clear</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                    {/* Sort By */}
                    <Text style={styles.sectionTitle}>Sort By</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                        {SORT_OPTIONS.map(option => (
                            <TouchableOpacity
                                key={option}
                                style={[styles.chip, selectedSort === option && styles.chipActive]}
                                onPress={() => setSelectedSort(option)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.chipText, selectedSort === option && styles.chipTextActive]}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Price Range (Mock visual) */}
                    <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Price Range</Text>
                    <View style={styles.priceContainer}>
                        <View style={styles.priceInputRow}>
                            <View style={styles.priceInput}>
                                <Text style={styles.priceLabel}>Min Price</Text>
                                <Text style={styles.priceValue}>GX 0</Text>
                            </View>
                            <View style={styles.priceDivider} />
                            <View style={styles.priceInput}>
                                <Text style={styles.priceLabel}>Max Price</Text>
                                <Text style={styles.priceValue}>GX 15,000</Text>
                            </View>
                        </View>
                    </View>

                    {/* Categories */}
                    <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Categories</Text>
                    <View style={styles.wrapList}>
                        {CATEGORIES.map(cat => {
                            const isActive = selectedCategories.includes(cat);
                            return (
                                <TouchableOpacity
                                    key={cat}
                                    style={[styles.chip, isActive && styles.chipActive]}
                                    onPress={() => toggleCategory(cat)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{cat}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {/* Colors */}
                    <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Colors</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorList}>
                        {COLORS.map(color => (
                            <TouchableOpacity
                                key={color.name}
                                style={[
                                    styles.colorWrapper,
                                    selectedColor === color.hex && styles.colorWrapperActive
                                ]}
                                onPress={() => setSelectedColor(color.hex)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.colorCircle, { backgroundColor: color.hex, borderWidth: color.hex === '#FFFFFF' ? 2 : 0, borderColor: '#F0F0F0' }]} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </ScrollView>

                {/* Apply Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.goBack()} activeOpacity={0.9}>
                        <Text style={styles.applyBtnText}>Apply Filters</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
    iconButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 22 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    clearBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, backgroundColor: '#FFF0F0' },
    clearBtnText: { color: '#FF3B30', fontSize: 14, fontWeight: '800' },
    content: { paddingHorizontal: 24, paddingVertical: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1C1C1E', marginBottom: 16, letterSpacing: -0.2 },
    horizontalList: { gap: 12, paddingRight: 24 },
    wrapList: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    chip: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100, backgroundColor: '#F5F5F5', borderWidth: 2, borderColor: 'transparent' },
    chipActive: { backgroundColor: '#1C1C1E', borderColor: '#1C1C1E', shadowColor: '#1C1C1E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 },
    chipText: { fontSize: 14, fontWeight: '700', color: '#8E8E93' },
    chipTextActive: { color: '#FFFFFF' },
    priceContainer: {},
    priceInputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    priceInput: { flex: 1, backgroundColor: '#F5F5F5', padding: 16, borderRadius: 16 },
    priceDivider: { width: 16, height: 2, backgroundColor: '#E0E0E0', marginHorizontal: 12 },
    priceLabel: { fontSize: 12, color: '#8E8E93', fontWeight: '600', marginBottom: 4 },
    priceValue: { fontSize: 16, color: '#1C1C1E', fontWeight: '800' },
    colorList: { gap: 16, paddingRight: 24 },
    colorWrapper: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
    colorWrapperActive: { borderColor: '#1C1C1E' },
    colorCircle: { width: 36, height: 36, borderRadius: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 2 },
    footer: { paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 34 : 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F5F5F5' },
    applyBtn: { backgroundColor: '#1C1C1E', height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#1C1C1E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 15, elevation: 12 },
    applyBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
});
