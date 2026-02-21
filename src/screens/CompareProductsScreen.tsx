import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Platform,
    Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
    ChevronLeft,
    X,
    Check,
    Minus,
    Plus
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'CompareProducts'>;

const COMPARE_DATA = [
    {
        id: '1',
        name: 'Oversized Silk Shirt',
        price: '£220',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
        material: '100% Mulberry Silk',
        fit: 'Bespoke Oversized',
        wash: 'Dry Clean Only',
        stock: 'In Stock'
    },
    {
        id: '2',
        name: 'Classic Linen Shirt',
        price: '£180',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
        material: '100% Italian Linen',
        fit: 'Relaxed Fit',
        wash: 'Machine Wash cold',
        stock: 'Limited'
    }
];

export const CompareProductsScreen: React.FC<Props> = ({ navigation }) => {
    const specs = [
        { label: 'Material', key: 'material' },
        { label: 'Fit', key: 'fit' },
        { label: 'Care Instructions', key: 'wash' },
        { label: 'Availability', key: 'stock' }
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Comparison</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Plus size={20} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
                    <View style={styles.compareContainer}>
                        {/* Comparison Labels Column */}
                        <View style={styles.labelsColumn}>
                            <View style={[styles.headerPlaceholder, { height: 280 }]} />
                            {specs.map((spec, idx) => (
                                <View key={idx} style={styles.labelCell}>
                                    <Text style={styles.labelText}>{spec.label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Product Columns */}
                        {COMPARE_DATA.map((product) => (
                            <View key={product.id} style={styles.productColumn}>
                                <View style={styles.productHeader}>
                                    <Image source={{ uri: product.image }} style={styles.productImage} />
                                    <TouchableOpacity style={styles.removeBtn}>
                                        <X size={14} color="#FFFFFF" strokeWidth={3} />
                                    </TouchableOpacity>
                                    <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                                    <Text style={styles.productPrice}>{product.price}</Text>
                                    <TouchableOpacity style={styles.buyBtn}>
                                        <Text style={styles.buyBtnText}>Add Bag</Text>
                                    </TouchableOpacity>
                                </View>

                                {specs.map((spec, idx) => (
                                    <View key={idx} style={styles.valueCell}>
                                        <Text style={styles.valueText}>{(product as any)[spec.key]}</Text>
                                    </View>
                                ))}
                            </View>
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
    backButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    addButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },

    compareContainer: { flexDirection: 'row', paddingRight: 24 },
    labelsColumn: { width: 120, paddingLeft: 24, backgroundColor: '#FBFBFB' },
    headerPlaceholder: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    labelCell: { height: 80, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    labelText: { fontSize: 13, fontWeight: '800', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 0.5 },

    productColumn: { width: 220, borderLeftWidth: 1, borderLeftColor: '#F0F0F0' },
    productHeader: { height: 280, padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    productImage: { width: 120, height: 120, borderRadius: 20, marginBottom: 16, backgroundColor: '#F8F8F8' },
    removeBtn: { position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF3B30', justifyContent: 'center', alignItems: 'center' },
    productName: { fontSize: 16, fontWeight: '900', color: '#1C1C1E', textAlign: 'center', marginBottom: 4, height: 40 },
    productPrice: { fontSize: 16, fontWeight: '800', color: '#FF6B4A', marginBottom: 12 },
    buyBtn: { backgroundColor: '#1C1C1E', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 },
    buyBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },

    valueCell: { height: 80, paddingHorizontal: 20, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    valueText: { fontSize: 14, color: '#1C1C1E', fontWeight: '600', textAlign: 'center' }
});
