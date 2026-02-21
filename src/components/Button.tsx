import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    View
} from 'react-native';
import { colors } from '../theme/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primary;
            case 'secondary':
                return styles.secondary;
            case 'outline':
                return styles.outline;
            case 'ghost':
                return styles.ghost;
            case 'accent':
                return styles.accent;
            default:
                return styles.primary;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'outline':
            case 'ghost':
                return styles.textDark;
            case 'primary':
            case 'secondary':
            case 'accent':
                return styles.textLight;
            default:
                return styles.textLight;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[
                styles.base,
                getVariantStyle(),
                disabled && styles.disabled,
                style
            ]}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.secondary : colors.white} />
            ) : (
                <View style={styles.content}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[styles.textBase, getTextStyle(), textStyle]}>
                        {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        height: 60,
        borderRadius: 2, // Modern sharp edges or slight rounding
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32, // Professional horizontal padding
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: 10,
    },
    textBase: {
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    primary: {
        backgroundColor: colors.secondary,
    },
    secondary: {
        backgroundColor: colors.primary,
    },
    accent: {
        backgroundColor: colors.accent,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.secondary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    textLight: {
        color: colors.white,
    },
    textDark: {
        color: colors.secondary,
    },
    disabled: {
        opacity: 0.5,
    }
});
