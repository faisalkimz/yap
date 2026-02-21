import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { colors } from '../theme/colors';
import { House, ShoppingBag, Heart, User, Package } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type NavItemProps = {
    icon: any;
    routeName: string;
    isActive: boolean;
    onPress: () => void;
};

const NavItem = ({ icon: Icon, isActive, onPress }: NavItemProps) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        if (isActive) {
            Animated.spring(scaleAnim, {
                toValue: 1.1,
                tension: 300,
                friction: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 300,
                friction: 10,
                useNativeDriver: true,
            }).start();
        }
    }, [isActive]);

    return (
        <TouchableOpacity 
            style={styles.navItem} 
            onPress={onPress} 
            activeOpacity={0.7}
        >
            {isActive ? (
                <LinearGradient
                    colors={[colors.primary, '#FF6B4A']}
                    style={styles.activeIconContainer}
                >
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Icon
                            size={22}
                            color={colors.white}
                            strokeWidth={2.5}
                        />
                    </Animated.View>
                </LinearGradient>
            ) : (
                <Icon
                    size={22}
                    color="#9CA3AF"
                    strokeWidth={2}
                />
            )}
            {isActive && (
                <View style={styles.activeIndicator}>
                    <View style={styles.activeNavDot} />
                </View>
            )}
        </TouchableOpacity>
    );
};

export const BottomNav = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const currentRoute = route.name;

    // Check if current route is an order-related screen
    const isOrderScreen = currentRoute === 'OrderTracking' || currentRoute === 'Orders' || currentRoute === 'OrderSuccess';

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <NavItem
                    icon={House}
                    routeName="Home"
                    isActive={currentRoute === 'Home'}
                    onPress={() => navigation.navigate('Home')}
                />
                <NavItem
                    icon={ShoppingBag}
                    routeName="Cart"
                    isActive={currentRoute === 'Cart'}
                    onPress={() => navigation.navigate('Cart')}
                />
                <NavItem
                    icon={Package}
                    routeName="Orders"
                    isActive={isOrderScreen}
                    onPress={() => navigation.navigate('OrderTracking')}
                />
                <NavItem
                    icon={Heart}
                    routeName="Favorites"
                    isActive={currentRoute === 'Favorites'}
                    onPress={() => navigation.navigate('Favorites')}
                />
                <NavItem
                    icon={User}
                    routeName="Profile"
                    isActive={currentRoute === 'Profile'}
                    onPress={() => navigation.navigate('Profile')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 16,
        height: 88,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 4,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        width: 68,
        position: 'relative',
    },
    activeIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    activeIndicator: {
        marginTop: 4,
    },
    activeNavDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary,
    },
});
