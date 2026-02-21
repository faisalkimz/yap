import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { CartScreen } from '../screens/CartScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderSuccessScreen } from '../screens/OrderSuccessScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { OrderTrackingScreen } from '../screens/OrderTrackingScreen';
import {
  EditProfileScreen,
  PaymentMethodsScreen,
  AddressScreen,
  SettingsScreen,
  SupportScreen,
  ChangePasswordScreen
} from '../screens/ProfileSections';
import { ShopScreen } from '../screens/ShopScreen';
import { CategoryListingScreen } from '../screens/CategoryListingScreen';
import { SubCategoryScreen } from '../screens/SubCategoryScreen';
import { BrandScreen } from '../screens/BrandScreen';
import { SearchResultsScreen } from '../screens/SearchResultsScreen';
import { FiltersScreen } from '../screens/FiltersScreen';
import { OrderDetailScreen } from '../screens/OrderDetailScreen';
import { AddEditAddressScreen } from '../screens/AddEditAddressScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { WalletScreen } from '../screens/WalletScreen';
import { ShoppingExtrasScreen } from '../screens/ShoppingExtrasScreen';
import { PaymentFailedScreen } from '../screens/PaymentFailedScreen';
import { PaymentGatewayScreen } from '../screens/PaymentGatewayScreen';
import { ProductReviewsScreen } from '../screens/ProductReviewsScreen';
import { WriteReviewScreen } from '../screens/WriteReviewScreen';
import { CompareProductsScreen } from '../screens/CompareProductsScreen';
import { PromotionalListingScreen } from '../screens/PromotionalListingScreen';
import { SupportHubScreen } from '../screens/SupportHubScreen';
import { StoreLocatorScreen } from '../screens/StoreLocatorScreen';
import { LegalContentScreen } from '../screens/LegalContentScreen';
import { ContactUsScreen } from '../screens/ContactUsScreen';

// Auth Screens
import { OtpVerificationScreen } from '../screens/auth/OtpVerificationScreen';
import { EmailVerificationScreen } from '../screens/auth/EmailVerificationScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';
import { SocialLoginCallbackScreen } from '../screens/auth/SocialLoginCallbackScreen';
import { LogoutConfirmationScreen } from '../screens/auth/LogoutConfirmationScreen';

import { enableScreens } from 'react-native-screens';

enableScreens();


export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  GetStarted: undefined;
  SignIn: undefined;
  Home: undefined;
  ProductDetails: { product: any, images?: string[] };
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
  Checkout: { total: string };
  OrderSuccess: undefined;
  OrderTracking: undefined;
  EditProfile: undefined;
  Orders: undefined;
  PaymentMethods: undefined;
  Address: undefined;
  Settings: undefined;
  Support: undefined;
  ChangePassword: undefined;
  Shop: undefined;
  CategoryListing: undefined;
  SubCategory: { categoryId: string, categoryName: string };
  Brand: { brandId: string, brandName: string };
  SearchResults: { query: string };
  Filters: undefined;
  OtpVerification: undefined;
  EmailVerification: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  SocialLoginCallback: undefined;
  LogoutConfirmation: undefined;
  OrderDetails: undefined;
  AddEditAddress: { addressId?: string; initialData?: any };
  Notifications: undefined;
  Wallet: undefined;
  ShoppingExtras: { initialTab?: string };
  PaymentFailed: undefined;
  PaymentGateway: undefined;
  ProductReviews: undefined;
  WriteReview: undefined;
  CompareProducts: undefined;
  PromotionalListing: { collectionType: 'Flash Sale' | 'Best Sellers' | 'New Arrivals' | 'Deal of the Day' };
  SupportHub: undefined;
  Blog: undefined;
  StoreLocator: undefined;
  LegalContent: { type: 'privacy' | 'terms' | 'returns' | 'refunds' | 'shipping' };
  ContactUs: undefined;
};



const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="GetStarted" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />

        {/* Profile Sections */}
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

        {/* Store & Products */}
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="CategoryListing" component={CategoryListingScreen} />
        <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
        <Stack.Screen name="Brand" component={BrandScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="Filters" component={FiltersScreen} />

        {/* Missing Account & Shopping Screens */}
        <Stack.Screen name="OrderDetails" component={OrderDetailScreen} />
        <Stack.Screen name="AddEditAddress" component={AddEditAddressScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="ShoppingExtras" component={ShoppingExtrasScreen} />
        <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} />
        <Stack.Screen name="PaymentGateway" component={PaymentGatewayScreen} />

        {/* Engagement & Promotional Screens */}
        <Stack.Screen name="ProductReviews" component={ProductReviewsScreen} />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
        <Stack.Screen name="CompareProducts" component={CompareProductsScreen} />
        <Stack.Screen name="PromotionalListing" component={PromotionalListingScreen} />

        {/* Support & Information Screens */}
        <Stack.Screen name="SupportHub" component={SupportHubScreen} />
        <Stack.Screen name="StoreLocator" component={StoreLocatorScreen} />
        <Stack.Screen name="LegalContent" component={LegalContentScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />

        {/* Auth Workflows */}
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="SocialLoginCallback" component={SocialLoginCallbackScreen} />
        <Stack.Screen name="LogoutConfirmation" component={LogoutConfirmationScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />
      </Stack.Navigator>


    </NavigationContainer>
  );
};

