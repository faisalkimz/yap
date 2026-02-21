import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ChevronLeft, Download, Shield } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'LegalContent'>;

export const LegalContentScreen: React.FC<Props> = ({ navigation, route }) => {
    const { type } = route.params;

    const getContent = () => {
        switch (type) {
            case 'privacy':
                return {
                    title: 'Privacy Policy',
                    lastUpdated: 'Updated Jan 2024',
                    content: 'At Yap Fashion PLC, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our mobile application and related services.\n\nYour data is used solely to enhance your shopping experience, manage orders, and provide personalized styling recommendations. We use industry-standard encryption (AES-256) to ensure that your private details remain secure within our vault.\n\nWe do not sell your personal data to third parties. For any inquiries regarding your data rights, please contact our data Protection Officer at dpo@yapfashion.com.'
                };
            case 'terms':
                return {
                    title: 'Terms of Service',
                    lastUpdated: 'Updated Aug 2024',
                    content: 'By accessing or using the Yap mobile application, you agree to be bound by these Terms of Service. Please read them carefully.\n\nAll content, designs, and intellectual property within this application are owned by Yap Fashion PLC. Unauthorized reproduction or distribution is strictly prohibited.\n\nOur luxury concierge services are subject to availability. Prices and item availability are subject to change without prior notice. Global shipping is provided through our premium logistics partners (DHL, FedEx) and is subject to local customs regulations.'
                };
            case 'returns':
                return {
                    title: 'Return Policy',
                    lastUpdated: 'Updated Sep 2024',
                    content: 'We offer a seamless 30-day return window for all luxury items. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original premium packaging.\n\nCertain items (intimate apparel, bespoke tailoring, and skincare) are ineligible for return due to hygiene and exclusivity reasons. Returns can be initiated through the "Order Details" section of your account.'
                };
            default:
                return {
                    title: 'Legal Information',
                    lastUpdated: 'Updated 2024',
                    content: 'General legal information regarding Yap Fashion PLC operations and services.'
                };
        }
    };

    const data = getContent();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Legal</Text>
                    <TouchableOpacity style={styles.downloadBtn}>
                        <Download size={22} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.hero}>
                        <Shield size={48} color="#1C1C1E" strokeWidth={1.5} />
                        <Text style={styles.heroTitle}>{data.title}</Text>
                        <Text style={styles.lastUpdated}>{data.lastUpdated}</Text>
                    </View>

                    <View style={styles.contentBody}>
                        <Text style={styles.policyText}>{data.content}</Text>

                        <View style={styles.contactSection}>
                            <Text style={styles.contactTitle}>Questions?</Text>
                            <Text style={styles.contactSub}>If you have any questions about our {data.title}, please reach out to our legal department.</Text>
                            <TouchableOpacity style={styles.emailBtn}>
                                <Text style={styles.emailText}>legal@yapfashion.com</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
    backButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5 },
    downloadBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },

    scrollContent: { paddingBottom: 60 },
    hero: { alignItems: 'center', paddingVertical: 40, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' },
    heroTitle: { fontSize: 32, fontWeight: '900', color: '#1C1C1E', marginTop: 16, marginBottom: 8, letterSpacing: -1 },
    lastUpdated: { fontSize: 13, color: '#8E8E93', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },

    contentBody: { padding: 32 },
    policyText: { fontSize: 16, color: '#444', lineHeight: 28, fontWeight: '500' },

    contactSection: { marginTop: 48, backgroundColor: '#F8F8F8', padding: 24, borderRadius: 28 },
    contactTitle: { fontSize: 18, fontWeight: '900', color: '#1C1C1E', marginBottom: 8 },
    contactSub: { fontSize: 14, color: '#8E8E93', fontWeight: '500', lineHeight: 20, marginBottom: 20 },
    emailBtn: { alignSelf: 'flex-start' },
    emailText: { fontSize: 15, fontWeight: '800', color: '#1C1C1E', textDecorationLine: 'underline' }
});
