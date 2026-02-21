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
import { ChevronLeft, RotateCcw, Package, AlertCircle, MoveRight } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ReturnsDashboard'>;

const ACTIVE_RETURNS = [
    {
        id: 'RET-9021',
        item: 'Velvet Evening Blazer',
        image: 'https://images.unsplash.com/photo-1594932224528-a4603e236124?w=400&q=80',
        status: 'SHIPPING',
        date: 'Initiated Feb 18, 2024',
        message: 'Awaiting arrival at our London Atelier.'
    }
];

export const ReturnsDashboardScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={28} color={colors.secondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>RETURNS & EXCHANGES</Text>
                <View style={{ width: 44 }} />
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.infoBox}>
                    <AlertCircle size={20} color={colors.primary} />
                    <Text style={styles.infoText}>You have 14 days from delivery to initiate a return for the Yap Archive collection.</Text>
                </View>

                <Text style={styles.sectionTitle}>Active Requests</Text>

                {ACTIVE_RETURNS.length > 0 ? (
                    ACTIVE_RETURNS.map(ret => (
                        <View key={ret.id} style={styles.returnCard}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.idText}>{ret.id}</Text>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusText}>{ret.status}</Text>
                                </View>
                            </View>

                            <View style={styles.cardContent}>
                                <Image source={{ uri: ret.image }} style={styles.itemImg} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{ret.item}</Text>
                                    <Text style={styles.itemDate}>{ret.date}</Text>
                                    <Text style={styles.itemMsg}>{ret.message}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.trackBtn}>
                                <Text style={styles.trackText}>TRACK RETURN SHIPMENT</Text>
                                <MoveRight size={16} color={colors.secondary} />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View style={styles.empty}>
                        <RotateCcw size={48} color={colors.lightGray} strokeWidth={1} />
                        <Text style={styles.emptyTitle}>No active returns</Text>
                        <Text style={styles.emptySub}>All your requests have been processed or none have been initiated.</Text>
                    </View>
                )}

                <View style={styles.newReturnSection}>
                    <Text style={styles.sectionTitle}>Start a new return</Text>
                    <Text style={styles.subText}>Select an eligible order from your history to begin the white-glove return process.</Text>

                    <TouchableOpacity style={styles.orderSelectBtn} onPress={() => navigation.navigate('Orders')}>
                        <View style={styles.btnLeft}>
                            <Package size={20} color={colors.secondary} />
                            <Text style={styles.orderSelectText}>View Recent Orders</Text>
                        </View>
                        <MoveRight size={20} color={colors.muted} />
                    </TouchableOpacity>
                </View>

                <View style={styles.policyBox}>
                    <Text style={styles.policyTitle}>Our Guarantee</Text>
                    <Text style={styles.policyText}>
                        If you are not entirely satisfied with your purchase, our complimentary collection service ensures a seamless return experience. Your refund will be processed upon inspection at our flagship atelier.
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LegalContent', { type: 'returns' })}>
                        <Text style={styles.policyLink}>Read full Policy</Text>
                    </TouchableOpacity>
                </View>

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
    infoBox: { flexDirection: 'row', backgroundColor: '#FEF9F8', padding: 16, borderRadius: 2, gap: 12, marginBottom: 32, alignItems: 'center' },
    infoText: { flex: 1, fontSize: 13, color: colors.primary, fontWeight: '700', lineHeight: 18 },

    sectionTitle: { fontSize: 16, fontWeight: '900', color: colors.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 },

    returnCard: { backgroundColor: colors.white, borderRadius: 2, borderWidth: 1, borderColor: colors.border, padding: 20, marginBottom: 32 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    idText: { fontSize: 12, fontWeight: '900', color: colors.muted },
    statusBadge: { backgroundColor: colors.secondary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 2 },
    statusText: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 1 },

    cardContent: { flexDirection: 'row', gap: 16, borderBottomWidth: 1, borderBottomColor: colors.lightGray, paddingBottom: 20 },
    itemImg: { width: 70, height: 90, borderRadius: 2, backgroundColor: colors.lightGray },
    itemInfo: { flex: 1, justifyContent: 'center' },
    itemName: { fontSize: 16, fontWeight: '800', color: colors.secondary, marginBottom: 4 },
    itemDate: { fontSize: 12, color: colors.muted, fontWeight: '600', marginBottom: 8 },
    itemMsg: { fontSize: 13, color: colors.primary, fontWeight: '700' },

    trackBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 16, justifyContent: 'center' },
    trackText: { fontSize: 12, fontWeight: '900', color: colors.secondary, letterSpacing: 1 },

    empty: { alignItems: 'center', paddingVertical: 60 },
    emptyTitle: { fontSize: 18, fontWeight: '900', color: colors.secondary, marginTop: 16, marginBottom: 8 },
    emptySub: { fontSize: 14, color: colors.muted, textAlign: 'center', paddingHorizontal: 40, lineHeight: 20 },

    newReturnSection: { marginTop: 20 },
    subText: { fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: '500', marginBottom: 20 },
    orderSelectBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: colors.lightGray, borderRadius: 2 },
    btnLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    orderSelectText: { fontSize: 15, fontWeight: '800', color: colors.secondary },

    policyBox: { marginTop: 48, padding: 24, backgroundColor: colors.lightGray, borderRadius: 2 },
    policyTitle: { fontSize: 16, fontWeight: '900', color: colors.secondary, marginBottom: 8 },
    policyText: { fontSize: 13, color: colors.muted, lineHeight: 20, fontWeight: '500', marginBottom: 16 },
    policyLink: { fontSize: 13, fontWeight: '800', color: colors.secondary, textDecorationLine: 'underline' }
});
