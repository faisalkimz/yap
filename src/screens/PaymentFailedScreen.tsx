import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
    XCircle,
    AlertTriangle,
    ChevronLeft,
    RefreshCw
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentFailed'>;

export const PaymentFailedScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.iconWrapper}>
                        <XCircle size={80} color="#FF3B30" strokeWidth={1.5} />
                    </View>

                    <Text style={styles.title}>Payment Failed</Text>
                    <Text style={styles.subtitle}>
                        We couldn't process your transaction. Please check your payment details or try another method.
                    </Text>

                    <View style={styles.errorBox}>
                        <AlertTriangle size={18} color="#FF3B30" />
                        <Text style={styles.errorText}>Insufficient funds or card expired.</Text>
                    </View>

                    <View style={styles.actionSection}>
                        <TouchableOpacity
                            style={styles.retryBtn}
                            onPress={() => navigation.navigate('Checkout', { total: '450' })}
                        >
                            <RefreshCw size={20} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 10 }} />
                            <Text style={styles.retryBtnText}>Try Again</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={styles.backBtnText}>Return to Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Secure Contact info */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Need help? Contact our Concierge at</Text>
                    <Text style={styles.footerLink}>support@yapfashion.com</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1 },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },

    iconWrapper: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#FFF5F5', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
    title: { fontSize: 32, fontWeight: '900', color: '#1C1C1E', marginBottom: 16, letterSpacing: -1 },
    subtitle: { fontSize: 16, color: '#8E8E93', textAlign: 'center', lineHeight: 24, marginBottom: 32 },

    errorBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF2F2', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 16, marginBottom: 40 },
    errorText: { color: '#FF3B30', fontSize: 14, fontWeight: '700', marginLeft: 10 },

    actionSection: { width: '100%', gap: 16 },
    retryBtn: { height: 64, backgroundColor: '#1C1C1E', borderRadius: 32, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
    retryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
    backBtn: { height: 64, justifyContent: 'center', alignItems: 'center' },
    backBtnText: { color: '#8E8E93', fontSize: 15, fontWeight: '700' },

    footer: { paddingBottom: 40, alignItems: 'center' },
    footerText: { fontSize: 13, color: '#C7C7CC', fontWeight: '500' },
    footerLink: { fontSize: 13, color: '#8E8E93', fontWeight: '800', marginTop: 4 }
});
