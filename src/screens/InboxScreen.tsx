import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ChevronLeft, MessageSquare, Clock, CheckCheck } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Inbox'>;

const MOCK_MESSAGES = [
    {
        id: '1',
        sender: 'Luxury Concierge',
        title: 'Your Private Invite',
        preview: 'Exclusive early access to our Winter Archive is now live for your account...',
        time: '2h ago',
        isUnread: true,
        type: 'SYSTEM'
    },
    {
        id: '2',
        sender: 'Inventory Team',
        title: 'Back in Stock Alert',
        preview: 'The Obsidian Leather Boots you bookmarked are now available in size 42.',
        time: 'Yesterday',
        isUnread: false,
        type: 'STOCK'
    },
    {
        id: '3',
        sender: 'Support Agent - Sarah',
        title: 'Re: My Returns #RET-9021',
        preview: 'I have successfully processed your return request. The courier will arrive...',
        time: '2 days ago',
        isUnread: false,
        type: 'SUPPORT'
    }
];

export const InboxScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={28} color={colors.secondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>YOUR INBOX</Text>
                <TouchableOpacity style={styles.backBtn}>
                    <CheckCheck size={20} color={colors.muted} />
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.filterTabs}>
                    <TouchableOpacity style={[styles.filterBtn, styles.filterActive]}>
                        <Text style={[styles.filterText, styles.filterTextActive]}>ALL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>ALERTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>MESSAGES</Text>
                    </TouchableOpacity>
                </View>

                {MOCK_MESSAGES.map(msg => (
                    <TouchableOpacity key={msg.id} style={[styles.messageCard, msg.isUnread && styles.unreadCard]}>
                        <View style={styles.msgHeader}>
                            <View style={styles.senderBox}>
                                <View style={[styles.dot, msg.isUnread && styles.unreadDot]} />
                                <Text style={styles.senderText}>{msg.sender}</Text>
                            </View>
                            <Text style={styles.timeText}>{msg.time}</Text>
                        </View>
                        <Text style={styles.msgTitle}>{msg.title}</Text>
                        <Text style={styles.msgPreview} numberOfLines={2}>{msg.preview}</Text>

                        <View style={styles.tagRow}>
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>{msg.type}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={styles.emptyFooter}>
                    <MessageSquare size={40} color={colors.border} strokeWidth={1} />
                    <Text style={styles.emptyText}>You've reached the end of your archives.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.lightGray, paddingTop: Platform.OS === 'ios' ? 0 : 40 },
    backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 11, fontWeight: '900', color: colors.secondary, letterSpacing: 2 },

    scroll: { padding: 24 },
    filterTabs: { flexDirection: 'row', gap: 12, marginBottom: 32 },
    filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.lightGray },
    filterActive: { backgroundColor: colors.secondary },
    filterText: { fontSize: 11, fontWeight: '800', color: colors.muted, letterSpacing: 1 },
    filterTextActive: { color: colors.white },

    messageCard: { padding: 20, backgroundColor: colors.white, borderRadius: 2, marginBottom: 16, borderLeftWidth: 0, borderBottomWidth: 1, borderBottomColor: colors.lightGray },
    unreadCard: { backgroundColor: '#FBFBFF', borderLeftWidth: 4, borderLeftColor: colors.primary },

    msgHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    senderBox: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent' },
    unreadDot: { backgroundColor: colors.primary },
    senderText: { fontSize: 10, fontWeight: '900', color: colors.muted, letterSpacing: 1.5, textTransform: 'uppercase' },
    timeText: { fontSize: 11, color: colors.muted, fontWeight: '600' },

    msgTitle: { fontSize: 17, fontWeight: '800', color: colors.secondary, marginBottom: 6 },
    msgPreview: { fontSize: 14, color: '#666', lineHeight: 20, fontWeight: '500' },

    tagRow: { marginTop: 16 },
    tag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, backgroundColor: colors.lightGray, borderRadius: 2 },
    tagText: { fontSize: 9, fontWeight: '900', color: colors.muted, letterSpacing: 1 },

    emptyFooter: { alignItems: 'center', marginTop: 40, opacity: 0.5 },
    emptyText: { fontSize: 12, fontWeight: '700', color: colors.muted, marginTop: 12 }
});
