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
import { RootStackParamList } from '../../navigation/types';
import { LogOut } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'LogoutConfirmation'>;

export const LogoutConfirmationScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)" translucent />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.overlay}>
                    <View style={styles.modalCard}>
                        <View style={styles.iconContainer}>
                            <LogOut size={32} color="#FF3B30" strokeWidth={2.5} />
                        </View>
                        <Text style={styles.title}>Log Out Account?</Text>
                        <Text style={styles.subtitle}>Are you sure you want to log out? You will need to enter your credentials again to access your account.</Text>

                        <View style={styles.actionRow}>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => navigation.goBack()}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.cancelBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.logoutBtn}
                                onPress={() => navigation.navigate('SignIn')}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.logoutBtnText}>Yes, Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, justifyContent: 'center' },
    overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
    modalCard: { backgroundColor: '#FFFFFF', width: '100%', borderRadius: 32, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.15, shadowRadius: 30, elevation: 24 },
    iconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FFF0F0', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
    title: { fontSize: 24, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5, marginBottom: 12, textAlign: 'center' },
    subtitle: { fontSize: 15, color: '#8E8E93', lineHeight: 22, textAlign: 'center', marginBottom: 32, paddingHorizontal: 8 },
    actionRow: { flexDirection: 'row', gap: 12, width: '100%' },
    cancelBtn: { flex: 1, height: 56, backgroundColor: '#F5F5F5', borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
    cancelBtnText: { color: '#1C1C1E', fontSize: 16, fontWeight: '800' },
    logoutBtn: { flex: 1, height: 56, backgroundColor: '#FF3B30', borderRadius: 28, justifyContent: 'center', alignItems: 'center', shadowColor: '#FF3B30', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
    logoutBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
