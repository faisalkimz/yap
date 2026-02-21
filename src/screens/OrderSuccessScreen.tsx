import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Check } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSuccess'>;

export const OrderSuccessScreen: React.FC<Props> = ({ navigation }) => {
    const scaleAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 50,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
                        <Check size={40} color={colors.white} strokeWidth={3} />
                    </Animated.View>

                    <Text style={styles.title}>Your Order is on its way to you</Text>

                    <Text style={styles.description}>
                        Your Order has been placed successfully and it'll be delivered to you in the next 5 working days
                    </Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.trackButton}
                            onPress={() => navigation.navigate('OrderTracking')}
                        >
                            <Text style={styles.trackButtonText}>Track Now</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.homeButton}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={styles.homeButtonText}>Go Back to Home</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingHorizontal: 32,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4CD964', // Green success color
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        shadowColor: "#4CD964",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 32,
    },
    description: {
        fontSize: 14,
        color: colors.muted,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 48,
        maxWidth: 280,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    trackButton: {
        backgroundColor: colors.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    trackButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    homeButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    homeButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
});
