import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 10,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding'); // Navigate to Onboarding
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>S</Text>
          </View>
        </Animated.View>
        <Animated.Text style={[styles.logo, { opacity: fadeAnim, transform: [{ translateY: 10 }] }]}>
          ShopMartee
        </Animated.Text>
        <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
          Fashion for the future
        </Animated.Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Use primary color for background
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 10,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});


