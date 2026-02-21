import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Switch,
    StatusBar,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
    ChevronLeft,
    User,
    Home,
    Briefcase,
    MapPin,
    Phone,
    Globe
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEditAddress'>;

export const AddEditAddressScreen: React.FC<Props> = ({ navigation, route }) => {
    const editData = route.params?.initialData;
    const isEdit = !!editData;

    const [isDefault, setIsDefault] = useState(editData?.isDefault || false);
    const [addressType, setAddressType] = useState(editData?.label || 'Home');
    const [name, setName] = useState(editData?.name || '');
    const [phone, setPhone] = useState(editData?.phone || '');
    const [city, setCity] = useState(editData?.city || '');
    const [street, setStreet] = useState(editData?.address || '');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{isEdit ? 'Edit Residence' : 'New Residence'}</Text>
                    <View style={{ width: 48 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Address Type Selector */}
                    <Text style={styles.sectionTitle}>Residence Type</Text>
                    <View style={styles.typeSelector}>
                        {['Home', 'Office', 'Other'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[styles.typeBtn, addressType === type && styles.typeBtnActive]}
                                onPress={() => setAddressType(type)}
                            >
                                {type === 'Home' && <Home size={18} color={addressType === type ? '#FFFFFF' : '#8E8E93'} />}
                                {type === 'Office' && <Briefcase size={18} color={addressType === type ? '#FFFFFF' : '#8E8E93'} />}
                                {type === 'Other' && <MapPin size={18} color={addressType === type ? '#FFFFFF' : '#8E8E93'} />}
                                <Text style={[styles.typeText, addressType === type && styles.typeTextActive]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <InputField label="Resident / Receiver" icon={User} placeholder="Full Name" value={name} onChangeText={setName} />
                        <InputField label="Direct Contact" icon={Phone} placeholder="+44 7890 000000" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
                        <InputField label="City / Region" icon={MapPin} placeholder="London" value={city} onChangeText={setCity} />
                        <InputField label="Street Address" icon={MapPin} placeholder="Building, Street, Area" multiline value={street} onChangeText={setStreet} />
                    </View>

                    {/* Default Toggle */}
                    <View style={styles.defaultSection}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.defaultTitle}>Primary Residence</Text>
                            <Text style={styles.defaultSub}>Use this as the priority for all orders.</Text>
                        </View>
                        <Switch
                            value={isDefault}
                            onValueChange={setIsDefault}
                            trackColor={{ false: '#ECECEC', true: '#1C1C1E' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        style={styles.saveBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.saveBtnText}>{isEdit ? 'Update Details' : 'Save Residence'}</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const InputField = ({ label, icon: Icon, ...props }: any) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
            <Icon size={20} color="#8E8E93" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholderTextColor="#A0A0A0" {...props} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
    backButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 60 },

    sectionTitle: { fontSize: 13, fontWeight: '900', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, marginLeft: 4 },
    typeSelector: { flexDirection: 'row', gap: 12, marginBottom: 32 },
    typeBtn: { flex: 1, flexDirection: 'row', height: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F8', borderRadius: 16, gap: 10, borderWidth: 1, borderColor: '#F0F0F0' },
    typeBtnActive: { backgroundColor: '#1C1C1E', borderColor: '#1C1C1E' },
    typeText: { fontSize: 14, fontWeight: '800', color: '#8E8E93' },
    typeTextActive: { color: '#FFFFFF' },

    form: { gap: 24, marginBottom: 40 },
    inputGroup: { gap: 8 },
    label: { fontSize: 13, fontWeight: '800', color: '#1C1C1E', textTransform: 'uppercase', letterSpacing: 0.5, marginLeft: 4 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 20, paddingHorizontal: 16, height: 64, borderWidth: 1, borderColor: '#F0F0F0' },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1C1C1E' },

    defaultSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', padding: 20, borderRadius: 24, marginBottom: 40, borderWidth: 1, borderColor: '#F0F0F0' },
    defaultTitle: { fontSize: 15, fontWeight: '800', color: '#1C1C1E', marginBottom: 2 },
    defaultSub: { fontSize: 13, color: '#8E8E93', fontWeight: '500' },

    saveBtn: { height: 64, borderRadius: 32, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center', shadowColor: '#1C1C1E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
    saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 }
});
