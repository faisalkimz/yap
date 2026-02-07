import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = Omit<PressableProps, 'style'> & {
  label: string;
  style?: StyleProp<ViewStyle>;
};

export const PrimaryButton: React.FC<Props> = ({ label, style, ...rest }) => {
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : undefined,
        style,
      ]}

    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.15,
  },
  label: {
    color: colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },


});
