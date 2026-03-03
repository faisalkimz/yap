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
import { AboutUsScreen } from '../screens/AboutUsScreen';
import { FAQScreen } from '../screens/FAQScreen';
import { ReturnsDashboardScreen } from '../screens/ReturnsDashboardScreen';
import { InvoiceScreen } from '../screens/InvoiceScreen';
import { MyReviewsScreen } from '../screens/MyReviewsScreen';
import { CouponsScreen } from '../screens/CouponsScreen';
import { InboxScreen } from '../screens/InboxScreen';

// Vendor Screens
import {
  VendorLoginScreen,
  VendorRegisterScreen,
  VendorDashboardScreen,
  VendorAddProductScreen,
  VendorAnalyticsScreen,
  VendorPayoutScreen,
  VendorReturnsScreen,
  VendorProfileScreen,
  VendorStorefrontScreen
} from '../screens/VendorScreens';

// These use the dashboard with tabs
const VendorProductsScreen = VendorDashboardScreen;
const VendorOrdersScreen = VendorDashboardScreen;
const VendorMessagesScreen = VendorDashboardScreen;

// Admin Screens
import {
  AdminLoginScreen,
  AdminDashboardScreen,
  AdminCategoriesScreen,
  AdminVendorsScreen,
  AdminCouponsScreen,
  AdminBannersScreen,
  AdminFinanceScreen,
  AdminSettingsScreen,
} from '../screens/AdminScreens';

// Feature Screens
import {
  SubscriptionPlansScreen,
  MembershipPageScreen,
  LoyaltyProgramScreen,
  GiftCardsScreen,
  AffiliateDashboardScreen,
  ReferralProgramScreen,
  AbandonedCartScreen,
  AIRecommendationsScreen,
  CurrencySwitcherScreen,
  LanguageSwitcherScreen,
  AuctionPageScreen,
  PreOrderPageScreen,
  BookingPageScreen,
  DigitalDownloadsScreen,
  RentalProductsScreen,
  WholesalePricingScreen,
  Error404Screen,
  Error500Screen,
  MaintenanceScreen,
  AccessDeniedScreen,
  SessionExpiredScreen,
  PushNotificationsScreen,
  InAppChatScreen,
  BiometricSetupScreen,
} from '../screens/FeatureScreens';

// Auth Screens
import { OtpVerificationScreen } from '../screens/auth/OtpVerificationScreen';
import { EmailVerificationScreen } from '../screens/auth/EmailVerificationScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/auth/ResetPasswordScreen';
import { SocialLoginCallbackScreen } from '../screens/auth/SocialLoginCallbackScreen';
import { LogoutConfirmationScreen } from '../screens/auth/LogoutConfirmationScreen';

import { enableScreens } from 'react-native-screens';
import { MiniCart } from '../components/MiniCart';

enableScreens();

import { RootStackParamList } from './types';

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
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="ReturnsDashboard" component={ReturnsDashboardScreen} />
        <Stack.Screen name="Invoice" component={InvoiceScreen} />
        <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
        <Stack.Screen name="Coupons" component={CouponsScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />

        {/* Auth Workflows */}
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="SocialLoginCallback" component={SocialLoginCallbackScreen} />
        <Stack.Screen name="LogoutConfirmation" component={LogoutConfirmationScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />

        {/* Vendor Screens */}
        <Stack.Screen name="VendorLogin" component={VendorLoginScreen} />
        <Stack.Screen name="VendorRegister" component={VendorRegisterScreen} />
        <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} />
        <Stack.Screen name="VendorAddProduct" component={VendorAddProductScreen} />
        <Stack.Screen name="VendorProducts" component={VendorProductsScreen} />
        <Stack.Screen name="VendorOrders" component={VendorOrdersScreen} />
        <Stack.Screen name="VendorAnalytics" component={VendorAnalyticsScreen} />
        <Stack.Screen name="VendorPayouts" component={VendorPayoutScreen} />
        <Stack.Screen name="VendorReturns" component={VendorReturnsScreen} />
        <Stack.Screen name="VendorMessages" component={VendorMessagesScreen} />
        <Stack.Screen name="VendorProfile" component={VendorProfileScreen} />
        <Stack.Screen name="VendorStorefront" component={VendorStorefrontScreen} />

        {/* Admin Screens */}
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminCategories" component={AdminCategoriesScreen} />
        <Stack.Screen name="AdminVendors" component={AdminVendorsScreen} />
        <Stack.Screen name="AdminCoupons" component={AdminCouponsScreen} />
        <Stack.Screen name="AdminBanners" component={AdminBannersScreen} />
        <Stack.Screen name="AdminFinance" component={AdminFinanceScreen} />
        <Stack.Screen name="AdminSettings" component={AdminSettingsScreen} />

        {/* Feature Screens - Mobile App Specific */}
        <Stack.Screen name="PushNotifications" component={PushNotificationsScreen} />
        <Stack.Screen name="InAppChat" component={InAppChatScreen} />
        <Stack.Screen name="BiometricSetup" component={BiometricSetupScreen} />

        {/* Feature Screens - Advanced/Enterprise */}
        <Stack.Screen name="SubscriptionPlans" component={SubscriptionPlansScreen} />
        <Stack.Screen name="MembershipPage" component={MembershipPageScreen} />
        <Stack.Screen name="LoyaltyProgram" component={LoyaltyProgramScreen} />
        <Stack.Screen name="GiftCards" component={GiftCardsScreen} />
        <Stack.Screen name="AffiliateDashboard" component={AffiliateDashboardScreen} />
        <Stack.Screen name="ReferralProgram" component={ReferralProgramScreen} />
        <Stack.Screen name="AbandonedCart" component={AbandonedCartScreen} />
        <Stack.Screen name="AIRecommendations" component={AIRecommendationsScreen} />
        <Stack.Screen name="CurrencySwitcher" component={CurrencySwitcherScreen} />
        <Stack.Screen name="LanguageSwitcher" component={LanguageSwitcherScreen} />
        <Stack.Screen name="AuctionPage" component={AuctionPageScreen} />
        <Stack.Screen name="PreOrderPage" component={PreOrderPageScreen} />
        <Stack.Screen name="BackOrderPage" component={PreOrderPageScreen} />
        <Stack.Screen name="LiveChatSupport" component={BookingPageScreen} />
        <Stack.Screen name="ChatbotPage" component={AIRecommendationsScreen} />

        {/* Feature Screens - Special Commerce */}
        <Stack.Screen name="DigitalDownloads" component={DigitalDownloadsScreen} />
        <Stack.Screen name="LicenseKeyDelivery" component={DigitalDownloadsScreen} />
        <Stack.Screen name="BookingPage" component={BookingPageScreen} />
        <Stack.Screen name="RentalProducts" component={RentalProductsScreen} />
        <Stack.Screen name="WholesalePricing" component={WholesalePricingScreen} />
        <Stack.Screen name="QuoteRequest" component={WholesalePricingScreen} />

        {/* Feature Screens - Error Pages */}
        <Stack.Screen name="Error404" component={Error404Screen} />
        <Stack.Screen name="Error500" component={Error500Screen} />
        <Stack.Screen name="MaintenanceMode" component={MaintenanceScreen} />
        <Stack.Screen name="AccessDenied" component={AccessDeniedScreen} />
        <Stack.Screen name="SessionExpired" component={SessionExpiredScreen} />
      </Stack.Navigator>
      <MiniCart />
    </NavigationContainer>
  );
};
