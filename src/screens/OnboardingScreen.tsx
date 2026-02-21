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
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
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
    title: 'Discover Pure ',
    highlight: 'Aura',
    description: 'Immerse yourself in a world of high-end fashion curated for those who seek the extraordinary.',
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
    title: 'Elegance Redefined ',
    highlight: 'Classic',
    description: 'Pieces that transcend seasons. Minimalist ethics meets maximalist luxury in every stitch.',
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
    title: 'Stay Ahead of ',
    highlight: 'Flow',
    description: 'Bespoke collections from the world’s elite boutiques. exclusive access to global trends.',
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
          <Image source={{ uri: item.images[3] }} style={[styles.image, { height: height * 0.22, marginTop: 12 }]} />
        </View>
        <View style={styles.column}>
          <Image source={{ uri: item.images[1] }} style={[styles.image, { height: height * 0.20 }]} />
          <Image source={{ uri: item.images[4] }} style={[styles.image, { height: height * 0.26, marginTop: 12 }]} />
          <Image source={{ uri: item.images[2] }} style={[styles.image, { height: height * 0.18, marginTop: 12 }]} />
        </View>
        <View style={styles.column}>
          <Image source={{ uri: item.images[5] }} style={[styles.image, { height: height * 0.24 }]} />
          <Image source={{ uri: item.images[1] }} style={[styles.image, { height: height * 0.26, marginTop: 12 }]} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />

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
        colors={['transparent', 'rgba(0,0,0,0.9)', '#000000']}
        style={styles.fadeOverlay}
        pointerEvents="none"
      />

      <View style={styles.bottomSection}>
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

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {SLIDES[currentIndex].title}
            <Text style={styles.highlight}>{SLIDES[currentIndex].highlight}</Text>
          </Text>

          <Text style={styles.description}>
            {SLIDES[currentIndex].description}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => {
            if (currentIndex < SLIDES.length - 1) {
              flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            } else {
              navigation.replace('Home');
            }
          }}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#1C1C1E', '#2C2C2E']}
            style={styles.btnGradient}
          >
            <Text style={styles.mainButtonText}>
              {currentIndex === SLIDES.length - 1 ? "Get Started" : "Next Step"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Found your way back? </Text>
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
    backgroundColor: '#000000',
  },
  slide: {
    width: width,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
  },
  imageGridContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  column: {
    width: (width - 32) / 3,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#0A0A0A',
  },
  fadeOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.6,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 24,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 16,
    letterSpacing: -1.5,
  },
  highlight: {
    color: '#FF6B4A',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 4,
  },
  mainButton: {
    width: '100%',
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  btnGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 15,
  },
  loginLink: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});
