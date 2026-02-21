import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Modal,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { typography } from '../theme/typography';
import { ChevronLeft, MapPin, Pencil, CheckCircle2, ShieldCheck, Wallet } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const { width, height } = Dimensions.get('window');

const CHECKOUT_ITEMS = [
    {
        id: '1',
        name: 'Abracadabra Shirt',
        type: 'Unisex Wear',
        price: 4000,
        qty: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    },
    {
        id: '2',
        name: 'Panther Jacket',
        type: 'Unisex Wear',
        price: 3500,
        qty: 2,
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&q=80',
    }
];

export const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
    const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('Apple Pay'); // Updated defaults

    const subtotal = CHECKOUT_ITEMS.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vat = 350;
    const delivery = 150;
    const total = subtotal + vat + delivery;

    const handlePayment = () => {
        setPaymentModalVisible(false);
        navigation.replace('PaymentGateway');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                {/* Modern Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Review & Pay</Text>
                    <View style={{ width: 48 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                    {/* Delivery Address Card */}
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    <View style={styles.addressContainer}>
                        <View style={styles.addressIconWrapper}>
                            <MapPin size={24} color="#1C1C1E" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.addressName}>Faisal Kimz</Text>
                            <Text style={styles.addressText}>
                                6, Cole Palmer Avenue, London, UK
                            </Text>
                            <Text style={styles.addressText}>+44 7890 123456</Text>
                        </View>
                        <TouchableOpacity style={styles.editBtn}>
                            <Pencil size={18} color="#1C1C1E" />
                        </TouchableOpacity>
                    </View>

                    {/* Minimal Items List */}
                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Order Details</Text>
                    <View style={styles.itemsWrapper}>
                        {CHECKOUT_ITEMS.map((item, index) => (
                            <View key={item.id} style={[styles.itemCard, index === CHECKOUT_ITEMS.length - 1 && { borderBottomWidth: 0 }]}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.itemType}>{item.type}</Text>
                                    <View style={styles.priceRowItem}>
                                        <Text style={styles.itemPrice}>GX {item.price.toLocaleString()}</Text>
                                        <Text style={styles.qtyText}>Qty: {item.qty}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Summary */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>GX {subtotal.toLocaleString()}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery</Text>
                            <Text style={styles.summaryValue}>GX {delivery}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax (VAT)</Text>
                            <Text style={styles.summaryValue}>GX {vat}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>GX {total.toLocaleString()}</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Bar */}
                <View style={styles.bottomCheckoutBar}>
                    <TouchableOpacity
                        style={styles.payButton}
                        onPress={() => setPaymentModalVisible(true)}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.payButtonText}>Select Payment Method</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Luxurious Payment Modal */}
            <Modal
                visible={isPaymentModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setPaymentModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => setPaymentModalVisible(false)} />
                    <View style={styles.modalContent}>
                        <View style={styles.modalDragIndicator} />

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Payment Method</Text>
                            <View style={styles.secureBadge}>
                                <ShieldCheck size={14} color="#34C759" />
                                <Text style={styles.secureText}>Secure</Text>
                            </View>
                        </View>

                        {['Apple Pay', 'Credit Card', 'PayPal'].map((method) => (
                            <TouchableOpacity
                                key={method}
                                style={[
                                    styles.paymentOption,
                                    selectedPayment === method && styles.activePaymentOption
                                ]}
                                onPress={() => setSelectedPayment(method)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.paymentOptionLeft}>
                                    <View style={styles.paymentIconPlaceholder}>
                                        <Wallet size={20} color={selectedPayment === method ? '#FFFFFF' : '#1C1C1E'} />
                                    </View>
                                    <View>
                                        <Text style={[styles.paymentOptionTitle, selectedPayment === method && { color: '#FFFFFF' }]}>{method}</Text>
                                        {method === 'Credit Card' && <Text style={[styles.paymentOptionSub, selectedPayment === method && { color: 'rgba(255,255,255,0.7)' }]}>**** **** **** 5454</Text>}
                                        {method === 'Apple Pay' && <Text style={[styles.paymentOptionSub, selectedPayment === method && { color: 'rgba(255,255,255,0.7)' }]}>Connected</Text>}
                                        {method === 'PayPal' && <Text style={[styles.paymentOptionSub, selectedPayment === method && { color: 'rgba(255,255,255,0.7)' }]}>faisal@example.com</Text>}
                                    </View>
                                </View>
                                <View style={[
                                    styles.radioCircle,
                                    selectedPayment === method && styles.activeRadioCircle
                                ]}>
                                    {selectedPayment === method && <CheckCircle2 size={16} color="#FFFFFF" />}
                                </View>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.confirmPayButton}
                            onPress={handlePayment}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.confirmPayButtonText}>Pay GX {total.toLocaleString()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#1C1C1E',
        letterSpacing: -0.5,
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 120,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 16,
    },

    // Address
    addressContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 15,
        elevation: 4,
    },
    addressIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    addressName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#8E8E93',
        lineHeight: 22,
    },
    editBtn: {
        padding: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
    },

    // Items
    itemsWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 15,
        elevation: 4,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 16,
        backgroundColor: '#F0F0F0',
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    itemType: {
        fontSize: 12,
        color: '#A0A0A0',
        fontWeight: '600',
        marginBottom: 8,
    },
    priceRowItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '900',
        color: '#1C1C1E',
    },
    qtyText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
    },

    // Summary
    summaryContainer: {
        marginTop: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 15,
        elevation: 4,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#8E8E93',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FF6B4A',
    },

    // Bottom Bar
    bottomCheckoutBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingVertical: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 24,
        backgroundColor: 'rgba(250, 250, 250, 0.95)',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    payButton: {
        backgroundColor: '#1C1C1E',
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 12,
    },
    payButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    },
    modalDragIndicator: {
        width: 48,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#E0E0E0',
        alignSelf: 'center',
        marginBottom: 24,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#1C1C1E',
    },
    secureBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 199, 89, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    secureText: {
        color: '#34C759',
        fontWeight: '700',
        fontSize: 12,
        marginLeft: 4,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#F8F8F8',
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activePaymentOption: {
        backgroundColor: '#1C1C1E',
        borderColor: '#1C1C1E',
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
    },
    paymentOptionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIconPlaceholder: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentOptionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    paymentOptionSub: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '500',
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D0D0D0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeRadioCircle: {
        borderColor: '#FFFFFF',
        backgroundColor: '#1C1C1E',
    },
    confirmPayButton: {
        backgroundColor: '#FF6B4A',
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        shadowColor: '#FF6B4A',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 12,
    },
    confirmPayButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
});
