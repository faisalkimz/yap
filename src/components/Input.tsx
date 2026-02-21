import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TextInputProps,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Eye, EyeOff } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';


type Props = TextInputProps & {
    label?: string;
    error?: string;
    icon?: LucideIcon;
};

export const Input: React.FC<Props> = ({
    label,
    error,
    style,
    icon: Icon,
    secureTextEntry,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const borderOpacity = React.useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(borderOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(borderOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const shouldHidePassword = secureTextEntry && !isPasswordVisible;

    return (
        <View style={styles.container}>
            {label && (
                <Text style={[
                    styles.label,
                    isFocused && { color: colors.primary }
                ]}>
                    {label}
                </Text>
            )}

            <View style={[
                styles.inputContainer,
                error ? styles.inputError : null,
                isFocused && styles.inputFocused
            ]}>
                {Icon && (
                    <Icon
                        size={20}
                        color={isFocused ? colors.primary : '#A0A0A0'}
                        style={styles.prefixIcon}
                    />
                )}

                <TextInput
                    placeholderTextColor="#B0B0B0"
                    style={[styles.input, style]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={shouldHidePassword}
                    {...rest}
                />

                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.eyeIcon}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        {isPasswordVisible ? (
                            <EyeOff size={20} color={isFocused ? colors.primary : '#A0A0A0'} />
                        ) : (
                            <Eye size={20} color={isFocused ? colors.primary : '#A0A0A0'} />
                        )}
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: spacing.lg,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#666',
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    inputContainer: {
        width: '100%',
        height: 64,
        backgroundColor: '#F7F8FA',
        borderRadius: 22,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    inputFocused: {
        borderColor: colors.primary + '30', // Very light orange border
        backgroundColor: '#FFF',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    prefixIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
        fontWeight: '500',
        height: '100%',
    },
    eyeIcon: {
        padding: 4,
    },
    inputError: {
        borderColor: '#FF4D4D',
        backgroundColor: '#FFF5F5',
    },
    errorText: {
        fontSize: 12,
        color: '#FF4D4D',
        marginTop: 6,
        marginLeft: 6,
        fontWeight: '600',
    },
});
