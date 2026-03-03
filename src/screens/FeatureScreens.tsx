import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    StatusBar,
    Dimensions,
    Alert,
    FlatList,
    Switch,
} from 'react-native';
import {
    ChevronLeft,
    Bell,
    Settings,
    CreditCard,
    Wallet,
    Gift,
    Users,
    Star,
    Crown,
    Zap,
    Award,
    Tag,
    RefreshCw,
    Sparkles,
    Globe,
    Languages,
    Gavel,
    Clock,
    ShoppingCart,
    MessageSquare,
    Bot,
    FileText,
    Download,
    Calendar,
    Home,
    DollarSign,
    File,
    Shield,
    AlertTriangle,
    XCircle,
    Check,
    Plus,
    Search,
    Filter,
    MoreVertical,
    ArrowRight,
    Lock,
    Eye,
    Copy,
    Share2,
    Heart,
    Smartphone,
    MessageCircle,
    Fingerprint,
    TagIcon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// --- Theme Colors ---
const COLORS = {
    primary: '#E44B1B',
    primaryLight: '#FF6B3D',
    black: '#000000',
    dark: '#121212',
    dark2: '#1A1A1A',
    dark3: '#252525',
    dark4: '#2F2F2F',
    dark5: '#3A3A3A',
    white: '#FFFFFF',
    gray: '#888888',
    gray2: '#AAAAAA',
    gray3: '#666666',
    success: '#22C55E',
    successLight: '#16A34A',
    warning: '#F59E0B',
    warningLight: '#D97706',
    error: '#EF4444',
    errorLight: '#DC2626',
    blue: '#3B82F6',
    blueLight: '#2563EB',
    gold: '#F59E0B',
    purple: '#8B5CF6',
    pink: '#EC4899',
    teal: '#14B8A6',
};

// --- Mock Data ---
const NOTIFICATION_SETTINGS = [
    { id: '1', title: 'Push Notifications', subtitle: 'Receive notifications on your device', enabled: true },
    { id: '2', title: 'Order Updates', subtitle: 'Get notified about order status changes', enabled: true },
    { id: '3', title: 'Promotional Alerts', subtitle: 'Receive deals and special offers', enabled: false },
    { id: '4', title: 'Price Drop Alerts', subtitle: 'When items in your wishlist go on sale', enabled: true },
    { id: '5', title: 'New Arrivals', subtitle: 'Be the first to know about new products', enabled: false },
    { id: '6', title: 'Flash Sale Alerts', subtitle: 'Limited time deals and flash sales', enabled: true },
];

const CHAT_MESSAGES = [
    { id: '1', sender: 'support', name: 'YAP Support', message: 'Hello! How can I help you today?', time: '10:30 AM' },
    { id: '2', sender: 'user', message: 'I need help with my order', time: '10:31 AM' },
    { id: '3', sender: 'support', name: 'YAP Support', message: 'Of course! Can you please share your order number?', time: '10:32 AM' },
];

const BIOMETRIC_OPTIONS = [
    { id: '1', title: 'Face ID', subtitle: 'Use face recognition to unlock', icon: 'face', enabled: true },
    { id: '2', title: 'Touch ID', subtitle: 'Use fingerprint to unlock', icon: 'fingerprint', enabled: false },
    { id: '3', title: 'Biometric Login', subtitle: 'Use biometrics to log in', enabled: true },
];
const SUBSCRIPTION_PLANS = [
    { id: '1', name: 'Basic', price: 29, period: 'month', features: ['Up to 50 products', 'Basic analytics', 'Email support', 'Standard transaction fees'], popular: false },
    { id: '2', name: 'Professional', price: 79, period: 'month', features: ['Unlimited products', 'Advanced analytics', 'Priority support', 'Lower transaction fees', 'Custom domain'], popular: true },
    { id: '3', name: 'Enterprise', price: 199, period: 'month', features: ['Everything in Pro', 'Dedicated account manager', 'API access', 'Custom integrations', 'White-label'], popular: false },
];

const MEMBERSHIP_TIERS = [
    { id: '1', name: 'Bronze', points: '0 - 999', discount: '5%', color: '#CD7F32', icon: '🥉' },
    { id: '2', name: 'Silver', points: '1,000 - 4,999', discount: '10%', color: '#C0C0C0', icon: '🥈' },
    { id: '3', name: 'Gold', points: '5,000 - 19,999', discount: '15%', color: '#FFD700', icon: '🥇' },
    { id: '4', name: 'Platinum', points: '20,000+', discount: '20%', color: '#E5E4E2', icon: '💎' },
];

const LOYALTY_REWARDS = [
    { id: '1', name: '50 Points', discount: '£5 off', points: 50, cost: 500 },
    { id: '2', name: '100 Points', discount: '£12 off', points: 100, cost: 1000 },
    { id: '3', name: '200 Points', discount: '£30 off', points: 200, cost: 2000 },
    { id: '4', name: 'Free Shipping', discount: 'Free shipping on next order', points: 150, cost: 1500 },
];

const GIFT_CARDS = [
    { id: '1', amount: 10, sold: 234 },
    { id: '2', amount: 25, sold: 456 },
    { id: '3', amount: 50, sold: 189 },
    { id: '4', amount: 100, sold: 67 },
];

const AFFILIATES = [
    { id: '1', name: 'Fashion Blogger', code: 'FASHION20', clicks: 1234, conversions: 89, earnings: 890 },
    { id: '2', name: 'Tech Reviewer', code: 'TECH15', clicks: 2345, conversions: 156, earnings: 1560 },
    { id: '3', name: 'Home Decorator', code: 'HOME25', clicks: 987, conversions: 45, earnings: 450 },
];

const REFERRALS = [
    { id: '1', user: 'John D.', referred: 5, bonus: 50 },
    { id: '2', user: 'Sarah M.', referred: 12, bonus: 120 },
    { id: '3', user: 'Mike R.', referred: 3, bonus: 30 },
];

const ABANDONED_CARTS = [
    { id: '1', customer: 'John S.', items: 2, value: 156, time: '2 hours ago' },
    { id: '2', customer: 'Emma W.', items: 1, value: 89, time: '5 hours ago' },
    { id: '3', customer: 'Mike B.', items: 3, value: 234, time: '1 day ago' },
];

const AI_RECOMMENDATIONS = [
    { id: '1', title: 'Trending Now', products: ['iPhone Case', 'Wireless Charger', 'Screen Protector'] },
    { id: '2', title: 'Frequently Bought Together', products: ['Phone + Case + Charger'] },
    { id: '3', title: 'You May Also Like', products: ['Similar Style Bags', 'Matching Accessories'] },
    { id: '4', title: 'Popular in Category', products: ['Best Sellers', 'New Arrivals'] },
];

const CURRENCIES = [
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
];

const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
];

const AUCTIONS = [
    { id: '1', product: 'Vintage Watch', currentBid: 250, bids: 12, ends: '2 hours left', image: 'auction1' },
    { id: '2', product: 'Designer Bag', currentBid: 450, bids: 8, ends: '5 hours left', image: 'auction2' },
    { id: '3', product: 'Rare Coin', currentBid: 890, bids: 23, ends: '1 day left', image: 'auction3' },
];

const PRE_ORDERS = [
    { id: '1', name: 'iPhone 16 Pro', price: 1199, releaseDate: 'Sept 2026', deposit: 99 },
    { id: '2', name: 'PS6 Console', price: 599, releaseDate: 'Nov 2026', deposit: 50 },
];

const BOOKINGS = [
    { id: '1', service: 'Haircut', duration: '30 min', price: 35, provider: 'John\'s Salon' },
    { id: '2', service: 'Massage', duration: '60 min', price: 80, provider: 'Spa Center' },
    { id: '3', service: 'Dental Checkup', duration: '45 min', price: 50, provider: 'Dental Care' },
];

const DIGITAL_PRODUCTS = [
    { id: '1', name: 'E-Book: React Native Guide', price: 29, downloads: 156, size: '5 MB' },
    { id: '2', name: 'UI Kit Bundle', price: 49, downloads: 89, size: '120 MB' },
    { id: '3', name: 'Stock Photos Pack', price: 19, downloads: 234, size: '500 MB' },
];

const RENTAL_PRODUCTS = [
    { id: '1', name: 'DSLR Camera', pricePerDay: 45, deposit: 200, available: true },
    { id: '2', name: 'Party Tent', pricePerDay: 80, deposit: 500, available: true },
    { id: '3', name: 'Projector', pricePerDay: 35, deposit: 150, available: false },
];

const WHOLESALE_PRODUCTS = [
    { id: '1', name: 'T-Shirts (Bulk)', price: 5, minQty: 50, retailPrice: 25 },
    { id: '2', name: 'Phone Cases (Bulk)', price: 3, minQty: 100, retailPrice: 15 },
];

const QUOTE_REQUESTS = [
    { id: '1', customer: 'ABC Corp', products: '50 x Laptops', date: 'Today', status: 'pending' },
    { id: '2', customer: 'XYZ Ltd', products: '100 x Office Chairs', date: 'Yesterday', status: 'quoted' },
];

// --- Components ---
const StatusBadge = ({ status }: { status: string }) => {
    const getColors = () => {
        switch (status) {
            case 'pending': return { bg: COLORS.warning + '20', text: COLORS.warning };
            case 'quoted': return { bg: COLORS.blue + '20', text: COLORS.blue };
            case 'approved': return { bg: COLORS.success + '20', text: COLORS.success };
            case 'rejected': return { bg: COLORS.error + '20', text: COLORS.error };
            default: return { bg: COLORS.gray + '20', text: COLORS.gray };
        }
    };
    const { bg, text } = getColors();
    return (
        <View style={[styles.statusBadge, { backgroundColor: bg }]}>
            <Text style={[styles.statusText, { color: text }]}>{status.toUpperCase()}</Text>
        </View>
    );
};

// =====================================================
// PUSH NOTIFICATION SETTINGS
// =====================================================
export const PushNotificationsScreen = ({ navigation }: any) => {
    const [notifications, setNotifications] = useState(NOTIFICATION_SETTINGS);
    const toggleNotification = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>Notifications</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.notificationHeader}>
                        <Bell size={48} color={COLORS.primary} />
                        <Text style={styles.notificationTitle}>Stay Updated</Text>
                        <Text style={styles.notificationSubtitle}>Choose what notifications you want to receive</Text>
                    </View>

                    {notifications.map((item) => (
                        <View key={item.id} style={styles.notificationCard}>
                            <View style={styles.notificationInfo}>
                                <Text style={styles.notificationItemTitle}>{item.title}</Text>
                                <Text style={styles.notificationItemSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Switch
                                value={item.enabled}
                                onValueChange={() => toggleNotification(item.id)}
                                trackColor={{ false: COLORS.dark3, true: COLORS.primary + '80' }}
                                thumbColor={item.enabled ? COLORS.primary : COLORS.gray}
                            />
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// IN-APP CHAT
// =====================================================
export const InAppChatScreen = ({ navigation }: any) => {
    const [messages, setMessages] = useState(CHAT_MESSAGES);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: String(messages.length + 1),
                sender: 'user',
                message: inputText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <View style={styles.chatHeaderInfo}>
                        <View style={styles.chatAvatar}><MessageCircle size={20} color={COLORS.white} /></View>
                        <View>
                            <Text style={styles.headerTitleText}>YAP Support</Text>
                            <Text style={styles.chatStatus}>Online • Typically replies instantly</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <MoreVertical size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.chatMessages} showsVerticalScrollIndicator={false}>
                    {messages.map((msg) => (
                        <View key={msg.id} style={[styles.messageBubble, msg.sender === 'user' && styles.messageUser]}>
                            {msg.sender === 'support' && <Text style={styles.messageName}>{msg.name}</Text>}
                            <Text style={styles.messageText}>{msg.message}</Text>
                            <Text style={styles.messageTime}>{msg.time}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.chatInput}>
                    <TouchableOpacity style={styles.attachButton}><Plus size={24} color={COLORS.gray} /></TouchableOpacity>
                    <TextInput
                        style={styles.chatTextInput}
                        placeholder="Type a message..."
                        placeholderTextColor={COLORS.gray}
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <MessageCircle size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// BIOMETRIC SETUP
// =====================================================
export const BiometricSetupScreen = ({ navigation }: any) => {
    const [options, setOptions] = useState(BIOMETRIC_OPTIONS);
    const toggleOption = (id: string) => {
        setOptions(prev => prev.map(o => o.id === id ? { ...o, enabled: !o.enabled } : o));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>Security</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.biometricHeader}>
                        <Fingerprint size={64} color={COLORS.primary} />
                        <Text style={styles.biometricTitle}>Biometric Security</Text>
                        <Text style={styles.biometricSubtitle}>Use Face ID or Touch ID for quick and secure access</Text>
                    </View>

                    {options.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.biometricCard} onPress={() => toggleOption(item.id)}>
                            <View style={styles.biometricIcon}>
                                {item.icon === 'face' ? <Smartphone size={24} color={COLORS.white} /> : <Fingerprint size={24} color={COLORS.white} />}
                            </View>
                            <View style={styles.biometricInfo}>
                                <Text style={styles.biometricName}>{item.title}</Text>
                                <Text style={styles.biometricDesc}>{item.subtitle}</Text>
                            </View>
                            <Switch
                                value={item.enabled}
                                onValueChange={() => toggleOption(item.id)}
                                trackColor={{ false: COLORS.dark3, true: COLORS.primary + '80' }}
                                thumbColor={item.enabled ? COLORS.primary : COLORS.gray}
                            />
                        </TouchableOpacity>
                    ))}

                    <View style={styles.securityNote}>
                        <Shield size={20} color={COLORS.success} />
                        <Text style={styles.securityNoteText}>Your biometric data is stored securely on your device and never shared with us.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// SUBSCRIPTION PLANS
// =====================================================
export const SubscriptionPlansScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Subscription Plans</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={SUBSCRIPTION_PLANS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>CHOOSE YOUR PLAN</Text>}
                renderItem={({ item }) => (
                    <View style={[styles.planCard, item.popular && styles.planCardPopular]}>
                        {item.popular && <View style={styles.popularBadge}><Text style={styles.popularText}>MOST POPULAR</Text></View>}
                        <Text style={styles.planName}>{item.name}</Text>
                        <View style={styles.planPrice}>
                            <Text style={styles.planCurrency}>£</Text>
                            <Text style={styles.planAmount}>{item.price}</Text>
                            <Text style={styles.planPeriod}>/{item.period}</Text>
                        </View>
                        <View style={styles.planFeatures}>
                            {item.features.map((feature, index) => (
                                <View key={index} style={styles.planFeature}>
                                    <Check size={14} color={COLORS.success} />
                                    <Text style={styles.planFeatureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity style={[styles.planButton, item.popular && styles.planButtonPopular]}>
                            <Text style={[styles.planButtonText, item.popular && styles.planButtonTextPopular]}>Subscribe</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// MEMBERSHIP PAGE
// =====================================================
export const MembershipPageScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Membership</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.membershipCard}>
                    <Crown size={40} color={COLORS.gold} />
                    <Text style={styles.membershipTitle}>Gold Member</Text>
                    <Text style={styles.membershipPoints}>12,450 points</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '62%' }]} />
                    </View>
                    <Text style={styles.progressText}>2,550 points to Platinum</Text>
                </View>

                <Text style={styles.sectionTitle}>MEMBERSHIP TIERS</Text>
                <View style={styles.tiersContainer}>
                    {MEMBERSHIP_TIERS.map((tier) => (
                        <View key={tier.id} style={[styles.tierCard, { borderColor: tier.color }]}>
                            <Text style={styles.tierIcon}>{tier.icon}</Text>
                            <Text style={styles.tierName}>{tier.name}</Text>
                            <Text style={styles.tierPoints}>{tier.points}</Text>
                            <Text style={[styles.tierDiscount, { color: tier.color }]}>{tier.discount} OFF</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>REDEEM REWARDS</Text>
                {LOYALTY_REWARDS.map((reward) => (
                    <View key={reward.id} style={styles.rewardCard}>
                        <View style={styles.rewardInfo}>
                            <Text style={styles.rewardName}>{reward.name}</Text>
                            <Text style={styles.rewardDiscount}>{reward.discount}</Text>
                        </View>
                        <TouchableOpacity style={styles.redeemButton}>
                            <Text style={styles.redeemText}>Redeem ({reward.cost} pts)</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    </View>
);

// =====================================================
// LOYALTY PROGRAM
// =====================================================
export const LoyaltyProgramScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Loyalty Program</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.membershipCard}>
                    <Award size={40} color={COLORS.primary} />
                    <Text style={styles.membershipTitle}>Earn Points</Text>
                    <Text style={styles.membershipPoints}>12,450 YAP Points</Text>
                    <Text style={styles.progressText}>Earn 1 point for every £1 spent</Text>
                </View>

                <Text style={styles.sectionTitle}>HOW TO EARN</Text>
                <View style={styles.earnCard}>
                    <View style={styles.earnItem}>
                        <ShoppingCart size={24} color={COLORS.primary} />
                        <Text style={styles.earnTitle}>Shop</Text>
                        <Text style={styles.earnDesc}>1 point per £1</Text>
                    </View>
                    <View style={styles.earnItem}>
                        <Star size={24} color={COLORS.primary} />
                        <Text style={styles.earnTitle}>Review</Text>
                        <Text style={styles.earnDesc}>50 points</Text>
                    </View>
                    <View style={styles.earnItem}>
                        <Share2 size={24} color={COLORS.primary} />
                        <Text style={styles.earnTitle}>Share</Text>
                        <Text style={styles.earnDesc}>25 points</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>YOUR ACTIVITY</Text>
                <View style={styles.activityCard}>
                    <View style={styles.activityRow}>
                        <Text style={styles.activityLabel}>Total Earned</Text>
                        <Text style={styles.activityValue}>+2,450 pts</Text>
                    </View>
                    <View style={styles.activityRow}>
                        <Text style={styles.activityLabel}>Total Redeemed</Text>
                        <Text style={[styles.activityValue, { color: COLORS.error }]}>-1,000 pts</Text>
                    </View>
                    <View style={[styles.activityRow, { borderTopWidth: 1, borderTopColor: COLORS.dark3, paddingTop: 12 }]}>
                        <Text style={styles.activityLabel}>Current Balance</Text>
                        <Text style={[styles.activityValue, { color: COLORS.primary }]}>12,450 pts</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </View>
);

// =====================================================
// GIFT CARDS
// =====================================================
export const GiftCardsScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Gift Cards</Text>
                <TouchableOpacity>
                    <Plus size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.giftCardBanner}>
                    <Gift size={48} color={COLORS.white} />
                    <Text style={styles.giftCardTitle}>Send the Perfect Gift</Text>
                    <Text style={styles.giftCardSubtitle}>Choose from our collection of gift cards</Text>
                </View>

                <Text style={styles.sectionTitle}>GIFT CARD DESIGN</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.giftCardScroll}>
                    {GIFT_CARDS.map((card) => (
                        <View key={card.id} style={styles.giftCard}>
                            <Text style={styles.giftCardAmount}>£{card.amount}</Text>
                            <TouchableOpacity style={styles.buyButton}>
                                <Text style={styles.buyButtonText}>Buy</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>CUSTOM AMOUNT</Text>
                <View style={styles.customAmountCard}>
                    <TextInput
                        style={styles.customInput}
                        placeholder="Enter amount"
                        placeholderTextColor={COLORS.gray}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.customButton}>
                        <Text style={styles.customButtonText}>Create Card</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    </View>
);

// =====================================================
// AFFILIATE DASHBOARD
// =====================================================
export const AffiliateDashboardScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Affiliate Program</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.affiliateStats}>
                    <View style={styles.affiliateStat}>
                        <Text style={styles.affiliateValue}>£2,340</Text>
                        <Text style={styles.affiliateLabel}>Total Earnings</Text>
                    </View>
                    <View style={styles.affiliateStat}>
                        <Text style={styles.affiliateValue}>4,566</Text>
                        <Text style={styles.affiliateLabel}>Total Clicks</Text>
                    </View>
                    <View style={styles.affiliateStat}>
                        <Text style={styles.affiliateValue}>290</Text>
                        <Text style={styles.affiliateLabel}>Conversions</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>YOUR AFFILIATE CODES</Text>
                {AFFILIATES.map((affiliate) => (
                    <View key={affiliate.id} style={styles.affiliateCard}>
                        <View style={styles.affiliateHeader}>
                            <Text style={styles.affiliateName}>{affiliate.name}</Text>
                            <TouchableOpacity>
                                <Copy size={18} color={COLORS.gray} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.affiliateCode}>{affiliate.code}</Text>
                        <View style={styles.affiliateRow}>
                            <View>
                                <Text style={styles.affiliateStatValue}>{affiliate.clicks}</Text>
                                <Text style={styles.affiliateStatLabel}>Clicks</Text>
                            </View>
                            <View>
                                <Text style={styles.affiliateStatValue}>{affiliate.conversions}</Text>
                                <Text style={styles.affiliateStatLabel}>Sales</Text>
                            </View>
                            <View>
                                <Text style={[styles.affiliateStatValue, { color: COLORS.success }]}>£{affiliate.earnings}</Text>
                                <Text style={styles.affiliateStatLabel}>Earned</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    </View>
);

// =====================================================
// REFERRAL PROGRAM
// =====================================================
export const ReferralProgramScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Referrals</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.referralBanner}>
                    <Users size={48} color={COLORS.white} />
                    <Text style={styles.referralTitle}>Invite Friends</Text>
                    <Text style={styles.referralSubtitle}>Get £10 for each friend who signs up</Text>
                </View>

                <View style={styles.referralCode}>
                    <Text style={styles.referralCodeLabel}>Your Referral Code</Text>
                    <View style={styles.referralCodeBox}>
                        <Text style={styles.referralCodeText}>YAP2024</Text>
                        <TouchableOpacity>
                            <Copy size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.shareButton}>
                        <Share2 size={18} color={COLORS.white} />
                        <Text style={styles.shareButtonText}>Share Link</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>YOUR REFERRALS</Text>
                {REFERRALS.map((ref) => (
                    <View key={ref.id} style={styles.referralCard}>
                        <View style={styles.referralAvatar}>
                            <Text style={styles.referralAvatarText}>{ref.user.charAt(0)}</Text>
                        </View>
                        <View style={styles.referralInfo}>
                            <Text style={styles.referralName}>{ref.user}</Text>
                            <Text style={styles.referralDetail}>{ref.referred} purchases</Text>
                        </View>
                        <Text style={styles.referralBonus}>+£{ref.bonus}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    </View>
);

// =====================================================
// ABANDONED CART RECOVERY
// =====================================================
export const AbandonedCartScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Abandoned Carts</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={ABANDONED_CARTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>RECOVERABLE ORDERS</Text>}
                renderItem={({ item }) => (
                    <View style={styles.cartCard}>
                        <View style={styles.cartHeader}>
                            <Text style={styles.cartCustomer}>{item.customer}</Text>
                            <Text style={styles.cartTime}>{item.time}</Text>
                        </View>
                        <Text style={styles.cartItems}>{item.items} items</Text>
                        <View style={styles.cartFooter}>
                            <Text style={styles.cartValue}>£{item.value}</Text>
                            <TouchableOpacity style={styles.recoverButton}>
                                <Text style={styles.recoverText}>Send Reminder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// AI RECOMMENDATIONS
// =====================================================
export const AIRecommendationsScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <View style={styles.headerTitle}>
                    <Sparkles size={20} color={COLORS.primary} />
                    <Text style={styles.headerTitleText}>AI Recommendations</Text>
                </View>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.aiCard}>
                    <Zap size={32} color={COLORS.primary} />
                    <Text style={styles.aiTitle}>Powered by AI</Text>
                    <Text style={styles.aiSubtitle}>Personalized just for you</Text>
                </View>

                {AI_RECOMMENDATIONS.map((section) => (
                    <View key={section.id}>
                        <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recScroll}>
                            {section.products.map((product, index) => (
                                <View key={index} style={styles.recProduct}>
                                    <View style={styles.recImage}>
                                        <Sparkles size={24} color={COLORS.primary} />
                                    </View>
                                    <Text style={styles.recName}>{product}</Text>
                                    <TouchableOpacity style={styles.recButton}>
                                        <Text style={styles.recButtonText}>View</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    </View>
);

// =====================================================
// MULTI-CURRENCY SWITCHER
// =====================================================
export const CurrencySwitcherScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Currency</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={CURRENCIES}
                keyExtractor={(item) => item.code}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.currencyCard}>
                        <Text style={styles.currencyFlag}>{item.flag}</Text>
                        <View style={styles.currencyInfo}>
                            <Text style={styles.currencyCode}>{item.code}</Text>
                            <Text style={styles.currencyName}>{item.name}</Text>
                        </View>
                        <Text style={styles.currencySymbol}>{item.symbol}</Text>
                        <Check size={20} color={item.code === 'GBP' ? COLORS.primary : COLORS.gray} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// MULTI-LANGUAGE SWITCHER
// =====================================================
export const LanguageSwitcherScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Language</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={LANGUAGES}
                keyExtractor={(item) => item.code}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.languageCard}>
                        <Text style={styles.languageFlag}>{item.flag}</Text>
                        <Text style={styles.languageName}>{item.name}</Text>
                        <Check size={20} color={item.code === 'en' ? COLORS.primary : COLORS.gray} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// AUCTION PAGE
// =====================================================
export const AuctionPageScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Live Auctions</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={AUCTIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>ENDING SOON</Text>}
                renderItem={({ item }) => (
                    <View style={styles.auctionCard}>
                        <View style={styles.auctionImage}>
                            <Gavel size={40} color={COLORS.primary} />
                        </View>
                        <View style={styles.auctionInfo}>
                            <Text style={styles.auctionProduct}>{item.product}</Text>
                            <View style={styles.auctionBid}>
                                <Text style={styles.auctionCurrent}>Current Bid</Text>
                                <Text style={styles.auctionAmount}>£{item.currentBid}</Text>
                            </View>
                            <View style={styles.auctionStats}>
                                <Text style={styles.auctionBids}>{item.bids} bids</Text>
                                <Clock size={14} color={COLORS.warning} />
                                <Text style={styles.auctionTime}>{item.ends}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bidButton}>
                            <Text style={styles.bidButtonText}>Place Bid</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// PRE-ORDER PAGE
// =====================================================
export const PreOrderPageScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Pre-Orders</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={PRE_ORDERS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>AVAILABLE FOR PRE-ORDER</Text>}
                renderItem={({ item }) => (
                    <View style={styles.preorderCard}>
                        <View style={styles.preorderImage}>
                            <Clock size={40} color={COLORS.primary} />
                        </View>
                        <View style={styles.preorderInfo}>
                            <Text style={styles.preorderName}>{item.name}</Text>
                            <Text style={styles.preorderPrice}>£{item.price}</Text>
                            <Text style={styles.preorderRelease}>Release: {item.releaseDate}</Text>
                        </View>
                        <View style={styles.preorderDeposit}>
                            <Text style={styles.depositLabel}>Deposit</Text>
                            <Text style={styles.depositAmount}>£{item.deposit}</Text>
                        </View>
                        <TouchableOpacity style={styles.preorderButton}>
                            <Text style={styles.preorderButtonText}>Pre-Order</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// BOOKING / APPOINTMENT PAGE
// =====================================================
export const BookingPageScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Book Appointment</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={BOOKINGS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>AVAILABLE SERVICES</Text>}
                renderItem={({ item }) => (
                    <View style={styles.bookingCard}>
                        <View style={styles.bookingIcon}>
                            <Calendar size={24} color={COLORS.white} />
                        </View>
                        <View style={styles.bookingInfo}>
                            <Text style={styles.bookingService}>{item.service}</Text>
                            <Text style={styles.bookingMeta}>{item.duration} • {item.provider}</Text>
                            <Text style={styles.bookingPrice}>£{item.price}</Text>
                        </View>
                        <TouchableOpacity style={styles.bookButton}>
                            <Text style={styles.bookButtonText}>Book</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// DIGITAL DOWNLOADS PAGE
// =====================================================
export const DigitalDownloadsScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Digital Downloads</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={DIGITAL_PRODUCTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>MY PURCHASES</Text>}
                renderItem={({ item }) => (
                    <View style={styles.digitalCard}>
                        <View style={styles.digitalIcon}>
                            <Download size={24} color={COLORS.primary} />
                        </View>
                        <View style={styles.digitalInfo}>
                            <Text style={styles.digitalName}>{item.name}</Text>
                            <Text style={styles.digitalMeta}>{item.downloads} downloads • {item.size}</Text>
                        </View>
                        <TouchableOpacity style={styles.downloadButton}>
                            <Download size={18} color={COLORS.white} />
                            <Text style={styles.downloadButtonText}>Download</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// RENTAL PRODUCTS PAGE
// =====================================================
export const RentalProductsScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Rent Products</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={RENTAL_PRODUCTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>AVAILABLE TO RENT</Text>}
                renderItem={({ item }) => (
                    <View style={styles.rentalCard}>
                        <View style={styles.rentalIcon}>
                            <Home size={24} color={COLORS.white} />
                        </View>
                        <View style={styles.rentalInfo}>
                            <Text style={styles.rentalName}>{item.name}</Text>
                            <Text style={styles.rentalPrice}>£{item.pricePerDay}/day • Deposit: £{item.deposit}</Text>
                        </View>
                        <View>
                            <StatusBadge status={item.available ? 'available' : 'unavailable'} />
                            <TouchableOpacity style={[styles.rentButton, !item.available && styles.rentButtonDisabled]}>
                                <Text style={styles.rentButtonText}>{item.available ? 'Rent' : 'Unavailable'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// WHOLESALE / B2B PRICING
// =====================================================
export const WholesalePricingScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Wholesale Pricing</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.wholesaleBanner}>
                    <DollarSign size={40} color={COLORS.white} />
                    <Text style={styles.wholesaleTitle}>B2B Wholesale</Text>
                    <Text style={styles.wholesaleSubtitle}>Bulk pricing for businesses</Text>
                </View>

                <Text style={styles.sectionTitle}>WHOLESALE PRODUCTS</Text>
                {WHOLESALE_PRODUCTS.map((product) => (
                    <View key={product.id} style={styles.wholesaleCard}>
                        <Text style={styles.wholesaleName}>{product.name}</Text>
                        <View style={styles.wholesaleDetails}>
                            <View style={styles.wholesaleDetail}>
                                <Text style={styles.wholesaleLabel}>Wholesale</Text>
                                <Text style={styles.wholesaleValue}>£{product.price}</Text>
                            </View>
                            <View style={styles.wholesaleDetail}>
                                <Text style={styles.wholesaleLabel}>Min Qty</Text>
                                <Text style={styles.wholesaleValue}>{product.minQty}</Text>
                            </View>
                            <View style={styles.wholesaleDetail}>
                                <Text style={styles.wholesaleLabel}>Retail</Text>
                                <Text style={[styles.wholesaleValue, { color: COLORS.success }]}>£{product.retailPrice}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.requestButton}>
                            <Text style={styles.requestButtonText}>Request Quote</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>QUOTE REQUESTS</Text>
                {QUOTE_REQUESTS.map((quote) => (
                    <View key={quote.id} style={styles.quoteCard}>
                        <View style={styles.quoteHeader}>
                            <Text style={styles.quoteCustomer}>{quote.customer}</Text>
                            <StatusBadge status={quote.status} />
                        </View>
                        <Text style={styles.quoteProducts}>{quote.products}</Text>
                        <Text style={styles.quoteDate}>{quote.date}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    </View>
);

// =====================================================
// ERROR PAGES
// =====================================================
export const Error404Screen = ({ navigation }: any) => (
    <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.errorSafeArea}>
            <View style={styles.errorContent}>
                <Text style={styles.errorCode}>404</Text>
                <Text style={styles.errorTitle}>Page Not Found</Text>
                <Text style={styles.errorSubtitle}>The page you're looking for doesn't exist</Text>
                <TouchableOpacity style={styles.errorButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.errorButtonText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
);

export const Error500Screen = ({ navigation }: any) => (
    <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.errorSafeArea}>
            <View style={styles.errorContent}>
                <AlertTriangle size={64} color={COLORS.error} />
                <Text style={styles.errorTitle}>500</Text>
                <Text style={styles.errorSubtitle}>Something went wrong. Please try again later.</Text>
                <TouchableOpacity style={styles.errorButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.errorButtonText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
);

export const MaintenanceScreen = ({ navigation }: any) => (
    <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.errorSafeArea}>
            <View style={styles.errorContent}>
                <Settings size={64} color={COLORS.warning} />
                <Text style={styles.errorTitle}>Under Maintenance</Text>
                <Text style={styles.errorSubtitle}>We'll be back soon!</Text>
            </View>
        </SafeAreaView>
    </View>
);

export const AccessDeniedScreen = ({ navigation }: any) => (
    <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.errorSafeArea}>
            <View style={styles.errorContent}>
                <Lock size={64} color={COLORS.error} />
                <Text style={styles.errorTitle}>Access Denied</Text>
                <Text style={styles.errorSubtitle}>You don't have permission to access this page.</Text>
                <TouchableOpacity style={styles.errorButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.errorButtonText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
);

export const SessionExpiredScreen = ({ navigation }: any) => (
    <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.errorSafeArea}>
            <View style={styles.errorContent}>
                <Clock size={64} color={COLORS.warning} />
                <Text style={styles.errorTitle}>Session Expired</Text>
                <Text style={styles.errorSubtitle}>Your session has expired. Please log in again.</Text>
                <TouchableOpacity style={styles.errorButton} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.errorButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
);

// =====================================================
// STYLES
// =====================================================
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.black },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.dark2 },
    headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerTitleText: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    listContent: { padding: 20 },
    sectionTitle: { fontSize: 13, fontWeight: '600', color: COLORS.gray, letterSpacing: 1, marginBottom: 12 },

    // Status Badge
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, color: COLORS.white },

    // Subscription Plans
    planCard: { backgroundColor: COLORS.dark2, borderRadius: 16, padding: 20, marginBottom: 16 },
    planCardPopular: { borderWidth: 2, borderColor: COLORS.primary },
    popularBadge: { position: 'absolute', top: -12, left: '50%', marginLeft: -50, backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    popularText: { fontSize: 10, fontWeight: '700', color: COLORS.white },
    planName: { fontSize: 20, fontWeight: '700', color: COLORS.white, textAlign: 'center' },
    planPrice: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginVertical: 12 },
    planCurrency: { fontSize: 20, color: COLORS.white },
    planAmount: { fontSize: 40, fontWeight: '700', color: COLORS.white },
    planPeriod: { fontSize: 14, color: COLORS.gray },
    planFeatures: { marginVertical: 16 },
    planFeature: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    planFeatureText: { fontSize: 13, color: COLORS.gray, marginLeft: 8 },
    planButton: { backgroundColor: COLORS.dark3, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
    planButtonPopular: { backgroundColor: COLORS.primary },
    planButtonText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
    planButtonTextPopular: { color: COLORS.white },

    // Membership
    membershipCard: { backgroundColor: COLORS.dark2, margin: 20, borderRadius: 20, padding: 24, alignItems: 'center' },
    membershipTitle: { fontSize: 24, fontWeight: '700', color: COLORS.white, marginTop: 12 },
    membershipPoints: { fontSize: 32, fontWeight: '700', color: COLORS.gold, marginTop: 8 },
    progressBar: { width: '100%', height: 8, backgroundColor: COLORS.dark3, borderRadius: 4, marginTop: 16, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 4 },
    progressText: { fontSize: 12, color: COLORS.gray, marginTop: 8 },
    tiersContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
    tierCard: { width: '47%', backgroundColor: COLORS.dark2, borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 2 },
    tierIcon: { fontSize: 32 },
    tierName: { fontSize: 16, fontWeight: '700', color: COLORS.white, marginTop: 8 },
    tierPoints: { fontSize: 11, color: COLORS.gray, marginTop: 4 },
    tierDiscount: { fontSize: 14, fontWeight: '700', marginTop: 8 },
    rewardCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, padding: 16, borderRadius: 12 },
    rewardInfo: { flex: 1 },
    rewardName: { fontSize: 15, fontWeight: '600', color: COLORS.white },
    rewardDiscount: { fontSize: 13, color: COLORS.gray, marginTop: 2 },
    redeemButton: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    redeemText: { fontSize: 12, fontWeight: '600', color: COLORS.white },

    // Gift Cards
    giftCardBanner: { backgroundColor: COLORS.primary, margin: 20, borderRadius: 20, padding: 32, alignItems: 'center' },
    giftCardTitle: { fontSize: 24, fontWeight: '700', color: COLORS.white, marginTop: 12 },
    giftCardSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
    giftCardScroll: { paddingHorizontal: 20 },
    giftCard: { width: 150, height: 90, backgroundColor: COLORS.dark2, borderRadius: 12, padding: 16, marginRight: 12, justifyContent: 'space-between' },
    giftCardAmount: { fontSize: 28, fontWeight: '700', color: COLORS.white },
    buyButton: { backgroundColor: COLORS.primary, paddingVertical: 6, borderRadius: 12, alignItems: 'center' },
    buyButtonText: { fontSize: 12, fontWeight: '600', color: COLORS.white },
    customAmountCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, borderRadius: 16, padding: 20 },
    customInput: { backgroundColor: COLORS.dark3, borderRadius: 12, padding: 16, fontSize: 24, color: COLORS.white, textAlign: 'center', marginBottom: 16 },
    customButton: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
    customButtonText: { fontSize: 14, fontWeight: '700', color: COLORS.white },

    // Affiliate
    affiliateStats: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, gap: 12 },
    affiliateStat: { flex: 1, backgroundColor: COLORS.dark2, borderRadius: 12, padding: 16, alignItems: 'center' },
    affiliateValue: { fontSize: 20, fontWeight: '700', color: COLORS.white },
    affiliateLabel: { fontSize: 11, color: COLORS.gray, marginTop: 4 },
    affiliateCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 16 },
    affiliateHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    affiliateName: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    affiliateCode: { fontSize: 24, fontWeight: '700', color: COLORS.primary, marginVertical: 8 },
    affiliateRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.dark3 },
    affiliateStatValue: { fontSize: 16, fontWeight: '700', color: COLORS.white },
    affiliateStatLabel: { fontSize: 11, color: COLORS.gray },

    // Referral
    referralBanner: { backgroundColor: COLORS.purple, margin: 20, borderRadius: 20, padding: 32, alignItems: 'center' },
    referralTitle: { fontSize: 24, fontWeight: '700', color: COLORS.white, marginTop: 12 },
    referralSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
    referralCode: { backgroundColor: COLORS.dark2, marginHorizontal: 20, borderRadius: 16, padding: 20 },
    referralCodeLabel: { fontSize: 12, color: COLORS.gray, textAlign: 'center' },
    referralCodeBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8, gap: 12 },
    referralCodeText: { fontSize: 28, fontWeight: '700', color: COLORS.white },
    shareButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, marginTop: 16, padding: 14, borderRadius: 12, gap: 8 },
    shareButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    referralCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, padding: 16, borderRadius: 12 },
    referralAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.dark3, justifyContent: 'center', alignItems: 'center' },
    referralAvatarText: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    referralInfo: { flex: 1, marginLeft: 12 },
    referralName: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    referralDetail: { fontSize: 12, color: COLORS.gray },
    referralBonus: { fontSize: 16, fontWeight: '700', color: COLORS.success },

    // Abandoned Cart
    cartCard: { backgroundColor: COLORS.dark2, marginBottom: 12, borderRadius: 12, padding: 16 },
    cartHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    cartCustomer: { fontSize: 15, fontWeight: '600', color: COLORS.white },
    cartTime: { fontSize: 12, color: COLORS.gray },
    cartItems: { fontSize: 13, color: COLORS.gray, marginTop: 4 },
    cartFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
    cartValue: { fontSize: 18, fontWeight: '700', color: COLORS.white },
    recoverButton: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    recoverText: { fontSize: 12, fontWeight: '600', color: COLORS.white },

    // AI Recommendations
    aiCard: { backgroundColor: COLORS.dark2, margin: 20, borderRadius: 20, padding: 24, alignItems: 'center' },
    aiTitle: { fontSize: 20, fontWeight: '700', color: COLORS.white, marginTop: 12 },
    aiSubtitle: { fontSize: 14, color: COLORS.gray, marginTop: 4 },
    recScroll: { paddingHorizontal: 20 },
    recProduct: { width: 120, marginRight: 12 },
    recImage: { width: 120, height: 100, backgroundColor: COLORS.dark2, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    recName: { fontSize: 12, color: COLORS.white, marginTop: 8 },
    recButton: { backgroundColor: COLORS.dark3, paddingVertical: 6, borderRadius: 8, alignItems: 'center', marginTop: 8 },
    recButtonText: { fontSize: 11, fontWeight: '600', color: COLORS.primary },

    // Currency/Language
    currencyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginBottom: 12, padding: 16, borderRadius: 12 },
    currencyFlag: { fontSize: 24 },
    currencyInfo: { flex: 1, marginLeft: 12 },
    currencyCode: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    currencyName: { fontSize: 12, color: COLORS.gray },
    currencySymbol: { fontSize: 18, fontWeight: '700', color: COLORS.white, marginRight: 12 },
    languageCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginBottom: 12, padding: 16, borderRadius: 12 },
    languageFlag: { fontSize: 24 },
    languageName: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '600', color: COLORS.white },

    // Auction
    auctionCard: { backgroundColor: COLORS.dark2, marginBottom: 12, borderRadius: 12, padding: 16 },
    auctionImage: { width: '100%', height: 120, backgroundColor: COLORS.dark3, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    auctionProduct: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    auctionBid: { flexDirection: 'row', alignItems: 'baseline', marginTop: 8 },
    auctionCurrent: { fontSize: 12, color: COLORS.gray },
    auctionAmount: { fontSize: 24, fontWeight: '700', color: COLORS.primary, marginLeft: 8 },
    auctionStats: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    auctionBids: { fontSize: 12, color: COLORS.gray },
    auctionTime: { fontSize: 12, color: COLORS.warning },
    auctionInfo: { marginTop: 12 },
    bidButton: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12 },
    bidButtonText: { fontSize: 14, fontWeight: '700', color: COLORS.white },

    // Pre-Order
    preorderCard: { backgroundColor: COLORS.dark2, marginBottom: 12, borderRadius: 12, padding: 16 },
    preorderImage: { width: '100%', height: 100, backgroundColor: COLORS.dark3, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    preorderName: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    preorderPrice: { fontSize: 20, fontWeight: '700', color: COLORS.primary, marginTop: 4 },
    preorderRelease: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
    preorderDeposit: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    depositLabel: { fontSize: 12, color: COLORS.gray },
    depositAmount: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    preorderInfo: { marginTop: 8 },
    preorderButton: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12 },
    preorderButtonText: { fontSize: 14, fontWeight: '700', color: COLORS.white },

    // Booking
    bookingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginBottom: 12, padding: 16, borderRadius: 12 },
    bookingIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
    bookingInfo: { flex: 1, marginLeft: 12 },
    bookingService: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    bookingMeta: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
    bookingPrice: { fontSize: 16, fontWeight: '700', color: COLORS.primary, marginTop: 4 },
    bookButton: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
    bookButtonText: { fontSize: 12, fontWeight: '600', color: COLORS.white },

    // Digital
    digitalCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginBottom: 12, padding: 16, borderRadius: 12 },
    digitalIcon: { width: 50, height: 50, borderRadius: 10, backgroundColor: COLORS.primary + '20', justifyContent: 'center', alignItems: 'center' },
    digitalInfo: { flex: 1, marginLeft: 12 },
    digitalName: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    digitalMeta: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
    downloadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, gap: 6 },
    downloadButtonText: { fontSize: 12, fontWeight: '600', color: COLORS.white },

    // Rental
    rentalCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginBottom: 12, padding: 16, borderRadius: 12 },
    rentalIcon: { width: 50, height: 50, borderRadius: 10, backgroundColor: COLORS.blue, justifyContent: 'center', alignItems: 'center' },
    rentalInfo: { flex: 1, marginLeft: 12 },
    rentalName: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    rentalPrice: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
    rentButton: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginTop: 8 },
    rentButtonDisabled: { backgroundColor: COLORS.gray },
    rentButtonText: { fontSize: 12, fontWeight: '600', color: COLORS.white },

    // Wholesale
    wholesaleBanner: { backgroundColor: COLORS.success, margin: 20, borderRadius: 20, padding: 32, alignItems: 'center' },
    wholesaleTitle: { fontSize: 24, fontWeight: '700', color: COLORS.white, marginTop: 12 },
    wholesaleSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
    wholesaleCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 16 },
    wholesaleName: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    wholesaleDetails: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
    wholesaleDetail: { alignItems: 'center' },
    wholesaleLabel: { fontSize: 11, color: COLORS.gray },
    wholesaleValue: { fontSize: 16, fontWeight: '700', color: COLORS.white, marginTop: 4 },
    requestButton: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12 },
    requestButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    quoteCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 16 },
    quoteHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    quoteCustomer: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    quoteProducts: { fontSize: 13, color: COLORS.gray, marginTop: 4 },
    quoteDate: { fontSize: 11, color: COLORS.gray3, marginTop: 4 },

    // Error Pages
    errorContainer: { flex: 1, backgroundColor: COLORS.black },
    errorSafeArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    errorContent: { alignItems: 'center' },
    errorCode: { fontSize: 80, fontWeight: '800', color: COLORS.primary },
    errorTitle: { fontSize: 24, fontWeight: '700', color: COLORS.white, marginTop: 16 },
    errorSubtitle: { fontSize: 14, color: COLORS.gray, textAlign: 'center', marginTop: 8 },
    errorButton: { backgroundColor: COLORS.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 25, marginTop: 24 },
    errorButtonText: { fontSize: 14, fontWeight: '700', color: COLORS.white },

    // Push Notifications
    notificationHeader: { alignItems: 'center', paddingVertical: 32 },
    notificationTitle: { fontSize: 20, fontWeight: '700', color: COLORS.white, marginTop: 12 },
    notificationSubtitle: { fontSize: 13, color: COLORS.gray, marginTop: 4, textAlign: 'center' },
    notificationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, padding: 16, borderRadius: 12 },
    notificationInfo: { flex: 1 },
    notificationItemTitle: { fontSize: 15, fontWeight: '600', color: COLORS.white },
    notificationItemSubtitle: { fontSize: 12, color: COLORS.gray, marginTop: 2 },

    // In-App Chat
    chatHeaderInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    chatAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
    chatStatus: { fontSize: 11, color: COLORS.success },
    chatMessages: { flex: 1, paddingHorizontal: 16 },
    messageBubble: { backgroundColor: COLORS.dark2, padding: 12, borderRadius: 16, marginBottom: 12, maxWidth: '80%' },
    messageUser: { backgroundColor: COLORS.primary, alignSelf: 'flex-end' },
    messageName: { fontSize: 11, fontWeight: '600', color: COLORS.primary, marginBottom: 4 },
    messageText: { fontSize: 14, color: COLORS.white },
    messageTime: { fontSize: 10, color: COLORS.gray, marginTop: 4 },
    chatInput: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: COLORS.dark2, gap: 8 },
    attachButton: { padding: 8 },
    chatTextInput: { flex: 1, backgroundColor: COLORS.dark2, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, color: COLORS.white },
    sendButton: { backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },

    // Biometric
    biometricHeader: { alignItems: 'center', paddingVertical: 32 },
    biometricTitle: { fontSize: 20, fontWeight: '700', color: COLORS.white, marginTop: 12 },
    biometricSubtitle: { fontSize: 13, color: COLORS.gray, marginTop: 4, textAlign: 'center' },
    biometricCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, padding: 16, borderRadius: 12 },
    biometricIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
    biometricInfo: { flex: 1, marginLeft: 12 },
    biometricName: { fontSize: 15, fontWeight: '600', color: COLORS.white },
    biometricDesc: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
    securityNote: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.success + '20', marginHorizontal: 20, padding: 16, borderRadius: 12, gap: 12 },
    securityNoteText: { flex: 1, fontSize: 12, color: COLORS.success },

    // Loyalty Program
    earnCard: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.dark2, marginHorizontal: 20, padding: 20, borderRadius: 16, gap: 12 },
    earnItem: { alignItems: 'center' },
    earnTitle: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginTop: 8 },
    earnDesc: { fontSize: 11, color: COLORS.gray, marginTop: 4 },
    activityCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, padding: 16, borderRadius: 16 },
    activityRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
    activityLabel: { fontSize: 14, color: COLORS.gray },
    activityValue: { fontSize: 14, fontWeight: '600', color: COLORS.white },
});
