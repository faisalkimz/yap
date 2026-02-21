import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, ChevronDown, ChevronUp, Search } from 'lucide-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = NativeStackScreenProps<RootStackParamList, 'FAQ'>;

const FAQ_DATA = [
    {
        category: 'DELIVERY & SHIPPING',
        items: [
            { question: 'How long does luxury shipping take?', answer: 'Standard boutique delivery takes 3-5 business days. Express white-glove delivery is available in select cities for next-day arrival.' },
            { question: 'Do you ship internationally?', answer: 'Yes, we ship to over 50 countries. Custom duties and taxes are calculated at checkout for a seamless experience.' }
        ]
    },
    {
        category: 'RETURNS & EXCHANGES',
        items: [
            { question: 'What is your return policy?', answer: 'We offer a complimentary 14-day return period for all unworn items in their original packaging with security tags intact.' },
            { question: 'How do I start an exchange?', answer: 'Visit your "Returns Dashboard" in the profile section to initiate an exchange or contact our concierge.' }
        ]
    },
    {
        category: 'AUTHENTICITY & QUALITY',
        items: [
            { question: 'Are all items authentic?', answer: 'Guaranteed. Every piece in the Yap Archive is authenticated by our master curators and comes with a digital certificate of authenticity.' },
            { question: 'How should I care for my velvet pieces?', answer: 'We recommend professional dry cleaning only. Store in a cool, dry place using the provided dust bags.' }
        ]
    }
];

export const FAQScreen: React.FC<Props> = ({ navigation }) => {
    const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === id ? null : id);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={28} color={colors.secondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>HAVE A QUESTION?</Text>
                <TouchableOpacity style={styles.backBtn}>
                    <Search size={20} color={colors.secondary} />
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.hero}>
                    <Text style={styles.heroTitle}>Concierge Guide</Text>
                    <Text style={styles.heroSub}>Everything you need to know about the Yap experience.</Text>
                </View>

                {FAQ_DATA.map((section, sectionIdx) => (
                    <View key={section.category} style={styles.section}>
                        <Text style={styles.sectionLabel}>{section.category}</Text>
                        {section.items.map((item, itemIdx) => {
                            const id = `${sectionIdx}-${itemIdx}`;
                            const isExpanded = expandedIndex === id;
                            return (
                                <View key={id} style={[styles.faqItem, isExpanded && styles.faqExpanded]}>
                                    <TouchableOpacity
                                        style={styles.faqHeader}
                                        onPress={() => toggleExpand(id)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={[styles.question, isExpanded && styles.questionActive]}>{item.question}</Text>
                                        {isExpanded ? <ChevronUp size={20} color={colors.primary} /> : <ChevronDown size={20} color={colors.muted} />}
                                    </TouchableOpacity>
                                    {isExpanded && (
                                        <View style={styles.faqContent}>
                                            <Text style={styles.answer}>{item.answer}</Text>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                ))}

                <View style={styles.contactCard}>
                    <Text style={styles.contactTitle}>Still need assistance?</Text>
                    <Text style={styles.contactText}>Our master stylists are available 24/7 for personalized guidance.</Text>
                    <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.navigate('ContactUs')}>
                        <Text style={styles.contactBtnText}>Message Concierge</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 0 : 40, borderBottomWidth: 1, borderBottomColor: colors.lightGray },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: colors.secondary, letterSpacing: 2 },

    scroll: { paddingBottom: 60 },
    hero: { padding: 32, backgroundColor: colors.lightGray, marginBottom: 20 },
    heroTitle: { fontSize: 36, fontWeight: '400', fontFamily: typography.display, color: colors.secondary, marginBottom: 8 },
    heroSub: { fontSize: 15, color: colors.muted, fontWeight: '500', lineHeight: 22 },

    section: { marginBottom: 40, paddingHorizontal: 24 },
    sectionLabel: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 2, marginBottom: 20, paddingHorizontal: 8 },

    faqItem: { borderRadius: 2, backgroundColor: colors.white, marginBottom: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
    faqExpanded: { borderColor: colors.primary, backgroundColor: '#FEF9F8' },
    faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
    question: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.secondary, marginRight: 16 },
    questionActive: { color: colors.primary },

    faqContent: { paddingHorizontal: 20, paddingBottom: 20 },
    answer: { fontSize: 15, color: '#444', lineHeight: 24, fontWeight: '500' },

    contactCard: { marginHorizontal: 24, padding: 32, backgroundColor: colors.secondary, borderRadius: 2, alignItems: 'center' },
    contactTitle: { fontSize: 20, fontWeight: '800', color: colors.white, marginBottom: 8 },
    contactText: { fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
    contactBtn: { backgroundColor: colors.white, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 2 },
    contactBtnText: { fontSize: 13, fontWeight: '900', color: colors.secondary, letterSpacing: 1, textTransform: 'uppercase' }
});
