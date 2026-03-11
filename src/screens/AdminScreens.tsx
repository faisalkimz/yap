import React, { useState, useEffect } from 'react';
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
    Modal,
} from 'react-native';
import { sanitizeInput } from '../utils/sanitize';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {
    ChevronLeft,
    Store,
    Package,
    ShoppingCart,
    DollarSign,
    BarChart3,
    MessageSquare,
    Settings,
    Plus,
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    TrendingUp,
    TrendingDown,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Star,
    Search,
    Filter,
    Users,
    UserCheck,
    UserPlus,
    Shield,
    Layers,
    Tag,
    Box,
    Truck,
    Calendar,
    FileText,
    X,
    Check,
    MoreVertical,
    Copy,
    Download,
    Upload,
    CreditCard as CardIcon,
    Wallet,
    Percent,
    Gift,
    Globe,
    Mail,
    Phone,
    Bell,
    Layout,
    Palette,
    Image as ImageIcon,
    Home,
    Menu,
    XCircle,
    CheckCircle,
    AlertTriangle,
    RefreshCw,
    MoreHorizontal,
    Lock,
    Search as SearchIcon,
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

// --- Components ---
const StatusBadge = ({ status }: { status: string }) => {
    const getColors = () => {
        switch (status) {
            case 'processing': return { bg: COLORS.warning + '20', text: COLORS.warning };
            case 'shipped': return { bg: COLORS.blue + '20', text: COLORS.blue };
            case 'delivered': return { bg: COLORS.success + '20', text: COLORS.success };
            case 'cancelled': return { bg: COLORS.error + '20', text: COLORS.error };
            case 'pending': return { bg: COLORS.warning + '20', text: COLORS.warning };
            case 'active': return { bg: COLORS.success + '20', text: COLORS.success };
            case 'inactive': return { bg: COLORS.gray + '20', text: COLORS.gray };
            case 'suspended': return { bg: COLORS.error + '20', text: COLORS.error };
            case 'completed': return { bg: COLORS.success + '20', text: COLORS.success };
            case 'refunded': return { bg: COLORS.purple + '20', text: COLORS.purple };
            case 'paid': return { bg: COLORS.success + '20', text: COLORS.success };
            case 'out_of_stock': return { bg: COLORS.error + '20', text: COLORS.error };
            case 'expired': return { bg: COLORS.gray + '20', text: COLORS.gray };
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
// ADMIN DASHBOARD (Main Hub)
// =====================================================
export const AdminDashboardScreen = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async () => {
        try {
            const data = await api.get('/admin/stats');
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch admin stats:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchStats();
    };

    const renderContent = () => {
        if (loading && !refreshing) {
            return (
                <View style={styles.loadingCenter}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            );
        }

        switch (activeTab) {
            case 'dashboard': return <AdminHome navigation={navigation} stats={stats} refreshing={refreshing} onRefresh={onRefresh} />;
            case 'orders': return <AdminOrders navigation={navigation} />;
            case 'products': return <AdminProducts navigation={navigation} />;
            case 'users': return <AdminUsers navigation={navigation} />;
            default: return <AdminHome navigation={navigation} stats={stats} refreshing={refreshing} onRefresh={onRefresh} />;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerGreeting}>Admin Panel</Text>
                        <Text style={styles.headerTitle}>Bantu Creations</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.headerIcon}>
                            <Bell size={20} color={COLORS.white} />
                        </TouchableOpacity>
                        <View style={styles.avatarSmall}>
                            <Text style={styles.avatarText}>A</Text>
                        </View>
                    </View>
                </View>

                {/* Content */}
                {renderContent()}

                {/* Bottom Tab */}
                <View style={styles.bottomTab}>
                    {[
                        { key: 'dashboard', icon: Layout, label: 'Home' },
                        { key: 'orders', icon: ShoppingCart, label: 'Orders' },
                        { key: 'products', icon: Package, label: 'Products' },
                        { key: 'users', icon: Users, label: 'Users' },
                    ].map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            style={styles.tabItem}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <tab.icon size={22} color={activeTab === tab.key ? COLORS.primary : COLORS.gray} />
                            <Text style={[styles.tabLabel, { color: activeTab === tab.key ? COLORS.primary : COLORS.gray }]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </View>
    );
};

// --- Admin Home Content ---
const AdminHome = ({ navigation, stats, refreshing, onRefresh }: any) => (
    <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
    >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: COLORS.success }]}>
                    <DollarSign size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>£{(stats?.stats?.totalRevenue || 0).toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Total Revenue</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: COLORS.blue }]}>
                    <ShoppingCart size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{(stats?.stats?.totalOrders || 0).toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Total Orders</Text>
                </View>
            </View>
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: COLORS.purple }]}>
                    <Users size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{(stats?.stats?.totalUsers || 0).toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Customers</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: COLORS.gold }]}>
                    <Store size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{stats?.stats?.totalVendors || 0}</Text>
                    <Text style={styles.statLabel}>Vendors</Text>
                </View>
            </View>
        </View>

        {/* Quick Links */}
        <Text style={styles.sectionTitle}>BUSINESS SETTINGS</Text>
        <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('AdminSettings')}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.gray + '20' }]}>
                    <Settings size={22} color={COLORS.gray} />
                </View>
                <Text style={styles.quickActionLabel}>Platform</Text>
            </TouchableOpacity>
        </View>

        {/* Recent Orders */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT ORDERS</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AdminOrders')}>
                <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
        </View>

        {stats?.recentOrders?.length > 0 ? (
            stats.recentOrders.map((order: any) => (
                <TouchableOpacity
                    key={order._id}
                    style={styles.orderCard}
                    onPress={() => navigation.navigate('AdminOrderDetails', { orderId: order._id })}
                >
                    <View style={styles.orderLeft}>
                        <View style={[styles.orderIcon, { backgroundColor: COLORS.dark3 }]}>
                            <ShoppingCart size={18} color={COLORS.white} />
                        </View>
                        <View style={styles.orderInfo}>
                            <Text style={styles.orderId}>ORD-{order._id.slice(-6).toUpperCase()}</Text>
                            <Text style={styles.orderCustomer}>{order.userId?.name || 'Guest'} • {order.items?.length || 0} items</Text>
                        </View>
                    </View>
                    <View style={styles.orderRight}>
                        <Text style={styles.orderAmount}>GX {order.totalAmount?.toLocaleString()}</Text>
                        <StatusBadge status={order.status} />
                    </View>
                </TouchableOpacity>
            ))
        ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: COLORS.gray }}>No recent orders</Text>
            </View>
        )}

        <View style={{ height: 100 }} />
    </ScrollView>
);

// =====================================================
// ADMIN ORDERS
// =====================================================
const AdminOrders = ({ navigation }: any) => {
    const [filter, setFilter] = useState('all');
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const filters = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    const fetchOrders = async () => {
        try {
            const data = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

    return (
        <View style={styles.listContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabs}>
                {filters.map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterTab, filter === f && styles.filterTabActive]}
                        onPress={() => setFilter(f)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {loading && !refreshing ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator color={COLORS.primary} size="large" />
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchOrders(); }} tintColor={COLORS.primary} />
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.orderCard}
                            onPress={() => navigation.navigate('AdminOrderDetails', { orderId: item._id })}
                        >
                            <View style={styles.orderLeft}>
                                <View style={[styles.orderIcon, { backgroundColor: COLORS.dark3 }]}>
                                    <ShoppingCart size={18} color={COLORS.white} />
                                </View>
                                <View style={styles.orderInfo}>
                                    <Text style={styles.orderId}>ORD-{item._id.slice(-6).toUpperCase()}</Text>
                                    <Text style={styles.orderCustomer}>{item.userId?.name || 'Guest'}</Text>
                                    <Text style={styles.orderDate}>{new Date(item.orderDate).toLocaleDateString()}</Text>
                                </View>
                            </View>
                            <View style={styles.orderRight}>
                                <Text style={styles.orderAmount}>GX {item.totalAmount?.toLocaleString()}</Text>
                                <StatusBadge status={item.status} />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

// =====================================================
// ADMIN PRODUCTS
// =====================================================
const AdminProducts = ({ navigation }: any) => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProducts = async () => {
        try {
            const data = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = search
        ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        : products;

    return (
        <View style={styles.listContainer}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={18} color={COLORS.gray} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        placeholderTextColor={COLORS.gray}
                        value={search}
                        onChangeText={(t) => setSearch(sanitizeInput(t))}
                    />
                </View>
            </View>

            {loading && !refreshing ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator color={COLORS.primary} size="large" />
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchProducts(); }} tintColor={COLORS.primary} />
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.productCard}
                            onPress={() => navigation.navigate('AdminProductDetails', { productId: item._id })}
                        >
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productSku}>{item.category} • stock: {item.stock}</Text>
                                <View style={styles.productFooter}>
                                    <Text style={styles.productPrice}>GX {item.price?.toLocaleString()}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Delete Product', 'Are you sure?', [
                                    { text: 'Cancel', style: 'cancel' },
                                    {
                                        text: 'Delete', style: 'destructive', onPress: async () => {
                                            try {
                                                await api.delete(`/products/${item._id}`);
                                                fetchProducts();
                                            } catch (e) {
                                                Alert.alert('Error', 'Failed to delete product');
                                            }
                                        }
                                    }
                                ]);
                            }}>
                                <Trash2 size={20} color={COLORS.error} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* FAB to add product */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AdminAddProduct')}
            >
                <Plus size={30} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
};

// =====================================================
// ADMIN USERS
// =====================================================
const AdminUsers = ({ navigation }: any) => {
    const [activeSection, setActiveSection] = useState('customers');
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await api.get('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u => {
        if (activeSection === 'customers') return u.role === 'customer';
        if (activeSection === 'vendors') return u.role === 'vendor';
        if (activeSection === 'admins') return u.role === 'admin';
        return false;
    });

    const handleDeleteUser = (id: string, name: string) => {
        Alert.alert('Delete User', `Are you sure you want to delete ${name}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    try {
                        await api.delete(`/admin/users/${id}`);
                        fetchUsers();
                    } catch (e) {
                        Alert.alert('Error', 'Failed to delete user');
                    }
                }
            }
        ]);
    };

    return (
        <View style={styles.listContainer}>
            <View style={styles.segmentedControl}>
                <TouchableOpacity
                    style={[styles.segmentItem, activeSection === 'customers' && styles.segmentItemActive]}
                    onPress={() => setActiveSection('customers')}
                >
                    <Text style={[styles.segmentText, activeSection === 'customers' && styles.segmentTextActive]}>Customers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.segmentItem, activeSection === 'vendors' && styles.segmentItemActive]}
                    onPress={() => setActiveSection('vendors')}
                >
                    <Text style={[styles.segmentText, activeSection === 'vendors' && styles.segmentTextActive]}>Vendors</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.segmentItem, activeSection === 'admins' && styles.segmentItemActive]}
                    onPress={() => setActiveSection('admins')}
                >
                    <Text style={[styles.segmentText, activeSection === 'admins' && styles.segmentTextActive]}>Admins</Text>
                </TouchableOpacity>
            </View>

            {loading && !refreshing ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator color={COLORS.primary} size="large" />
                </View>
            ) : (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchUsers(); }} tintColor={COLORS.primary} />
                    }
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <View style={[styles.userAvatar, activeSection !== 'customers' && { backgroundColor: activeSection === 'vendors' ? COLORS.blue + '20' : COLORS.purple + '20' }]}>
                                {activeSection === 'customers' ? (
                                    <Text style={styles.userAvatarText}>{item.name?.charAt(0)}</Text>
                                ) : activeSection === 'vendors' ? (
                                    <Store size={18} color={COLORS.blue} />
                                ) : (
                                    <Shield size={18} color={COLORS.purple} />
                                )}
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.name}</Text>
                                <Text style={styles.userEmail}>{item.email}</Text>
                                <Text style={styles.userMeta}>Joined: {new Date(item.createdAt).toLocaleDateString()}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteUser(item._id, item.name)}>
                                <Trash2 size={20} color={COLORS.error} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

// =====================================================
// ADMIN LOGIN
// =====================================================
export const AdminLoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setLoading(true);
        try {
            const success = await login(email, password, 'admin');
            if (success) {
                navigation.replace('AdminDashboard');
            } else {
                Alert.alert('Login Failed', 'Invalid admin credentials');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.authSafeArea}>
                <ScrollView contentContainerStyle={styles.authContent} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>

                    <View style={styles.authLogo}>
                        <View style={[styles.logoBox, { backgroundColor: COLORS.purple }]}>
                            <Shield size={40} color={COLORS.white} />
                        </View>
                        <Text style={styles.authTitle}>ADMIN</Text>
                        <Text style={styles.authSubtitle}>Bantu Creations</Text>
                    </View>

                    <View style={styles.authForm}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Mail size={18} color={COLORS.gray} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="admin@bantucreations.com"
                                    placeholderTextColor={COLORS.gray}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Lock size={18} color={COLORS.gray} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    placeholderTextColor={COLORS.gray}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} color={COLORS.gray} /> : <Eye size={20} color={COLORS.gray} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
                            <Text style={styles.authButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// SETTINGS
// =====================================================
export const AdminSettingsScreen = ({ navigation }: any) => {
    const SettingItem = ({ icon: Icon, title, subtitle }: any) => (
        <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
                <Icon size={20} color={COLORS.white} />
            </View>
            <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            <ChevronLeft size={20} color={COLORS.gray} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>Settings</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionTitle}>GENERAL</Text>
                    <View style={styles.settingsGroup}>
                        <SettingItem icon={Globe} title="General Settings" subtitle="Site name, logo, timezone" />
                        <SettingItem icon={Menu} title="CMS Pages" subtitle="About, terms, privacy" />
                        <SettingItem icon={Search} title="SEO Settings" subtitle="Meta tags, sitemap" />
                    </View>

                    <Text style={styles.sectionTitle}>PAYMENTS & SHIPPING</Text>
                    <View style={styles.settingsGroup}>
                        <SettingItem icon={CardIcon} title="Payment Gateways" subtitle="Stripe, PayPal, etc." />
                        <SettingItem icon={Truck} title="Shipping Settings" subtitle="Zones, rates" />
                        <SettingItem icon={Percent} title="Tax Management" subtitle="Tax rates, classes" />
                    </View>

                    <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
                    <View style={styles.settingsGroup}>
                        <SettingItem icon={Mail} title="Email Templates" subtitle="Order, registration" />
                        <SettingItem icon={Phone} title="SMS Settings" subtitle="Twilio, SMS alerts" />
                        <SettingItem icon={Bell} title="Push Notifications" subtitle="App notifications" />
                    </View>

                    <Text style={styles.sectionTitle}>APPEARANCE</Text>
                    <View style={styles.settingsGroup}>
                        <SettingItem icon={Palette} title="Theme Settings" subtitle="Colors, fonts" />
                        <SettingItem icon={Home} title="Homepage" subtitle="Layout customization" />
                        <SettingItem icon={ImageIcon} title="Media Settings" subtitle="Image sizes, storage" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// ADMIN ADD PRODUCT
// =====================================================
export const AdminAddProductScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!name || !price || !stock) {
            Alert.alert('Error', 'Please fill required fields');
            return;
        }

        setLoading(true);
        try {
            await api.post('/products', {
                name,
                price: parseFloat(price),
                stock: parseInt(stock),
                category,
                description,
                image: image || 'https://images.unsplash.com/photo-1595152230551-2f4676d0ad94?w=800&q=80',
            });
            Alert.alert('Success', 'Product added successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } finally {
            setLoading(false);
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
                    <Text style={styles.headerTitleText}>Add New Product</Text>
                    <TouchableOpacity onPress={handleSave} disabled={loading}>
                        {loading ? <ActivityIndicator size="small" color={COLORS.primary} /> : <Text style={styles.seeAll}>Save</Text>}
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 20 }}>
                    <TouchableOpacity
                        style={[styles.bannerCard, { height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.dark2, borderStyle: 'dashed', borderWidth: 1, borderColor: COLORS.gray }]}
                        onPress={() => Alert.alert('Image Picker', 'Please enter a URL in the "Image URL" field below to preview and add your product image.')}
                    >
                        {image ? (
                            <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                        ) : (
                            <View style={{ alignItems: 'center' }}>
                                <ImageIcon size={48} color={COLORS.gray3} />
                                <Text style={{ color: COLORS.gray, marginTop: 12 }}>Tap to add an image</Text>
                                <Text style={{ color: COLORS.gray3, fontSize: 11, marginTop: 4 }}>Enter URL below to preview</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Product Name *</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter product name"
                                placeholderTextColor={COLORS.gray}
                                value={name}
                                onChangeText={(t) => setName(sanitizeInput(t))}
                            />
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Price *</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="0.00"
                                    placeholderTextColor={COLORS.gray}
                                    value={price}
                                    onChangeText={(t) => setPrice(sanitizeInput(t))}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Stock *</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="0"
                                    placeholderTextColor={COLORS.gray}
                                    value={stock}
                                    onChangeText={(t) => setStock(sanitizeInput(t))}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Category</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Clothing"
                                placeholderTextColor={COLORS.gray}
                                value={category}
                                onChangeText={(t) => setCategory(sanitizeInput(t))}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Image URL</Text>
                        <View style={styles.inputContainer}>
                            <ImageIcon size={18} color={COLORS.gray} />
                            <TextInput
                                style={styles.input}
                                placeholder="https://example.com/image.jpg"
                                placeholderTextColor={COLORS.gray}
                                value={image}
                                onChangeText={(t) => setImage(sanitizeInput(t))}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Description</Text>
                        <View style={[styles.inputContainer, { height: 120, alignItems: 'flex-start' }]}>
                            <TextInput
                                style={[styles.input, { textAlignVertical: 'top', height: '100%' }]}
                                placeholder="Describe the item..."
                                placeholderTextColor={COLORS.gray}
                                multiline
                                value={description}
                                onChangeText={(t) => setDescription(sanitizeInput(t))}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.authButton} onPress={handleSave} disabled={loading}>
                        <Text style={styles.authButtonText}>{loading ? 'Saving...' : 'Add Product'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
// =====================================================
// ADMIN PRODUCT DETAILS
// =====================================================
export const AdminProductDetailsScreen = ({ route, navigation }: any) => {
    const { productId } = route.params;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await api.get(`/products/${productId}`);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return (
        <View style={styles.loadingCenter}>
            <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>Product Details</Text>
                    <TouchableOpacity onPress={() => {
                        Alert.alert('Delete', 'Are you sure?', [
                            { text: 'Cancel' },
                            {
                                text: 'Delete', style: 'destructive', onPress: async () => {
                                    await api.delete(`/products/${productId}`);
                                    navigation.goBack();
                                }
                            }
                        ]);
                    }}>
                        <Trash2 size={24} color={COLORS.error} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView}>
                    {product?.image && <Image source={{ uri: product.image }} style={{ width: '100%', height: 300, backgroundColor: COLORS.dark2 }} />}
                    <View style={{ padding: 20 }}>
                        <Text style={[styles.headerTitle, { fontSize: 24 }]}>{product?.name}</Text>
                        <Text style={[styles.productPrice, { fontSize: 20, marginVertical: 8 }]}>GX {product?.price?.toLocaleString()}</Text>
                        <View style={styles.statsRow}>
                            <View style={[styles.statCard, { backgroundColor: COLORS.dark2 }]}>
                                <Text style={styles.statLabel}>Stock</Text>
                                <Text style={styles.statValue}>{product?.stock}</Text>
                            </View>
                            <View style={[styles.statCard, { backgroundColor: COLORS.dark2 }]}>
                                <Text style={styles.statLabel}>Category</Text>
                                <Text style={[styles.statValue, { fontSize: 16 }]}>{product?.category || 'N/A'}</Text>
                            </View>
                        </View>
                        <Text style={[styles.sectionTitle, { marginLeft: 0, marginTop: 24 }]}>DESCRIPTION</Text>
                        <Text style={{ color: COLORS.gray, lineHeight: 20 }}>{product?.description || 'No description available.'}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// ADMIN ORDER DETAILS
// =====================================================
export const AdminOrderDetailsScreen = ({ route, navigation }: any) => {
    const { orderId } = route.params;
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await api.get(`/orders/${orderId}`);
                setOrder(data);
            } catch (error) {
                console.error('Failed to fetch order:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    const handleUpdateStatus = async (status: string) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            const updated = await api.get(`/orders/${orderId}`);
            setOrder(updated);
            Alert.alert('Success', `Order status updated to ${status}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to update status');
        }
    };

    if (loading) return (
        <View style={styles.loadingCenter}>
            <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>Order Details</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <View>
                                <Text style={{ color: COLORS.gray, fontSize: 12 }}>ORDER ID</Text>
                                <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: '700' }}>#{orderId.slice(-8).toUpperCase()}</Text>
                            </View>
                            <StatusBadge status={order?.status} />
                        </View>

                        <Text style={styles.sectionTitle}>CUSTOMER</Text>
                        <View style={styles.userCard}>
                            <View style={styles.userAvatar}>
                                <Text style={styles.userAvatarText}>{order?.userId?.name?.charAt(0)}</Text>
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{order?.userId?.name}</Text>
                                <Text style={styles.userEmail}>{order?.userId?.email}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>ITEMS</Text>
                        {order?.items?.map((item: any, idx: number) => (
                            <View key={idx} style={styles.productCard}>
                                <View style={styles.productDetails}>
                                    <Text style={styles.productName}>{item.productId?.name || 'Deleted Product'}</Text>
                                    <Text style={styles.productSku}>Qty: {item.quantity}</Text>
                                    <Text style={styles.productPrice}>GX {item.price?.toLocaleString()}</Text>
                                </View>
                            </View>
                        ))}

                        <View style={{ marginTop: 24, padding: 16, backgroundColor: COLORS.dark2, borderRadius: 12 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={{ color: COLORS.gray }}>Subtotal</Text>
                                <Text style={{ color: COLORS.white }}>GX {order?.totalAmount?.toLocaleString()}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, borderTopWidth: 1, borderTopColor: COLORS.dark3, paddingTop: 8 }}>
                                <Text style={{ color: COLORS.white, fontWeight: '700' }}>Total</Text>
                                <Text style={{ color: COLORS.primary, fontWeight: '700', fontSize: 18 }}>GX {order?.totalAmount?.toLocaleString()}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>UPDATE STATUS</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                                <TouchableOpacity
                                    key={s}
                                    style={[styles.filterTab, order?.status === s && { backgroundColor: COLORS.primary }]}
                                    onPress={() => handleUpdateStatus(s)}
                                >
                                    <Text style={{ color: COLORS.white, fontSize: 12, fontWeight: '600' }}>{s.toUpperCase()}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.black },
    safeArea: { flex: 1 },
    loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.dark2 },
    headerTitle: { fontSize: 20, fontWeight: '700', color: COLORS.white },
    headerTitleText: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    headerGreeting: { fontSize: 12, color: COLORS.gray },
    headerRight: { flexDirection: 'row', gap: 12 },
    headerIcon: { padding: 4 },
    avatarSmall: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.purple, justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontSize: 16, fontWeight: '700', color: COLORS.white },

    scrollView: { flex: 1 },
    listContainer: { flex: 1 },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },

    // Stats
    statsContainer: { paddingHorizontal: 20, paddingTop: 16 },
    statsRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
    statCard: { flex: 1, padding: 16, borderRadius: 16 },
    statValue: { fontSize: 22, fontWeight: '700', color: COLORS.white, marginTop: 8 },
    statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

    // Quick Actions
    quickActions: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 20, gap: 12 },
    quickAction: { width: '30%', backgroundColor: COLORS.dark2, padding: 16, borderRadius: 12, alignItems: 'center' },
    quickActionIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    quickActionLabel: { fontSize: 11, fontWeight: '600', color: COLORS.white, textAlign: 'center' },

    // Sections
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 24, marginBottom: 12 },
    sectionTitle: { fontSize: 13, fontWeight: '600', color: COLORS.gray, letterSpacing: 1, marginHorizontal: 20, marginTop: 24, marginBottom: 12 },
    seeAll: { fontSize: 12, fontWeight: '600', color: COLORS.primary },

    // Order Card
    orderCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 14 },
    orderLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    orderIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.dark3, justifyContent: 'center', alignItems: 'center' },
    orderInfo: { flex: 1, marginLeft: 12 },
    orderId: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginBottom: 2 },
    orderCustomer: { fontSize: 12, color: COLORS.gray },
    orderDate: { fontSize: 11, color: COLORS.gray3, marginTop: 2 },
    orderRight: { alignItems: 'flex-end' },
    orderAmount: { fontSize: 15, fontWeight: '700', color: COLORS.white, marginBottom: 6 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },

    // Filter Tabs
    filterTabs: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
    filterTab: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.dark2 },
    filterTabActive: { backgroundColor: COLORS.primary },
    filterText: { fontSize: 12, fontWeight: '600', color: COLORS.gray },
    filterTextActive: { color: COLORS.white },

    // Search
    searchContainer: { paddingHorizontal: 20, paddingTop: 16 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, gap: 12 },
    searchInput: { flex: 1, fontSize: 14, color: COLORS.white },

    // Product Card
    productCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 14 },
    productDetails: { flex: 1 },
    productName: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    productSku: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
    productFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 12 },
    productPrice: { fontSize: 15, fontWeight: '700', color: COLORS.primary },
    stockText: { fontSize: 11, color: COLORS.gray },

    // Segmented Control
    segmentedControl: { flexDirection: 'row', marginHorizontal: 20, marginTop: 16, backgroundColor: COLORS.dark2, borderRadius: 12, padding: 4 },
    segmentItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
    segmentItemActive: { backgroundColor: COLORS.primary },
    segmentText: { fontSize: 12, fontWeight: '600', color: COLORS.gray },
    segmentTextActive: { color: COLORS.white },

    // User Card
    userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 14 },
    userAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.dark3, justifyContent: 'center', alignItems: 'center' },
    userAvatarText: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    userInfo: { flex: 1, marginLeft: 12 },
    userName: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    userEmail: { fontSize: 12, color: COLORS.gray },
    userMeta: { fontSize: 11, color: COLORS.gray3, marginTop: 2 },

    // Chart
    chartCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, borderRadius: 16, padding: 16 },
    chartRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    chartMonth: { width: 40, fontSize: 12, color: COLORS.gray },
    chartBar: { flex: 1, height: 8, backgroundColor: COLORS.dark3, borderRadius: 4, marginHorizontal: 8, overflow: 'hidden' },
    chartBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },
    chartValue: { width: 40, fontSize: 12, fontWeight: '600', color: COLORS.white, textAlign: 'right' },

    // Auth
    authSafeArea: { flex: 1 },
    authContent: { padding: 24 },
    backBtn: { width: 40, height: 40, justifyContent: 'center', marginBottom: 20 },
    authLogo: { alignItems: 'center', marginBottom: 32 },
    logoBox: { width: 72, height: 72, borderRadius: 20, backgroundColor: COLORS.dark2, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    authTitle: { fontSize: 26, fontWeight: '800', color: COLORS.white, letterSpacing: 4 },
    authSubtitle: { fontSize: 14, color: COLORS.gray, marginTop: 4 },
    authForm: { marginBottom: 24 },
    inputGroup: { marginBottom: 16 },
    inputLabel: { fontSize: 12, fontWeight: '600', color: COLORS.gray, letterSpacing: 1, marginBottom: 8 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, borderRadius: 12, paddingHorizontal: 16, gap: 10 },
    input: { flex: 1, paddingVertical: 14, fontSize: 14, color: COLORS.white },
    authButton: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
    authButtonText: { fontSize: 14, fontWeight: '700', color: COLORS.white, letterSpacing: 1 },

    // Categories
    categoryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 16 },
    categoryIcon: { fontSize: 28, marginRight: 12 },
    categoryInfo: { flex: 1 },
    categoryName: { fontSize: 15, fontWeight: '600', color: COLORS.white },
    categoryMeta: { fontSize: 12, color: COLORS.gray, marginTop: 2 },

    // Vendors
    vendorCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 16, borderRadius: 16, padding: 16 },
    vendorHeader: { flexDirection: 'row', alignItems: 'flex-start' },
    vendorAvatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    vendorAvatarText: { fontSize: 20, fontWeight: '700', color: COLORS.blue },
    vendorInfo: { flex: 1, marginLeft: 12 },
    vendorName: { fontSize: 16, fontWeight: '700', color: COLORS.white },
    vendorOwner: { fontSize: 13, color: COLORS.gray, marginTop: 2 },
    vendorEmail: { fontSize: 12, color: COLORS.gray3, marginTop: 2 },
    vendorStats: { flexDirection: 'row', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: COLORS.dark3 },
    vendorStat: { flex: 1, alignItems: 'center' },
    vendorStatValue: { fontSize: 16, fontWeight: '700', color: COLORS.white },
    vendorStatLabel: { fontSize: 10, color: COLORS.gray, marginTop: 2 },
    vendorActions: { flexDirection: 'row', marginTop: 16, gap: 12 },
    vendorActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.dark3, paddingVertical: 10, borderRadius: 8, gap: 6 },
    vendorActionText: { fontSize: 12, fontWeight: '600', color: COLORS.gray },

    // Coupons
    couponCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: COLORS.primary + '40' },
    couponHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    couponCode: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
    couponDiscount: { fontSize: 24, fontWeight: '800', color: COLORS.white, marginVertical: 8 },
    couponDetails: { flexDirection: 'row', gap: 16 },
    couponDetail: { fontSize: 11, color: COLORS.gray },

    // Banners
    bannerCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, overflow: 'hidden' },
    bannerPlaceholder: { height: 120, backgroundColor: COLORS.dark3, justifyContent: 'center', alignItems: 'center' },
    bannerTitle: { fontSize: 16, fontWeight: '600', color: COLORS.white, marginTop: 8 },
    bannerFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
    bannerOrder: { fontSize: 14, fontWeight: '600', color: COLORS.gray },

    // Finance
    balanceCard: { backgroundColor: COLORS.success, marginHorizontal: 20, marginTop: 16, borderRadius: 16, padding: 24 },
    balanceLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 },
    balanceValue: { fontSize: 38, fontWeight: '700', color: COLORS.white, marginTop: 8 },
    transactionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginBottom: 8, padding: 14, borderRadius: 12 },
    txIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    txInfo: { flex: 1 },
    txType: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    txDate: { fontSize: 11, color: COLORS.gray, marginTop: 2 },
    txAmount: { fontSize: 15, fontWeight: '700' },

    // Settings
    settingsGroup: { backgroundColor: COLORS.dark2, marginHorizontal: 20, borderRadius: 12, overflow: 'hidden', marginBottom: 8 },
    settingItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.dark3 },
    settingIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.dark3, justifyContent: 'center', alignItems: 'center' },
    settingContent: { flex: 1, marginLeft: 12 },
    settingTitle: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    settingSubtitle: { fontSize: 11, color: COLORS.gray, marginTop: 2 },

    // Bottom Tab
    bottomTab: { flexDirection: 'row', backgroundColor: COLORS.dark2, paddingVertical: 8, paddingBottom: 24, borderTopWidth: 1, borderTopColor: COLORS.dark3 },
    tabItem: { flex: 1, alignItems: 'center' },
    tabLabel: { fontSize: 10, fontWeight: '600', marginTop: 4 },
    fab: { position: 'absolute', bottom: 100, right: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
});
