import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Platform,
    Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
    ChevronLeft,
    Wallet,
    ArrowDownRight,
    ArrowUpRight,
    Plus,
    Send,
    History
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Wallet'>;

const TRANSACTIONS = [
    {
        id: '1',
        title: 'Refund - Order #ORD-1122',
        date: '20 Aug, 2024',
        amount: '+£85.00',
        type: 'in',
    },
    {
        id: '2',
        title: 'Payment - Order #ORD-3344',
        date: '18 Aug, 2024',
        amount: '-£120.00',
        type: 'out',
    },
    {
        id: '3',
        title: 'Wallet Top-up',
        date: '15 Aug, 2024',
        amount: '+£500.00',
        type: 'in',
    },
    {
        id: '4',
        title: 'Promo Credit',
        date: '10 Aug, 2024',
        amount: '+£25.00',
        type: 'in',
    }
];

export const WalletScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Store Credit</Text>
                    <View style={{ width: 48 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Wallet Card */}
                    <LinearGradient
                        colors={['#1C1C1E', '#3A3A3C']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.walletCard}
                    >
                        <View style={styles.walletHeader}>
                            <Text style={styles.walletLabel}>Available Balance</Text>
                            <Wallet size={24} color="rgba(255,255,255,0.4)" strokeWidth={2} />
                        </View>
                        <Text style={styles.balanceText}>£1,250.00</Text>

                        <View style={styles.walletActions}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <View style={styles.actionIcon}>
                                    <Plus size={20} color="#1C1C1E" strokeWidth={3} />
                                </View>
                                <Text style={styles.actionText}>Top Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <View style={styles.actionIcon}>
                                    <Send size={20} color="#1C1C1E" strokeWidth={3} />
                                </View>
                                <Text style={styles.actionText}>Withdraw</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>

                    {/* Transaction History */}
                    <View style={styles.historySection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Transaction History</Text>
                            <TouchableOpacity>
                                <History size={20} color="#8E8E93" />
                            </TouchableOpacity>
                        </View>

                        {TRANSACTIONS.map((tx) => (
                            <View key={tx.id} style={styles.txRow}>
                                <View style={[styles.txIconBox, { backgroundColor: tx.type === 'in' ? '#F0F9F4' : '#FFF5F2' }]}>
                                    {tx.type === 'in' ? (
                                        <ArrowDownRight size={20} color="#34C759" strokeWidth={2.5} />
                                    ) : (
                                        <ArrowUpRight size={20} color="#FF3B30" strokeWidth={2.5} />
                                    )}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.txTitle}>{tx.title}</Text>
                                    <Text style={styles.txDate}>{tx.date}</Text>
                                </View>
                                <Text style={[styles.txAmount, { color: tx.type === 'in' ? '#34C759' : '#1C1C1E' }]}>
                                    {tx.amount}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Perks Section */}
                    <TouchableOpacity style={styles.perkCard}>
                        <View style={styles.perkInfo}>
                            <Text style={styles.perkTitle}>Auto-Checkout Enabled</Text>
                            <Text style={styles.perkSub}>Use store credit for instant purchases without redirection.</Text>
                        </View>
                        <View style={styles.toggleOn} />
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1, backgroundColor: '#1C1C1E' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
    backButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
    scrollContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 36, borderTopRightRadius: 36, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 60, minHeight: '100%' },

    walletCard: { borderRadius: 32, padding: 32, marginBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.25, shadowRadius: 30, elevation: 15 },
    walletHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    walletLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1.5 },
    balanceText: { color: '#FFFFFF', fontSize: 42, fontWeight: '900', letterSpacing: -1, marginBottom: 32 },
    walletActions: { flexDirection: 'row', gap: 16 },
    actionBtn: { flex: 1, height: 56, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 12 },
    actionIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    actionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

    historySection: { marginBottom: 32 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    sectionTitle: { fontSize: 13, fontWeight: '900', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 1, marginLeft: 4 },
    txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' },
    txIconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    txTitle: { fontSize: 15, fontWeight: '800', color: '#1C1C1E', marginBottom: 2 },
    txDate: { fontSize: 13, color: '#8E8E93', fontWeight: '500' },
    txAmount: { fontSize: 16, fontWeight: '900' },

    perkCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', padding: 24, borderRadius: 28, borderWidth: 1, borderColor: '#F0F0F0' },
    perkInfo: { flex: 1, marginRight: 20 },
    perkTitle: { fontSize: 16, fontWeight: '900', color: '#1C1C1E', marginBottom: 6 },
    perkSub: { fontSize: 13, color: '#8E8E93', fontWeight: '500', lineHeight: 18 },
    toggleOn: { width: 44, height: 26, borderRadius: 13, backgroundColor: '#1C1C1E', alignItems: 'flex-end', padding: 3 }, // Visual toggle mockup
});
