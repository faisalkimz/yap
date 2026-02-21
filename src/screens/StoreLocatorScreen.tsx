import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Dimensions,
    Platform,
    TextInput
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import {
    ChevronLeft,
    Navigation,
    Calendar,
    Search,
    MapPin,
    ArrowUpRight
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'StoreLocator'>;

const BOUTIQUES = [
    {
        id: '1',
        name: 'MAYFAIR\nFLAGSHIP',
        address: '22 Bond Street, Mayfair\nLondon W1S 1ET',
        distance: '0.8 MI',
        image: 'https://images.unsplash.com/photo-1582037928867-67704187e36a?w=600&q=80'
    },
    {
        id: '2',
        name: 'KNIGHTSBRIDGE\nATELIER',
        address: '87-135 Brompton Rd\nLondon SW1X 7XL',
        distance: '2.4 MI',
        image: 'https://images.unsplash.com/photo-1541339907198-e08759df9a73?w=600&q=80'
    }
];

export const StoreLocatorScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Dark Map Overlay */}
            <View style={styles.mapContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80' }}
                    style={styles.mapMock}
                />
                <View style={styles.mapOverlay} />

                <SafeAreaView style={styles.mapHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={28} color={colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>THE BOUTIQUES</Text>
                    <View style={{ width: 44 }} />
                </SafeAreaView>

                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Search size={18} color={colors.muted} />
                        <TextInput
                            placeholder="Find a residence..."
                            placeholderTextColor="#666"
                            style={styles.searchInput}
                        />
                    </View>
                </View>
            </View>

            {/* Boutiques List */}
            <View style={styles.bottomSheet}>
                <View style={styles.dragIndicator} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.listSubtitle}>CURATED EXPERIENCES</Text>
                    <Text style={styles.listTitle}>Visit Our World</Text>

                    {BOUTIQUES.map((store) => (
                        <View key={store.id} style={styles.boutiqueCard}>
                            <View style={styles.cardImageContainer}>
                                <Image source={{ uri: store.image }} style={styles.cardImage} />
                                <View style={styles.distanceBadge}>
                                    <Text style={styles.distanceText}>{store.distance}</Text>
                                </View>
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.boutiqueName}>{store.name}</Text>
                                <Text style={styles.boutiqueAddress}>{store.address}</Text>

                                <View style={styles.cardActions}>
                                    <TouchableOpacity style={styles.actionBtn}>
                                        <Navigation size={16} color={colors.secondary} style={{ marginRight: 6 }} />
                                        <Text style={styles.actionBtnText}>Navigate</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.secondary }]}>
                                        <Calendar size={16} color={colors.white} style={{ marginRight: 6 }} />
                                        <Text style={[styles.actionBtnText, { color: colors.white }]}>Book Private</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}

                    <View style={styles.conciergeBox}>
                        <Text style={styles.conciergeTitle}>Digital Concierge</Text>
                        <Text style={styles.conciergeText}>Can't visit in person? Join a live virtual consultation with our lead stylists.</Text>
                        <TouchableOpacity style={styles.conciergeLink}>
                            <Text style={styles.conciergeLinkText}>Speak to us now</Text>
                            <ArrowUpRight size={16} color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.black },
    mapContainer: { height: height * 0.45, position: 'relative' },
    mapMock: { ...StyleSheet.absoluteFillObject, opacity: 0.4 },
    mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },

    mapHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 0 : 40 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: colors.white, letterSpacing: 3 },

    searchBarContainer: { paddingHorizontal: 24, marginTop: 40 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', height: 56, borderRadius: 2, paddingHorizontal: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    searchInput: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '600', color: colors.white },

    bottomSheet: { flex: 1, backgroundColor: colors.white, borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -32 },
    dragIndicator: { width: 40, height: 4, backgroundColor: colors.lightGray, borderRadius: 2, alignSelf: 'center', marginTop: 12 },
    scrollContent: { paddingHorizontal: 24, paddingVertical: 32 },

    listSubtitle: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 2, marginBottom: 8 },
    listTitle: { fontSize: 32, fontWeight: '400', fontFamily: typography.display, color: colors.secondary, marginBottom: 32, letterSpacing: -1 },

    boutiqueCard: { marginBottom: 48 },
    cardImageContainer: { width: '100%', height: 260, borderRadius: 2, overflow: 'hidden', backgroundColor: colors.lightGray, marginBottom: 20 },
    cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    distanceBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: colors.white, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
    distanceText: { fontSize: 11, fontWeight: '900', color: colors.secondary },

    cardInfo: {},
    boutiqueName: { fontSize: 22, fontWeight: '900', color: colors.secondary, letterSpacing: -0.5, lineHeight: 28, marginBottom: 12 },
    boutiqueAddress: { fontSize: 15, color: colors.muted, fontWeight: '500', lineHeight: 24, marginBottom: 20 },

    cardActions: { flexDirection: 'row', gap: 10 },
    actionBtn: { flex: 1, height: 52, backgroundColor: colors.lightGray, borderRadius: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    actionBtnText: { fontSize: 12, fontWeight: '900', color: colors.secondary, letterSpacing: 0.5 },

    conciergeBox: { backgroundColor: '#FDF7F5', padding: 28, borderRadius: 2, marginTop: 16 },
    conciergeTitle: { fontSize: 18, fontWeight: '900', color: colors.secondary, marginBottom: 8 },
    conciergeText: { fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: '600', marginBottom: 16 },
    conciergeLink: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    conciergeLinkText: { fontSize: 14, fontWeight: '900', color: colors.primary, textDecorationLine: 'underline' }
});
