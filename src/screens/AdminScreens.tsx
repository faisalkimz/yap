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
    Modal,
} from 'react-native';
import { sanitizeInput } from '../utils/sanitize';
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

// --- Mock Data ---
const ADMIN_STATS = {
    totalRevenue: 456780,
    totalOrders: 12845,
    totalCustomers: 8934,
    totalVendors: 156,
};

const CUSTOMERS = [
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+44 7890 123456', orders: 12, spent: 2450, joined: 'Jan 2024', status: 'active' },
    { id: '2', name: 'Emma Wilson', email: 'emma@example.com', phone: '+44 7891 234567', orders: 8, spent: 1890, joined: 'Feb 2024', status: 'active' },
    { id: '3', name: 'Michael Brown', email: 'michael@example.com', phone: '+44 7892 345678', orders: 5, spent: 890, joined: 'Mar 2024', status: 'active' },
    { id: '4', name: 'Sarah Davis', email: 'sarah@example.com', phone: '+44 7893 456789', orders: 15, spent: 3200, joined: 'Dec 2023', status: 'active' },
    { id: '5', name: 'James Johnson', email: 'james@example.com', phone: '+44 7894 567890', orders: 3, spent: 450, joined: 'Apr 2024', status: 'inactive' },
];

const VENDORS = [
    { id: '1', storeName: 'Luxe Fashion', owner: 'John Doe', email: 'luxe@example.com', products: 45, sales: 2340, revenue: 156000, status: 'active', joined: 'Jan 2024' },
    { id: '2', storeName: 'Tech Hub', owner: 'Sarah Wilson', email: 'tech@example.com', products: 120, sales: 5670, revenue: 234000, status: 'active', joined: 'Nov 2023' },
    { id: '3', storeName: 'Home Essentials', owner: 'Mike Brown', email: 'home@example.com', products: 89, sales: 1890, revenue: 89000, status: 'active', joined: 'Feb 2024' },
    { id: '4', storeName: 'Beauty Store', owner: 'Emma Davis', email: 'beauty@example.com', products: 67, sales: 1230, revenue: 67000, status: 'pending', joined: 'Mar 2024' },
    { id: '5', storeName: 'Sports World', owner: 'James Wilson', email: 'sports@example.com', products: 156, sales: 3450, revenue: 189000, status: 'suspended', joined: 'Oct 2023' },
];

const ADMIN_USERS = [
    { id: '1', name: 'Super Admin', email: 'admin@bantu.creations', role: 'Super Admin', lastLogin: 'Today, 10:30 AM', status: 'active' },
    { id: '2', name: 'Order Manager', email: 'orders@bantu.creations', role: 'Order Manager', lastLogin: 'Yesterday', status: 'active' },
    { id: '3', name: 'Product Manager', email: 'products@bantu.creations', role: 'Product Manager', lastLogin: '2 days ago', status: 'active' },
    { id: '4', name: 'Support Staff', email: 'support@bantu.creations', role: 'Support', lastLogin: '3 days ago', status: 'active' },
];

const ALL_ORDERS = [
    { id: 'ORD-8921', customer: 'John Smith', vendor: 'Luxe Fashion', items: 2, amount: 890, date: 'Today, 2:30 PM', status: 'processing', payment: 'paid' },
    { id: 'ORD-8920', customer: 'Emma Wilson', vendor: 'Tech Hub', items: 1, amount: 1299, date: 'Today, 11:45 AM', status: 'shipped', payment: 'paid' },
    { id: 'ORD-8919', customer: 'Michael Brown', vendor: 'Home Essentials', items: 3, amount: 456, date: 'Yesterday', status: 'delivered', payment: 'paid' },
    { id: 'ORD-8918', customer: 'Sarah Davis', vendor: 'Beauty Store', items: 2, amount: 1780, date: 'Yesterday', status: 'delivered', payment: 'paid' },
    { id: 'ORD-8917', customer: 'James Johnson', vendor: 'Sports World', items: 1, amount: 340, date: 'Feb 14', status: 'cancelled', payment: 'refunded' },
    { id: 'ORD-8916', customer: 'Lisa Chen', vendor: 'Luxe Fashion', items: 4, amount: 2340, date: 'Feb 13', status: 'pending', payment: 'pending' },
];

const PRODUCTS = [
    { id: '1', name: 'Premium Silk Gown', vendor: 'Luxe Fashion', category: 'Dresses', price: 450, stock: 25, sold: 156, status: 'active' },
    { id: '2', name: 'iPhone 15 Pro', vendor: 'Tech Hub', category: 'Electronics', price: 999, stock: 50, sold: 234, status: 'active' },
    { id: '3', name: 'Designer Handbag', vendor: 'Luxe Fashion', category: 'Accessories', price: 890, stock: 15, sold: 89, status: 'active' },
    { id: '4', name: 'Wireless Earbuds', vendor: 'Tech Hub', category: 'Electronics', price: 199, stock: 0, sold: 567, status: 'out_of_stock' },
    { id: '5', name: 'Yoga Mat', vendor: 'Sports World', category: 'Sports', price: 45, stock: 120, sold: 234, status: 'active' },
    { id: '6', name: 'Face Cream', vendor: 'Beauty Store', category: 'Beauty', price: 89, stock: 80, sold: 145, status: 'active' },
];

const CATEGORIES = [
    { id: '1', name: 'Fashion', products: 1234, subcategories: 8, icon: '👗' },
    { id: '2', name: 'Electronics', products: 856, subcategories: 12, icon: '📱' },
    { id: '3', name: 'Home & Garden', products: 654, subcategories: 10, icon: '🏠' },
    { id: '4', name: 'Beauty', products: 432, subcategories: 6, icon: '💄' },
    { id: '5', name: 'Sports', products: 321, subcategories: 5, icon: '⚽' },
    { id: '6', name: 'Books', products: 543, subcategories: 4, icon: '📚' },
];

const BANNERS = [
    { id: '1', title: 'Summer Sale', image: 'banner1', status: 'active', order: 1 },
    { id: '2', title: 'New Arrivals', image: 'banner2', status: 'active', order: 2 },
    { id: '3', title: 'Free Shipping', image: 'banner3', status: 'inactive', order: 3 },
];

const COUPONS = [
    { id: '1', code: 'SUMMER20', discount: '20%', minOrder: 100, usage: 234, limit: 500, expires: 'Aug 31, 2026', status: 'active' },
    { id: '2', code: 'NEW50', discount: '£50', minOrder: 200, usage: 89, limit: 200, expires: 'Sep 30, 2026', status: 'active' },
    { id: '3', code: 'FLASH10', discount: '10%', minOrder: 50, usage: 456, limit: 1000, expires: 'Jul 15, 2026', status: 'expired' },
];

const TRANSACTIONS = [
    { id: '1', type: 'order', amount: 890, orderId: 'ORD-8921', vendor: 'Luxe Fashion', date: 'Today', status: 'completed' },
    { id: '2', type: 'order', amount: 1299, orderId: 'ORD-8920', vendor: 'Tech Hub', date: 'Today', status: 'completed' },
    { id: '3', type: 'payout', amount: 5000, vendor: 'Luxe Fashion', date: 'Yesterday', status: 'completed' },
    { id: '4', type: 'refund', amount: 340, orderId: 'ORD-8917', vendor: 'Sports World', date: 'Feb 14', status: 'completed' },
    { id: '5', type: 'payout', amount: 3000, vendor: 'Tech Hub', date: 'Feb 12', status: 'pending' },
];

const SALES_DATA = [
    { month: 'Jan', sales: 45000, revenue: 125000 },
    { month: 'Feb', sales: 52000, revenue: 158000 },
    { month: 'Mar', sales: 48000, revenue: 142000 },
    { month: 'Apr', sales: 61000, revenue: 189000 },
    { month: 'May', sales: 55000, revenue: 165000 },
    { month: 'Jun', sales: 67000, revenue: 215000 },
];

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

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <AdminHome navigation={navigation} />;
            case 'orders': return <AdminOrders navigation={navigation} />;
            case 'products': return <AdminProducts navigation={navigation} />;
            case 'users': return <AdminUsers navigation={navigation} />;
            default: return <AdminHome navigation={navigation} />;
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
const AdminHome = ({ navigation }: any) => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: COLORS.success }]}>
                    <DollarSign size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>£{ADMIN_STATS.totalRevenue.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Total Revenue</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: COLORS.blue }]}>
                    <ShoppingCart size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{ADMIN_STATS.totalOrders.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Total Orders</Text>
                </View>
            </View>
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: COLORS.purple }]}>
                    <Users size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{ADMIN_STATS.totalCustomers.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Customers</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: COLORS.gold }]}>
                    <Store size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{ADMIN_STATS.totalVendors}</Text>
                    <Text style={styles.statLabel}>Vendors</Text>
                </View>
            </View>
        </View>

        {/* Quick Links */}
        <Text style={styles.sectionTitle}>MANAGE</Text>
        <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('AdminCategories')}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.pink + '20' }]}>
                    <Layers size={22} color={COLORS.pink} />
                </View>
                <Text style={styles.quickActionLabel}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('AdminVendors')}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.blue + '20' }]}>
                    <Store size={22} color={COLORS.blue} />
                </View>
                <Text style={styles.quickActionLabel}>Vendors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('AdminCoupons')}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.gold + '20' }]}>
                    <Gift size={22} color={COLORS.gold} />
                </View>
                <Text style={styles.quickActionLabel}>Coupons</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('AdminSettings')}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.gray + '20' }]}>
                    <Settings size={22} color={COLORS.gray} />
                </View>
                <Text style={styles.quickActionLabel}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('AdminBanners')}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.purple + '20' }]}>
                    <ImageIcon size={22} color={COLORS.purple} />
                </View>
                <Text style={styles.quickActionLabel}>Banners</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('AdminFinance')}>
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.success + '20' }]}>
                    <Wallet size={22} color={COLORS.success} />
                </View>
                <Text style={styles.quickActionLabel}>Finance</Text>
            </TouchableOpacity>
        </View>

        {/* Recent Orders */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT ORDERS</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AdminOrders')}>
                <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
        </View>

        {ALL_ORDERS.slice(0, 3).map((order) => (
            <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderLeft}>
                    <View style={[styles.orderIcon, { backgroundColor: COLORS.dark3 }]}>
                        <ShoppingCart size={18} color={COLORS.white} />
                    </View>
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderId}>{order.id}</Text>
                        <Text style={styles.orderCustomer}>{order.customer} • {order.vendor}</Text>
                    </View>
                </View>
                <View style={styles.orderRight}>
                    <Text style={styles.orderAmount}>£{order.amount}</Text>
                    <StatusBadge status={order.status} />
                </View>
            </View>
        ))}

        {/* Revenue Chart Placeholder */}
        <Text style={styles.sectionTitle}>REVENUE TREND</Text>
        <View style={styles.chartCard}>
            {SALES_DATA.map((data, index) => (
                <View key={index} style={styles.chartRow}>
                    <Text style={styles.chartMonth}>{data.month}</Text>
                    <View style={styles.chartBar}>
                        <View style={[styles.chartBarFill, { width: `${(data.revenue / 250000) * 100}%` }]} />
                    </View>
                    <Text style={styles.chartValue}>£{(data.revenue / 1000).toFixed(0)}k</Text>
                </View>
            ))}
        </View>

        <View style={{ height: 20 }} />
    </ScrollView>
);

// =====================================================
// ADMIN ORDERS
// =====================================================
const AdminOrders = ({ navigation }: any) => {
    const [filter, setFilter] = useState('all');
    const filters = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    const filteredOrders = filter === 'all' ? ALL_ORDERS : ALL_ORDERS.filter(o => o.status === filter);

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

            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <View style={styles.orderLeft}>
                            <View style={[styles.orderIcon, { backgroundColor: COLORS.dark3 }]}>
                                <ShoppingCart size={18} color={COLORS.white} />
                            </View>
                            <View style={styles.orderInfo}>
                                <Text style={styles.orderId}>{item.id}</Text>
                                <Text style={styles.orderCustomer}>{item.customer}</Text>
                                <Text style={styles.orderDate}>{item.vendor}</Text>
                            </View>
                        </View>
                        <View style={styles.orderRight}>
                            <Text style={styles.orderAmount}>£{item.amount}</Text>
                            <StatusBadge status={item.status} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

// =====================================================
// ADMIN PRODUCTS
// =====================================================
const AdminProducts = ({ navigation }: any) => {
    const [search, setSearch] = useState('');

    const filteredProducts = search
        ? PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        : PRODUCTS;

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

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productSku}>{item.vendor} • {item.category}</Text>
                            <View style={styles.productFooter}>
                                <Text style={styles.productPrice}>£{item.price}</Text>
                                <Text style={styles.stockText}>{item.stock} stock • {item.sold} sold</Text>
                            </View>
                        </View>
                        <StatusBadge status={item.status} />
                    </View>
                )}
            />
        </View>
    );
};

// =====================================================
// ADMIN USERS
// =====================================================
const AdminUsers = ({ navigation }: any) => {
    const [activeSection, setActiveSection] = useState('customers');

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

            {activeSection === 'customers' && (
                <FlatList
                    data={CUSTOMERS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <View style={styles.userAvatar}>
                                <Text style={styles.userAvatarText}>{item.name.charAt(0)}</Text>
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.name}</Text>
                                <Text style={styles.userEmail}>{item.email}</Text>
                                <Text style={styles.userMeta}>{item.orders} orders • £{item.spent} spent</Text>
                            </View>
                            <StatusBadge status={item.status} />
                        </View>
                    )}
                />
            )}

            {activeSection === 'vendors' && (
                <FlatList
                    data={VENDORS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <View style={[styles.userAvatar, { backgroundColor: COLORS.blue + '20' }]}>
                                <Store size={18} color={COLORS.blue} />
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.storeName}</Text>
                                <Text style={styles.userEmail}>{item.owner}</Text>
                                <Text style={styles.userMeta}>{item.products} products • £{item.revenue.toLocaleString()} revenue</Text>
                            </View>
                            <StatusBadge status={item.status} />
                        </View>
                    )}
                />
            )}

            {activeSection === 'admins' && (
                <FlatList
                    data={ADMIN_USERS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <View style={[styles.userAvatar, { backgroundColor: COLORS.purple + '20' }]}>
                                <Shield size={18} color={COLORS.purple} />
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.name}</Text>
                                <Text style={styles.userEmail}>{item.email}</Text>
                                <Text style={styles.userMeta}>{item.role} • Last login: {item.lastLogin}</Text>
                            </View>
                            <StatusBadge status={item.status} />
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

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }
        navigation.replace('AdminDashboard');
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
                                    placeholder="admin@bantu.com"
                                    placeholderTextColor={COLORS.gray}
                                    value={email}
                                    onChangeText={(t) => setEmail(sanitizeInput(t))}
                                    keyboardType="email-address"
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
                                    onChangeText={(t) => setPassword(sanitizeInput(t))}
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
// CATEGORIES MANAGEMENT
// =====================================================
export const AdminCategoriesScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Categories</Text>
                <TouchableOpacity>
                    <Plus size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.categoryCard}>
                        <Text style={styles.categoryIcon}>{item.icon}</Text>
                        <View style={styles.categoryInfo}>
                            <Text style={styles.categoryName}>{item.name}</Text>
                            <Text style={styles.categoryMeta}>{item.products} products • {item.subcategories} subcategories</Text>
                        </View>
                        <TouchableOpacity>
                            <MoreVertical size={20} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// VENDORS MANAGEMENT
// =====================================================
export const AdminVendorsScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Vendors</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={VENDORS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>ALL VENDORS</Text>}
                renderItem={({ item }) => (
                    <View style={styles.vendorCard}>
                        <View style={styles.vendorHeader}>
                            <View style={[styles.vendorAvatar, { backgroundColor: COLORS.blue + '20' }]}>
                                <Text style={styles.vendorAvatarText}>{item.storeName.charAt(0)}</Text>
                            </View>
                            <View style={styles.vendorInfo}>
                                <Text style={styles.vendorName}>{item.storeName}</Text>
                                <Text style={styles.vendorOwner}>{item.owner}</Text>
                                <Text style={styles.vendorEmail}>{item.email}</Text>
                            </View>
                            <StatusBadge status={item.status} />
                        </View>
                        <View style={styles.vendorStats}>
                            <View style={styles.vendorStat}>
                                <Text style={styles.vendorStatValue}>{item.products}</Text>
                                <Text style={styles.vendorStatLabel}>Products</Text>
                            </View>
                            <View style={styles.vendorStat}>
                                <Text style={styles.vendorStatValue}>{item.sales}</Text>
                                <Text style={styles.vendorStatLabel}>Sales</Text>
                            </View>
                            <View style={styles.vendorStat}>
                                <Text style={styles.vendorStatValue}>£{item.revenue.toLocaleString()}</Text>
                                <Text style={styles.vendorStatLabel}>Revenue</Text>
                            </View>
                            <View style={styles.vendorStat}>
                                <Text style={styles.vendorStatValue}>{item.joined}</Text>
                                <Text style={styles.vendorStatLabel}>Joined</Text>
                            </View>
                        </View>
                        <View style={styles.vendorActions}>
                            <TouchableOpacity style={styles.vendorActionBtn}>
                                <Eye size={16} color={COLORS.blue} />
                                <Text style={[styles.vendorActionText, { color: COLORS.blue }]}>View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.vendorActionBtn}>
                                <Edit3 size={16} color={COLORS.gray} />
                                <Text style={styles.vendorActionText}>Edit</Text>
                            </TouchableOpacity>
                            {item.status === 'pending' && (
                                <TouchableOpacity style={[styles.vendorActionBtn, { backgroundColor: COLORS.success + '20' }]}>
                                    <Check size={16} color={COLORS.success} />
                                    <Text style={[styles.vendorActionText, { color: COLORS.success }]}>Approve</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// COUPONS MANAGEMENT
// =====================================================
export const AdminCouponsScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Coupons</Text>
                <TouchableOpacity>
                    <Plus size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={COUPONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>ALL COUPONS</Text>}
                renderItem={({ item }) => (
                    <View style={styles.couponCard}>
                        <View style={styles.couponHeader}>
                            <Text style={styles.couponCode}>{item.code}</Text>
                            <StatusBadge status={item.status} />
                        </View>
                        <Text style={styles.couponDiscount}>{item.discount} OFF</Text>
                        <View style={styles.couponDetails}>
                            <Text style={styles.couponDetail}>Min Order: £{item.minOrder}</Text>
                            <Text style={styles.couponDetail}>Used: {item.usage}/{item.limit}</Text>
                            <Text style={styles.couponDetail}>Expires: {item.expires}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// BANNERS MANAGEMENT
// =====================================================
export const AdminBannersScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Banners</Text>
                <TouchableOpacity>
                    <Plus size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={BANNERS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>HOME BANNERS</Text>}
                renderItem={({ item }) => (
                    <View style={styles.bannerCard}>
                        <View style={styles.bannerPlaceholder}>
                            <ImageIcon size={32} color={COLORS.gray} />
                            <Text style={styles.bannerTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.bannerFooter}>
                            <Text style={styles.bannerOrder}>#{item.order}</Text>
                            <StatusBadge status={item.status} />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// FINANCE / PAYOUTS
// =====================================================
export const AdminFinanceScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Finance</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>TOTAL REVENUE</Text>
                <Text style={styles.balanceValue}>£{ADMIN_STATS.totalRevenue.toLocaleString()}</Text>
            </View>

            <FlatList
                data={TRANSACTIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>RECENT TRANSACTIONS</Text>}
                renderItem={({ item }) => (
                    <View style={styles.transactionRow}>
                        <View style={[styles.txIcon, { backgroundColor: item.type === 'payout' ? COLORS.success + '20' : item.type === 'refund' ? COLORS.error + '20' : COLORS.primary + '20' }]}>
                            {item.type === 'payout' ? <ArrowUpRight size={20} color={COLORS.success} /> :
                                item.type === 'refund' ? <ArrowDownRight size={20} color={COLORS.error} /> :
                                    <ShoppingCart size={20} color={COLORS.primary} />}
                        </View>
                        <View style={styles.txInfo}>
                            <Text style={styles.txType}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
                            <Text style={styles.txDate}>{item.vendor || item.orderId} • {item.date}</Text>
                        </View>
                        <Text style={[styles.txAmount, { color: item.type === 'payout' ? COLORS.success : item.type === 'refund' ? COLORS.error : COLORS.white }]}>
                            {item.type === 'payout' ? '-' : item.type === 'refund' ? '-' : '+'}£{item.amount}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

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
// STYLES
// =====================================================
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.black },
    safeArea: { flex: 1 },
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
});
