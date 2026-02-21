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
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChevronLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryListing'>;

const ALL_CATEGORIES = [
    { id: '1', name: 'New Arrivals', items: 120, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80' },
    { id: '2', name: 'Men', items: 85, image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=80' },
    { id: '3', name: 'Women', items: 210, image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80' },
    { id: '4', name: 'Accessories', items: 45, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
    { id: '5', name: 'Shoes', items: 56, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { id: '6', name: 'Bags', items: 34, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80' },
];

export const CategoryListingScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Categories</Text>
                    <View style={{ width: 48 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
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
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{category.name}</Text>
                                    <Text style={styles.items}>{category.items} Items</Text>
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
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    backButton: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    content: { paddingHorizontal: 24, paddingVertical: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between' },
    card: { width: (width - 48 - 16) / 2, height: 220, borderRadius: 24, overflow: 'hidden', marginBottom: 16, backgroundColor: '#F0F0F0' },
    image: { width: '100%', height: '100%', resizeMode: 'cover' },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.35)' },
    textContainer: { position: 'absolute', bottom: 20, left: 20, right: 20 },
    name: { color: '#FFFFFF', fontSize: 20, fontWeight: '900', letterSpacing: -0.5, marginBottom: 4 },
    items: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '700' },
});
