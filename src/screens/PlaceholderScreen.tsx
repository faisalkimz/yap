import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = {
  title: string;
};

export const PlaceholderScreen: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.title,
    fontWeight: typography.weightBold,
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: typography.subtitle,
    color: colors.muted,
  },
});
