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
    AboutUs: undefined;
    FAQ: undefined;
    ReturnsDashboard: undefined;
    Invoice: undefined;
    MyReviews: undefined;
    Coupons: undefined;
    Inbox: undefined;

    // Vendor Screens
    VendorLogin: undefined;
    VendorRegister: undefined;
    VendorDashboard: undefined;
    VendorAddProduct: { productId?: string } | undefined;
    VendorProducts: undefined;
    VendorOrders: undefined;
    VendorAnalytics: undefined;
    VendorPayouts: undefined;
    VendorReturns: undefined;
    VendorMessages: undefined;
    VendorProfile: undefined;
    VendorStorefront: { vendorId?: string } | undefined;

    // Admin Screens
    AdminLogin: undefined;
    AdminDashboard: undefined;
    AdminCategories: undefined;
    AdminVendors: undefined;
    AdminCoupons: undefined;
    AdminBanners: undefined;
    AdminFinance: undefined;
    AdminSettings: undefined;
    AdminOrders: undefined;
    AdminProducts: undefined;
    AdminUsers: undefined;

    // Feature Screens - Mobile App Specific
    PushNotifications: undefined;
    InAppChat: undefined;
    BiometricSetup: undefined;

    // Feature Screens - Advanced/Enterprise
    SubscriptionPlans: undefined;
    MembershipPage: undefined;
    LoyaltyProgram: undefined;
    GiftCards: undefined;
    AffiliateDashboard: undefined;
    ReferralProgram: undefined;
    AbandonedCart: undefined;
    AIRecommendations: undefined;
    CurrencySwitcher: undefined;
    LanguageSwitcher: undefined;
    AuctionPage: undefined;
    PreOrderPage: undefined;
    BackOrderPage: undefined;
    LiveChatSupport: undefined;
    ChatbotPage: undefined;

    // Feature Screens - Special Commerce
    DigitalDownloads: undefined;
    LicenseKeyDelivery: undefined;
    BookingPage: undefined;
    RentalProducts: undefined;
    WholesalePricing: undefined;
    QuoteRequest: undefined;

    // Feature Screens - Error Pages
    Error404: undefined;
    Error500: undefined;
    MaintenanceMode: undefined;
    AccessDenied: undefined;
    SessionExpired: undefined;
};
