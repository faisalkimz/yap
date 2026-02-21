import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, StatusBar, Dimensions, ImageBackground, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 10,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background with Ambient Feel */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1539109132314-34a9c6553876?w=1200&q=80' }}
        style={styles.bgImage}
        blurRadius={Platform.OS === 'ios' ? 10 : 5}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [
            { scale: logoScale },
            { translateY: logoTranslateY }
          ]
        }
      ]}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>YAP</Text>
        </View>
        <View style={styles.taglineBox}>
          <View style={styles.line} />
          <Text style={styles.tagline}>THE FUTURE OF ATTIRE</Text>
          <View style={styles.line} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.version}>EST. 2026 — Uganda</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  content: {
    alignItems: 'center',
  },
  logoBadge: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 20,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: 8,
    textAlign: 'center',
    marginLeft: 8, // Offset for letterSpacing
  },
  taglineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  line: {
    width: 30,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  version: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
