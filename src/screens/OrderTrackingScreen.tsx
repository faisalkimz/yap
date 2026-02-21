import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    Platform,
    StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ChevronLeft, Check, MapPin, Package, Truck, Home as HomeIcon, CheckCheck } from 'lucide-react-native';
import { BottomNav } from '../components/BottomNav';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

const ORDER_STATUSES = [
    {
        id: '1',
        title: 'Order Placed',
        subtitle: 'We have received your order',
        completed: true,
        date: '18 Aug',
        time: '09:00 AM',
        icon: Package,
    },
    {
        id: '2',
        title: 'Processing',
        subtitle: 'We are preparing your package',
        completed: true,
        date: '19 Aug',
        time: '11:30 AM',
        icon: CheckCheck,
    },
    {
        id: '3',
        title: 'In Transit',
        subtitle: 'Your package is on the way',
        completed: true,
        date: '20 Aug',
        time: '02:15 PM',
        icon: Truck,
        isActive: true,
    },
    {
        id: '4',
        title: 'Delivered',
        subtitle: 'Package arrived at destination',
        completed: false,
        date: '',
        time: '',
        icon: HomeIcon,
    },
];

export const OrderTrackingScreen: React.FC<Props> = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order Details</Text>
                    <View style={{ width: 48 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                    {/* Order Meta */}
                    <Animated.View style={[styles.orderMetaCard, { opacity: fadeAnim }]}>
                        <View style={styles.orderMetaRow}>
                            <Text style={styles.orderNumberLabel}>Order No.</Text>
                            <Text style={styles.orderNumber}>#SM-12345</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.orderMetaCols}>
                            <View style={styles.metaCol}>
                                <Text style={styles.metaColLabel}>Est. Delivery</Text>
                                <Text style={styles.metaColValue}>24 Aug</Text>
                            </View>
                            <View style={styles.metaCol}>
                                <Text style={styles.metaColLabel}>Courier</Text>
                                <Text style={styles.metaColValue}>FedEx</Text>
                            </View>
                            <View style={styles.metaCol}>
                                <Text style={styles.metaColLabel}>Status</Text>
                                <View style={styles.statusBadge}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusBadgeText}>On the way</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Progress Map visual representation - minimalistic */}
                    <Text style={styles.sectionTitle}>Track Shipment</Text>

                    <Animated.View style={[styles.trackingCard, { opacity: fadeAnim }]}>
                        {ORDER_STATUSES.map((status, index) => {
                            const Icon = status.icon;
                            const isActive = status.isActive;
                            const isLast = index === ORDER_STATUSES.length - 1;

                            return (
                                <View key={status.id} style={styles.timelineRow}>
                                    {/* Left Track */}
                                    <View style={styles.timelineLeft}>
                                        <View style={[
                                            styles.iconWrapper,
                                            status.completed ? styles.iconWrapperComplete : styles.iconWrapperPending,
                                            isActive && styles.iconWrapperActive
                                        ]}>
                                            <Icon
                                                size={18}
                                                color={isActive ? '#FFFFFF' : status.completed ? '#1C1C1E' : '#A0A0A0'}
                                            />
                                        </View>
                                        {!isLast && (
                                            <View style={[
                                                styles.timelineLine,
                                                status.completed ? styles.timelineLineComplete : styles.timelineLinePending
                                            ]} />
                                        )}
                                    </View>

                                    {/* Right Content */}
                                    <View style={styles.timelineRight}>
                                        <View style={styles.timelineTextGroup}>
                                            <Text style={[styles.statusTitle, isActive && styles.statusTitleActive]}>{status.title}</Text>
                                            <Text style={styles.statusSubtitle}>{status.subtitle}</Text>
                                        </View>
                                        <View style={styles.timelineTimeGroup}>
                                            {status.date ? (
                                                <>
                                                    <Text style={styles.statusTime}>{status.time}</Text>
                                                    <Text style={styles.statusDate}>{status.date}</Text>
                                                </>
                                            ) : null}
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </Animated.View>

                    {/* Shipping Info Card */}
                    <Text style={styles.sectionTitle}>Shipping Details</Text>
                    <View style={styles.shippingCard}>
                        <View style={styles.addressIconWrapper}>
                            <MapPin size={24} color="#1C1C1E" />
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressName}>Faisal Kimz</Text>
                            <Text style={styles.addressText}>6, Cole Palmer Avenue, London</Text>
                            <Text style={styles.addressPhone}>+44 7890 123456</Text>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    backButton: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    content: { paddingHorizontal: 24, paddingVertical: 16, paddingBottom: 100 },

    orderMetaCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.03, shadowRadius: 15, elevation: 4 },
    orderMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderNumberLabel: { fontSize: 13, color: '#8E8E93', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
    orderNumber: { fontSize: 16, color: '#1C1C1E', fontWeight: '900' },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 20 },
    orderMetaCols: { flexDirection: 'row', justifyContent: 'space-between' },
    metaCol: { alignItems: 'flex-start' },
    metaColLabel: { fontSize: 13, color: '#8E8E93', fontWeight: '500', marginBottom: 4 },
    metaColValue: { fontSize: 15, color: '#1C1C1E', fontWeight: '800' },
    statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF5F2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF6B4A', marginRight: 6 },
    statusBadgeText: { fontSize: 12, fontWeight: '800', color: '#FF6B4A' },

    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1C1C1E', marginBottom: 16, letterSpacing: -0.2 },

    trackingCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.03, shadowRadius: 15, elevation: 4 },
    timelineRow: { flexDirection: 'row', marginBottom: 0 },
    timelineLeft: { width: 48, alignItems: 'center' },
    iconWrapper: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
    iconWrapperComplete: { backgroundColor: '#F5F5F5' },
    iconWrapperPending: { backgroundColor: '#FAFAFA', borderWidth: 2, borderColor: '#F0F0F0' },
    iconWrapperActive: { backgroundColor: '#FF6B4A', shadowColor: '#FF6B4A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
    timelineLine: { width: 2, flex: 1, minHeight: 30, marginVertical: -4, zIndex: 1 },
    timelineLineComplete: { backgroundColor: '#1C1C1E' },
    timelineLinePending: { backgroundColor: '#F0F0F0', borderStyle: 'dashed' },
    timelineRight: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 40, paddingLeft: 16, paddingTop: 6 },
    timelineTextGroup: { flex: 1, paddingRight: 16 },
    statusTitle: { fontSize: 16, fontWeight: '800', color: '#1C1C1E', marginBottom: 4 },
    statusTitleActive: { color: '#FF6B4A' },
    statusSubtitle: { fontSize: 13, color: '#8E8E93', fontWeight: '500', lineHeight: 18 },
    timelineTimeGroup: { alignItems: 'flex-end' },
    statusTime: { fontSize: 13, fontWeight: '800', color: '#1C1C1E', marginBottom: 2 },
    statusDate: { fontSize: 12, color: '#8E8E93', fontWeight: '500' },

    shippingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.03, shadowRadius: 15, elevation: 4 },
    addressIconWrapper: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    addressInfo: { flex: 1 },
    addressName: { fontSize: 16, fontWeight: '800', color: '#1C1C1E', marginBottom: 4 },
    addressText: { fontSize: 14, color: '#8E8E93', marginBottom: 2 },
    addressPhone: { fontSize: 14, color: '#8E8E93', fontWeight: '500' },
});
