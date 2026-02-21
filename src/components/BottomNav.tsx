import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { House, ShoppingBag, Heart, User, Store } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type NavItemProps = {
    icon: any;
    routeName: string;
    label: string;
    isActive: boolean;
    onPress: () => void;
};

const NavItem = ({ icon: Icon, label, isActive, onPress }: NavItemProps) => {
    const animation = useRef(new Animated.Value(isActive ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(animation, {
            toValue: isActive ? 1 : 0,
            friction: 8,
            tension: 50,
            useNativeDriver: false,
        }).start();
    }, [isActive]);

    const backgroundColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', colors.primary]
    });

    const itemWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 110]
    });

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Animated.View style={[styles.navItem, { backgroundColor, width: itemWidth }]}>
                <Icon
                    size={22}
                    color={isActive ? colors.white : '#9CA3AF'}
                    strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                    <Animated.View style={{ marginLeft: 8, opacity: animation }}>
                        <Text style={styles.navLabel} numberOfLines={1}>{label}</Text>
                    </Animated.View>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

export const BottomNav = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const currentRoute = route.name;

    const isOrderScreen = currentRoute === 'OrderTracking' || currentRoute === 'Orders' || currentRoute === 'OrderSuccess';

    return (
        <View style={styles.floatingContainer}>
            <View style={styles.content}>
                <NavItem
                    icon={Store}
                    routeName="Home"
                    label="Shop"
                    isActive={currentRoute === 'Home' || currentRoute === 'Shop' || currentRoute === 'CategoryListing'}
                    onPress={() => navigation.navigate('Home')}
                />
                <NavItem
                    icon={ShoppingBag}
                    routeName="Cart"
                    label="Bag"
                    isActive={currentRoute === 'Cart'}
                    onPress={() => navigation.navigate('Cart')}
                />
                <NavItem
                    icon={Heart}
                    routeName="Favorites"
                    label="Favs"
                    isActive={currentRoute === 'Favorites'}
                    onPress={() => navigation.navigate('Favorites')}
                />
                <NavItem
                    icon={User}
                    routeName="Profile"
                    label="Profile"
                    isActive={currentRoute === 'Profile'}
                    onPress={() => navigation.navigate('Profile')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    floatingContainer: {
        position: 'absolute',
        bottom: 24,
        alignSelf: 'center',
        backgroundColor: '#1C1C1E',
        borderRadius: 40,
        paddingHorizontal: 12,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 24,
        width: width * 0.92,
        zIndex: 1000,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 30,
    },
    navLabel: {
        color: colors.white,
        fontWeight: typography.weightBold,
        fontSize: 13,
    },
});
