import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ShieldCheck, Lock } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentGateway'>;

export const PaymentGatewayScreen: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        // Simulate a payment processing delay
        const timer = setTimeout(() => {
            // 90% chance of success, 10% chance of failure for demo purposes
            if (Math.random() > 0.1) {
                navigation.replace('OrderSuccess');
            } else {
                navigation.replace('PaymentFailed');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.content}>
                <View style={styles.secureHeader}>
                    <ShieldCheck size={24} color="#34C759" strokeWidth={2.5} />
                    <Text style={styles.secureText}>Secure Payment Gateway</Text>
                </View>

                <View style={styles.main}>
                    <ActivityIndicator size="large" color="#1C1C1E" />
                    <Text style={styles.loadingTitle}>Processing Transaction</Text>
                    <Text style={styles.loadingSub}>
                        Please do not refresh or close the app while we finalize your luxury purchase with your bank.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Lock size={16} color="#8E8E93" />
                    <Text style={styles.footerText}>Encrypted End-to-End (AES-256)</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    content: { flex: 1, padding: 32, alignItems: 'center', justifyContent: 'space-between' },
    secureHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 40 },
    secureText: { fontSize: 13, fontWeight: '900', color: '#34C759', textTransform: 'uppercase', letterSpacing: 1 },

    main: { alignItems: 'center', maxWidth: 300 },
    loadingTitle: { fontSize: 24, fontWeight: '900', color: '#1C1C1E', marginTop: 32, marginBottom: 16, textAlign: 'center' },
    loadingSub: { fontSize: 15, color: '#8E8E93', textAlign: 'center', lineHeight: 22, fontWeight: '500' },

    footer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 40 },
    footerText: { fontSize: 13, color: '#8E8E93', fontWeight: '700' }
});
