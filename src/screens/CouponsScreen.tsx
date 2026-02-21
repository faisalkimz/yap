import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, Ticket, Copy, CheckCircle2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Coupons'>;

const COUPONS = [
    {
        id: '1',
        code: 'WELCOME20',
        title: '20% OFF YOUR FIRST ORDER',
        expiry: 'Expires Mar 31, 2024',
        terms: 'Applicable on regular priced items above £100.',
        type: 'PERCENTAGE'
    },
    {
        id: '2',
        code: 'ARCHIVE10',
        title: '£10 GIFT VOUCHER',
        expiry: 'Valid until Feb 28, 2024',
        terms: 'Special boutique privilege for loyal curators.',
        type: 'FIXED'
    }
];

export const CouponsScreen: React.FC<Props> = ({ navigation }) => {
    const [copiedId, setCopiedId] = React.useState<string | null>(null);

    const handleCopy = (id: string) => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={28} color={colors.secondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MY PRIVILEGES</Text>
                <View style={{ width: 44 }} />
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.hero}>
                    <Ticket size={40} color={colors.primary} strokeWidth={1} />
                    <Text style={styles.heroTitle}>Exclusive Rewards</Text>
                    <Text style={styles.heroSub}>Your curated collection of rewards and boutique access codes.</Text>
                </View>

                {COUPONS.map(coupon => (
                    <View key={coupon.id} style={styles.couponCard}>
                        <View style={styles.cardLeft}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>

                        <View style={styles.cardMain}>
                            <Text style={styles.expiryText}>{coupon.expiry}</Text>
                            <Text style={styles.couponTitle}>{coupon.title}</Text>
                            <Text style={styles.couponTerms}>{coupon.terms}</Text>

                            <View style={styles.codeRow}>
                                <View style={styles.codeBox}>
                                    <Text style={styles.codeText}>{coupon.code}</Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.copyBtn, copiedId === coupon.id && styles.copiedBtn]}
                                    onPress={() => handleCopy(coupon.id)}
                                >
                                    {copiedId === coupon.id ? (
                                        <CheckCircle2 size={16} color={colors.white} />
                                    ) : (
                                        <Copy size={16} color={colors.secondary} />
                                    )}
                                    <Text style={[styles.copyText, copiedId === coupon.id && styles.copiedText]}>
                                        {copiedId === coupon.id ? 'COPIED' : 'COPY'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}

                <View style={styles.loyaltyBox}>
                    <Text style={styles.loyaltyTitle}>Yap Loyalty Club</Text>
                    <Text style={styles.loyaltyText}>You are currently at **Silver Status**. Earn 450 more points for **Gold Access**, unlocking complimentary worldwide shipping and early archive entry.</Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.lightGray, paddingTop: Platform.OS === 'ios' ? 0 : 40 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: colors.secondary, letterSpacing: 2 },

    scroll: { padding: 24 },
    hero: { alignItems: 'center', marginBottom: 40 },
    heroTitle: { fontSize: 32, fontWeight: '400', fontFamily: typography.display, color: colors.secondary, marginTop: 16, marginBottom: 8 },
    heroSub: { fontSize: 14, color: colors.muted, textAlign: 'center', paddingHorizontal: 40, lineHeight: 20, fontWeight: '500' },

    couponCard: { flexDirection: 'row', backgroundColor: colors.lightGray, borderRadius: 2, marginBottom: 24, overflow: 'hidden' },
    cardLeft: { width: 12, backgroundColor: colors.secondary, justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.white, opacity: 0.3 },

    cardMain: { flex: 1, padding: 24 },
    expiryText: { fontSize: 9, fontWeight: '900', color: colors.primary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
    couponTitle: { fontSize: 20, fontWeight: '900', color: colors.secondary, marginBottom: 8, letterSpacing: -0.5 },
    couponTerms: { fontSize: 12, color: colors.muted, fontWeight: '500', lineHeight: 18, marginBottom: 20 },

    codeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    codeBox: { flex: 1, height: 44, backgroundColor: colors.white, borderRadius: 2, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed', justifyContent: 'center', paddingHorizontal: 16 },
    codeText: { fontSize: 14, fontWeight: '900', color: colors.secondary, letterSpacing: 2 },

    copyBtn: { height: 44, paddingHorizontal: 16, backgroundColor: colors.white, borderRadius: 2, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: colors.secondary },
    copiedBtn: { backgroundColor: colors.secondary },
    copyText: { fontSize: 11, fontWeight: '900', color: colors.secondary, letterSpacing: 1 },
    copiedText: { color: colors.white },

    loyaltyBox: { marginTop: 24, padding: 32, backgroundColor: colors.secondary, borderRadius: 2 },
    loyaltyTitle: { fontSize: 18, fontWeight: '900', color: colors.white, marginBottom: 12 },
    loyaltyText: { fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 22, fontWeight: '500' }
});
