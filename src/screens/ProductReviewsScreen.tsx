import React, { useState } from 'react';
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
    Star,
    ThumbsUp,
    MessageSquare,
    Plus,
    Filter
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductReviews'>;

const REVIEWS = [
    {
        id: '1',
        user: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
        rating: 5,
        date: '2 Oct, 2024',
        comment: 'The quality of the silk is absolutely incredible. It feels so premium and the oversized fit is perfect for my style.',
        likes: 24,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80']
    },
    {
        id: '2',
        user: 'Sarah Williams',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        rating: 4,
        date: '28 Sep, 2024',
        comment: 'Very nice shirt, but it is indeed VERY oversized. I would suggest sizing down if you want a more standard fit.',
        likes: 12,
        images: []
    }
];

const QUESTIONS = [
    {
        id: '1',
        question: 'Is this 100% natural silk?',
        answer: 'Yes, it is made from 100% premium mulberry silk with a heavy-weight finish for better durability.',
        user: 'FashionGeek99',
        date: '15 Sep, 2024'
    }
];

export const ProductReviewsScreen: React.FC<Props> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Reviews');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Engagement</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Filter size={20} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>

                {/* Summary Section */}
                <View style={styles.summarySection}>
                    <View style={styles.ratingInfo}>
                        <Text style={styles.bigRating}>4.8</Text>
                        <View style={styles.starsRow}>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={16} color={s <= 4 ? '#FFD700' : '#E0E0E0'} fill={s <= 4 ? '#FFD700' : 'transparent'} />
                            ))}
                        </View>
                        <Text style={styles.totalReviewsText}>Based on 128 Reviews</Text>
                    </View>
                    <View style={styles.dividerVertical} />
                    <TouchableOpacity
                        style={styles.writeReviewBtn}
                        onPress={() => navigation.navigate('WriteReview' as any)}
                    >
                        <Plus size={20} color="#FFFFFF" strokeWidth={3} />
                        <Text style={styles.writeBtnText}>Write Review</Text>
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabBar}>
                    {['Reviews', 'Q&A'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                {tab} {tab === 'Reviews' ? '(128)' : '(12)'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {activeTab === 'Reviews' ? (
                        REVIEWS.map((review) => (
                            <View key={review.id} style={styles.reviewCard}>
                                <View style={styles.reviewerHeader}>
                                    <Image source={{ uri: review.avatar }} style={styles.avatar} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.reviewerName}>{review.user}</Text>
                                        <View style={styles.ratingStarsSmall}>
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} size={12} color={s <= review.rating ? '#FFD700' : '#E0E0E0'} fill={s <= review.rating ? '#FFD700' : 'transparent'} />
                                            ))}
                                            <Text style={styles.reviewDate}>{review.date}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.reviewComment}>{review.comment}</Text>
                                {review.images.length > 0 && (
                                    <View style={styles.reviewImages}>
                                        {review.images.map((img, i) => (
                                            <Image key={i} source={{ uri: img }} style={styles.reviewImg} />
                                        ))}
                                    </View>
                                )}
                                <View style={styles.reviewFooter}>
                                    <TouchableOpacity style={styles.likeBtn}>
                                        <ThumbsUp size={16} color="#8E8E93" />
                                        <Text style={styles.likeText}>{review.likes} Helpful</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.replyBtn}>
                                        <MessageSquare size={16} color="#8E8E93" />
                                        <Text style={styles.replyText}>Reply</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        QUESTIONS.map((q) => (
                            <View key={q.id} style={styles.qaCard}>
                                <View style={styles.qHeader}>
                                    <View style={styles.qBadge}><Text style={styles.qBadgeText}>Q</Text></View>
                                    <Text style={styles.qText}>{q.question}</Text>
                                </View>
                                <View style={styles.aBody}>
                                    <View style={styles.aBadge}><Text style={styles.aBadgeText}>A</Text></View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.aText}>{q.answer}</Text>
                                        <Text style={styles.aFooter}>Answered by Store Concierge • {q.date}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
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
    filterButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },

    summarySection: { flexDirection: 'row', alignItems: 'center', padding: 24, backgroundColor: '#F8F8F8', marginHorizontal: 24, borderRadius: 28, marginTop: 20 },
    ratingInfo: { flex: 1, alignItems: 'center' },
    bigRating: { fontSize: 32, fontWeight: '900', color: '#1C1C1E' },
    starsRow: { flexDirection: 'row', gap: 2, marginVertical: 6 },
    totalReviewsText: { fontSize: 12, color: '#8E8E93', fontWeight: '600' },
    dividerVertical: { width: 1, height: 60, backgroundColor: '#E0E0E0', marginHorizontal: 24 },
    writeReviewBtn: { backgroundColor: '#1C1C1E', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
    writeBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },

    tabBar: { flexDirection: 'row', paddingHorizontal: 24, marginTop: 32, gap: 12 },
    tabBtn: { flex: 1, height: 50, borderRadius: 14, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    tabBtnActive: { backgroundColor: '#1C1C1E' },
    tabText: { fontSize: 14, fontWeight: '800', color: '#8E8E93' },
    tabTextActive: { color: '#FFFFFF' },

    scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 60 },
    reviewCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#F0F0F0' },
    reviewerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
    reviewerName: { fontSize: 16, fontWeight: '800', color: '#1C1C1E' },
    ratingStarsSmall: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 },
    reviewDate: { fontSize: 12, color: '#8E8E93', fontWeight: '600', marginLeft: 8 },
    reviewComment: { fontSize: 15, color: '#444', lineHeight: 22, fontWeight: '500' },
    reviewImages: { flexDirection: 'row', marginTop: 16, gap: 12 },
    reviewImg: { width: 80, height: 80, borderRadius: 12 },
    reviewFooter: { flexDirection: 'row', marginTop: 20, gap: 20, borderTopWidth: 1, borderTopColor: '#F8F8F8', paddingTop: 16 },
    likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    likeText: { fontSize: 13, color: '#8E8E93', fontWeight: '700' },
    replyBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    replyText: { fontSize: 13, color: '#8E8E93', fontWeight: '700' },

    qaCard: { backgroundColor: '#F8F8F8', borderRadius: 24, padding: 20, marginBottom: 16 },
    qHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
    qBadge: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    qBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
    qText: { flex: 1, fontSize: 16, fontWeight: '800', color: '#1C1C1E', lineHeight: 22 },
    aBody: { flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 4 },
    aBadge: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF6B4A', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    aBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
    aText: { fontSize: 15, color: '#444', lineHeight: 22, fontWeight: '500' },
    aFooter: { marginTop: 10, fontSize: 12, color: '#8E8E93', fontWeight: '600' }
});
