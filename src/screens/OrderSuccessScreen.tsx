import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated, StatusBar, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSuccess'>;

export const OrderSuccessScreen: React.FC<Props> = ({ navigation }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
                        <LinearGradient
                            colors={['#1C1C1E', '#2C2C2E']}
                            style={styles.iconGradient}
                        >
                            <Check size={48} color="#FFFFFF" strokeWidth={3} />
                        </LinearGradient>
                    </Animated.View>

                    <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                        <Text style={styles.title}>Order Confirmed</Text>
                        <Text style={styles.subtitle}>
                            Your luxurious pieces are being prepared and will be delivered by <Text style={styles.highlight}>24 Aug</Text>.
                        </Text>
                    </Animated.View>

                    <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
                        <TouchableOpacity
                            style={styles.trackButton}
                            onPress={() => navigation.navigate('OrderTracking')}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.trackButtonText}>Track Shipment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.homeButton}
                            onPress={() => navigation.navigate('Home')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.homeButtonText}>Back to Home</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
        elevation: 15,
    },
    iconGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1C1C1E',
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 64,
        paddingHorizontal: 10,
    },
    highlight: {
        color: '#1C1C1E',
        fontWeight: '900',
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    trackButton: {
        backgroundColor: '#1C1C1E',
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 8,
    },
    trackButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    homeButton: {
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    homeButtonText: {
        color: '#1C1C1E',
        fontSize: 16,
        fontWeight: '800',
    },
});
