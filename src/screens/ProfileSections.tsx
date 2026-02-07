import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Switch
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import {
    ChevronLeft,
    User,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Plus,
    Trash2,
    Bell,
    Moon,
    Languages,
    Shield,
    FileText,
    ChevronRight,
    HelpCircle,
    MessageCircle
} from 'lucide-react-native';
import { PrimaryButton } from '../components/PrimaryButton';

// Reusable Layout Component
const SectionLayout = ({ title, navigation, children }: { title: string, navigation: any, children?: React.ReactNode }) => (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
                <View style={{ width: 44 }} />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {children}
            </ScrollView>
        </SafeAreaView>
    </View>
);

// --- Edit Profile ---
export const EditProfileScreen = ({ navigation }: any) => {
    return (
        <SectionLayout title="Personal Information" navigation={navigation}>
            <View style={styles.avatarEditContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }}
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.changePhotoButton}>
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputWrapper}>
                        <User size={20} color={colors.muted} style={styles.inputIcon} />
                        <TextInput style={styles.input} defaultValue="Mike Johnson" placeholder="Full Name" />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputWrapper}>
                        <Mail size={20} color={colors.muted} style={styles.inputIcon} />
                        <TextInput style={styles.input} defaultValue="mike.johnson@example.com" placeholder="Email Address" keyboardType="email-address" />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.inputWrapper}>
                        <Phone size={20} color={colors.muted} style={styles.inputIcon} />
                        <TextInput style={styles.input} defaultValue="+1 234 567 890" placeholder="Phone Number" keyboardType="phone-pad" />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Location</Text>
                    <View style={styles.inputWrapper}>
                        <MapPin size={20} color={colors.muted} style={styles.inputIcon} />
                        <TextInput style={styles.input} defaultValue="London, UK" placeholder="Location" />
                    </View>
                </View>

                <PrimaryButton label="Save Changes" onPress={() => navigation.goBack()} style={{ marginTop: 20 }} />
            </View>
        </SectionLayout>
    );
};

// --- Payment Methods ---
export const PaymentMethodsScreen = ({ navigation }: any) => {
    return (
        <SectionLayout title="Payment Methods" navigation={navigation}>
            <View style={styles.cardsList}>
                {/* Method 1 */}
                <View style={styles.cardItem}>
                    <View style={styles.cardLeft}>
                        <View style={[styles.cardIconBox, { backgroundColor: '#1A1F71' }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>VISA</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>Visa Classic</Text>
                            <Text style={styles.cardNumber}>**** **** **** 4545</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Trash2 size={20} color={colors.muted} />
                    </TouchableOpacity>
                </View>

                {/* Method 2 */}
                <View style={styles.cardItem}>
                    <View style={styles.cardLeft}>
                        <View style={[styles.cardIconBox, { backgroundColor: '#EB001B' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF5F00' }} />
                                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#EB001B', marginLeft: -3 }} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>Mastercard</Text>
                            <Text style={styles.cardNumber}>**** **** **** 0921</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Trash2 size={20} color={colors.muted} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.addNewButton}>
                <Plus size={20} color={colors.white} />
                <Text style={styles.addNewText}>Add New Card</Text>
            </TouchableOpacity>
        </SectionLayout>
    );
};

// --- Shipping Address ---
export const AddressScreen = ({ navigation }: any) => {
    return (
        <SectionLayout title="Shipping Address" navigation={navigation}>
            <View style={styles.addressList}>
                <View style={styles.addressCard}>
                    <View style={styles.addressHeader}>
                        <View style={styles.addressLabelContainer}>
                            <MapPin size={16} color={colors.primary} />
                            <Text style={styles.addressLabel}>Home</Text>
                        </View>
                        <TouchableOpacity><PencilIcon size={16} color={colors.muted} /></TouchableOpacity>
                    </View>
                    <Text style={styles.addressText}>6, Cole Palmer Avenue, London Portugal</Text>
                    <Text style={styles.addressPhone}>+234 901 234 5678</Text>
                </View>

                <View style={styles.addressCard}>
                    <View style={styles.addressHeader}>
                        <View style={[styles.addressLabelContainer, { backgroundColor: '#EEE' }]}>
                            <MapPin size={16} color={colors.text} />
                            <Text style={[styles.addressLabel, { color: colors.text }]}>Work</Text>
                        </View>
                        <TouchableOpacity><PencilIcon size={16} color={colors.muted} /></TouchableOpacity>
                    </View>
                    <Text style={styles.addressText}>12, Victoria Island, Lagos Nigeria</Text>
                    <Text style={styles.addressPhone}>+234 809 876 5432</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.addNewButton}>
                <Plus size={20} color={colors.white} />
                <Text style={styles.addNewText}>Add New Address</Text>
            </TouchableOpacity>
        </SectionLayout>
    );
};

// --- Settings ---
export const SettingsScreen = ({ navigation }: any) => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const SettingItem = ({ icon: Icon, label, value, type = 'arrow' }: any) => (
        <TouchableOpacity style={styles.settingItem} disabled={type === 'switch'}>
            <View style={styles.settingLeft}>
                <View style={styles.settingIconBox}>
                    <Icon size={20} color={colors.text} />
                </View>
                <Text style={styles.settingLabel}>{label}</Text>
            </View>
            {type === 'switch' ? (
                <Switch
                    value={value}
                    onValueChange={label === 'Dark Mode' ? setDarkMode : setNotifications}
                    trackColor={{ false: '#E0E0E0', true: colors.primary }}
                    thumbColor={colors.white}
                />
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {value && <Text style={styles.settingValue}>{value}</Text>}
                    <ChevronRight size={20} color={colors.muted} />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SectionLayout title="Settings" navigation={navigation}>
            <Text style={styles.sectionHeader}>General</Text>
            <SettingItem icon={Languages} label="Language" value="English" />
            <SettingItem icon={Bell} label="Notifications" value={notifications} type="switch" />
            <SettingItem icon={Moon} label="Dark Mode" value={darkMode} type="switch" />

            <Text style={[styles.sectionHeader, { marginTop: 24 }]}>Security</Text>
            <SettingItem icon={Shield} label="Change Password" />
            <SettingItem icon={FileText} label="Privacy Policy" />
        </SectionLayout>
    );
};

// --- Support ---
export const SupportScreen = ({ navigation }: any) => {
    return (
        <SectionLayout title="Help & Support" navigation={navigation}>
            <View style={styles.supportCard}>
                <HelpCircle size={48} color={colors.primary} style={{ marginBottom: 16 }} />
                <Text style={styles.supportTitle}>How can we help you?</Text>
                <Text style={styles.supportText}>
                    Our team is available 24/7 to help you with any issues or questions you might have.
                </Text>

                <TouchableOpacity style={styles.contactButton}>
                    <MessageCircle size={20} color={colors.white} style={{ marginRight: 8 }} />
                    <Text style={styles.contactButtonText}>Start Live Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.contactButton, styles.emailButton]}>
                    <Mail size={20} color={colors.primary} style={{ marginRight: 8 }} />
                    <Text style={[styles.contactButtonText, { color: colors.primary }]}>Email Support</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.faqHeader}>Frequently Asked Questions</Text>
            {/* Fake FAQ items */}
            {['How do I track my order?', 'What is the return policy?', 'How can I change my shipping address?'].map((q, i) => (
                <TouchableOpacity key={i} style={styles.faqItem}>
                    <Text style={styles.faqText}>{q}</Text>
                    <ChevronRight size={16} color={colors.muted} />
                </TouchableOpacity>
            ))}
        </SectionLayout>
    );
};

// Helper for Address Screen (since Pencil is reused but I need to avoid name clash if I imported it fully)
const PencilIcon = ({ size, color }: any) => {
    // Just a wrapper or direct usage
    const { Pencil } = require('lucide-react-native');
    return <Pencil size={size} color={color} />;
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    content: {
        padding: 24,
        paddingBottom: 50,
    },
    // Edit Profile
    avatarEditContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    changePhotoButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
    },
    changePhotoText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    formContainer: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    // Payment Methods
    cardsList: {
        gap: 16,
        marginBottom: 24,
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIconBox: {
        width: 48,
        height: 32,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 2,
    },
    cardNumber: {
        fontSize: 12,
        color: colors.muted,
    },
    addNewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.text,
        height: 56,
        borderRadius: 28,
        gap: 8,
    },
    addNewText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Address
    addressList: {
        gap: 16,
        marginBottom: 24,
    },
    addressCard: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    addressLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.primary,
    },
    addressText: {
        fontSize: 14,
        color: colors.text,
        lineHeight: 20,
        marginBottom: 4,
    },
    addressPhone: {
        fontSize: 14,
        color: colors.muted,
    },
    // Settings
    sectionHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.muted,
        marginBottom: 12,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.text,
    },
    settingValue: {
        fontSize: 14,
        color: colors.muted,
        marginRight: 8,
    },
    // Support
    supportCard: {
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        marginBottom: 32,
    },
    supportTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    supportText: {
        fontSize: 14,
        color: colors.muted,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        height: 52,
        borderRadius: 14,
        marginBottom: 12,
    },
    emailButton: {
        backgroundColor: '#FFF5F2',
    },
    contactButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
    },
    faqHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    faqItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    faqText: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
    },
});
