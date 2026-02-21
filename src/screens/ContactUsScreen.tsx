import React from 'react';
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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
    ChevronLeft,
    MessageCircle,
    Mail,
    Phone,
    Twitter,
    Instagram,
    Send
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactUs'>;

export const ContactUsScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Contact Us</Text>
                    <View style={{ width: 48 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.heroTitle}>Get in touch</Text>
                    <Text style={styles.heroSub}>Whether you have a question about our collections, or need assistance with an order, our team is here for you.</Text>

                    <View style={styles.formCard}>
                        <Text style={styles.cardTitle}>Send us a Message</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#A0A0A0" />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput style={styles.input} placeholder="your@email.com" placeholderTextColor="#A0A0A0" keyboardType="email-address" />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="How can we help?"
                                placeholderTextColor="#A0A0A0"
                                multiline
                                numberOfLines={5}
                            />
                        </View>

                        <TouchableOpacity style={styles.submitBtn}>
                            <Send size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                            <Text style={styles.submitBtnText}>Send Request</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>Other Channels</Text>
                    <View style={styles.channelsContainer}>
                        <TouchableOpacity style={styles.channelItem}>
                            <Mail size={20} color="#1C1C1E" />
                            <View style={{ marginLeft: 16 }}>
                                <Text style={styles.channelTitle}>Email</Text>
                                <Text style={styles.channelValue}>support@yapfashion.com</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.channelItem}>
                            <Phone size={20} color="#1C1C1E" />
                            <View style={{ marginLeft: 16 }}>
                                <Text style={styles.channelTitle}>Phone</Text>
                                <Text style={styles.channelValue}>+44 20 7123 4567</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>Social Media</Text>
                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialBtn}><Instagram size={22} color="#1C1C1E" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}><Twitter size={22} color="#1C1C1E" /></TouchableOpacity>
                    </View>
                    <View style={{ height: 40 }} />
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

    scrollContent: { paddingHorizontal: 24, paddingTop: 20 },
    heroTitle: { fontSize: 32, fontWeight: '900', color: '#1C1C1E', marginBottom: 12, letterSpacing: -1 },
    heroSub: { fontSize: 16, color: '#8E8E93', lineHeight: 24, marginBottom: 32 },

    formCard: { backgroundColor: '#F8F8F8', borderRadius: 32, padding: 24, marginBottom: 40, borderWidth: 1, borderColor: '#F0F0F0' },
    cardTitle: { fontSize: 18, fontWeight: '900', color: '#1C1C1E', marginBottom: 24 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 12, fontWeight: '800', color: '#1C1C1E', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginLeft: 4 },
    input: { backgroundColor: '#FFFFFF', borderRadius: 16, height: 56, paddingHorizontal: 16, fontSize: 15, fontWeight: '600', color: '#1C1C1E', borderWidth: 1, borderColor: '#F0F0F0' },
    textArea: { height: 120, paddingTop: 16, textAlignVertical: 'top' },
    submitBtn: { height: 56, backgroundColor: '#1C1C1E', borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 },
    submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },

    sectionTitle: { fontSize: 13, fontWeight: '900', color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 },
    channelsContainer: { gap: 12, marginBottom: 32 },
    channelItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', padding: 20, borderRadius: 20 },
    channelTitle: { fontSize: 12, fontWeight: '800', color: '#8E8E93', textTransform: 'uppercase' },
    channelValue: { fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginTop: 2 },

    socialRow: { flexDirection: 'row', gap: 16 },
    socialBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' }
});
