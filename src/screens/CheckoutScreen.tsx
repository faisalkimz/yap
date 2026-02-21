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
    Dimensions
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, MapPin, Pencil, CheckCircle2 } from 'lucide-react-native';

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
    const [selectedPayment, setSelectedPayment] = useState('Credit Card');

    const subtotal = CHECKOUT_ITEMS.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vat = 350;
    const delivery = 150;
    const total = subtotal + vat + delivery;

    const handlePayment = () => {
        setPaymentModalVisible(false);
        navigation.replace('OrderSuccess');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                    {/* Items List */}
                    {CHECKOUT_ITEMS.map((item) => (
                        <View key={item.id} style={styles.itemCard}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemType}>{item.type}</Text>
                                <Text style={styles.itemPrice}>GX {item.price.toLocaleString()}</Text>
                            </View>
                            <View style={styles.qtyBadge}>
                                <Text style={styles.qtyText}>x{item.qty}</Text>
                            </View>
                        </View>
                    ))}

                    {/* Delivery Address */}
                    <Text style={styles.sectionTitle}>Delivery Address</Text>
                    <View style={styles.addressContainer}>
                        <View style={styles.addressRow}>
                            <Text style={styles.addressText}>
                                6, Cole Palmer Avenue, London Portugal
                            </Text>
                            <TouchableOpacity>
                                <Pencil size={18} color={colors.muted} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Summary */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Price</Text>
                            <Text style={styles.summaryValue}>GX {subtotal.toLocaleString()}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>VAT</Text>
                            <Text style={styles.summaryValue}>GX {vat}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Fee</Text>
                            <Text style={styles.summaryValue}>GX {delivery}</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>GX {total.toLocaleString()}</Text>
                        </View>
                    </View>

                    {/* Discount Code */}
                    <Text style={styles.discountLabel}>Discount Code (Optional)</Text>
                    <View style={styles.discountInputContainer}>
                        <TextInput
                            placeholder="Enter Code"
                            style={styles.discountInput}
                            placeholderTextColor={colors.muted}
                        />
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        style={styles.payButton}
                        onPress={() => setPaymentModalVisible(true)}
                    >
                        <Text style={styles.payButtonText}>Continue to Pay GX {total.toLocaleString()}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Payment Modal */}
            <Modal
                visible={isPaymentModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setPaymentModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Payment Methods</Text>
                        </View>

                        {['Credit Card', 'Google Pay', 'PayPal'].map((method) => (
                            <TouchableOpacity
                                key={method}
                                style={[
                                    styles.paymentOption,
                                    selectedPayment === method && styles.activePaymentOption
                                ]}
                                onPress={() => setSelectedPayment(method)}
                            >
                                <View style={styles.paymentOptionLeft}>
                                    {/* Placeholder icons */}
                                    <View style={styles.paymentIconPlaceholder} />
                                    <View>
                                        <Text style={styles.paymentOptionTitle}>{method}</Text>
                                        {method === 'Credit Card' && <Text style={styles.paymentOptionSub}>2334 5454 ****</Text>}
                                        {method === 'Google Pay' && <Text style={styles.paymentOptionSub}>Micheal K...</Text>}
                                        {method === 'PayPal' && <Text style={styles.paymentOptionSub}>Micheal K...</Text>}
                                    </View>
                                </View>
                                <View style={[
                                    styles.radioCircle,
                                    selectedPayment === method && styles.activeRadioCircle
                                ]}>
                                    {selectedPayment === method && <View style={styles.radioDot} />}
                                </View>
                            </TouchableOpacity>
                        ))}

                        <View style={styles.modalDivider} />

                        <View style={styles.addressRow}>
                            <Text style={{ color: colors.muted, fontSize: 12 }}>Delivery Address:</Text>
                        </View>
                        <Text style={[styles.addressText, { marginBottom: 20 }]}>6, Cole Palmer Avenue, Lagos Portugal</Text>


                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={handlePayment} // Navigate to Success
                        >
                            <Text style={styles.payButtonText}>Continue to Pay GX {total.toLocaleString()}</Text>
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
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: typography.weightBold,
        color: colors.text,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 120,
    },
    itemCard: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    itemType: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary,
    },
    qtyBadge: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    qtyText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },
    sectionTitle: {
        fontSize: 14,
        color: colors.muted,
        marginBottom: 8,
        marginTop: 16,
    },
    addressContainer: {
        marginBottom: 24,
    },
    addressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addressText: {
        fontSize: 14,
        color: colors.text,
        maxWidth: '90%',
        lineHeight: 20,
        fontWeight: '500',
    },
    summaryContainer: {
        marginTop: 10,
        marginBottom: 24,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: colors.muted,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    discountLabel: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: 8,
    },
    discountInputContainer: {
        backgroundColor: colors.white,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    discountInput: {
        fontSize: 14,
        color: colors.text,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    payButton: {
        backgroundColor: colors.primary,
        height: 58,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
    },
    payButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FAFAFA',
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    activePaymentOption: {
        borderColor: colors.primary,
        backgroundColor: '#FFF5F2', // Light orange tint
    },
    paymentOptionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIconPlaceholder: {
        width: 32,
        height: 24,
        backgroundColor: '#EEE',
        borderRadius: 4,
        marginRight: 12,
    },
    paymentOptionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },
    paymentOptionSub: {
        fontSize: 12,
        color: colors.muted,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeRadioCircle: {
        borderColor: colors.primary,
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    modalDivider: {
        height: 1,
        backgroundColor: '#EAEAEA',
        marginVertical: 20,
    },
});

