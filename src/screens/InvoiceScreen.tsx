import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Platform,
    Share
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, Download, Share2, FileCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Invoice'>;

export const InvoiceScreen: React.FC<Props> = ({ navigation }) => {
    const INVOICE_DATA = {
        number: 'INV-2024-0891',
        date: 'Feb 15, 2024',
        paymentMethod: 'MasterCard •••• 4242',
        billingAddress: 'Faisal Mbabali\n22 Custom House Street\nLondon E1 6PX, UK',
        shippingAddress: 'Faisal Mbabali\n22 Custom House Street\nLondon E1 6PX, UK',
        items: [
            { id: '1', name: 'Velvet Evening Blazer', qty: 1, price: '£420.00' },
            { id: '2', name: 'Obsidian Leather Boots', qty: 1, price: '£310.00' }
        ],
        subtotal: '£730.00',
        tax: '£109.50',
        shipping: '£0.00',
        total: '£839.50'
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Invoice ${INVOICE_DATA.number} from Yap Boutique`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={28} color={colors.secondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>OFFICIAL INVOICE</Text>
                <TouchableOpacity style={styles.backBtn} onPress={handleShare}>
                    <Share2 size={22} color={colors.secondary} />
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.invoiceSheet}>
                    {/* Brand Header */}
                    <View style={styles.invoiceHeader}>
                        <View>
                            <Text style={styles.brandTitle}>YAP</Text>
                            <Text style={styles.brandSubtitle}>OFFICIAL ARCHIVE</Text>
                        </View>
                        <View style={styles.invoiceMeta}>
                            <Text style={styles.metaLabel}>INVOICE NO.</Text>
                            <Text style={styles.metaVal}>{INVOICE_DATA.number}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Parties */}
                    <View style={styles.addressRow}>
                        <View style={styles.addressCol}>
                            <Text style={styles.smallLabel}>DATE</Text>
                            <Text style={styles.mediumText}>{INVOICE_DATA.date}</Text>
                        </View>
                        <View style={styles.addressCol}>
                            <Text style={styles.smallLabel}>PAYMENT</Text>
                            <Text style={styles.mediumText}>{INVOICE_DATA.paymentMethod}</Text>
                        </View>
                    </View>

                    <View style={styles.addressRow}>
                        <View style={styles.addressCol}>
                            <Text style={styles.smallLabel}>BILL TO</Text>
                            <Text style={styles.addressText}>{INVOICE_DATA.billingAddress}</Text>
                        </View>
                        <View style={styles.addressCol}>
                            <Text style={styles.smallLabel}>SHIP TO</Text>
                            <Text style={styles.addressText}>{INVOICE_DATA.shippingAddress}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableLabel, { flex: 2 }]}>DESCRIPTION</Text>
                        <Text style={[styles.tableLabel, { textAlign: 'center', flex: 0.5 }]}>QTY</Text>
                        <Text style={[styles.tableLabel, { textAlign: 'right', flex: 1 }]}>TOTAL</Text>
                    </View>

                    {/* Table Items */}
                    {INVOICE_DATA.items.map(item => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={[styles.itemText, { flex: 2 }]}>{item.name}</Text>
                            <Text style={[styles.itemText, { textAlign: 'center', flex: 0.5 }]}>{item.qty}</Text>
                            <Text style={[styles.itemText, { textAlign: 'right', flex: 1, fontWeight: '900' }]}>{item.price}</Text>
                        </View>
                    ))}

                    <View style={styles.divider} />

                    {/* Totals */}
                    <View style={styles.totalsSection}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Subtotal</Text>
                            <Text style={styles.totalVal}>{INVOICE_DATA.subtotal}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>VAT (15%)</Text>
                            <Text style={styles.totalVal}>{INVOICE_DATA.tax}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Shipping</Text>
                            <Text style={styles.totalVal}>{INVOICE_DATA.shipping}</Text>
                        </View>
                        <View style={[styles.totalRow, { marginTop: 12 }]}>
                            <Text style={styles.grandLabel}>TOTAL AMOUNT</Text>
                            <Text style={styles.grandVal}>{INVOICE_DATA.total}</Text>
                        </View>
                    </View>

                    <View style={styles.stamp}>
                        <FileCheck size={40} color={colors.border} strokeWidth={1} />
                        <Text style={styles.stampText}>PAID IN FULL</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.downloadBtn}>
                    <Download size={20} color={colors.white} />
                    <Text style={styles.downloadText}>DOWNLOAD PDF</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.lightGray },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.white, paddingTop: Platform.OS === 'ios' ? 0 : 40 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: colors.secondary, letterSpacing: 2 },

    scroll: { padding: 20 },
    invoiceSheet: { backgroundColor: colors.white, borderRadius: 2, padding: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },

    invoiceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
    brandTitle: { fontSize: 24, fontWeight: '900', color: colors.secondary, letterSpacing: -1 },
    brandSubtitle: { fontSize: 8, fontWeight: '900', color: colors.muted, letterSpacing: 2 },

    invoiceMeta: { alignItems: 'flex-end' },
    metaLabel: { fontSize: 9, fontWeight: '900', color: colors.muted, letterSpacing: 1, marginBottom: 4 },
    metaVal: { fontSize: 13, fontWeight: '900', color: colors.secondary },

    divider: { height: 1.5, backgroundColor: colors.lightGray, marginVertical: 24 },

    addressRow: { flexDirection: 'row', marginBottom: 24, gap: 20 },
    addressCol: { flex: 1 },
    smallLabel: { fontSize: 9, fontWeight: '900', color: colors.muted, letterSpacing: 1, marginBottom: 10 },
    mediumText: { fontSize: 14, fontWeight: '800', color: colors.secondary },
    addressText: { fontSize: 13, color: '#666', lineHeight: 18, fontWeight: '500' },

    tableHeader: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.lightGray },
    tableLabel: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 1 },
    tableRow: { flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: colors.lightGray },
    itemText: { fontSize: 14, color: colors.secondary, fontWeight: '600' },

    totalsSection: { alignSelf: 'flex-end', width: width * 0.6, marginTop: 24 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    totalLabel: { fontSize: 13, fontWeight: '600', color: colors.muted },
    totalVal: { fontSize: 14, fontWeight: '800', color: colors.secondary },

    grandLabel: { fontSize: 11, fontWeight: '900', color: colors.secondary, letterSpacing: 1 },
    grandVal: { fontSize: 22, fontWeight: '900', color: colors.secondary },

    stamp: { alignSelf: 'center', marginTop: 40, alignItems: 'center', opacity: 0.4 },
    stampText: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 2, marginTop: 8 },

    downloadBtn: { backgroundColor: colors.secondary, height: 60, borderRadius: 2, marginTop: 32, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
    downloadText: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 1.5 }
});
