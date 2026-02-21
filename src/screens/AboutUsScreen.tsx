import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, MoveRight, Globe, ShieldCheck, HeartPulse } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'AboutUs'>;

export const AboutUsScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Hero Editorial */}
                <View style={styles.hero}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80' }}
                        style={styles.heroImg}
                    />
                    <View style={styles.heroOverlay} />

                    <SafeAreaView style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>OUR STORY</Text>
                        <View style={{ width: 44 }} />
                    </SafeAreaView>

                    <View style={styles.heroContent}>
                        <Text style={styles.heroSubtitle}>ESTABLISHED 2024</Text>
                        <Text style={styles.heroTitle}>A New Era of Craftsmanship</Text>
                    </View>
                </View>

                {/* The Philosophy */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>OUR PHILOSOPHY</Text>
                    <Text style={styles.sectionTitle}>The Human Touch in a Digital World</Text>
                    <Text style={styles.bodyText}>
                        Yap was born from a singular vision: to bridge the gap between architectural precision and the fluidity of human expression. We believe that what you wear is the most intimate form of architecture.
                    </Text>
                    <Text style={styles.bodyText}>
                        In a world of mass production, we celebrate the archive. Every piece in our collection is curated not just for its aesthetic, but for its endurance, its story, and its ability to transform.
                    </Text>
                </View>

                {/* Core Pillars */}
                <View style={[styles.section, { backgroundColor: colors.lightGray }]}>
                    <View style={styles.pillar}>
                        <Globe size={24} color={colors.secondary} strokeWidth={1} />
                        <View style={styles.pillarInfo}>
                            <Text style={styles.pillarTitle}>Global Sourcing</Text>
                            <Text style={styles.pillarSub}>We partner with heritage mills from Biella to Kyoto, ensuring every fiber meets our rigorous standards of luxury.</Text>
                        </View>
                    </View>

                    <View style={styles.pillar}>
                        <ShieldCheck size={24} color={colors.secondary} strokeWidth={1} />
                        <View style={styles.pillarInfo}>
                            <Text style={styles.pillarTitle}>Authenticity Guaranteed</Text>
                            <Text style={styles.pillarSub}>Every piece in the Yap Archive undergoes a 12-point inspection by our master curators before it reaches your residence.</Text>
                        </View>
                    </View>

                    <View style={styles.pillar}>
                        <HeartPulse size={24} color={colors.secondary} strokeWidth={1} />
                        <View style={styles.pillarInfo}>
                            <Text style={styles.pillarTitle}>Ethical Curation</Text>
                            <Text style={styles.pillarSub}>Luxury shouldn't cost the future. We commit to zero-waste packaging and supporting artisanal communities worldwide.</Text>
                        </View>
                    </View>
                </View>

                {/* The Team / Founders */}
                <View style={styles.section}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80' }}
                        style={styles.teamImg}
                    />
                    <Text style={styles.caption}>The London Atelier, 2024</Text>
                    <Text style={styles.bodyText}>
                        Our team is a collective of architects, tailors, and technologists. Together, we are redefining the commerce experience to be more personal, more transparent, and infinitely more beautiful.
                    </Text>

                    <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.navigate('ContactUs')}>
                        <Text style={styles.contactText}>Join the Movement</Text>
                        <MoveRight size={20} color={colors.secondary} />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 60 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    hero: { height: height * 0.7, position: 'relative' },
    heroImg: { ...StyleSheet.absoluteFillObject },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 0 : 40 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: colors.white, letterSpacing: 4 },

    heroContent: { position: 'absolute', bottom: 60, left: 32, right: 32 },
    heroSubtitle: { fontSize: 10, fontWeight: '900', color: colors.white, letterSpacing: 3, marginBottom: 12 },
    heroTitle: { fontSize: 48, fontWeight: '400', fontFamily: typography.display, color: colors.white, letterSpacing: -2, lineHeight: 52 },

    section: { paddingHorizontal: 32, paddingVertical: 60 },
    sectionLabel: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 2, marginBottom: 16 },
    sectionTitle: { fontSize: 32, fontWeight: '400', fontFamily: typography.display, color: colors.secondary, letterSpacing: -1, marginBottom: 24, lineHeight: 38 },
    bodyText: { fontSize: 16, color: '#444', lineHeight: 28, fontWeight: '500', marginBottom: 24 },

    pillar: { flexDirection: 'row', gap: 20, marginBottom: 40 },
    pillarInfo: { flex: 1 },
    pillarTitle: { fontSize: 18, fontWeight: '800', color: colors.secondary, marginBottom: 8 },
    pillarSub: { fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: '600' },

    teamImg: { width: '100%', height: 240, borderRadius: 2, marginBottom: 12 },
    caption: { fontSize: 11, color: colors.muted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 24 },

    contactBtn: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 20 },
    contactText: { fontSize: 13, fontWeight: '900', color: colors.secondary, letterSpacing: 1, textTransform: 'uppercase' }
});
