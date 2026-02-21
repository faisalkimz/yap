import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
    ChevronLeft,
    Star,
    Camera,
    X,
    ShieldCheck
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'WriteReview'>;

export const WriteReviewScreen: React.FC<Props> = ({ navigation }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Write Review</Text>
                    <View style={{ width: 48 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Product Summary */}
                    <View style={styles.productSummary}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' }}
                            style={styles.productThumb}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productName}>Oversized Silk T-Shirt</Text>
                            <Text style={styles.productVariant}>Color: Black / Size: XL</Text>
                        </View>
                    </View>

                    {/* Rating Selector */}
                    <View style={styles.ratingSection}>
                        <Text style={styles.sectionTitle}>Tap to Rate</Text>
                        <View style={styles.starsRow}>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <TouchableOpacity key={s} onPress={() => setRating(s)}>
                                    <Star size={44} color={s <= rating ? '#FFD700' : '#EBEBEB'} fill={s <= rating ? '#FFD700' : 'transparent'} strokeWidth={1.5} />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.ratingDesc}>
                            {rating === 1 && 'Unsatisfactory'}
                            {rating === 2 && 'Fair'}
                            {rating === 3 && 'Good'}
                            {rating === 4 && 'Very Good'}
                            {rating === 5 && 'Excellent'}
                        </Text>
                    </View>

                    {/* Review Form */}
                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Tell us more</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Write your honest experience with this product..."
                            placeholderTextColor="#A0A0A0"
                            multiline
                            numberOfLines={6}
                            value={comment}
                            onChangeText={setComment}
                        />

                        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Add Photos</Text>
                        <View style={styles.photoSection}>
                            <TouchableOpacity style={styles.addPhotoBtn}>
                                <Camera size={24} color="#1C1C1E" strokeWidth={2} />
                                <Text style={styles.addPhotoText}>0/4</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Anonymous Toggle */}
                    <View style={styles.footerInfo}>
                        <ShieldCheck size={18} color="#34C759" />
                        <Text style={styles.footerInfoText}>Your review will be verified for authenticity.</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.submitBtn, rating === 0 && styles.submitBtnDisabled]}
                        disabled={rating === 0}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.submitBtnText}>Post Review</Text>
                    </TouchableOpacity>

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

    scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 60 },

    productSummary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', padding: 16, borderRadius: 20, marginBottom: 40 },
    productThumb: { width: 60, height: 60, borderRadius: 12, marginRight: 16, backgroundColor: '#FFF' },
    productName: { fontSize: 16, fontWeight: '800', color: '#1C1C1E' },
    productVariant: { fontSize: 13, color: '#8E8E93', fontWeight: '500', marginTop: 2 },

    ratingSection: { alignItems: 'center', marginBottom: 40 },
    sectionTitle: { fontSize: 14, fontWeight: '900', color: '#1C1C1E', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20, width: '100%', textAlign: 'left', paddingLeft: 4 },
    starsRow: { flexDirection: 'row', gap: 12 },
    ratingDesc: { marginTop: 16, fontSize: 15, fontWeight: '800', color: '#FFD700' },

    formSection: { marginBottom: 32 },
    textInput: { backgroundColor: '#F8F8F8', borderRadius: 20, padding: 20, fontSize: 16, fontWeight: '500', color: '#1C1C1E', textAlignVertical: 'top', minHeight: 160, borderWidth: 1, borderColor: '#F0F0F0' },

    photoSection: { flexDirection: 'row', gap: 12 },
    addPhotoBtn: { width: 80, height: 80, borderRadius: 16, borderStyle: 'dashed', borderWidth: 2, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', gap: 4 },
    addPhotoText: { fontSize: 12, fontWeight: '800', color: '#8E8E93' },

    footerInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32, gap: 8 },
    footerInfoText: { fontSize: 13, color: '#8E8E93', fontWeight: '600' },

    submitBtn: { height: 64, borderRadius: 32, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center', shadowColor: '#1C1C1E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
    submitBtnDisabled: { backgroundColor: '#E0E0E0' },
    submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 }
});
