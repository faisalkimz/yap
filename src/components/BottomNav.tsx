import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import House from 'lucide-react-native/dist/esm/icons/house';
import ShoppingBag from 'lucide-react-native/dist/esm/icons/shopping-bag';
import Heart from 'lucide-react-native/dist/esm/icons/heart';
import User from 'lucide-react-native/dist/esm/icons/user';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type NavItemProps = {
    icon: any;
    routeName: string;
    isActive: boolean;
    onPress: () => void;
};

const NavItem = ({ icon: Icon, isActive, onPress }: NavItemProps) => (
    <TouchableOpacity style={styles.navItem} onPress={onPress} activeOpacity={0.7}>
        <Icon
            size={24}
            color={isActive ? colors.primary : '#C0C0C0'}
            strokeWidth={isActive ? 2.5 : 2}
        />
        {isActive && <View style={styles.activeNavDot} />}
    </TouchableOpacity>
);

export const BottomNav = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const currentRoute = route.name;

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
        borderTopColor: '#F5F5F5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
        height: 90,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 10,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        width: 60,
    },
    activeNavDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: colors.primary,
        marginTop: 6,
    },
});
