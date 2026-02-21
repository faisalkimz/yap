import React from 'react';
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
    Bell,
    BookOpen,
    Store,
    MoveRight
} from 'lucide-react-native';

import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const DASHBOARD_ITEMS = [
    { icon: User, label: 'Info', route: 'EditProfile', sub: 'Details' },
    { icon: Package, label: 'Orders', route: 'Orders', sub: 'Track' },
    { icon: MapPin, label: 'Address', route: 'Address', sub: 'Book' },
    { icon: Wallet, label: 'Wallet', route: 'Wallet', sub: 'Funds' },
];

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.brandTitle}>YAP</Text>
                    <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Notifications')}>
                        <Bell size={22} color="#1C1C1E" />
                        <View style={styles.notifDot} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.hero}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
                                <Pencil size={12} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.heroText}>
                            <Text style={styles.greeting}>Good Evening,</Text>
                            <Text style={styles.name}>Faisal Kimz</Text>
                            <View style={styles.statusRow}>
                                <Text style={styles.statusText}>Titanium Curator</Text>
                                <View style={styles.statusDivider} />
                                <Text style={styles.statusPoints}>2.4k Pts</Text>
                            </View>
                        </View>
                    </View>

                    {/* Dashboard Grid - Human Layout */}
                    <View style={styles.gridSection}>
                        <View style={styles.gridRow}>
                            {DASHBOARD_ITEMS.slice(0, 2).map((item, idx) => {
                                const isLarge = idx === 0;
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[styles.gridCard, isLarge && styles.gridCardLarge]}
                                        onPress={() => navigation.navigate(item.route as any)}
                                    >
                                        <item.icon size={24} color={isLarge ? "#FFFFFF" : "#1C1C1E"} strokeWidth={1.5} />
                                        <View style={styles.cardLabels}>
                                            <Text style={[styles.cardMain, isLarge && { color: '#FFFFFF' }]}>{item.label}</Text>
                                            <Text style={[styles.cardSub, isLarge && { color: 'rgba(255,255,255,0.6)' }]}>{item.sub}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <View style={styles.gridRow}>
                            {DASHBOARD_ITEMS.slice(2, 4).map((item, idx) => {
                                const isLarge = idx === 1;
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[styles.gridCard, isLarge && styles.gridCardLarge]}
                                        onPress={() => navigation.navigate(item.route as any)}
                                    >
                                        <item.icon size={24} color={isLarge ? "#FFFFFF" : "#1C1C1E"} strokeWidth={1.5} />
                                        <View style={styles.cardLabels}>
                                            <Text style={[styles.cardMain, isLarge && { color: '#FFFFFF' }]}>{item.label}</Text>
                                            <Text style={[styles.cardSub, isLarge && { color: 'rgba(255,255,255,0.6)' }]}>{item.sub}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Curated Links */}
                    <View style={styles.curatedSection}>
                        <Text style={styles.sectionHeading}>Curated for you</Text>

                        <TouchableOpacity style={styles.curatedLink} onPress={() => navigation.navigate('StoreLocator')}>
                            <View style={styles.curatedLeft}>
                                <Store size={20} color="#1C1C1E" />
                                <Text style={styles.curatedLabel}>Find a Boutique</Text>
                            </View>
                            <MoveRight size={20} color="#1C1C1E" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.curatedLink} onPress={() => navigation.navigate('Favorites')}>
                            <View style={styles.curatedLeft}>
                                <Heart size={20} color="#1C1C1E" />
                                <Text style={styles.curatedLabel}>The Collection (Wishlist)</Text>
                            </View>
                            <MoveRight size={20} color="#1C1C1E" />
                        </TouchableOpacity>
                    </View>

                    {/* App Maintenance */}
                    <View style={styles.appMaintenance}>
                        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('Settings')}>
                            <Settings size={18} color="#8E8E93" />
                            <Text style={styles.settingText}>Preference Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('SupportHub')}>
                            <HelpCircle size={18} color="#8E8E93" />
                            <Text style={styles.settingText}>Assistance & Policies</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.signOutBtn}
                            onPress={() => navigation.navigate('LogoutConfirmation')}
                        >
                            <Text style={styles.signOutText}>Secure Logout</Text>
                            <LogOut size={16} color={colors.accent} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.legalNotice}>Handcrafted by Yap PLC. v2.4.1</Text>
                </ScrollView>
            </SafeAreaView>
            <BottomNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
    brandTitle: { fontSize: 28, fontWeight: '900', color: colors.secondary, letterSpacing: -1.5 },
    iconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.lightGray, justifyContent: 'center', alignItems: 'center' },
    notifDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.lightGray },

    scrollContent: { paddingBottom: 120 },

    hero: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginTop: 24, marginBottom: 40 },
    avatarWrapper: { position: 'relative' },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.lightGray },
    editBtn: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.white },
    heroText: { marginLeft: 20 },
    greeting: { fontSize: 13, color: colors.muted, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
    name: { fontSize: 24, fontWeight: '900', color: colors.secondary, letterSpacing: -0.5 },
    statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    statusText: { fontSize: 13, fontWeight: '800', color: colors.primary },
    statusDivider: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.border, marginHorizontal: 10 },
    statusPoints: { fontSize: 13, fontWeight: '800', color: colors.secondary },

    gridSection: { paddingHorizontal: 24, gap: 12 },
    gridRow: { flexDirection: 'row', gap: 12 },
    gridCard: { flex: 1, height: 120, backgroundColor: colors.lightGray, borderRadius: 2, padding: 20, justifyContent: 'space-between' },
    gridCardLarge: { flex: 1.4, backgroundColor: colors.secondary },
    cardLabels: {},
    cardMain: { fontSize: 16, fontWeight: '900', color: colors.secondary },
    cardSub: { fontSize: 11, fontWeight: '800', color: colors.muted, textTransform: 'uppercase', marginTop: 2 },
    // Adjust colors for large card
    gridCardLarge_icon: { color: colors.white },

    curatedSection: { marginTop: 48, paddingHorizontal: 24 },
    sectionHeading: { fontSize: 12, fontWeight: '900', color: colors.muted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 },
    curatedLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.lightGray },
    curatedLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    curatedLabel: { fontSize: 17, fontWeight: '700', color: colors.secondary },

    appMaintenance: { marginTop: 48, paddingHorizontal: 24, gap: 16 },
    settingBtn: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    settingText: { fontSize: 14, fontWeight: '800', color: colors.muted },
    signOutBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
    signOutText: { fontSize: 14, fontWeight: '900', color: colors.accent, textTransform: 'uppercase', letterSpacing: 1 },

    legalNotice: { textAlign: 'center', marginTop: 60, fontSize: 11, color: colors.muted, fontWeight: '700', letterSpacing: 1 }
});
