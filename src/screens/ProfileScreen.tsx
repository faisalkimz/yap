import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Platform, StatusBar } from 'react-native';
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
    Shield,
    Heart,
    Eye,
    Star,
    Ticket,
    Wallet,
    Bell
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const DASHBOARD_MENU = [
    { icon: User, label: 'Personal Information', route: 'EditProfile' },
    { icon: Package, label: 'My Orders', route: 'Orders' },
    { icon: MapPin, label: 'Address Book', route: 'Address' },
    { icon: CreditCard, label: 'Saved Payments', route: 'PaymentMethods' },
];

const SHOPPING_MENU = [
    { icon: Heart, label: 'Wishlist', route: 'Favorites' },
    { icon: Eye, label: 'Recently Viewed', route: 'Home' }, // Placeholder routes
    { icon: Star, label: 'My Reviews', route: 'Support' },
    { icon: Ticket, label: 'My Coupons', route: 'Support' },
];

const PREFERENCES_MENU = [
    { icon: Settings, label: 'Settings', route: 'Settings' },
    { icon: Shield, label: 'Privacy & Security', route: 'Support' },
    { icon: HelpCircle, label: 'Help & Support', route: 'Support' },
];

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Account</Text>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <TouchableOpacity style={styles.iconHeader} onPress={() => navigation.navigate('Notifications')}>
                            <Bell size={22} color="#1C1C1E" strokeWidth={2.5} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.walletHeader} onPress={() => navigation.navigate('Wallet')}>
                            <Wallet size={18} color="#1C1C1E" strokeWidth={2.5} />
                            <Text style={styles.walletAmount}>£1,250.00</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Premium Profile Hero */}
                    <View style={styles.profileHero}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editBadge} activeOpacity={0.8} onPress={() => navigation.navigate('EditProfile')}>
                                <Pencil size={12} color="#FFFFFF" strokeWidth={3} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.name}>Faisal Kimz</Text>
                        <Text style={styles.email}>faisal@example.com</Text>
                        <View style={styles.rankBadge}>
                            <Text style={styles.rankText}>TITANIUM MEMBER</Text>
                        </View>
                    </View>

                    {/* Dashboard Section */}
                    <Text style={styles.sectionTitle}>Dashboard</Text>
                    <View style={styles.menuCard}>
                        {DASHBOARD_MENU.map((item, index) => (
                            <MenuRow key={index} item={item} navigation={navigation} isLast={index === DASHBOARD_MENU.length - 1} />
                        ))}
                    </View>

                    {/* Shopping Section */}
                    <Text style={styles.sectionTitle}>Shopping & Content</Text>
                    <View style={styles.menuCard}>
                        {SHOPPING_MENU.map((item, index) => (
                            <MenuRow
                                key={index}
                                item={{
                                    ...item,
                                    route: item.label === 'Wishlist' ? 'Favorites' : 'ShoppingExtras'
                                }}
                                navigation={navigation}
                                isLast={index === SHOPPING_MENU.length - 1}
                            />
                        ))}
                    </View>

                    {/* Preferences Section */}
                    <Text style={styles.sectionTitle}>App Preferences</Text>
                    <View style={styles.menuCard}>
                        {PREFERENCES_MENU.map((item, index) => (
                            <MenuRow key={index} item={item} navigation={navigation} isLast={index === PREFERENCES_MENU.length - 1} />
                        ))}
                    </View>

                    {/* Logout */}
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={() => navigation.navigate('LogoutConfirmation')}
                    >
                        <LogOut size={20} color="#FF3B30" strokeWidth={2.5} style={{ marginRight: 12 }} />
                        <Text style={styles.logoutText}>Securely Log Out</Text>
                    </TouchableOpacity>

                    <Text style={styles.version}>Yap Luxurious Lifestyle • v1.4.2</Text>
                </ScrollView>
            </SafeAreaView>
            <BottomNav />
        </View>
    );
};

const MenuRow = ({ item, navigation, isLast }: any) => (
    <TouchableOpacity
        style={[styles.menuRow, !isLast && styles.menuBorder]}
        onPress={() => navigation.navigate(item.route)}
        activeOpacity={0.6}
    >
        <View style={styles.menuLeft}>
            <View style={styles.iconBox}>
                <item.icon size={20} color="#1C1C1E" strokeWidth={2} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
        </View>
        <ChevronRight size={18} color="#C7C7CC" strokeWidth={3} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, marginBottom: 24 },
    title: { fontSize: 32, fontWeight: '900', color: '#1C1C1E', letterSpacing: -1 },
    iconHeader: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    walletHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, gap: 8 },
    walletAmount: { fontSize: 14, fontWeight: '900', color: '#1C1C1E' },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 140 },

    profileHero: { alignItems: 'center', marginBottom: 40 },
    avatarContainer: { position: 'relative', marginBottom: 16 },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#FFFFFF' },
    editBadge: { position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderRadius: 15, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFFFFF' },
    name: { fontSize: 24, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5, marginBottom: 4 },
    email: { fontSize: 14, color: '#8E8E93', fontWeight: '500', marginBottom: 12 },
    rankBadge: { backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    rankText: { fontSize: 10, fontWeight: '900', color: '#1C1C1E', letterSpacing: 1.5 },

    sectionTitle: { fontSize: 13, fontWeight: '900', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, marginLeft: 4 },
    menuCard: { backgroundColor: '#FFFFFF', borderRadius: 28, paddingHorizontal: 20, marginBottom: 32, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 2 },
    menuRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 },
    menuBorder: { borderBottomWidth: 1, borderBottomColor: '#F8F8F8' },
    menuLeft: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    menuLabel: { fontSize: 16, fontWeight: '700', color: '#1C1C1E' },

    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF5F2', paddingVertical: 20, borderRadius: 24, marginBottom: 40 },
    logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '800' },
    version: { textAlign: 'center', fontSize: 12, fontWeight: '700', color: '#C7C7CC', letterSpacing: 0.5 }
});
