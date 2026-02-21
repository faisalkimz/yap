import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
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
    User
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const MENU_ITEMS = [
    { icon: User, label: 'Personal Information', route: 'EditProfile' },
    { icon: Package, label: 'My Orders', route: 'Orders' },
    { icon: CreditCard, label: 'Payment Methods', route: 'PaymentMethods' },
    { icon: MapPin, label: 'Shipping Address', route: 'Address' },
    { icon: Settings, label: 'Settings', route: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support', route: 'Support' },
];

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Profile Card */}
                    <View style={styles.profileCard}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editButton}>
                                <Pencil size={16} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.name}>Mike Johnson</Text>
                        <Text style={styles.email}>mike.johnson@example.com</Text>
                    </View>

                    {/* Menu Items */}
                    <View style={styles.menuContainer}>
                        {MENU_ITEMS.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={() => navigation.navigate(item.route as any)}
                            >
                                <View style={styles.menuItemLeft}>
                                    <View style={styles.iconContainer}>
                                        <item.icon size={20} color={colors.text} />
                                    </View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </View>
                                <ChevronRight size={20} color={colors.muted} />
                            </TouchableOpacity>
                        ))}


                        {/* Logout Button */}
                        <TouchableOpacity style={styles.logoutButton}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.iconContainer, styles.logoutIconContainer]}>
                                    <LogOut size={20} color="#FF3B30" />
                                </View>
                                <Text style={[styles.menuLabel, styles.logoutText]}>Log Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BottomNav />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: typography.weightBold,
        color: colors.text,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    profileCard: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: colors.white,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.white,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: colors.muted,
    },
    menuContainer: {
        paddingHorizontal: 24,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 18,
        borderRadius: 20,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.text,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
        marginTop: 12,
        marginBottom: 24,
    },
    logoutIconContainer: {
        backgroundColor: '#FFF0F0',
    },
    logoutText: {
        color: '#FF3B30',
        fontWeight: '600',
    },
});

