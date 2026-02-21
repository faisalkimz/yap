import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StatusBar,
    Platform,
    Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    MessageCircle,
    Mail,
    Phone,
    MapPin,
    Shield,
    FileText,
    Truck,
    RefreshCcw,
    Globe,
    MoveRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'SupportHub'>;

const CONCIERGE_SECTIONS = [
    { title: 'Orders & Global Logistics', icon: Truck, description: 'Track your pieces across the globe' },
    { title: 'The Returns Process', icon: RefreshCcw, description: 'Seamless, elevated returns' },
    { title: 'Privacy & The Vault', icon: Shield, description: 'How we protect your style data' },
];

export const SupportHubScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>ASSISTANCE</Text>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('StoreLocator')}>
                        <MapPin size={22} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero */}
                    <View style={styles.hero}>
                        <Text style={styles.heroTitle}>How may we serve you?</Text>
                        <Text style={styles.heroSub}>Our global concierge is available 24/7 to ensure your experience is nothing short of perfection.</Text>

                        <View style={styles.searchBar}>
                            <Search size={20} color="#1C1C1E" />
                            <TextInput
                                placeholder="Search our archives..."
                                placeholderTextColor="#A0A0A0"
                                style={styles.searchInput}
                            />
                        </View>
                    </View>

                    {/* Quick Access */}
                    <View style={styles.contactSection}>
                        <TouchableOpacity style={styles.contactCard} onPress={() => navigation.navigate('ContactUs')}>
                            <View style={styles.contactIcon}>
                                <MessageCircle size={24} color="#FFFFFF" strokeWidth={1.5} />
                            </View>
                            <Text style={styles.contactLabel}>LIVE CHAT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contactCard} onPress={() => navigation.navigate('ContactUs')}>
                            <View style={[styles.contactIcon, { backgroundColor: '#F5F5F5' }]}>
                                <Mail size={24} color="#1C1C1E" strokeWidth={1.5} />
                            </View>
                            <Text style={styles.contactLabel}>EMAIL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contactCard} onPress={() => navigation.navigate('ContactUs')}>
                            <View style={[styles.contactIcon, { backgroundColor: '#F5F5F5' }]}>
                                <Phone size={24} color="#1C1C1E" strokeWidth={1.5} />
                            </View>
                            <Text style={styles.contactLabel}>DIRECT CALL</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Dedicated Sections */}
                    <View style={styles.infoSection}>
                        {CONCIERGE_SECTIONS.map((section, idx) => (
                            <TouchableOpacity key={idx} style={styles.infoRow}>
                                <View style={styles.infoIconBox}>
                                    <section.icon size={22} color="#1C1C1E" strokeWidth={1} />
                                </View>
                                <View style={styles.infoText}>
                                    <Text style={styles.infoTitle}>{section.title}</Text>
                                    <Text style={styles.infoSub}>{section.description}</Text>
                                </View>
                                <ChevronRight size={18} color="#C7C7CC" />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Policies */}
                    <Text style={styles.sectionLabel}>LEGAL & POLICIES</Text>
                    <View style={styles.policyGroup}>
                        <TouchableOpacity style={styles.policyBtn} onPress={() => navigation.navigate('LegalContent', { type: 'terms' })}>
                            <Text style={styles.policyBtnText}>Terms of Service</Text>
                            <MoveRight size={18} color="#1C1C1E" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.policyBtn} onPress={() => navigation.navigate('LegalContent', { type: 'privacy' })}>
                            <Text style={styles.policyBtnText}>Privacy Manifesto</Text>
                            <MoveRight size={18} color="#1C1C1E" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.policyBtn} onPress={() => navigation.navigate('LegalContent', { type: 'returns' })}>
                            <Text style={styles.policyBtnText}>The Return Policy</Text>
                            <MoveRight size={18} color="#1C1C1E" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Globe size={40} color="#F5F5F5" strokeWidth={1} />
                        <Text style={styles.footerText}>Registered in London. Operating Globally.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 12 },
    backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 13, fontWeight: '900', color: '#1C1C1E', letterSpacing: 3 },
    iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center' },

    scrollContent: { paddingBottom: 60 },
    hero: { paddingHorizontal: 28, paddingTop: 40, marginBottom: 48 },
    heroTitle: { fontSize: 44, fontWeight: '900', color: '#1C1C1E', letterSpacing: -2, lineHeight: 48 },
    heroSub: { fontSize: 16, color: '#8E8E93', lineHeight: 24, fontWeight: '500', marginTop: 16, paddingRight: 40 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', height: 64, borderRadius: 2, paddingHorizontal: 20, marginTop: 32, borderWidth: 1, borderColor: '#F0F0F0' },
    searchInput: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#1C1C1E' },

    contactSection: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 48 },
    contactCard: { flex: 1, alignItems: 'center', gap: 12 },
    contactIcon: { width: width * 0.25, height: width * 0.25, backgroundColor: '#1C1C1E', borderRadius: 2, justifyContent: 'center', alignItems: 'center' },
    contactLabel: { fontSize: 10, fontWeight: '900', color: '#1C1C1E', letterSpacing: 1.5 },

    infoSection: { paddingHorizontal: 24, marginBottom: 48 },
    infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' },
    infoIconBox: { width: 48, height: 48, backgroundColor: '#F8F8F8', borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginRight: 20 },
    infoText: { flex: 1 },
    infoTitle: { fontSize: 18, fontWeight: '800', color: '#1C1C1E' },
    infoSub: { fontSize: 14, color: '#8E8E93', fontWeight: '500', marginTop: 4 },

    sectionLabel: { fontSize: 10, fontWeight: '900', color: '#C7C7CC', letterSpacing: 2, paddingHorizontal: 24, marginBottom: 20 },
    policyGroup: { paddingHorizontal: 24, marginBottom: 60 },
    policyBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16 },
    policyBtnText: { fontSize: 16, fontWeight: '700', color: '#1C1C1E' },

    footer: { alignItems: 'center', gap: 12, opacity: 0.5 },
    footerText: { fontSize: 12, fontWeight: '700', color: '#8E8E93', letterSpacing: 0.5 }
});
