import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Animated,
    Easing,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Loader2 } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'SocialLoginCallback'>;

export const SocialLoginCallbackScreen: React.FC<Props> = ({ navigation }) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Simulate API check/token verification
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <Animated.View style={{ transform: [{ rotate: spin }], marginBottom: 24 }}>
                        <Loader2 size={48} color="#1C1C1E" strokeWidth={2.5} />
                    </Animated.View>
                    <Text style={styles.title}>Securing your connection...</Text>
                    <Text style={styles.subtitle}>Please wait while we log you in securely via your social account.</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
    title: { fontSize: 20, fontWeight: '900', color: '#1C1C1E', letterSpacing: -0.5, marginBottom: 12, textAlign: 'center' },
    subtitle: { fontSize: 15, color: '#8E8E93', lineHeight: 22, textAlign: 'center' },
});
