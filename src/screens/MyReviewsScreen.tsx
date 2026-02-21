import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, Star, Edit3, Trash2, MessageSquare } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'MyReviews'>;

const MY_REVIEWS = [
    {
        id: '1',
        productName: 'Mulberry Silk Shirt',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
        rating: 5,
        date: 'Jan 12, 2024',
        content: 'The drape of this silk is unparalleled. It feels like a second skin. Perfect for evening galas.',
        verified: true
    }
];

export const MyReviewsScreen: React.FC<Props> = ({ navigation }) => {
    const renderStars = (rating: number) => {
        return (
            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map(s => (
                    <Star
                        key={s}
                        size={12}
                        color={s <= rating ? '#FFCC00' : colors.lightGray}
                        fill={s <= rating ? '#FFCC00' : 'transparent'}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={28} color={colors.secondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MY REVIEWS</Text>
                <View style={{ width: 44 }} />
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.summary}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryVal}>1</Text>
                        <Text style={styles.summaryLabel}>Total Reviews</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryVal}>5.0</Text>
                        <Text style={styles.summaryLabel}>Average Rating</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Review History</Text>

                {MY_REVIEWS.length > 0 ? (
                    MY_REVIEWS.map(rev => (
                        <View key={rev.id} style={styles.reviewCard}>
                            <View style={styles.reviewMain}>
                                <Image source={{ uri: rev.image }} style={styles.productImg} />
                                <View style={styles.reviewInfo}>
                                    <Text style={styles.revDate}>{rev.date}</Text>
                                    <Text style={styles.revProduct}>{rev.productName}</Text>
                                    {renderStars(rev.rating)}
                                </View>
                            </View>

                            <Text style={styles.revContent}>{rev.content}</Text>

                            <View style={styles.revActions}>
                                <TouchableOpacity style={styles.revActionBtn}>
                                    <Edit3 size={16} color={colors.secondary} />
                                    <Text style={styles.revActionText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.revActionBtn}>
                                    <Trash2 size={16} color={colors.accent} />
                                    <Text style={[styles.revActionText, { color: colors.accent }]}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.empty}>
                        <MessageSquare size={48} color={colors.lightGray} strokeWidth={1} />
                        <Text style={styles.emptyTitle}>Silence is Golden</Text>
                        <Text style={styles.emptySub}>You haven't shared your thoughts on our pieces yet. Your voice matters to the community.</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Orders')}>
                    <Text style={styles.shopBtnText}>REVIEW RECENT PURCHASES</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 0 : 40, borderBottomWidth: 1, borderBottomColor: colors.lightGray },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: colors.secondary, letterSpacing: 2 },

    scroll: { padding: 24 },
    summary: { flexDirection: 'row', backgroundColor: colors.lightGray, padding: 24, borderRadius: 2, marginBottom: 40 },
    summaryItem: { flex: 1, alignItems: 'center' },
    summaryVal: { fontSize: 24, fontWeight: '900', color: colors.secondary, marginBottom: 4 },
    summaryLabel: { fontSize: 11, color: colors.muted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
    summaryDivider: { width: 1, height: '100%', backgroundColor: colors.border },

    sectionTitle: { fontSize: 14, fontWeight: '900', color: colors.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 },

    reviewCard: { padding: 20, borderBottomWidth: 1, borderBottomColor: colors.lightGray, marginBottom: 20 },
    reviewMain: { flexDirection: 'row', gap: 16, marginBottom: 16 },
    productImg: { width: 60, height: 80, borderRadius: 2, backgroundColor: colors.lightGray },
    reviewInfo: { flex: 1, justifyContent: 'center' },
    revDate: { fontSize: 10, fontWeight: '800', color: colors.muted, marginBottom: 4 },
    revProduct: { fontSize: 16, fontWeight: '800', color: colors.secondary, marginBottom: 6 },
    stars: { flexDirection: 'row', gap: 2 },

    revContent: { fontSize: 15, color: '#444', lineHeight: 22, fontWeight: '500', marginBottom: 20 },

    revActions: { flexDirection: 'row', gap: 24 },
    revActionBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    revActionText: { fontSize: 13, fontWeight: '800', color: colors.secondary },

    empty: { alignItems: 'center', paddingVertical: 60 },
    emptyTitle: { fontSize: 18, fontWeight: '900', color: colors.secondary, marginTop: 16, marginBottom: 8 },
    emptySub: { fontSize: 14, color: colors.muted, textAlign: 'center', paddingHorizontal: 40, lineHeight: 20 },

    shopBtn: { backgroundColor: colors.secondary, height: 60, borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
    shopBtnText: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 1.5 }
});
