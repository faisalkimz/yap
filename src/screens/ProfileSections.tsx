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
    Switch,
    Platform,
    StatusBar,
    Dimensions,
} from 'react-native';
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
    MessageCircle,
    Camera,
    Lock,
    Eye,
    EyeOff,
    Check
} from 'lucide-react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

// --- Reusable Premium Layout ---
const SectionLayout = ({ title, navigation, children, footer }: { title: string, navigation: any, children?: React.ReactNode, footer?: React.ReactNode }) => (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
                <View style={{ width: 44 }} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {children}
            </ScrollView>
            {footer && <View style={styles.stickyFooter}>{footer}</View>}
        </SafeAreaView>
    </View>
);

// --- Edit Profile ---
export const EditProfileScreen = ({ navigation }: any) => {
    return (
        <SectionLayout
            title="Edit Profile"
            navigation={navigation}
            footer={
                <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.primaryBtnText}>Save Changes</Text>
                </TouchableOpacity>
            }
        >
            <View style={styles.avatarSection}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }}
                        style={styles.avatarMain}
                    />
                    <TouchableOpacity style={styles.cameraBtn}>
                        <Camera size={20} color="#FFFFFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.avatarName}>Faisal Kimz</Text>
                <Text style={styles.avatarEmail}>faisal@example.com</Text>
            </View>

            <View style={styles.formSection}>
                <InputField label="Full Name" icon={User} defaultValue="Faisal Kimz" />
                <InputField label="Email Address" icon={Mail} defaultValue="faisal@example.com" keyboardType="email-address" />
                <InputField label="Phone Number" icon={Phone} defaultValue="+44 7890 123456" keyboardType="phone-pad" />
                <InputField label="Location" icon={MapPin} defaultValue="London, UK" />
            </View>
        </SectionLayout>
    );
};

// --- Change Password ---
export const ChangePasswordScreen = ({ navigation }: any) => {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    return (
        <SectionLayout
            title="Change Password"
            navigation={navigation}
            footer={
                <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.primaryBtnText}>Update Password</Text>
                </TouchableOpacity>
            }
        >
            <View style={styles.infoBox}>
                <Shield size={20} color="#FF6B4A" />
                <Text style={styles.infoText}>Your password must be at least 8 characters long and include numbers.</Text>
            </View>

            <View style={styles.formSection}>
                <PasswordField
                    label="Current Password"
                    show={showOld}
                    onToggle={() => setShowOld(!showOld)}
                />
                <PasswordField
                    label="New Password"
                    show={showNew}
                    onToggle={() => setShowNew(!showNew)}
                />
                <PasswordField
                    label="Confirm New Password"
                    show={showNew}
                    onToggle={() => setShowNew(!showNew)}
                />
            </View>
        </SectionLayout>
    );
};

// --- Address Book ---
const MOCK_ADDRESSES = [
    {
        id: '1',
        label: 'Home',
        address: '6, Cole Palmer Avenue, London, UK',
        phone: '+44 7890 123456',
        name: 'Faisal Kimz',
        city: 'London',
        isDefault: true
    },
    {
        id: '2',
        label: 'Office',
        address: '12, Tech Hub Street, Canary Wharf, London',
        name: 'Faisal Kimz',
        city: 'London',
        phone: '+44 7890 998877'
    },
];

export const AddressScreen = ({ navigation }: any) => {
    return (
        <SectionLayout
            title="Residence Archive"
            navigation={navigation}
            footer={
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate('AddEditAddress', {})}
                >
                    <Plus size={20} color="#FFFFFF" strokeWidth={3} style={{ marginRight: 8 }} />
                    <Text style={styles.primaryBtnText}>Register New Residence</Text>
                </TouchableOpacity>
            }
        >
            <View style={styles.listSection}>
                {MOCK_ADDRESSES.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('AddEditAddress', { addressId: item.id, initialData: item })}
                    >
                        <AddressCard
                            label={item.label}
                            address={item.address}
                            phone={item.phone}
                            isDefault={item.isDefault}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </SectionLayout>
    );
};

// --- Payment Methods ---
export const PaymentMethodsScreen = ({ navigation }: any) => {
    return (
        <SectionLayout
            title="Saved Payments"
            navigation={navigation}
            footer={
                <TouchableOpacity style={styles.primaryBtn}>
                    <Plus size={20} color="#FFFFFF" strokeWidth={3} style={{ marginRight: 8 }} />
                    <Text style={styles.primaryBtnText}>Add New Card</Text>
                </TouchableOpacity>
            }
        >
            <View style={styles.listSection}>
                <PaymentCard brand="Visa" last4="4545" exp="12/26" isDefault />
                <PaymentCard brand="Mastercard" last4="0921" exp="08/25" />
            </View>
        </SectionLayout>
    );
};

// --- Settings ---
export const SettingsScreen = ({ navigation }: any) => {
    return (
        <SectionLayout title="Settings" navigation={navigation}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <SettingItem icon={Bell} label="Notifications" />
            <SettingItem icon={Languages} label="Language" value="English" />
            <SettingItem icon={Moon} label="Dark Mode" isSwitch />

            <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Security & Privacy</Text>
            <SettingItem icon={Lock} label="Change Password" />
            <SettingItem icon={Shield} label="Privacy Policy" />
            <SettingItem icon={FileText} label="Terms of Service" />

            <Text style={[styles.sectionTitle, { marginTop: 32, color: colors.accent }]}>Danger Zone</Text>
            <TouchableOpacity style={[styles.settingRow, { backgroundColor: '#FFF5F2' }]}>
                <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, { backgroundColor: colors.white }]}>
                        <Trash2 size={20} color={colors.accent} />
                    </View>
                    <Text style={[styles.settingLabel, { color: colors.accent }]}>Close Account</Text>
                </View>
                <ChevronRight size={20} color={colors.accent} />
            </TouchableOpacity>
        </SectionLayout>
    );
};

// --- Support ---
export const SupportScreen = ({ navigation }: any) => {
    return (
        <SectionLayout title="Help & Support" navigation={navigation}>
            <View style={styles.supportHero}>
                <HelpCircle size={64} color="#1C1C1E" strokeWidth={1.5} />
                <Text style={styles.supportHeroTitle}>How can we help?</Text>
                <Text style={styles.supportHeroText}>Our specialized concierge team is here to assist you with any requirement.</Text>
            </View>

            <TouchableOpacity style={styles.supportAction}>
                <MessageCircle size={24} color="#FFFFFF" strokeWidth={2} />
                <View style={{ marginLeft: 16 }}>
                    <Text style={styles.supportActionTitle}>Live Concierge</Text>
                    <Text style={styles.supportActionText}>Instant support (Available 24/7)</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.supportAction, { backgroundColor: '#F5F5F5' }]}>
                <Mail size={24} color="#1C1C1E" strokeWidth={2} />
                <View style={{ marginLeft: 16 }}>
                    <Text style={[styles.supportActionTitle, { color: '#1C1C1E' }]}>Email Support</Text>
                    <Text style={[styles.supportActionText, { color: '#8E8E93' }]}>support@yapfashion.com</Text>
                </View>
            </TouchableOpacity>
        </SectionLayout>
    );
};

// --- Helper Components ---
const InputField = ({ label, icon: Icon, ...props }: any) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
            <Icon size={20} color="#8E8E93" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholderTextColor="#A0A0A0" {...props} />
        </View>
    </View>
);

const PasswordField = ({ label, show, onToggle }: any) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
            <Lock size={20} color="#8E8E93" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                secureTextEntry={!show}
                placeholder="••••••••"
                placeholderTextColor="#A0A0A0"
            />
            <TouchableOpacity onPress={onToggle}>
                {show ? <EyeOff size={20} color="#8E8E93" /> : <Eye size={20} color="#8E8E93" />}
            </TouchableOpacity>
        </View>
    </View>
);

const AddressCard = ({ label, address, phone, isDefault }: any) => (
    <View style={[styles.card, isDefault && styles.cardActive]}>
        <View style={styles.cardHeader}>
            <View style={[styles.badge, isDefault && styles.badgeActive]}>
                <Text style={[styles.badgeText, isDefault && styles.badgeTextActive]}>{label}</Text>
            </View>
            <TouchableOpacity><Trash2 size={18} color="#FF3B30" /></TouchableOpacity>
        </View>
        <Text style={styles.cardTitle}>{address}</Text>
        <Text style={styles.cardSubtitle}>{phone}</Text>
        {isDefault && (
            <View style={styles.defaultChip}>
                <Check size={12} color="#FFFFFF" strokeWidth={4} />
                <Text style={styles.defaultChipText}>Default Address</Text>
            </View>
        )}
    </View>
);

const PaymentCard = ({ brand, last4, exp, isDefault }: any) => (
    <View style={[styles.card, isDefault && styles.cardActive]}>
        <View style={styles.cardRow}>
            <View style={styles.cardBrandBox}>
                <CreditCard size={24} color="#1C1C1E" />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{brand} •••• {last4}</Text>
                <Text style={styles.cardSubtitle}>Expires {exp}</Text>
            </View>
            <TouchableOpacity><Trash2 size={18} color="#FF3B30" /></TouchableOpacity>
        </View>
    </View>
);

const SettingItem = ({ icon: Icon, label, value, isSwitch, onPress }: any) => (
    <TouchableOpacity
        style={styles.settingRow}
        onPress={onPress}
        disabled={isSwitch}
        activeOpacity={0.7}
    >
        <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
                <Icon size={20} color="#1C1C1E" />
            </View>
            <Text style={styles.settingLabel}>{label}</Text>
        </View>
        {isSwitch ? (
            <Switch trackColor={{ false: '#ECECEC', true: '#1C1C1E' }} thumbColor="#FFFFFF" value={false} />
        ) : (
            <View style={styles.settingRight}>
                {value && <Text style={styles.settingValue}>{value}</Text>}
                <ChevronRight size={20} color="#8E8E93" />
            </View>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
    backButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    scrollContent: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 120 },
    stickyFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, paddingTop: 16, backgroundColor: 'rgba(255,255,255,0.9)' },

    avatarSection: { alignItems: 'center', marginBottom: 40 },
    avatarWrapper: { position: 'relative', marginBottom: 16 },
    avatarMain: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#FFFFFF' },
    cameraBtn: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderRadius: 20, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFFFFF' },
    avatarName: { fontSize: 24, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    avatarEmail: { fontSize: 15, color: '#8E8E93', fontWeight: '500' },

    formSection: { gap: 24 },
    inputGroup: { gap: 8 },
    label: { fontSize: 13, fontWeight: '800', color: '#1C1C1E', textTransform: 'uppercase', letterSpacing: 0.5, marginLeft: 4 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 20, paddingHorizontal: 16, height: 64, borderWidth: 1, borderColor: '#F0F0F0' },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1C1C1E', height: '100%' },

    primaryBtn: { height: 64, borderRadius: 32, backgroundColor: '#1C1C1E', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
    primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },

    infoBox: { flexDirection: 'row', backgroundColor: '#FFF5F2', padding: 16, borderRadius: 16, marginBottom: 32, alignItems: 'center' },
    infoText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#FF6B4A', fontWeight: '600', lineHeight: 20 },

    listSection: { gap: 16 },
    card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 2 },
    cardActive: { borderColor: '#1C1C1E', borderWidth: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: '#F5F5F5' },
    badgeActive: { backgroundColor: '#1C1C1E' },
    badgeText: { fontSize: 12, fontWeight: '800', color: '#8E8E93' },
    badgeTextActive: { color: '#FFFFFF' },
    cardTitle: { fontSize: 17, fontWeight: '800', color: '#1C1C1E', marginBottom: 6 },
    cardSubtitle: { fontSize: 14, color: '#8E8E93', fontWeight: '500' },
    defaultChip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#1C1C1E', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, marginTop: 16 },
    defaultChipText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900', marginLeft: 6, textTransform: 'uppercase' },

    cardRow: { flexDirection: 'row', alignItems: 'center' },
    cardBrandBox: { width: 56, height: 40, borderRadius: 10, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', marginRight: 16 },

    sectionTitle: { fontSize: 14, fontWeight: '900', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, marginLeft: 4 },
    settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8F8F8', padding: 20, borderRadius: 20, marginBottom: 12 },
    settingLeft: { flexDirection: 'row', alignItems: 'center' },
    settingIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    settingLabel: { fontSize: 16, fontWeight: '700', color: '#1C1C1E' },
    settingRight: { flexDirection: 'row', alignItems: 'center' },
    settingValue: { fontSize: 15, color: '#8E8E93', fontWeight: '600', marginRight: 8 },

    supportHero: { alignItems: 'center', marginBottom: 48 },
    supportHeroTitle: { fontSize: 28, fontWeight: '900', color: '#1C1C1E', marginTop: 24, marginBottom: 12 },
    supportHeroText: { fontSize: 16, color: '#8E8E93', textAlign: 'center', paddingHorizontal: 32, lineHeight: 24 },
    supportAction: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C1E', padding: 24, borderRadius: 24, marginBottom: 16 },
    supportActionTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
    supportActionText: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 2 }
});
