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
    Dimensions
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { typography } from '../theme/typography';
import { ChevronLeft, MoveRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryListing'>;

const ALL_CATEGORIES = [
    { id: '1', name: 'New Archive', sub: 'Seasonal Selections', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80' },
    { id: '2', name: 'Menswear', sub: 'Tailored silhouettes', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80' },
    { id: '3', name: 'Womenswear', sub: 'Ethereal craft', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80' },
    { id: '4', name: 'Accessories', sub: 'Essential details', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80' },
    { id: '5', name: 'Footwear', sub: 'Architectural foundations', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
    { id: '6', name: 'Leather Goods', sub: 'Crafted endurance', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80' },
];

export const CategoryListingScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={28} color="#1C1C1E" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>CATEGORIES</Text>
                    <View style={{ width: 44 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                    <View style={styles.intro}>
                        <Text style={styles.title}>The Archive</Text>
                        <Text style={styles.sub}>Explore our meticulously organized collections of human-centric design.</Text>
                    </View>

                    <View style={styles.grid}>
                        {ALL_CATEGORIES.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={styles.card}
                                activeOpacity={0.9}
                                onPress={() => navigation.navigate('SubCategory', { categoryId: category.id, categoryName: category.name })}
                            >
                                <Image source={{ uri: category.image }} style={styles.image} />
                                <View style={styles.overlay} />
                                <View style={styles.content}>
                                    <Text style={styles.catName}>{category.name}</Text>
                                    <Text style={styles.catSub}>{category.sub}</Text>
                                    <View style={styles.row}>
                                        <Text style={styles.exploreText}>EXPLORE</Text>
                                        <MoveRight size={14} color="#FFFFFF" strokeWidth={2} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 12 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: '#8E8E93', letterSpacing: 2 },

    scroll: { paddingBottom: 60 },
    intro: { paddingHorizontal: 32, paddingTop: 40, marginBottom: 48 },
    title: { fontSize: 44, fontWeight: '400', fontFamily: typography.display, color: '#1C1C1E', letterSpacing: -2 },
    sub: { fontSize: 15, color: '#8E8E93', fontWeight: '500', marginTop: 12, lineHeight: 22 },

    grid: { paddingHorizontal: 24 },
    card: { width: '100%', height: 260, borderRadius: 2, overflow: 'hidden', marginBottom: 24, backgroundColor: '#F9F9F9' },
    image: { width: '100%', height: '100%', resizeMode: 'cover' },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
    content: { position: 'absolute', bottom: 32, left: 32, right: 32 },
    catName: { color: '#FFFFFF', fontSize: 24, fontWeight: '400', fontFamily: typography.display, marginBottom: 4 },
    catSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600', marginBottom: 16 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    exploreText: { color: '#FFFFFF', fontSize: 10, fontWeight: '900', letterSpacing: 1.5 }
});
