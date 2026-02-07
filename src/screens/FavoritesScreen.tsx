import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import ChevronLeft from 'lucide-react-native/dist/esm/icons/chevron-left';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

import { BottomNav } from '../components/BottomNav';

export const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Favorites</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.placeholder}>No favorites yet</Text>
                </View>
                <BottomNav />
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

    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: typography.weightBold,
        color: colors.text,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        fontSize: 16,
        color: colors.muted,
    },
});
