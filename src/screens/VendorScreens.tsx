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
    Pressable,
} from 'react-native';
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
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Star,
    Clock,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Lock,
    Phone,
    MapPin,
    Globe,
    Share2,
    Heart,
    Archive,
    RefreshCw,
    Send,
    User,
    Home,
    Bell,
    Wallet,
    X,
    Check,
    GripVertical,
    MoreVertical,
    Copy,
    ExternalLink,
    Layers,
    Tag,
    Box,
    Truck,
    Calendar,
    FileText,
    XCircle,
    CheckCircle,
    AlertTriangle,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

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
const VENDOR_INFO = {
    storeName: 'Luxe Fashion',
    ownerName: 'John Doe',
    email: 'vendor@yap.com',
    phone: '+44 7890 123456',
    address: 'London, UK',
    rating: 4.9,
    totalSales: 12450,
    totalRevenue: 156750,
    totalStores: 3,
};

let PRODUCTS = [
    { id: '1', name: 'Premium Silk Gown', price: 450, oldPrice: 720, stock: 25, sold: 156, image: 'https://images.unsplash.com/photo-1595152230551-2f4676d0ad94?w=200', status: 'active', category: 'Dresses', sku: 'LUX-SK-001', weight: '0.5kg' },
    { id: '2', name: 'Leather Trench Coat', price: 850, oldPrice: 1100, stock: 12, sold: 89, image: 'https://images.unsplash.com/photo-1539533397341-3927b4c74bb6?w=200', status: 'active', category: 'Outerwear', sku: 'LUX-LT-002', weight: '1.2kg' },
    { id: '3', name: 'Italian Calf Loafers', price: 320, oldPrice: 450, stock: 48, sold: 234, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=200', status: 'active', category: 'Footwear', sku: 'LUX-IC-003', weight: '0.8kg' },
    { id: '4', name: 'Cashmere V-Neck', price: 210, oldPrice: 290, stock: 0, sold: 312, image: 'https://images.unsplash.com/photo-1576871333021-d1d0cf377f5f?w=200', status: 'out_of_stock', category: 'Knitwear', sku: 'LUX-CV-004', weight: '0.3kg' },
    { id: '5', name: 'Silk Evening Blazer', price: 420, oldPrice: 580, stock: 18, sold: 145, image: 'https://images.unsplash.com/photo-1594932224528-a4603e236124?w=200', status: 'active', category: 'Formal', sku: 'LUX-SE-005', weight: '0.6kg' },
    { id: '6', name: 'Wool Overcoat', price: 680, oldPrice: 890, stock: 8, sold: 67, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=200', status: 'draft', category: 'Outerwear', sku: 'LUX-WO-006', weight: '1.5kg' },
];

const ORDERS = [
    { id: 'ORD-8291', customer: 'Alex Johnson', items: 2, amount: 1250, date: 'Today, 2:30 PM', status: 'processing', address: '123 Main St, London', payment: 'paid' },
    { id: 'ORD-8290', customer: 'Sarah Williams', items: 1, amount: 890, date: 'Today, 11:45 AM', status: 'shipped', address: '45 Park Ave, Manchester', payment: 'paid' },
    { id: 'ORD-8289', customer: 'Mike Brown', items: 3, amount: 2340, date: 'Yesterday', status: 'delivered', address: '78 Oxford St, London', payment: 'paid' },
    { id: 'ORD-8288', customer: 'Emma Davis', items: 1, amount: 560, date: 'Feb 14', status: 'delivered', address: '12 High St, Birmingham', payment: 'paid' },
    { id: 'ORD-8287', customer: 'James Wilson', items: 2, amount: 1890, date: 'Feb 13', status: 'cancelled', address: '34 Queen St, Edinburgh', payment: 'refunded' },
    { id: 'ORD-8286', customer: 'Lisa Chen', items: 1, amount: 450, date: 'Feb 12', status: 'pending', address: '56 King St, Bristol', payment: 'pending' },
];

const RETURNS = [
    { id: 'RET-001', orderId: 'ORD-8289', product: 'Leather Trench Coat', reason: 'Wrong size', date: 'Today', status: 'pending', amount: 850, customer: 'Mike Brown' },
    { id: 'RET-002', orderId: 'ORD-8285', product: 'Italian Loafers', reason: 'Defective', date: 'Yesterday', status: 'approved', amount: 320, customer: 'John Smith' },
    { id: 'RET-003', orderId: 'ORD-8280', product: 'Cashmere V-Neck', reason: 'Not as described', date: 'Feb 12', status: 'rejected', amount: 210, customer: 'Jane Doe' },
];

const MESSAGES = [
    { id: '1', customer: 'Alex Johnson', avatar: null, message: 'Is this available in blue?', time: '2m ago', unread: true, orderId: 'ORD-8291' },
    { id: '2', customer: 'Sarah Williams', avatar: null, message: 'Thank you for the quick response!', time: '1h ago', unread: true, orderId: 'ORD-8290' },
    { id: '3', customer: 'Mike Brown', avatar: null, message: 'When will this be shipped?', time: 'Yesterday', unread: false, orderId: 'ORD-8289' },
    { id: '4', customer: 'Emma Davis', avatar: null, message: 'Perfect, thank you!', time: '2 days ago', unread: false, orderId: 'ORD-8288' },
];

const SALES_DATA = [
    { month: 'Jan', sales: 4500, revenue: 12500 },
    { month: 'Feb', sales: 5200, revenue: 15800 },
    { month: 'Mar', sales: 4800, revenue: 14200 },
    { month: 'Apr', sales: 6100, revenue: 18900 },
    { month: 'May', sales: 5500, revenue: 16500 },
    { month: 'Jun', sales: 6700, revenue: 21500 },
];

const TRANSACTIONS = [
    { id: '1', type: 'sale', amount: 1250, date: 'Today', status: 'completed', orderId: 'ORD-8291' },
    { id: '2', type: 'sale', amount: 890, date: 'Today', status: 'completed', orderId: 'ORD-8290' },
    { id: '3', type: 'payout', amount: 3000, date: 'Yesterday', status: 'completed', method: 'Bank Transfer' },
    { id: '4', type: 'sale', amount: 450, date: 'Feb 14', status: 'completed', orderId: 'ORD-8286' },
    { id: '5', type: 'payout', amount: 2000, date: 'Feb 12', status: 'pending', method: 'PayPal' },
];

const CATEGORIES = ['All', 'Dresses', 'Outerwear', 'Footwear', 'Knitwear', 'Formal', 'Accessories'];

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
            case 'out_of_stock': return { bg: COLORS.error + '20', text: COLORS.error };
            case 'draft': return { bg: COLORS.gray + '20', text: COLORS.gray };
            case 'approved': return { bg: COLORS.success + '20', text: COLORS.success };
            case 'rejected': return { bg: COLORS.error + '20', text: COLORS.error };
            case 'completed': return { bg: COLORS.success + '20', text: COLORS.success };
            case 'refunded': return { bg: COLORS.purple + '20', text: COLORS.purple };
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

const ActionButton = ({ icon: Icon, label, color = COLORS.primary, onPress }: any) => (
    <TouchableOpacity style={[styles.actionButton, { backgroundColor: color + '20' }]} onPress={onPress}>
        <Icon size={18} color={color} />
        <Text style={[styles.actionButtonText, { color }]}>{label}</Text>
    </TouchableOpacity>
);

// =====================================================
// VENDOR DASHBOARD (Main Hub)
// =====================================================
export const VendorDashboardScreen = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardHome navigation={navigation} />;
            case 'orders': return <OrdersList navigation={navigation} />;
            case 'products': return <ProductsList navigation={navigation} />;
            case 'messages': return <MessagesList navigation={navigation} />;
            default: return <DashboardHome navigation={navigation} />;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerGreeting}>Welcome back,</Text>
                        <Text style={styles.headerTitle}>{VENDOR_INFO.storeName}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('VendorProfile')}>
                            <View style={styles.avatarSmall}>
                                <Text style={styles.avatarText}>{VENDOR_INFO.storeName.charAt(0)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content */}
                {renderContent()}

                {/* Bottom Tab */}
                <View style={styles.bottomTab}>
                    {[
                        { key: 'dashboard', icon: Home, label: 'Home' },
                        { key: 'orders', icon: ShoppingCart, label: 'Orders' },
                        { key: 'products', icon: Package, label: 'Products' },
                        { key: 'messages', icon: MessageSquare, label: 'Inbox' },
                    ].map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            style={styles.tabItem}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <View style={activeTab === tab.key ? styles.tabIconActive : null}>
                                <tab.icon size={22} color={activeTab === tab.key ? COLORS.primary : COLORS.gray} />
                            </View>
                            <Text style={[styles.tabLabel, { color: activeTab === tab.key ? COLORS.primary : COLORS.gray }]}>
                                {tab.label}
                            </Text>
                            {tab.key === 'messages' && MESSAGES.filter(m => m.unread).length > 0 && (
                                <View style={styles.tabBadge}>
                                    <Text style={styles.tabBadgeText}>{MESSAGES.filter(m => m.unread).length}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </View>
    );
};

// --- Dashboard Home Content ---
const DashboardHome = ({ navigation }: any) => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: COLORS.primary }]}>
                    <DollarSign size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>£{VENDOR_INFO.totalRevenue.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Total Revenue</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: COLORS.blue }]}>
                    <ShoppingCart size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{VENDOR_INFO.totalSales.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Total Orders</Text>
                </View>
            </View>
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: COLORS.success }]}>
                    <Package size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{PRODUCTS.length}</Text>
                    <Text style={styles.statLabel}>Products</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: COLORS.gold }]}>
                    <Star size={24} color={COLORS.white} />
                    <Text style={styles.statValue}>{VENDOR_INFO.rating}</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
            </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
            <TouchableOpacity style={styles.quickStat} onPress={() => navigation.navigate('VendorOrders')}>
                <View style={[styles.quickIcon, { backgroundColor: COLORS.warning + '20' }]}>
                    <Clock size={20} color={COLORS.warning} />
                </View>
                <Text style={styles.quickStatValue}>{ORDERS.filter(o => o.status === 'pending').length}</Text>
                <Text style={styles.quickStatLabel}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickStat} onPress={() => navigation.navigate('VendorOrders')}>
                <View style={[styles.quickIcon, { backgroundColor: COLORS.blue + '20' }]}>
                    <Truck size={20} color={COLORS.blue} />
                </View>
                <Text style={styles.quickStatValue}>{ORDERS.filter(o => o.status === 'shipped').length}</Text>
                <Text style={styles.quickStatLabel}>Shipped</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickStat} onPress={() => navigation.navigate('VendorReturns')}>
                <View style={[styles.quickIcon, { backgroundColor: COLORS.error + '20' }]}>
                    <RefreshCw size={20} color={COLORS.error} />
                </View>
                <Text style={styles.quickStatValue}>{RETURNS.filter(r => r.status === 'pending').length}</Text>
                <Text style={styles.quickStatLabel}>Returns</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickStat} onPress={() => navigation.navigate('VendorPayouts')}>
                <View style={[styles.quickIcon, { backgroundColor: COLORS.success + '20' }]}>
                    <Wallet size={20} color={COLORS.success} />
                </View>
                <Text style={styles.quickStatValue}>£{4250}</Text>
                <Text style={styles.quickStatLabel}>Balance</Text>
            </TouchableOpacity>
        </View>

        {/* Recent Orders */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RECENT ORDERS</Text>
            <TouchableOpacity onPress={() => navigation.navigate('VendorOrders')}>
                <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
        </View>

        {ORDERS.slice(0, 3).map((order) => (
            <TouchableOpacity key={order.id} style={styles.orderCard}>
                <View style={styles.orderLeft}>
                    <View style={styles.orderIcon}>
                        <ShoppingCart size={18} color={COLORS.white} />
                    </View>
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderId}>{order.id}</Text>
                        <Text style={styles.orderCustomer}>{order.customer} • {order.items} items</Text>
                    </View>
                </View>
                <View style={styles.orderRight}>
                    <Text style={styles.orderAmount}>£{order.amount}</Text>
                    <StatusBadge status={order.status} />
                </View>
            </TouchableOpacity>
        ))}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
        <View style={styles.quickActions}>
            <TouchableOpacity
                style={styles.quickAction}
                onPress={() => navigation.navigate('VendorAddProduct')}
            >
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.primary + '20' }]}>
                    <Plus size={22} color={COLORS.primary} />
                </View>
                <Text style={styles.quickActionLabel}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.quickAction}
                onPress={() => navigation.navigate('VendorAnalytics')}
            >
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.blue + '20' }]}>
                    <BarChart3 size={22} color={COLORS.blue} />
                </View>
                <Text style={styles.quickActionLabel}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.quickAction}
                onPress={() => navigation.navigate('VendorPayouts')}
            >
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.gold + '20' }]}>
                    <Wallet size={22} color={COLORS.gold} />
                </View>
                <Text style={styles.quickActionLabel}>Payouts</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.quickAction}
                onPress={() => navigation.navigate('VendorStorefront')}
            >
                <View style={[styles.quickActionIcon, { backgroundColor: COLORS.purple + '20' }]}>
                    <ExternalLink size={22} color={COLORS.purple} />
                </View>
                <Text style={styles.quickActionLabel}>My Store</Text>
            </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
    </ScrollView>
);

// =====================================================
// ORDERS LIST
// =====================================================
const OrdersList = ({ navigation }: any) => {
    const [filter, setFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const filters = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    const filteredOrders = filter === 'all' ? ORDERS : ORDERS.filter(o => o.status === filter);

    const handleOrderPress = (order: any) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    const updateOrderStatus = (status: string) => {
        Alert.alert('Order Updated', `Order status changed to ${status}`, [
            { text: 'OK', onPress: () => setShowOrderModal(false) }
        ]);
    };

    return (
        <View style={styles.listContainer}>
            {/* Filter Tabs */}
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
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <ShoppingCart size={48} color={COLORS.gray} />
                        <Text style={styles.emptyText}>No orders found</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.orderCard} onPress={() => handleOrderPress(item)}>
                        <View style={styles.orderLeft}>
                            <View style={[styles.orderIcon, { backgroundColor: COLORS.dark3 }]}>
                                <ShoppingCart size={18} color={COLORS.white} />
                            </View>
                            <View style={styles.orderInfo}>
                                <Text style={styles.orderId}>{item.id}</Text>
                                <Text style={styles.orderCustomer}>{item.customer} • {item.items} items</Text>
                                <Text style={styles.orderDate}>{item.date}</Text>
                            </View>
                        </View>
                        <View style={styles.orderRight}>
                            <Text style={styles.orderAmount}>£{item.amount}</Text>
                            <StatusBadge status={item.status} />
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Order Detail Modal */}
            <Modal visible={showOrderModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Order Details</Text>
                            <TouchableOpacity onPress={() => setShowOrderModal(false)}>
                                <X size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                        {selectedOrder && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>Order ID</Text>
                                    <Text style={styles.modalValue}>{selectedOrder.id}</Text>
                                </View>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>Customer</Text>
                                    <Text style={styles.modalValue}>{selectedOrder.customer}</Text>
                                </View>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>Address</Text>
                                    <Text style={styles.modalValue}>{selectedOrder.address}</Text>
                                </View>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>Amount</Text>
                                    <Text style={[styles.modalValue, { color: COLORS.primary, fontSize: 20 }]}>£{selectedOrder.amount}</Text>
                                </View>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>Payment</Text>
                                    <StatusBadge status={selectedOrder.payment} />
                                </View>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalLabel}>Status</Text>
                                    <StatusBadge status={selectedOrder.status} />
                                </View>
                                <Text style={styles.modalSectionTitle}>Update Status</Text>
                                <View style={styles.statusButtons}>
                                    {['processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                        <TouchableOpacity
                                            key={status}
                                            style={[styles.statusButton, selectedOrder.status === status && styles.statusButtonActive]}
                                            onPress={() => updateOrderStatus(status)}
                                        >
                                            <Text style={[styles.statusButtonText, selectedOrder.status === status && styles.statusButtonTextActive]}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// =====================================================
// PRODUCTS LIST (Full Management)
// =====================================================
const ProductsList = ({ navigation }: any) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showProductModal, setShowProductModal] = useState(false);

    const filteredProducts = PRODUCTS
        .filter(p => search ? p.name.toLowerCase().includes(search.toLowerCase()) : true)
        .filter(p => category === 'All' ? true : p.category === category);

    const handleProductPress = (product: any) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    const handleEditProduct = () => {
        setShowProductModal(false);
        navigation.navigate('VendorAddProduct', { productId: selectedProduct.id });
    };

    const handleDeleteProduct = () => {
        Alert.alert('Delete Product', `Are you sure you want to delete "${selectedProduct.name}"?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => setShowProductModal(false) }
        ]);
    };

    const handleToggleStatus = () => {
        Alert.alert(
            'Update Status',
            `Change status to ${selectedProduct.status === 'active' ? 'draft' : 'active'}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Update', onPress: () => setShowProductModal(false) }
            ]
        );
    };

    return (
        <View style={styles.listContainer}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={18} color={COLORS.gray} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        placeholderTextColor={COLORS.gray}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(!showFilters)}>
                    <Filter size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* Category Filters */}
            {showFilters && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabs}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.filterTab, category === cat && styles.filterTabActive]}
                            onPress={() => setCategory(cat)}
                        >
                            <Text style={[styles.filterText, category === cat && styles.filterTextActive]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Inventory Stats */}
            <View style={styles.inventoryStats}>
                <View style={styles.inventoryStat}>
                    <Text style={styles.inventoryValue}>{PRODUCTS.length}</Text>
                    <Text style={styles.inventoryLabel}>Total</Text>
                </View>
                <View style={styles.inventoryStat}>
                    <Text style={[styles.inventoryValue, { color: COLORS.success }]}>{PRODUCTS.filter(p => p.status === 'active').length}</Text>
                    <Text style={styles.inventoryLabel}>Active</Text>
                </View>
                <View style={styles.inventoryStat}>
                    <Text style={[styles.inventoryValue, { color: COLORS.error }]}>{PRODUCTS.filter(p => p.stock === 0).length}</Text>
                    <Text style={styles.inventoryLabel}>Out of Stock</Text>
                </View>
                <View style={styles.inventoryStat}>
                    <Text style={[styles.inventoryValue, { color: COLORS.warning }]}>{PRODUCTS.filter(p => p.stock < 10 && p.stock > 0).length}</Text>
                    <Text style={styles.inventoryLabel}>Low Stock</Text>
                </View>
            </View>

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <TouchableOpacity
                        style={styles.addProductBtn}
                        onPress={() => navigation.navigate('VendorAddProduct')}
                    >
                        <Plus size={20} color={COLORS.white} />
                        <Text style={styles.addProductText}>Add New Product</Text>
                    </TouchableOpacity>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
                        <Image source={{ uri: item.image }} style={styles.productThumb} />
                        <View style={styles.productDetails}>
                            <View style={styles.productHeader}>
                                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                                <StatusBadge status={item.status} />
                            </View>
                            <Text style={styles.productSku}>SKU: {item.sku}</Text>
                            <View style={styles.productMeta}>
                                <Text style={styles.productPrice}>£{item.price}</Text>
                                {item.oldPrice && <Text style={styles.productOldPrice}>£{item.oldPrice}</Text>}
                            </View>
                            <View style={styles.productFooter}>
                                <View style={styles.stockInfo}>
                                    <Box size={14} color={item.stock === 0 ? COLORS.error : COLORS.gray} />
                                    <Text style={[styles.stockText, { color: item.stock === 0 ? COLORS.error : COLORS.gray }]}>
                                        {item.stock === 0 ? 'Out of stock' : `${item.stock} in stock`}
                                    </Text>
                                </View>
                                <View style={styles.soldInfo}>
                                    <Tag size={14} color={COLORS.gray} />
                                    <Text style={styles.soldText}>{item.sold} sold</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.moreButton}>
                            <MoreVertical size={20} color={COLORS.gray} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />

            {/* Product Actions Modal */}
            <Modal visible={showProductModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Product Actions</Text>
                            <TouchableOpacity onPress={() => setShowProductModal(false)}>
                                <X size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                        {selectedProduct && (
                            <View>
                                <View style={styles.modalProductInfo}>
                                    <Image source={{ uri: selectedProduct.image }} style={styles.modalProductImage} />
                                    <View style={styles.modalProductDetails}>
                                        <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                                        <Text style={styles.modalProductPrice}>£{selectedProduct.price}</Text>
                                    </View>
                                </View>
                                <View style={styles.productActions}>
                                    <ActionButton icon={Edit3} label="Edit Product" color={COLORS.blue} onPress={handleEditProduct} />
                                    <ActionButton icon={Eye} label={selectedProduct.status === 'active' ? 'Set as Draft' : 'Set as Active'} color={COLORS.warning} onPress={handleToggleStatus} />
                                    <ActionButton icon={Copy} label="Duplicate" color={COLORS.purple} onPress={() => Alert.alert('Duplicate', 'Product duplicated!')} />
                                    <ActionButton icon={Share2} label="Share" color={COLORS.teal} onPress={() => Alert.alert('Share', 'Share link copied!')} />
                                    <ActionButton icon={Archive} label="Archive" color={COLORS.gray} onPress={() => Alert.alert('Archive', 'Product archived!')} />
                                    <ActionButton icon={Trash2} label="Delete" color={COLORS.error} onPress={handleDeleteProduct} />
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// =====================================================
// MESSAGES LIST
// =====================================================
const MessagesList = ({ navigation }: any) => {
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const handleMessagePress = (message: any) => {
        setSelectedMessage(message);
        setShowMessageModal(true);
    };

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={MESSAGES}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <MessageSquare size={48} color={COLORS.gray} />
                        <Text style={styles.emptyText}>No messages</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.messageRow, item.unread && styles.messageRowUnread]} onPress={() => handleMessagePress(item)}>
                        <View style={styles.messageAvatar}>
                            <Text style={styles.messageAvatarText}>{item.customer.charAt(0)}</Text>
                        </View>
                        <View style={styles.messageContent}>
                            <View style={styles.messageHeader}>
                                <Text style={[styles.messageSender, item.unread && styles.messageSenderUnread]}>{item.customer}</Text>
                                <Text style={styles.messageTime}>{item.time}</Text>
                            </View>
                            <Text style={styles.messageText} numberOfLines={1}>{item.message}</Text>
                            {item.orderId && <Text style={styles.messageOrder}>Order: {item.orderId}</Text>}
                        </View>
                        {item.unread && <View style={styles.unreadDot} />}
                    </TouchableOpacity>
                )}
            />

            <Modal visible={showMessageModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Message</Text>
                            <TouchableOpacity onPress={() => setShowMessageModal(false)}>
                                <X size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                        {selectedMessage && (
                            <View>
                                <View style={styles.messageDetailHeader}>
                                    <View style={styles.messageAvatarLarge}>
                                        <Text style={styles.messageAvatarTextLarge}>{selectedMessage.customer.charAt(0)}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.messageDetailName}>{selectedMessage.customer}</Text>
                                        <Text style={styles.messageDetailTime}>{selectedMessage.time}</Text>
                                    </View>
                                </View>
                                <View style={styles.messageBubble}>
                                    <Text style={styles.messageBubbleText}>{selectedMessage.message}</Text>
                                </View>
                                <View style={styles.replyContainer}>
                                    <TextInput
                                        style={styles.replyInput}
                                        placeholder="Type a reply..."
                                        placeholderTextColor={COLORS.gray}
                                    />
                                    <TouchableOpacity style={styles.sendButton}>
                                        <Send size={20} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// =====================================================
// VENDOR LOGIN
// =====================================================
export const VendorLoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }
        navigation.replace('VendorDashboard');
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
                        <View style={styles.logoBox}>
                            <Store size={40} color={COLORS.primary} />
                        </View>
                        <Text style={styles.authTitle}>VENDOR</Text>
                        <Text style={styles.authSubtitle}>Manage your stores</Text>
                    </View>

                    <View style={styles.authForm}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Mail size={18} color={COLORS.gray} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="vendor@email.com"
                                    placeholderTextColor={COLORS.gray}
                                    value={email}
                                    onChangeText={setEmail}
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
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} color={COLORS.gray} /> : <Eye size={20} color={COLORS.gray} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
                            <Text style={styles.authButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.registerBtn}
                        onPress={() => navigation.navigate('VendorRegister')}
                    >
                        <Text style={styles.registerText}>New vendor? Apply now</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// VENDOR REGISTRATION
// =====================================================
export const VendorRegisterScreen = ({ navigation }: any) => {
    const [storeName, setStoreName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [category, setCategory] = useState('');

    const handleRegister = () => {
        if (!storeName || !email || !phone) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        Alert.alert('Success', 'Application submitted!', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
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
                        <View style={styles.logoBox}>
                            <Store size={40} color={COLORS.primary} />
                        </View>
                        <Text style={styles.authTitle}>BECOME A VENDOR</Text>
                        <Text style={styles.authSubtitle}>Start selling on YAP</Text>
                    </View>

                    <View style={styles.authForm}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Store Name</Text>
                            <View style={styles.inputContainer}>
                                <Store size={18} color={COLORS.gray} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Your store name"
                                    placeholderTextColor={COLORS.gray}
                                    value={storeName}
                                    onChangeText={setStoreName}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Mail size={18} color={COLORS.gray} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="vendor@email.com"
                                    placeholderTextColor={COLORS.gray}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Phone</Text>
                            <View style={styles.inputContainer}>
                                <Phone size={18} color={COLORS.gray} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="+44 7890 123456"
                                    placeholderTextColor={COLORS.gray}
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Store Category</Text>
                            <View style={styles.inputContainer}>
                                <Layers size={18} color={COLORS.gray} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g., Fashion, Electronics"
                                    placeholderTextColor={COLORS.gray}
                                    value={category}
                                    onChangeText={setCategory}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.authButton} onPress={handleRegister}>
                            <Text style={styles.authButtonText}>Apply Now</Text>
                        </TouchableOpacity>

                        <Text style={styles.termsText}>By applying, you agree to our Terms of Service and Vendor Guidelines</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// ADD/EDIT PRODUCT
// =====================================================
export const VendorAddProductScreen = ({ navigation, route }: any) => {
    const isEditing = !!route.params?.productId;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState('');
    const [status, setStatus] = useState('active');

    const handleSave = () => {
        if (!name || !price || !stock) {
            Alert.alert('Error', 'Please fill required fields');
            return;
        }
        Alert.alert('Success', isEditing ? 'Product updated!' : 'Product added!', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>{isEditing ? 'Edit Product' : 'Add Product'}</Text>
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Image Section */}
                    <View style={styles.imageSection}>
                        <TouchableOpacity style={styles.imagePlaceholder}>
                            <Plus size={32} color={COLORS.gray} />
                            <Text style={styles.imagePlaceholderText}>Add Photos</Text>
                        </TouchableOpacity>
                        <Text style={styles.imageHint}>Upload up to 5 images</Text>
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.formSectionTitle}>Basic Information</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Product Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter product name"
                                placeholderTextColor={COLORS.gray}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Price *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="0.00"
                                    placeholderTextColor={COLORS.gray}
                                    value={price}
                                    onChangeText={setPrice}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ width: 16 }} />
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Stock *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="0"
                                    placeholderTextColor={COLORS.gray}
                                    value={stock}
                                    onChangeText={setStock}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>SKU</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="SKU-001"
                                    placeholderTextColor={COLORS.gray}
                                    value={sku}
                                    onChangeText={setSku}
                                />
                            </View>
                            <View style={{ width: 16 }} />
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Weight</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="0.5kg"
                                    placeholderTextColor={COLORS.gray}
                                    value={weight}
                                    onChangeText={setWeight}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Category</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Select category"
                                placeholderTextColor={COLORS.gray}
                                value={category}
                                onChangeText={setCategory}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Product description..."
                                placeholderTextColor={COLORS.gray}
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                            />
                        </View>

                        <Text style={styles.formSectionTitle}>Status</Text>

                        <View style={styles.statusToggle}>
                            <TouchableOpacity
                                style={[styles.statusToggleBtn, status === 'active' && styles.statusToggleBtnActive]}
                                onPress={() => setStatus('active')}
                            >
                                <Eye size={18} color={status === 'active' ? COLORS.white : COLORS.gray} />
                                <Text style={[styles.statusToggleText, status === 'active' && styles.statusToggleTextActive]}>Active</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.statusToggleBtn, status === 'draft' && styles.statusToggleBtnActive]}
                                onPress={() => setStatus('draft')}
                            >
                                <EyeOff size={18} color={status === 'draft' ? COLORS.white : COLORS.gray} />
                                <Text style={[styles.statusToggleText, status === 'draft' && styles.statusToggleTextActive]}>Draft</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// ANALYTICS / SALES REPORTS
// =====================================================
export const VendorAnalyticsScreen = ({ navigation }: any) => {
    const totalRevenue = SALES_DATA.reduce((sum, d) => sum + d.revenue, 0);
    const totalSales = SALES_DATA.reduce((sum, d) => sum + d.sales, 0);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>Analytics</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Revenue Card */}
                    <View style={styles.analyticsCard}>
                        <View style={styles.analyticsHeader}>
                            <Text style={styles.analyticsLabel}>TOTAL REVENUE</Text>
                            <View style={styles.analyticsTrend}>
                                <TrendingUp size={16} color={COLORS.success} />
                                <Text style={styles.analyticsTrendText}>+15.2%</Text>
                            </View>
                        </View>
                        <Text style={styles.analyticsValue}>£{totalRevenue.toLocaleString()}</Text>
                    </View>

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <Text style={styles.statBoxValue}>{totalSales}</Text>
                            <Text style={styles.statBoxLabel}>Total Sales</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statBoxValue}>£{Math.round(totalRevenue / totalSales)}</Text>
                            <Text style={styles.statBoxLabel}>Avg Order</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statBoxValue}>{PRODUCTS.length}</Text>
                            <Text style={styles.statBoxLabel}>Products</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statBoxValue}>4.9★</Text>
                            <Text style={styles.statBoxLabel}>Rating</Text>
                        </View>
                    </View>

                    {/* Monthly Sales */}
                    <Text style={styles.sectionTitle}>MONTHLY PERFORMANCE</Text>
                    <View style={styles.performanceCard}>
                        {SALES_DATA.map((data, index) => (
                            <View key={index} style={styles.performanceRow}>
                                <Text style={styles.performanceMonth}>{data.month}</Text>
                                <View style={styles.performanceBar}>
                                    <View style={[styles.performanceBarFill, { width: `${(data.revenue / 25000) * 100}%` }]} />
                                </View>
                                <Text style={styles.performanceValue}>£{data.revenue.toLocaleString()}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Top Products */}
                    <Text style={styles.sectionTitle}>TOP PRODUCTS</Text>
                    {PRODUCTS.sort((a, b) => b.sold - a.sold).slice(0, 5).map((product, index) => (
                        <View key={product.id} style={styles.topProductRow}>
                            <Text style={styles.topRank}>#{index + 1}</Text>
                            <Image source={{ uri: product.image }} style={styles.topImage} />
                            <View style={styles.topInfo}>
                                <Text style={styles.topName}>{product.name}</Text>
                                <Text style={styles.topMeta}>{product.sold} sold</Text>
                            </View>
                            <Text style={styles.topRevenue}>£{(product.price * product.sold).toLocaleString()}</Text>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// PAYOUTS
// =====================================================
export const VendorPayoutScreen = ({ navigation }: any) => {
    const [balance, setBalance] = useState(4250);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleWithdraw = () => {
        if (!withdrawAmount || parseFloat(withdrawAmount) > balance) {
            Alert.alert('Error', 'Invalid amount');
            return;
        }
        Alert.alert('Success', `Withdrawal request of £${withdrawAmount} submitted!`, [
            { text: 'OK', onPress: () => setShowWithdrawModal(false) }
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleText}>Payouts</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceRow}>
                        <View>
                            <Text style={styles.balanceLabel}>Available Balance</Text>
                            <Text style={styles.balanceValue}>£{balance.toLocaleString()}</Text>
                        </View>
                        <View style={styles.balanceIcon}>
                            <Wallet size={32} color={COLORS.white} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.withdrawBtn} onPress={() => setShowWithdrawModal(true)}>
                        <Text style={styles.withdrawBtnText}>Request Withdrawal</Text>
                    </TouchableOpacity>
                </View>

                {/* Pending Payout */}
                <View style={styles.pendingPayout}>
                    <AlertTriangle size={20} color={COLORS.warning} />
                    <View style={styles.pendingInfo}>
                        <Text style={styles.pendingLabel}>Pending Payout</Text>
                        <Text style={styles.pendingAmount}>£2,000</Text>
                    </View>
                    <Text style={styles.pendingDate}>Feb 15, 2026</Text>
                </View>

                {/* Transactions */}
                <FlatList
                    data={TRANSACTIONS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={<Text style={styles.sectionTitle}>TRANSACTIONS</Text>}
                    renderItem={({ item }) => (
                        <View style={styles.transactionRow}>
                            <View style={[styles.txIcon, { backgroundColor: item.type === 'payout' ? COLORS.success + '20' : COLORS.primary + '20' }]}>
                                {item.type === 'payout' ?
                                    <ArrowUpRight size={20} color={COLORS.success} /> :
                                    <ArrowDownRight size={20} color={COLORS.primary} />
                                }
                            </View>
                            <View style={styles.txInfo}>
                                <Text style={styles.txType}>{item.type === 'payout' ? 'Withdrawal' : 'Sale'}</Text>
                                <Text style={styles.txDate}>{item.date} {item.orderId && `• ${item.orderId}`}</Text>
                            </View>
                            <Text style={[styles.txAmount, { color: item.type === 'payout' ? COLORS.success : COLORS.white }]}>
                                {item.type === 'payout' ? '-' : '+'}£{item.amount}
                            </Text>
                        </View>
                    )}
                />

                <Modal visible={showWithdrawModal} animationType="slide" transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Request Withdrawal</Text>
                                <TouchableOpacity onPress={() => setShowWithdrawModal(false)}>
                                    <X size={24} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.withdrawForm}>
                                <Text style={styles.withdrawLabel}>Available: £{balance}</Text>
                                <TextInput
                                    style={styles.withdrawInput}
                                    placeholder="Enter amount"
                                    placeholderTextColor={COLORS.gray}
                                    value={withdrawAmount}
                                    onChangeText={setWithdrawAmount}
                                    keyboardType="numeric"
                                />
                                <View style={styles.withdrawPresets}>
                                    {[1000, 2000, balance].map((amount) => (
                                        <TouchableOpacity
                                            key={amount}
                                            style={styles.withdrawPreset}
                                            onPress={() => setWithdrawAmount(amount.toString())}
                                        >
                                            <Text style={styles.withdrawPresetText}>£{amount}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.authButton} onPress={handleWithdraw}>
                                    <Text style={styles.authButtonText}>Submit Request</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
};

// =====================================================
// RETURNS
// =====================================================
export const VendorReturnsScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Returns</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={RETURNS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={<Text style={styles.sectionTitle}>RETURN REQUESTS</Text>}
                renderItem={({ item }) => (
                    <View style={styles.returnCard}>
                        <View style={styles.returnHeader}>
                            <View>
                                <Text style={styles.returnId}>{item.id}</Text>
                                <Text style={styles.returnCustomer}>{item.customer}</Text>
                            </View>
                            <StatusBadge status={item.status} />
                        </View>
                        <Text style={styles.returnProduct}>{item.product}</Text>
                        <View style={styles.returnDetails}>
                            <View style={styles.returnDetail}>
                                <Text style={styles.returnDetailLabel}>Reason</Text>
                                <Text style={styles.returnDetailValue}>{item.reason}</Text>
                            </View>
                            <View style={styles.returnDetail}>
                                <Text style={styles.returnDetailLabel}>Amount</Text>
                                <Text style={styles.returnDetailValue}>£{item.amount}</Text>
                            </View>
                            <View style={styles.returnDetail}>
                                <Text style={styles.returnDetailLabel}>Date</Text>
                                <Text style={styles.returnDetailValue}>{item.date}</Text>
                            </View>
                        </View>
                        {item.status === 'pending' && (
                            <View style={styles.returnActions}>
                                <TouchableOpacity style={[styles.returnBtn, { backgroundColor: COLORS.success }]}>
                                    <CheckCircle size={16} color={COLORS.white} />
                                    <Text style={styles.returnBtnText}>Approve</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.returnBtn, { backgroundColor: COLORS.error }]}>
                                    <XCircle size={16} color={COLORS.white} />
                                    <Text style={styles.returnBtnText}>Decline</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
        </SafeAreaView>
    </View>
);

// =====================================================
// PROFILE
// =====================================================
export const VendorProfileScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitleText}>Profile</Text>
                <TouchableOpacity>
                    <Text style={styles.saveText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.profileAvatar}>
                        <Text style={styles.profileAvatarText}>{VENDOR_INFO.storeName.charAt(0)}</Text>
                    </View>
                    <Text style={styles.profileName}>{VENDOR_INFO.storeName}</Text>
                    <View style={styles.profileStats}>
                        <Star size={14} color={COLORS.gold} fill={COLORS.gold} />
                        <Text style={styles.profileRating}> {VENDOR_INFO.rating} • {VENDOR_INFO.totalSales.toLocaleString()} sales</Text>
                    </View>
                    <TouchableOpacity style={styles.viewStoreBtn} onPress={() => navigation.navigate('VendorStorefront')}>
                        <ExternalLink size={16} color={COLORS.primary} />
                        <Text style={styles.viewStoreText}>View My Store</Text>
                    </TouchableOpacity>
                </View>

                {/* Details */}
                <Text style={styles.sectionTitle}>STORE DETAILS</Text>
                <View style={styles.profileDetails}>
                    <View style={styles.detailRow}>
                        <View style={styles.detailIcon}>
                            <Store size={18} color={COLORS.gray} />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Store Name</Text>
                            <Text style={styles.detailValue}>{VENDOR_INFO.storeName}</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.detailIcon}>
                            <User size={18} color={COLORS.gray} />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Owner</Text>
                            <Text style={styles.detailValue}>{VENDOR_INFO.ownerName}</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.detailIcon}>
                            <Mail size={18} color={COLORS.gray} />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Email</Text>
                            <Text style={styles.detailValue}>{VENDOR_INFO.email}</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.detailIcon}>
                            <Phone size={18} color={COLORS.gray} />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Phone</Text>
                            <Text style={styles.detailValue}>{VENDOR_INFO.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.detailIcon}>
                            <MapPin size={18} color={COLORS.gray} />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Location</Text>
                            <Text style={styles.detailValue}>{VENDOR_INFO.address}</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Items */}
                <Text style={styles.sectionTitle}>SETTINGS</Text>
                <View style={styles.menuSection}>
                    <TouchableOpacity style={styles.menuRow}>
                        <Settings size={20} color={COLORS.white} />
                        <Text style={styles.menuRowText}>Store Settings</Text>
                        <ChevronLeft size={20} color={COLORS.gray} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuRow}>
                        <Bell size={20} color={COLORS.white} />
                        <Text style={styles.menuRowText}>Notifications</Text>
                        <ChevronLeft size={20} color={COLORS.gray} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuRow}>
                        <Truck size={20} color={COLORS.white} />
                        <Text style={styles.menuRowText}>Shipping Settings</Text>
                        <ChevronLeft size={20} color={COLORS.gray} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuRow}>
                        <CreditCard size={20} color={COLORS.white} />
                        <Text style={styles.menuRowText}>Payment Methods</Text>
                        <ChevronLeft size={20} color={COLORS.gray} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuRow}>
                        <FileText size={20} color={COLORS.white} />
                        <Text style={styles.menuRowText}>Terms & Policies</Text>
                        <ChevronLeft size={20} color={COLORS.gray} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={() => {
                        Alert.alert('Logout', 'Are you sure?', [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('SignIn') }
                        ]);
                    }}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    </View>
);

// =====================================================
// STOREFRONT (Public Vendor Page)
// =====================================================
export const VendorStorefrontScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Cover */}
                <View style={styles.storefrontCover}>
                    <TouchableOpacity style={styles.storefrontBack} onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                        <Share2 size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Store Info */}
                <View style={styles.storefrontInfo}>
                    <View style={styles.storefrontAvatar}>
                        <Text style={styles.storefrontAvatarText}>{VENDOR_INFO.storeName.charAt(0)}</Text>
                    </View>
                    <Text style={styles.storefrontName}>{VENDOR_INFO.storeName}</Text>
                    <View style={styles.storefrontStats}>
                        <Star size={14} color={COLORS.gold} fill={COLORS.gold} />
                        <Text style={styles.storefrontRating}> {VENDOR_INFO.rating}</Text>
                        <Text style={styles.storefrontSales}> • {VENDOR_INFO.totalSales.toLocaleString()} sales</Text>
                    </View>
                    <Text style={styles.storefrontAddress}>{VENDOR_INFO.address}</Text>

                    <View style={styles.storefrontActions}>
                        <TouchableOpacity style={styles.followBtn}>
                            <Text style={styles.followBtnText}>Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.messageBtn}>
                            <MessageSquare size={18} color={COLORS.primary} />
                            <Text style={styles.messageBtnText}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storefrontCategories}>
                    {CATEGORIES.slice(1).map((cat, index) => (
                        <TouchableOpacity key={index} style={styles.categoryChip}>
                            <Text style={styles.categoryChipText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Products */}
                <Text style={styles.sectionTitle}>ALL PRODUCTS ({PRODUCTS.filter(p => p.status === 'active').length})</Text>
                <View style={styles.productsGrid}>
                    {PRODUCTS.filter(p => p.status === 'active').map((product) => (
                        <TouchableOpacity key={product.id} style={styles.gridProduct}>
                            <Image source={{ uri: product.image }} style={styles.gridProductImage} />
                            <View style={styles.gridProductInfo}>
                                <Text style={styles.gridProductName} numberOfLines={1}>{product.name}</Text>
                                <View style={styles.gridProductPriceRow}>
                                    <Text style={styles.gridProductPrice}>£{product.price}</Text>
                                    {product.oldPrice && <Text style={styles.gridProductOldPrice}>£{product.oldPrice}</Text>}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
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
    headerTitle: { fontSize: 20, fontWeight: '700', color: COLORS.white },
    headerTitleText: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    headerGreeting: { fontSize: 12, color: COLORS.gray },
    headerRight: { flexDirection: 'row', gap: 12 },
    headerIcon: { padding: 4 },
    avatarSmall: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
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

    // Quick Stats
    quickStats: { flexDirection: 'row', marginHorizontal: 20, marginTop: 8, gap: 8 },
    quickStat: { flex: 1, backgroundColor: COLORS.dark2, padding: 12, borderRadius: 12, alignItems: 'center' },
    quickIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    quickStatValue: { fontSize: 18, fontWeight: '700', color: COLORS.white },
    quickStatLabel: { fontSize: 10, color: COLORS.gray, marginTop: 4 },

    // Quick Actions
    quickActions: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 20, gap: 12 },
    quickAction: { width: '47%', backgroundColor: COLORS.dark2, padding: 16, borderRadius: 12, alignItems: 'center' },
    quickActionIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    quickActionLabel: { fontSize: 12, fontWeight: '600', color: COLORS.white },

    // Sections
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 24, marginBottom: 12 },
    sectionTitle: { fontSize: 13, fontWeight: '600', color: COLORS.gray, letterSpacing: 1, marginHorizontal: 20, marginTop: 24, marginBottom: 12 },
    seeAll: { fontSize: 12, fontWeight: '600', color: COLORS.primary },

    // Order Card
    orderCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 16, padding: 16 },
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
    searchContainer: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 16, gap: 12 },
    searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, gap: 12 },
    searchInput: { flex: 1, fontSize: 14, color: COLORS.white },
    filterButton: { width: 46, height: 46, backgroundColor: COLORS.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

    // Inventory Stats
    inventoryStats: { flexDirection: 'row', marginHorizontal: 20, marginVertical: 16, gap: 8 },
    inventoryStat: { flex: 1, backgroundColor: COLORS.dark2, padding: 12, borderRadius: 12, alignItems: 'center' },
    inventoryValue: { fontSize: 20, fontWeight: '700', color: COLORS.white },
    inventoryLabel: { fontSize: 10, color: COLORS.gray, marginTop: 4 },

    // Add Product Button
    addProductBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, marginBottom: 16, padding: 14, borderRadius: 12, gap: 8 },
    addProductText: { fontSize: 14, fontWeight: '700', color: COLORS.white },

    // Product Card
    productCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 12 },
    productThumb: { width: 70, height: 70, borderRadius: 10 },
    productDetails: { flex: 1, marginLeft: 12 },
    productHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    productName: { fontSize: 14, fontWeight: '600', color: COLORS.white, flex: 1, marginRight: 8 },
    productSku: { fontSize: 11, color: COLORS.gray3, marginTop: 2 },
    productMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    productPrice: { fontSize: 15, fontWeight: '700', color: COLORS.primary },
    productOldPrice: { fontSize: 12, color: COLORS.gray, textDecorationLine: 'line-through', marginLeft: 8 },
    productFooter: { flexDirection: 'row', marginTop: 6, gap: 12 },
    stockInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    stockText: { fontSize: 11 },
    soldInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    soldText: { fontSize: 11, color: COLORS.gray },
    moreButton: { padding: 8 },

    // Message Row
    messageRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, padding: 14 },
    messageRowUnread: { backgroundColor: COLORS.dark3 },
    messageAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.dark3, justifyContent: 'center', alignItems: 'center' },
    messageAvatarText: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    messageContent: { flex: 1, marginLeft: 12 },
    messageHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    messageSender: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    messageSenderUnread: { fontWeight: '700' },
    messageTime: { fontSize: 11, color: COLORS.gray },
    messageText: { fontSize: 12, color: COLORS.gray },
    messageOrder: { fontSize: 11, color: COLORS.primary, marginTop: 4 },
    unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },

    // Empty State
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
    emptyText: { fontSize: 14, color: COLORS.gray, marginTop: 12 },

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
    forgotPassword: { alignItems: 'flex-end', marginBottom: 16 },
    forgotPasswordText: { fontSize: 13, color: COLORS.primary },
    authButton: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
    authButtonText: { fontSize: 14, fontWeight: '700', color: COLORS.white, letterSpacing: 1 },
    registerBtn: { alignItems: 'center' },
    registerText: { fontSize: 13, color: COLORS.gray },
    termsText: { fontSize: 11, color: COLORS.gray3, textAlign: 'center', marginTop: 16, lineHeight: 16 },

    // Add/Edit Product
    imageSection: { paddingHorizontal: 20, paddingTop: 16 },
    imagePlaceholder: { height: 180, backgroundColor: COLORS.dark2, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderStyle: 'dashed', borderColor: COLORS.dark4 },
    imagePlaceholderText: { fontSize: 14, color: COLORS.gray, marginTop: 8 },
    imageHint: { fontSize: 12, color: COLORS.gray3, textAlign: 'center', marginTop: 8 },
    formSection: { padding: 20 },
    formSectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.white, marginBottom: 16, marginTop: 8 },
    formRow: { flexDirection: 'row' },
    textArea: { height: 100, textAlignVertical: 'top' },
    saveText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
    statusToggle: { flexDirection: 'row', gap: 12 },
    statusToggleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.dark2, padding: 14, borderRadius: 12, gap: 8 },
    statusToggleBtnActive: { backgroundColor: COLORS.primary },
    statusToggleText: { fontSize: 13, fontWeight: '600', color: COLORS.gray },
    statusToggleTextActive: { color: COLORS.white },

    // Analytics
    analyticsCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, marginTop: 16, borderRadius: 16, padding: 20 },
    analyticsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    analyticsLabel: { fontSize: 11, fontWeight: '600', color: COLORS.gray, letterSpacing: 1 },
    analyticsTrend: { flexDirection: 'row', alignItems: 'center' },
    analyticsTrendText: { fontSize: 12, color: COLORS.success, marginLeft: 4 },
    analyticsValue: { fontSize: 36, fontWeight: '700', color: COLORS.white, marginTop: 8 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 20, marginTop: 16, gap: 12 },
    statBox: { width: '47%', backgroundColor: COLORS.dark2, padding: 16, borderRadius: 12, alignItems: 'center' },
    statBoxValue: { fontSize: 22, fontWeight: '700', color: COLORS.white },
    statBoxLabel: { fontSize: 11, color: COLORS.gray, marginTop: 4 },
    performanceCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, borderRadius: 16, padding: 16 },
    performanceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    performanceMonth: { width: 40, fontSize: 12, color: COLORS.gray },
    performanceBar: { flex: 1, height: 8, backgroundColor: COLORS.dark3, borderRadius: 4, marginHorizontal: 8, overflow: 'hidden' },
    performanceBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },
    performanceValue: { width: 70, fontSize: 12, fontWeight: '600', color: COLORS.white, textAlign: 'right' },
    topProductRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 8, padding: 12, borderRadius: 12 },
    topRank: { fontSize: 14, fontWeight: '700', color: COLORS.primary, width: 30 },
    topImage: { width: 40, height: 40, borderRadius: 8, marginRight: 12 },
    topInfo: { flex: 1 },
    topName: { fontSize: 13, fontWeight: '600', color: COLORS.white },
    topMeta: { fontSize: 11, color: COLORS.gray },
    topRevenue: { fontSize: 14, fontWeight: '700', color: COLORS.primary },

    // Payouts
    balanceCard: { backgroundColor: COLORS.primary, marginHorizontal: 20, marginTop: 16, borderRadius: 16, padding: 24 },
    balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    balanceIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
    balanceLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 },
    balanceValue: { fontSize: 38, fontWeight: '700', color: COLORS.white, marginVertical: 8 },
    withdrawBtn: { backgroundColor: COLORS.white, paddingVertical: 14, borderRadius: 24, alignItems: 'center', marginTop: 16 },
    withdrawBtnText: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
    pendingPayout: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.warning + '15', marginHorizontal: 20, marginTop: 16, padding: 16, borderRadius: 12, gap: 12 },
    pendingInfo: { flex: 1 },
    pendingLabel: { fontSize: 12, color: COLORS.gray },
    pendingAmount: { fontSize: 16, fontWeight: '700', color: COLORS.white, marginTop: 2 },
    pendingDate: { fontSize: 11, color: COLORS.gray },
    transactionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.dark2, marginBottom: 8, padding: 14, borderRadius: 12 },
    txIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    txInfo: { flex: 1 },
    txType: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    txDate: { fontSize: 11, color: COLORS.gray, marginTop: 2 },
    txAmount: { fontSize: 15, fontWeight: '700' },

    // Withdraw Modal
    withdrawForm: { padding: 20 },
    withdrawLabel: { fontSize: 14, color: COLORS.gray, marginBottom: 16 },
    withdrawInput: { backgroundColor: COLORS.dark2, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 16, fontSize: 18, color: COLORS.white, textAlign: 'center', marginBottom: 16 },
    withdrawPresets: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    withdrawPreset: { flex: 1, backgroundColor: COLORS.dark2, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
    withdrawPresetText: { fontSize: 14, fontWeight: '600', color: COLORS.white },

    // Returns
    returnCard: { backgroundColor: COLORS.dark2, marginHorizontal: 20, marginBottom: 12, padding: 16, borderRadius: 12 },
    returnHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    returnId: { fontSize: 14, fontWeight: '700', color: COLORS.white },
    returnCustomer: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
    returnProduct: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginBottom: 12 },
    returnDetails: { flexDirection: 'row', gap: 16 },
    returnDetail: { flex: 1 },
    returnDetailLabel: { fontSize: 10, color: COLORS.gray },
    returnDetailValue: { fontSize: 13, fontWeight: '600', color: COLORS.white, marginTop: 2 },
    returnActions: { flexDirection: 'row', marginTop: 16, gap: 12 },
    returnBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 10, gap: 6 },
    returnBtnText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },

    // Profile
    profileHeader: { alignItems: 'center', paddingVertical: 24 },
    profileAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.dark2, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    profileAvatarText: { fontSize: 32, fontWeight: '700', color: COLORS.primary },
    profileName: { fontSize: 22, fontWeight: '700', color: COLORS.white },
    profileStats: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    profileRating: { fontSize: 13, color: COLORS.white, fontWeight: '600' },
    profileSales: { fontSize: 13, color: COLORS.gray },
    viewStoreBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary + '20', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginTop: 16, gap: 6 },
    viewStoreText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
    profileDetails: { backgroundColor: COLORS.dark2, marginHorizontal: 20, borderRadius: 16, padding: 4 },
    detailRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
    detailIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.dark3, justifyContent: 'center', alignItems: 'center' },
    detailContent: { flex: 1, marginLeft: 12 },
    detailLabel: { fontSize: 11, color: COLORS.gray },
    detailValue: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginTop: 2 },
    menuSection: { backgroundColor: COLORS.dark2, marginHorizontal: 20, borderRadius: 16, overflow: 'hidden' },
    menuRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.dark3 },
    menuRowText: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.white, marginLeft: 12 },
    logoutBtn: { backgroundColor: COLORS.error + '20', marginHorizontal: 20, marginTop: 24, marginBottom: 40, padding: 16, borderRadius: 12, alignItems: 'center' },
    logoutText: { fontSize: 14, fontWeight: '700', color: COLORS.error },

    // Storefront
    storefrontCover: { height: 160, backgroundColor: COLORS.dark2 },
    storefrontBack: { position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    shareButton: { position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    storefrontInfo: { alignItems: 'center', marginTop: -40, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: COLORS.dark2 },
    storefrontAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.dark2, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: COLORS.black },
    storefrontAvatarText: { fontSize: 32, fontWeight: '700', color: COLORS.primary },
    storefrontName: { fontSize: 22, fontWeight: '700', color: COLORS.white, marginTop: 12 },
    storefrontStats: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    storefrontRating: { fontSize: 13, color: COLORS.white, fontWeight: '600' },
    storefrontSales: { fontSize: 13, color: COLORS.gray },
    storefrontAddress: { fontSize: 13, color: COLORS.gray, marginTop: 4 },
    storefrontActions: { flexDirection: 'row', marginTop: 16, gap: 12 },
    followBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 40, paddingVertical: 12, borderRadius: 24 },
    followBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
    messageBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary + '20', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24, gap: 8 },
    messageBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
    storefrontCategories: { paddingHorizontal: 20, paddingVertical: 16, gap: 8 },
    categoryChip: { backgroundColor: COLORS.dark2, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    categoryChipText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
    productsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 },
    gridProduct: { width: '48%', backgroundColor: COLORS.dark2, borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
    gridProductImage: { width: '100%', height: 150 },
    gridProductInfo: { padding: 12 },
    gridProductName: { fontSize: 13, fontWeight: '600', color: COLORS.white },
    gridProductPriceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    gridProductPrice: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
    gridProductOldPrice: { fontSize: 11, color: COLORS.gray, textDecorationLine: 'line-through', marginLeft: 6 },

    // Bottom Tab
    bottomTab: { flexDirection: 'row', backgroundColor: COLORS.dark2, paddingVertical: 8, paddingBottom: 24, borderTopWidth: 1, borderTopColor: COLORS.dark3 },
    tabItem: { flex: 1, alignItems: 'center', position: 'relative' },
    tabIconActive: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary + '20', justifyContent: 'center', alignItems: 'center' },
    tabLabel: { fontSize: 10, fontWeight: '600', marginTop: 4 },
    tabBadge: { position: 'absolute', top: -2, right: '30%', backgroundColor: COLORS.error, width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
    tabBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.white },

    // Modals
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: COLORS.dark2, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.dark3 },
    modalTitle: { fontSize: 18, fontWeight: '700', color: COLORS.white },
    modalSection: { padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.dark3 },
    modalLabel: { fontSize: 12, color: COLORS.gray, marginBottom: 4 },
    modalValue: { fontSize: 15, fontWeight: '600', color: COLORS.white },
    modalSectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.white, padding: 16 },
    statusButtons: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8, paddingBottom: 20 },
    statusButton: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: COLORS.dark3 },
    statusButtonActive: { backgroundColor: COLORS.primary },
    statusButtonText: { fontSize: 12, fontWeight: '600', color: COLORS.gray },
    statusButtonTextActive: { color: COLORS.white },
    modalProductInfo: { flexDirection: 'row', padding: 16, alignItems: 'center' },
    modalProductImage: { width: 60, height: 60, borderRadius: 8 },
    modalProductDetails: { flex: 1, marginLeft: 12 },
    modalProductName: { fontSize: 14, fontWeight: '600', color: COLORS.white },
    modalProductPrice: { fontSize: 16, fontWeight: '700', color: COLORS.primary, marginTop: 4 },
    productActions: { padding: 16, gap: 12 },
    actionButton: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, gap: 12 },
    actionButtonText: { fontSize: 14, fontWeight: '600' },
    messageDetailHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
    messageAvatarLarge: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.dark3, justifyContent: 'center', alignItems: 'center' },
    messageAvatarTextLarge: { fontSize: 20, fontWeight: '600', color: COLORS.white },
    messageDetailName: { fontSize: 16, fontWeight: '600', color: COLORS.white },
    messageDetailTime: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
    messageBubble: { backgroundColor: COLORS.dark3, marginHorizontal: 16, padding: 14, borderRadius: 12 },
    messageBubbleText: { fontSize: 14, color: COLORS.white, lineHeight: 20 },
    replyContainer: { flexDirection: 'row', padding: 16, gap: 12 },
    replyInput: { flex: 1, backgroundColor: COLORS.dark3, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: COLORS.white },
    sendButton: { width: 46, height: 46, borderRadius: 23, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
});
