import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { PrimaryButton } from '../components/PrimaryButton';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

interface OnboardingSlide {
  id: string;
  title: string;
  highlight: string;
  description: string;
  images: string[];
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Curated ',
    highlight: 'Fashion',
    description: 'Browse styles shaped around your comfort, and personality, and discover clothing that feels right.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
      'https://images.unsplash.com/photo-1539109132381-31a15b2c6a4a?w=400&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&q=80',
    ],
  },
  {
    id: '2',
    title: 'Modern ',
    highlight: 'Elegance',
    description: 'Experience a new standard of quality with pieces designed to stand the test of time and trend.',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
      'https://images.unsplash.com/photo-1539109132381-31a15b2c6a4a?w=400&q=80',
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=400&q=80',
      'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&q=80',
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
    ],
  },
  {
    id: '3',
    title: 'Global ',
    highlight: 'Trends',
    description: 'Connect with a community of trendsetters and get ahead with the latest global street styles.',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80',
      'https://images.unsplash.com/photo-1529139513055-07f9127e69c1?w=400&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b830c6050?w=400&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80',
      'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=400&q=80',
    ],
  },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <View style={styles.imageGridContainer}>
        <View style={styles.column}>
          <Image source={{ uri: item.images[0] }} style={[styles.image, { height: height * 0.28 }]} />
          <Image source={{ uri: item.images[3] }} style={[styles.image, { height: height * 0.22, marginTop: spacing.md }]} />
        </View>
        <View style={styles.column}>
          <Image source={{ uri: item.images[1] }} style={[styles.image, { height: height * 0.20 }]} />
          <Image source={{ uri: item.images[4] }} style={[styles.image, { height: height * 0.26, marginTop: spacing.md }]} />
          <Image source={{ uri: item.images[2] }} style={[styles.image, { height: height * 0.18, marginTop: spacing.md }]} />
        </View>
        <View style={styles.column}>
          <Image source={{ uri: item.images[5] }} style={[styles.image, { height: height * 0.24 }]} />
          <Image source={{ uri: item.images[0] }} style={[styles.image, { height: height * 0.26, marginTop: spacing.md }]} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        keyExtractor={(item) => item.id}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', colors.white]}
        style={styles.fadeOverlay}
      />

      <View style={styles.card}>
        <View style={styles.paginationContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null
              ]}
            />
          ))}
        </View>

        <Text style={styles.title}>
          {SLIDES[currentIndex].title}
          <Text style={styles.highlight}>{SLIDES[currentIndex].highlight}</Text>
          {currentIndex === 0 ? ' Designed Around Your Taste' : ''}
          {currentIndex === 1 ? ' For The Modern Individual' : ''}
          {currentIndex === 2 ? ' From Across The World' : ''}
        </Text>

        <Text style={styles.description}>
          {SLIDES[currentIndex].description}
        </Text>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            label={currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
            onPress={() => {
              if (currentIndex < SLIDES.length - 1) {
                flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
              } else {
                navigation.navigate('GetStarted');
              }
            }}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width: width,
    paddingTop: 60,
  },
  imageGridContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    justifyContent: 'space-between',
  },
  column: {
    width: (width - spacing.sm * 4) / 3,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
  },
  fadeOverlay: {
    position: 'absolute',
    bottom: height * 0.35,
    width: '100%',
    height: 100,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 32,
    paddingBottom: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 28,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EAEAEA',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: typography.weightBold,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  highlight: {
    color: colors.primary,
  },
  description: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    paddingHorizontal: 12,
  },
  buttonWrapper: {
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    height: 60,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: colors.muted,
    fontSize: 15,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: typography.weightBold,
  },
});
