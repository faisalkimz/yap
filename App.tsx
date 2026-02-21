import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FavoritesProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </FavoritesProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});



