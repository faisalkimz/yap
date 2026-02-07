import React from 'react';
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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { PrimaryButton } from '../components/PrimaryButton';
import { Input } from '../components/Input';
import { Mail, Lock, ChevronLeft, Github } from 'lucide-react-native';

import { LinearGradient } from 'expo-linear-gradient';


type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" />
            <LinearGradient
                colors={['#FFF5F2', '#FFFFFF']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <View style={styles.navHeader}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <ChevronLeft size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.header}>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Fill your details or continue with social media</Text>
                        </View>

                        <View style={styles.form}>
                            <Input
                                label="Email Address"
                                placeholder="name@example.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                icon={Mail}
                            />

                            <Input
                                label="Password"
                                placeholder="••••••••"
                                secureTextEntry
                                icon={Lock}
                            />

                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Recovery Password</Text>
                            </TouchableOpacity>

                            <PrimaryButton
                                label="Sign In"
                                onPress={() => navigation.replace('Home')}
                                style={styles.signInButton}
                            />

                            <View style={styles.divider}>
                                <View style={styles.line} />
                                <Text style={styles.dividerText}>Or continue with</Text>
                                <View style={styles.line} />
                            </View>

                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <View style={styles.googleIconContainer}>
                                        <View style={[styles.googleDot, { backgroundColor: '#4285F4' }]} />
                                        <View style={[styles.googleDot, { backgroundColor: '#EA4335' }]} />
                                        <View style={[styles.googleDot, { backgroundColor: '#FBBC05' }]} />
                                        <View style={[styles.googleDot, { backgroundColor: '#34A853' }]} />
                                    </View>
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButton}>
                                    <Github size={20} color="#000" style={{ marginRight: 10 }} />
                                    <Text style={styles.socialButtonText}>GitHub</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>New User? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('GetStarted')}>
                                <Text style={styles.signUpLink}>Create Account</Text>
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
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    scrollContent: {
        paddingHorizontal: 28,
        paddingTop: 30,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: '700',
        marginBottom: 8,
    },
    title: {
        fontSize: 34,
        fontWeight: typography.weightBold,
        color: colors.text,
        marginBottom: 12,
        letterSpacing: -1,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#707070',
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    form: {
        width: '100%',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 36,
        marginTop: -8,
    },
    forgotPasswordText: {
        color: '#707070',
        fontWeight: '600',
        fontSize: 13,
    },
    signInButton: {
        height: 64,
        borderRadius: 22,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 8,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 36,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#EAEAEA',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#A0A0A0',
        fontSize: 14,
        fontWeight: '600',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        flexDirection: 'row',
        width: '47%',
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
    googleIconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 14,
        height: 14,
        marginRight: 10,
    },
    googleDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 0.5,
    },
    socialButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 48,
    },
    footerText: {
        color: '#707070',
        fontSize: 15,
    },
    signUpLink: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '800',
    },
});
