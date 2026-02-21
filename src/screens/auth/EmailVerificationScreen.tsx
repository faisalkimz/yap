import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { MailCheck, ArrowRight } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'EmailVerification'>;

export const EmailVerificationScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <MailCheck size={64} color="#1C1C1E" strokeWidth={1} />
                    </View>
                    <Text style={styles.title}>Check your email</Text>
                    <Text style={styles.subtitle}>
                        We have sent a verification link to your email address faisal@example.com
                    </Text>

                    <TouchableOpacity style={styles.openEmailBtn} activeOpacity={0.9}>
                        <Text style={styles.openEmailBtnText}>Open Email App</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.skipBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.skipBtnText}>I'll verify later</Text>
                        <ArrowRight size={16} color="#8E8E93" />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Didn't receive the email? </Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Text style={styles.resendText}>Click to resend</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, justifyContent: 'space-between' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
    iconContainer: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
    title: { fontSize: 32, fontWeight: '900', color: '#1C1C1E', letterSpacing: -1, marginBottom: 12, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#8E8E93', lineHeight: 24, textAlign: 'center', marginBottom: 48 },
    openEmailBtn: { backgroundColor: '#1C1C1E', width: '100%', height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#1C1C1E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 12, marginBottom: 24 },
    openEmailBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
    skipBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    skipBtnText: { color: '#8E8E93', fontSize: 15, fontWeight: '700' },
    footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: Platform.OS === 'ios' ? 40 : 24, paddingVertical: 24 },
    footerText: { fontSize: 15, color: '#8E8E93' },
    resendText: { fontSize: 15, fontWeight: '800', color: '#1C1C1E' },
});
