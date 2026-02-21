import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Image,
    TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { User, Mail, Lock, ChevronLeft, Github, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'GetStarted'>;

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <View style={styles.navHeader}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                            activeOpacity={0.8}
                        >
                            <ChevronLeft size={24} color="#1C1C1E" strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.header}>
                            <Text style={styles.title}>Join Yap</Text>
                            <Text style={styles.subtitle}>Unlock a world of curated luxury fashion and exclusive drops.</Text>
                        </View>

                        <View style={styles.form}>
                            {/* Full Name Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Full Name</Text>
                                <View style={styles.inputWrapper}>
                                    <User size={20} color="#8E8E93" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Faisal Kimz"
                                        placeholderTextColor="#A0A0A0"
                                        autoCapitalize="words"
                                    />
                                </View>
                            </View>

                            {/* Email Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Email Address</Text>
                                <View style={styles.inputWrapper}>
                                    <Mail size={20} color="#8E8E93" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="faisal@example.com"
                                        placeholderTextColor="#A0A0A0"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <Lock size={20} color="#8E8E93" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="••••••••"
                                        placeholderTextColor="#A0A0A0"
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                                        {showPassword ? <EyeOff size={20} color="#8E8E93" /> : <Eye size={20} color="#8E8E93" />}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.termsWrapper}>
                                <Text style={styles.termsText}>
                                    By creating an account, you agree to our{' '}
                                    <Text style={styles.termsLink}>Terms</Text> &{' '}
                                    <Text style={styles.termsLink}>Privacy</Text>
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.signUpButton}
                                onPress={() => navigation.navigate('EmailVerification')}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={['#1C1C1E', '#2C2C2E']}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.signUpButtonText}>Create Account</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.divider}>
                                <View style={styles.line} />
                                <Text style={styles.dividerText}>Or register with</Text>
                                <View style={styles.line} />
                            </View>

                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton} activeOpacity={0.8} onPress={() => navigation.navigate('SocialLoginCallback')}>
                                    <Image
                                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                                        style={styles.socialIcon}
                                    />
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButton} activeOpacity={0.8} onPress={() => navigation.navigate('SocialLoginCallback')}>
                                    <Github size={20} color="#000" style={styles.socialIcon} />
                                    <Text style={styles.socialButtonText}>GitHub</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Found your way back? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text style={styles.signInLink}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
    },
    navHeader: {
        paddingHorizontal: 24,
        paddingTop: 12,
    },
    backButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 28,
        paddingTop: 30,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#1C1C1E',
        marginBottom: 12,
        letterSpacing: -1.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        lineHeight: 24,
        paddingRight: 30,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 60,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        height: '100%',
    },
    eyeBtn: {
        padding: 8,
    },
    termsWrapper: {
        marginBottom: 32,
        marginTop: 8,
        paddingHorizontal: 4,
    },
    termsText: {
        fontSize: 13,
        color: '#8E8E93',
        lineHeight: 20,
    },
    termsLink: {
        color: '#1C1C1E',
        fontWeight: '800',
    },
    signUpButton: {
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 8,
    },
    buttonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 36,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#F0F0F0',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#C7C7CC',
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        resizeMode: 'contain',
    },
    socialButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    footerText: {
        color: '#8E8E93',
        fontSize: 15,
        fontWeight: '500',
    },
    signInLink: {
        color: '#1C1C1E',
        fontSize: 15,
        fontWeight: '800',
    },
});
