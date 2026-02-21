import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'OtpVerification'>;

export const OtpVerificationScreen: React.FC<Props> = ({ navigation }) => {
    const [code, setCode] = useState(['', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleInput = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Auto focus next
        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (text: string, index: number) => {
        if (!text && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.8}
                        >
                            <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                        <Text style={styles.title}>Verify Account</Text>
                        <Text style={styles.subtitle}>
                            We've sent a 4-digit code to your phone number *******890
                        </Text>

                        <View style={styles.otpContainer}>
                            {code.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => { inputs.current[index] = ref; }}
                                    style={[styles.otpInput, digit ? styles.otpInputActive : null]}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(text) => handleInput(text, index)}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace') {
                                            handleBackspace(digit, index);
                                        }
                                    }}
                                />
                            ))}
                        </View>

                        <TouchableOpacity style={styles.resendBtn} activeOpacity={0.8}>
                            <Text style={styles.resendText}>Resend Code (0:45)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.verifyBtn}
                            onPress={() => navigation.navigate('Home')}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.verifyBtnText}>Verify & Continue</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
    backButton: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 24 },
    content: { paddingHorizontal: 24, paddingTop: 32 },
    title: { fontSize: 32, fontWeight: '900', color: '#1C1C1E', letterSpacing: -1, marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#8E8E93', lineHeight: 24, marginBottom: 40, paddingRight: 40 },
    otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    otpInput: { width: '22%', aspectRatio: 1, backgroundColor: '#F5F5F5', borderRadius: 20, textAlign: 'center', fontSize: 32, fontWeight: '900', color: '#1C1C1E', borderWidth: 2, borderColor: 'transparent' },
    otpInputActive: { borderColor: '#1C1C1E', backgroundColor: '#FFFFFF', shadowColor: '#1C1C1E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
    resendBtn: { alignSelf: 'center', marginBottom: 48 },
    resendText: { color: '#FF6B4A', fontSize: 16, fontWeight: '700' },
    verifyBtn: { backgroundColor: '#1C1C1E', height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#1C1C1E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 12 },
    verifyBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
});
