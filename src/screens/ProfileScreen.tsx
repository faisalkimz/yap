import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Platform, StatusBar } from 'react-native';
import { colors } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BottomNav } from '../components/BottomNav';
import {
    Settings,
    CreditCard,
    MapPin,
    Package,
    LogOut,
    ChevronRight,
    Pencil,
    HelpCircle,
    User,
    Shield
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const MENU_ITEMS = [
    { icon: User, label: 'Personal Information', route: 'EditProfile' },
    { icon: Package, label: 'My Orders', route: 'Orders' },
    { icon: CreditCard, label: 'Payment Methods', route: 'PaymentMethods' },
    { icon: MapPin, label: 'Shipping Address', route: 'Address' },
];

const PREFERENCES_ITEMS = [
    { icon: Settings, label: 'Settings', route: 'Settings' },
    { icon: Shield, label: 'Privacy & Security', route: 'Security' },
    { icon: HelpCircle, label: 'Help & Support', route: 'Support' },
];

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Account</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Modern Profile Card */}
                    <View style={styles.profileCard}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                                <Pencil size={14} color="#FFFFFF" strokeWidth={3} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>Faisal Kimz</Text>
                            <Text style={styles.email}>faisal@example.com</Text>
                            <View style={styles.proBadge}>
                                <Text style={styles.proBadgeText}>PRO MEMBER</Text>
                            </View>
                        </View>
                    </View>

                    {/* Account Settings Menu */}
                    <Text style={styles.sectionTitle}>General</Text>
                    <View style={styles.menuContainer}>
                        {MENU_ITEMS.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.menuItem, index === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
                                onPress={() => navigation.navigate(item.route as any)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.menuItemLeft}>
                                    <View style={styles.iconContainer}>
                                        <item.icon size={20} color="#1C1C1E" strokeWidth={2} />
                                    </View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </View>
                                <ChevronRight size={20} color="#D1D1D6" strokeWidth={2.5} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Preferences Menu */}
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.menuContainer}>
                        {PREFERENCES_ITEMS.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.menuItem, index === PREFERENCES_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
                                onPress={() => navigation.navigate(item.route as any)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.menuItemLeft}>
                                    <View style={styles.iconContainer}>
                                        <item.icon size={20} color="#1C1C1E" strokeWidth={2} />
                                    </View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </View>
                                <ChevronRight size={20} color="#D1D1D6" strokeWidth={2.5} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('LogoutConfirmation')}
                    >
                        <View style={styles.logoutIconContainer}>
                            <LogOut size={20} color="#FF3B30" strokeWidth={2.5} />
                        </View>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>

                    <Text style={styles.versionText}>Yap App v1.0.0</Text>
                </ScrollView>
            </SafeAreaView>
            <BottomNav />
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
        paddingBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1C1C1E',
        letterSpacing: -1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 120, // BottomNav spacing
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 24,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 15,
        elevation: 4,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#F5F5F5',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1C1C1E',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: '900',
        color: '#1C1C1E',
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    email: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
        marginBottom: 8,
    },
    proBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 107, 74, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    proBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#FF6B4A',
        letterSpacing: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    menuContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 20,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.03,
        shadowRadius: 15,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF0F0',
        paddingVertical: 18,
        borderRadius: 20,
        marginBottom: 24,
    },
    logoutIconContainer: {
        marginRight: 12,
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '800',
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: '#C7C7CC',
        marginBottom: 20,
    }
});
