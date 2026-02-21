import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    Animated,
    Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, CheckCircle2, Circle, MapPin, Package, Truck, Home as HomeIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomNav } from '../components/BottomNav';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

const ORDER_STATUSES = [
    {
        id: '1',
        title: 'Package Ordered',
        completed: true,
        date: '18th Aug, 2023',
        time: '09:00am',
        icon: Package,
    },
    {
        id: '2',
        title: 'Pick-up',
        completed: true,
        date: '19th Aug, 2023',
        time: '11:30am',
        icon: Package,
    },
    {
        id: '3',
        title: 'In transit',
        completed: true,
        date: '20th Aug, 2023',
        time: '02:15pm',
        icon: Truck,
        isActive: true,
    },
    {
        id: '4',
        title: 'Delivered',
        completed: false,
        date: '',
        time: '',
        icon: HomeIcon,
    },
];

export const OrderTrackingScreen: React.FC<Props> = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

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
                    <Text style={styles.headerTitle}>Track Order</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                    {/* Enhanced Map Container */}
                    <Animated.View 
                        style={[
                            styles.mapContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <LinearGradient
                            colors={['#F8F9FA', '#E9ECEF', '#DEE2E6']}
                            style={styles.mapGradient}
                        >
                            <View style={styles.mapContent}>
                                <View style={styles.mapPath}>
                                    <View style={styles.mapPinContainer}>
                                        <View style={styles.mapPin}>
                                            <MapPin size={20} color={colors.white} fill={colors.primary} />
                                        </View>
                                        <View style={styles.pinPulse} />
                                        <Text style={styles.pinLabel}>Origin</Text>
                                    </View>
                                    
                                    <View style={styles.mapLineContainer}>
                                        <View style={styles.mapLine} />
                                        <View style={styles.truckContainer}>
                                            <Truck size={16} color={colors.primary} />
                                        </View>
                                    </View>
                                    
                                    <View style={styles.mapPinContainer}>
                                        <View style={[styles.mapPin, styles.mapPinDestination]}>
                                            <HomeIcon size={20} color={colors.white} fill={colors.primary} />
                                        </View>
                                        <Text style={styles.pinLabel}>Destination</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </Animated.View>

                    {/* Enhanced Order Details Card */}
                    <Animated.View 
                        style={[
                            styles.orderCard,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.orderHeader}>
                            <LinearGradient
                                colors={[colors.primary, '#FF6B4A']}
                                style={styles.orderIconGradient}
                            >
                                <Package size={24} color={colors.white} />
                            </LinearGradient>
                            <View style={styles.orderInfo}>
                                <Text style={styles.orderItemName}>Abracadabra Shirt</Text>
                                <Text style={styles.orderId}>Order #SM-12345</Text>
                                <View style={styles.etaContainer}>
                                    <Text style={styles.etaLabel}>Estimated Delivery:</Text>
                                    <Text style={styles.etaValue}>2-3 days</Text>
                                </View>
                            </View>
                        </View>

                        {/* Enhanced Status Timeline */}
                        <View style={styles.timeline}>
                            {ORDER_STATUSES.map((status, index) => {
                                const Icon = status.icon;
                                const isActive = status.isActive;
                                
                                return (
                                    <View key={status.id} style={styles.timelineItem}>
                                        <View style={styles.timelineLeft}>
                                            {status.completed ? (
                                                <View style={[
                                                    styles.completedIcon,
                                                    isActive && styles.activeIconContainer
                                                ]}>
                                                    <LinearGradient
                                                        colors={isActive ? [colors.primary, '#FF6B4A'] : ['#4CAF50', '#45A049']}
                                                        style={styles.iconGradient}
                                                    >
                                                        <Icon size={16} color={colors.white} />
                                                    </LinearGradient>
                                                    {isActive && <View style={styles.activePulse} />}
                                                </View>
                                            ) : (
                                                <View style={styles.pendingIcon}>
                                                    <View style={styles.pendingIconInner}>
                                                        <Icon size={16} color="#E0E0E0" />
                                                    </View>
                                                </View>
                                            )}
                                            {index < ORDER_STATUSES.length - 1 && (
                                                <View style={[
                                                    styles.timelineLine,
                                                    status.completed && styles.timelineLineActive
                                                ]} />
                                            )}
                                        </View>
                                        <View style={styles.timelineContent}>
                                            <View style={styles.statusHeader}>
                                                <Text style={[
                                                    styles.statusTitle,
                                                    !status.completed && styles.statusTitlePending,
                                                    isActive && styles.statusTitleActive
                                                ]}>
                                                    {status.title}
                                                </Text>
                                                {isActive && (
                                                    <View style={styles.activeBadge}>
                                                        <Text style={styles.activeBadgeText}>Current</Text>
                                                    </View>
                                                )}
                                            </View>
                                            {status.completed && (
                                                <Text style={styles.statusDate}>
                                                    {status.date}, {status.time}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>

                        {/* Enhanced Action Buttons */}
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => navigation.goBack()}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.cancelButtonText}>Cancel Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => navigation.goBack()}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </ScrollView>
                <BottomNav />
            </SafeAreaView>
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
        paddingBottom: 24,
    },
    mapContainer: {
        marginHorizontal: 24,
        marginTop: 20,
        marginBottom: 24,
        height: 220,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    mapGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContent: {
        width: '100%',
        paddingHorizontal: 20,
    },
    mapPath: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    mapPinContainer: {
        alignItems: 'center',
    },
    mapPin: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        marginBottom: 8,
    },
    mapPinDestination: {
        backgroundColor: '#4CAF50',
    },
    pinPulse: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primary,
        opacity: 0.3,
    },
    pinLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.text,
        marginTop: 4,
    },
    mapLineContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 8,
        position: 'relative',
    },
    mapLine: {
        width: '100%',
        height: 4,
        backgroundColor: colors.primary,
        borderRadius: 2,
        opacity: 0.6,
    },
    truckContainer: {
        position: 'absolute',
        top: -8,
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    orderCard: {
        marginHorizontal: 24,
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 6,
        marginBottom: 100,
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 28,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    orderIconGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    orderInfo: {
        flex: 1,
    },
    orderItemName: {
        fontSize: 18,
        fontWeight: typography.weightBold,
        color: colors.text,
        marginBottom: 6,
    },
    orderId: {
        fontSize: 13,
        color: colors.muted,
        marginBottom: 8,
    },
    etaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    etaLabel: {
        fontSize: 12,
        color: colors.muted,
        marginRight: 6,
    },
    etaValue: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.primary,
    },
    timeline: {
        marginBottom: 24,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineLeft: {
        alignItems: 'center',
        marginRight: 16,
    },
    completedIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    activeIconContainer: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4,
    },
    iconGradient: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activePulse: {
        position: 'absolute',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary,
        opacity: 0.3,
    },
    pendingIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pendingIconInner: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timelineLine: {
        width: 3,
        height: 48,
        backgroundColor: '#E0E0E0',
        marginTop: 6,
        borderRadius: 2,
    },
    timelineLineActive: {
        backgroundColor: colors.primary,
    },
    timelineContent: {
        flex: 1,
        paddingTop: 4,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statusTitle: {
        fontSize: 15,
        fontWeight: typography.weightSemi,
        color: colors.text,
        marginRight: 8,
    },
    statusTitlePending: {
        color: colors.muted,
    },
    statusTitleActive: {
        color: colors.primary,
        fontWeight: typography.weightBold,
    },
    activeBadge: {
        backgroundColor: '#FFF5F2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    activeBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.primary,
    },
    statusDate: {
        fontSize: 12,
        color: colors.muted,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    cancelButton: {
        flex: 1,
        height: 52,
        backgroundColor: colors.primary,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    cancelButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: typography.weightBold,
    },
    closeButton: {
        flex: 1,
        height: 52,
        backgroundColor: '#F5F5F5',
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    closeButtonText: {
        color: colors.text,
        fontSize: 15,
        fontWeight: typography.weightSemi,
    },
});
