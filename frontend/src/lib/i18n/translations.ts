// ─── Translation Types ────────────────────────────────────────────────────────
export type Locale = 'en' | 'am';

export interface ITranslations {
  // ─── Common ──────────────────────────────────────────────────────────────
  common: {
    appName: string;
    appNameAm: string;
    tagline: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    search: string;
    filter: string;
    sort: string;
    viewAll: string;
    loadMore: string;
    retry: string;
    refresh: string;
    submit: string;
    send: string;
    copy: string;
    share: string;
    download: string;
    upload: string;
    yes: string;
    no: string;
    ok: string;
    done: string;
    apply: string;
    clear: string;
    reset: string;
    optional: string;
    required: string;
    or: string;
    and: string;
    noResults: string;
    noData: string;
    comingSoon: string;
    new: string;
    popular: string;
    recommended: string;
    featured: string;
  };

  // ─── Navigation ───────────────────────────────────────────────────────────
  nav: {
    home: string;
    restaurants: string;
    deals: string;
    trackOrder: string;
    cart: string;
    profile: string;
    orders: string;
    favourites: string;
    addresses: string;
    settings: string;
    help: string;
    signIn: string;
    signOut: string;
    register: string;
    dashboard: string;
    notifications: string;
  };

  // ─── Auth ─────────────────────────────────────────────────────────────────
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    register: string;
    login: string;
    logout: string;
    forgotPassword: string;
    resetPassword: string;
    changePassword: string;
    verifyEmail: string;
    verifyOtp: string;
    resendOtp: string;
    email: string;
    password: string;
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
    rememberMe: string;
    agreeToTerms: string;
    termsOfService: string;
    privacyPolicy: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    createAccount: string;
    welcomeBack: string;
    forgotPasswordQuestion: string;
    checkEmail: string;
    passwordResetSent: string;
    otpSent: string;
    otpExpires: string;
    resendIn: string;
    verificationCode: string;
    enterOtp: string;
    role: {
      customer: string;
      restaurantOwner: string;
      rider: string;
      admin: string;
    };
  };

  // ─── Restaurant ───────────────────────────────────────────────────────────
  restaurant: {
    restaurants: string;
    nearYou: string;
    popular: string;
    featured: string;
    all: string;
    openNow: string;
    closed: string;
    rating: string;
    reviews: string;
    deliveryTime: string;
    deliveryFee: string;
    minimumOrder: string;
    menu: string;
    categories: string;
    addToCart: string;
    viewMenu: string;
    searchRestaurants: string;
    filterBy: string;
    sortBy: string;
    cuisine: string;
    priceRange: string;
    distance: string;
    noRestaurantsFound: string;
    restaurantDetails: string;
    aboutRestaurant: string;
    workingHours: string;
    location: string;
    contact: string;
    addReview: string;
    writeReview: string;
  };

  // ─── Food ─────────────────────────────────────────────────────────────────
  food: {
    addToCart: string;
    removeFromCart: string;
    quantity: string;
    price: string;
    total: string;
    calories: string;
    ingredients: string;
    allergens: string;
    spicy: string;
    vegetarian: string;
    vegan: string;
    glutenFree: string;
    popular: string;
    new: string;
    recommended: string;
    outOfStock: string;
    available: string;
    customize: string;
    addons: string;
    specialInstructions: string;
  };

  // ─── Cart ─────────────────────────────────────────────────────────────────
  cart: {
    cart: string;
    myCart: string;
    emptyCart: string;
    emptyCartDescription: string;
    startOrdering: string;
    items: string;
    subtotal: string;
    deliveryFee: string;
    discount: string;
    total: string;
    promoCode: string;
    applyPromo: string;
    removePromo: string;
    checkout: string;
    continueShopping: string;
    clearCart: string;
    orderSummary: string;
    itemsInCart: string;
  };

  // ─── Checkout ─────────────────────────────────────────────────────────────
  checkout: {
    checkout: string;
    deliveryAddress: string;
    selectAddress: string;
    addAddress: string;
    paymentMethod: string;
    selectPayment: string;
    orderNotes: string;
    placeOrder: string;
    processing: string;
    scheduledDelivery: string;
    asap: string;
    scheduleFor: string;
    promoCode: string;
    orderTotal: string;
    confirmOrder: string;
  };

  // ─── Payment ──────────────────────────────────────────────────────────────
  payment: {
    payment: string;
    selectPaymentMethod: string;
    telebirr: string;
    chapa: string;
    cbeBirr: string;
    cashOnDelivery: string;
    payNow: string;
    paymentSuccessful: string;
    paymentFailed: string;
    paymentPending: string;
    transactionId: string;
    amount: string;
    date: string;
    status: string;
    refund: string;
    paymentHistory: string;
  };

  // ─── Orders ───────────────────────────────────────────────────────────────
  orders: {
    orders: string;
    myOrders: string;
    activeOrders: string;
    orderHistory: string;
    orderDetails: string;
    orderNumber: string;
    orderDate: string;
    orderStatus: string;
    orderItems: string;
    orderTotal: string;
    deliveryAddress: string;
    estimatedDelivery: string;
    trackOrder: string;
    reorder: string;
    cancelOrder: string;
    orderPlaced: string;
    orderConfirmed: string;
    preparing: string;
    readyForPickup: string;
    pickedUp: string;
    onTheWay: string;
    delivered: string;
    cancelled: string;
    failed: string;
    noOrders: string;
    noActiveOrders: string;
    rateOrder: string;
    leaveReview: string;
  };

  // ─── Tracking ─────────────────────────────────────────────────────────────
  tracking: {
    trackOrder: string;
    liveTracking: string;
    riderLocation: string;
    estimatedArrival: string;
    orderStatus: string;
    riderName: string;
    riderPhone: string;
    contactRider: string;
    minutesAway: string;
    kmAway: string;
    orderDelivered: string;
    enjoyMeal: string;
  };

  // ─── Profile ──────────────────────────────────────────────────────────────
  profile: {
    profile: string;
    myProfile: string;
    editProfile: string;
    personalInfo: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    male: string;
    female: string;
    preferNotToSay: string;
    avatar: string;
    changeAvatar: string;
    uploadPhoto: string;
    accountSettings: string;
    language: string;
    notifications: string;
    privacy: string;
    security: string;
    deleteAccount: string;
    deleteAccountWarning: string;
  };

  // ─── Address ──────────────────────────────────────────────────────────────
  address: {
    addresses: string;
    myAddresses: string;
    addAddress: string;
    editAddress: string;
    deleteAddress: string;
    setDefault: string;
    defaultAddress: string;
    home: string;
    work: string;
    other: string;
    street: string;
    city: string;
    subCity: string;
    woreda: string;
    specificLocation: string;
    recipientName: string;
    recipientPhone: string;
    selectOnMap: string;
    noAddresses: string;
    addFirstAddress: string;
  };

  // ─── Notifications ────────────────────────────────────────────────────────
  notifications: {
    notifications: string;
    allNotifications: string;
    unread: string;
    markAsRead: string;
    markAllAsRead: string;
    deleteNotification: string;
    noNotifications: string;
    orderUpdate: string;
    promotion: string;
    accountAlert: string;
    newsletter: string;
  };

  // ─── Cities ───────────────────────────────────────────────────────────────
  cities: {
    selectCity: string;
    deliverTo: string;
    addisAbaba: string;
    adama: string;
    hawassa: string;
    direDawa: string;
    bahirDar: string;
    jimma: string;
    comingSoon: string;
  };

  // ─── Errors ───────────────────────────────────────────────────────────────
  errors: {
    somethingWentWrong: string;
    networkError: string;
    serverError: string;
    notFound: string;
    unauthorized: string;
    forbidden: string;
    sessionExpired: string;
    invalidCredentials: string;
    emailAlreadyExists: string;
    phoneAlreadyExists: string;
    invalidOtp: string;
    otpExpired: string;
    tooManyAttempts: string;
    accountSuspended: string;
    accountInactive: string;
    emailNotVerified: string;
    paymentFailed: string;
    orderFailed: string;
    locationRequired: string;
  };

  // ─── Success ──────────────────────────────────────────────────────────────
  success: {
    registered: string;
    loggedIn: string;
    loggedOut: string;
    emailVerified: string;
    passwordReset: string;
    passwordChanged: string;
    profileUpdated: string;
    addressAdded: string;
    addressUpdated: string;
    addressDeleted: string;
    orderPlaced: string;
    orderCancelled: string;
    reviewSubmitted: string;
    addedToCart: string;
    removedFromCart: string;
    addedToFavourites: string;
    removedFromFavourites: string;
    promoApplied: string;
    paymentSuccessful: string;
    settingsUpdated: string;
  };

  // ─── Restaurant Dashboard ─────────────────────────────────────────────────
  restaurantDashboard: {
    dashboard: string;
    totalOrders: string;
    totalRevenue: string;
    activeOrders: string;
    averageRating: string;
    todayOrders: string;
    todayRevenue: string;
    pendingOrders: string;
    menu: string;
    addItem: string;
    editItem: string;
    deleteItem: string;
    toggleAvailability: string;
    restaurantSettings: string;
    openClose: string;
    workingHours: string;
    deliverySettings: string;
    payoutSettings: string;
  };

  // ─── Rider Dashboard ──────────────────────────────────────────────────────
  riderDashboard: {
    dashboard: string;
    activeDelivery: string;
    totalDeliveries: string;
    totalEarnings: string;
    todayEarnings: string;
    rating: string;
    availability: string;
    online: string;
    offline: string;
    goOnline: string;
    goOffline: string;
    currentDelivery: string;
    deliveryHistory: string;
    earnings: string;
    weeklyEarnings: string;
    monthlyEarnings: string;
    acceptDelivery: string;
    rejectDelivery: string;
    pickupOrder: string;
    deliverOrder: string;
  };

  // ─── Admin Dashboard ──────────────────────────────────────────────────────
  adminDashboard: {
    dashboard: string;
    totalUsers: string;
    totalRestaurants: string;
    totalOrders: string;
    totalRevenue: string;
    activeUsers: string;
    pendingRestaurants: string;
    users: string;
    restaurants: string;
    orders: string;
    riders: string;
    payments: string;
    promotions: string;
    analytics: string;
    settings: string;
    verifyRestaurant: string;
    rejectRestaurant: string;
    suspendUser: string;
    activateUser: string;
    createPromotion: string;
    platformFee: string;
    systemSettings: string;
  };
}

// ─── English Translations ─────────────────────────────────────────────────────
export const en: ITranslations = {
  common: {
    appName: 'Yene Delivery',
    appNameAm: 'የኔ ዴሊቨሪ',
    tagline: 'Food Delivery Across Ethiopia',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    viewAll: 'View All',
    loadMore: 'Load More',
    retry: 'Retry',
    refresh: 'Refresh',
    submit: 'Submit',
    send: 'Send',
    copy: 'Copy',
    share: 'Share',
    download: 'Download',
    upload: 'Upload',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    done: 'Done',
    apply: 'Apply',
    clear: 'Clear',
    reset: 'Reset',
    optional: 'Optional',
    required: 'Required',
    or: 'or',
    and: 'and',
    noResults: 'No results found',
    noData: 'No data available',
    comingSoon: 'Coming Soon',
    new: 'New',
    popular: 'Popular',
    recommended: 'Recommended',
    featured: 'Featured',
  },

  nav: {
    home: 'Home',
    restaurants: 'Restaurants',
    deals: 'Deals',
    trackOrder: 'Track Order',
    cart: 'Cart',
    profile: 'Profile',
    orders: 'Orders',
    favourites: 'Favourites',
    addresses: 'Addresses',
    settings: 'Settings',
    help: 'Help',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    register: 'Register',
    dashboard: 'Dashboard',
    notifications: 'Notifications',
  },

  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    register: 'Register',
    login: 'Login',
    logout: 'Logout',
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    changePassword: 'Change Password',
    verifyEmail: 'Verify Email',
    verifyOtp: 'Verify OTP',
    resendOtp: 'Resend OTP',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    rememberMe: 'Remember me for 7 days',
    agreeToTerms: 'I agree to the Terms of Service and Privacy Policy',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    createAccount: 'Create Account',
    welcomeBack: 'Welcome back',
    forgotPasswordQuestion: 'Forgot your password?',
    checkEmail: 'Check your email',
    passwordResetSent: 'Password reset code sent to your email',
    otpSent: 'Verification code sent to your email',
    otpExpires: 'Code expires in',
    resendIn: 'Resend in',
    verificationCode: 'Verification Code',
    enterOtp: 'Enter the 6-digit code',
    role: {
      customer: 'Customer',
      restaurantOwner: 'Restaurant Owner',
      rider: 'Delivery Rider',
      admin: 'Administrator',
    },
  },

  restaurant: {
    restaurants: 'Restaurants',
    nearYou: 'Near You',
    popular: 'Popular',
    featured: 'Featured',
    all: 'All',
    openNow: 'Open Now',
    closed: 'Closed',
    rating: 'Rating',
    reviews: 'Reviews',
    deliveryTime: 'Delivery Time',
    deliveryFee: 'Delivery Fee',
    minimumOrder: 'Minimum Order',
    menu: 'Menu',
    categories: 'Categories',
    addToCart: 'Add to Cart',
    viewMenu: 'View Menu',
    searchRestaurants: 'Search restaurants...',
    filterBy: 'Filter by',
    sortBy: 'Sort by',
    cuisine: 'Cuisine',
    priceRange: 'Price Range',
    distance: 'Distance',
    noRestaurantsFound: 'No restaurants found',
    restaurantDetails: 'Restaurant Details',
    aboutRestaurant: 'About',
    workingHours: 'Working Hours',
    location: 'Location',
    contact: 'Contact',
    addReview: 'Add Review',
    writeReview: 'Write a Review',
  },

  food: {
    addToCart: 'Add to Cart',
    removeFromCart: 'Remove from Cart',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    calories: 'Calories',
    ingredients: 'Ingredients',
    allergens: 'Allergens',
    spicy: 'Spicy',
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    glutenFree: 'Gluten Free',
    popular: 'Popular',
    new: 'New',
    recommended: 'Recommended',
    outOfStock: 'Out of Stock',
    available: 'Available',
    customize: 'Customize',
    addons: 'Add-ons',
    specialInstructions: 'Special Instructions',
  },

  cart: {
    cart: 'Cart',
    myCart: 'My Cart',
    emptyCart: 'Your cart is empty',
    emptyCartDescription: 'Add items from a restaurant to get started',
    startOrdering: 'Start Ordering',
    items: 'Items',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    discount: 'Discount',
    total: 'Total',
    promoCode: 'Promo Code',
    applyPromo: 'Apply',
    removePromo: 'Remove',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    clearCart: 'Clear Cart',
    orderSummary: 'Order Summary',
    itemsInCart: 'items in cart',
  },

  checkout: {
    checkout: 'Checkout',
    deliveryAddress: 'Delivery Address',
    selectAddress: 'Select Address',
    addAddress: 'Add New Address',
    paymentMethod: 'Payment Method',
    selectPayment: 'Select Payment Method',
    orderNotes: 'Order Notes',
    placeOrder: 'Place Order',
    processing: 'Processing...',
    scheduledDelivery: 'Schedule Delivery',
    asap: 'As soon as possible',
    scheduleFor: 'Schedule for later',
    promoCode: 'Promo Code',
    orderTotal: 'Order Total',
    confirmOrder: 'Confirm Order',
  },

  payment: {
    payment: 'Payment',
    selectPaymentMethod: 'Select Payment Method',
    telebirr: 'Telebirr',
    chapa: 'Chapa',
    cbeBirr: 'CBE Birr',
    cashOnDelivery: 'Cash on Delivery',
    payNow: 'Pay Now',
    paymentSuccessful: 'Payment Successful',
    paymentFailed: 'Payment Failed',
    paymentPending: 'Payment Pending',
    transactionId: 'Transaction ID',
    amount: 'Amount',
    date: 'Date',
    status: 'Status',
    refund: 'Request Refund',
    paymentHistory: 'Payment History',
  },

  orders: {
    orders: 'Orders',
    myOrders: 'My Orders',
    activeOrders: 'Active Orders',
    orderHistory: 'Order History',
    orderDetails: 'Order Details',
    orderNumber: 'Order #',
    orderDate: 'Order Date',
    orderStatus: 'Status',
    orderItems: 'Items',
    orderTotal: 'Total',
    deliveryAddress: 'Delivery Address',
    estimatedDelivery: 'Estimated Delivery',
    trackOrder: 'Track Order',
    reorder: 'Reorder',
    cancelOrder: 'Cancel Order',
    orderPlaced: 'Order Placed',
    orderConfirmed: 'Order Confirmed',
    preparing: 'Preparing',
    readyForPickup: 'Ready for Pickup',
    pickedUp: 'Picked Up',
    onTheWay: 'On the Way',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    failed: 'Failed',
    noOrders: 'No orders yet',
    noActiveOrders: 'No active orders',
    rateOrder: 'Rate Order',
    leaveReview: 'Leave a Review',
  },

  tracking: {
    trackOrder: 'Track Order',
    liveTracking: 'Live Tracking',
    riderLocation: 'Rider Location',
    estimatedArrival: 'Estimated Arrival',
    orderStatus: 'Order Status',
    riderName: 'Rider',
    riderPhone: 'Rider Phone',
    contactRider: 'Contact Rider',
    minutesAway: 'minutes away',
    kmAway: 'km away',
    orderDelivered: 'Order Delivered!',
    enjoyMeal: 'Enjoy your meal',
  },

  profile: {
    profile: 'Profile',
    myProfile: 'My Profile',
    editProfile: 'Edit Profile',
    personalInfo: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    preferNotToSay: 'Prefer not to say',
    avatar: 'Profile Photo',
    changeAvatar: 'Change Photo',
    uploadPhoto: 'Upload Photo',
    accountSettings: 'Account Settings',
    language: 'Language',
    notifications: 'Notifications',
    privacy: 'Privacy',
    security: 'Security',
    deleteAccount: 'Delete Account',
    deleteAccountWarning:
      'This action cannot be undone. All your data will be permanently deleted.',
  },

  address: {
    addresses: 'Addresses',
    myAddresses: 'My Addresses',
    addAddress: 'Add Address',
    editAddress: 'Edit Address',
    deleteAddress: 'Delete Address',
    setDefault: 'Set as Default',
    defaultAddress: 'Default Address',
    home: 'Home',
    work: 'Work',
    other: 'Other',
    street: 'Street Address',
    city: 'City',
    subCity: 'Sub City',
    woreda: 'Woreda',
    specificLocation: 'Specific Location',
    recipientName: 'Recipient Name',
    recipientPhone: 'Recipient Phone',
    selectOnMap: 'Select on Map',
    noAddresses: 'No addresses saved',
    addFirstAddress: 'Add your first delivery address',
  },

  notifications: {
    notifications: 'Notifications',
    allNotifications: 'All Notifications',
    unread: 'Unread',
    markAsRead: 'Mark as Read',
    markAllAsRead: 'Mark All as Read',
    deleteNotification: 'Delete',
    noNotifications: 'No notifications yet',
    orderUpdate: 'Order Update',
    promotion: 'Promotion',
    accountAlert: 'Account Alert',
    newsletter: 'Newsletter',
  },

  cities: {
    selectCity: 'Select City',
    deliverTo: 'Deliver to',
    addisAbaba: 'Addis Ababa',
    adama: 'Adama',
    hawassa: 'Hawassa',
    direDawa: 'Dire Dawa',
    bahirDar: 'Bahir Dar',
    jimma: 'Jimma',
    comingSoon: 'Coming Soon',
  },

  errors: {
    somethingWentWrong: 'Something went wrong. Please try again.',
    networkError: 'Network error. Please check your connection.',
    serverError: 'Server error. Please try again later.',
    notFound: 'Not found.',
    unauthorized: 'You are not authorized to perform this action.',
    forbidden: 'Access denied.',
    sessionExpired: 'Your session has expired. Please sign in again.',
    invalidCredentials: 'Invalid email or password.',
    emailAlreadyExists: 'An account with this email already exists.',
    phoneAlreadyExists: 'An account with this phone number already exists.',
    invalidOtp: 'Invalid verification code. Please try again.',
    otpExpired: 'Verification code has expired. Please request a new one.',
    tooManyAttempts: 'Too many attempts. Please try again later.',
    accountSuspended: 'Your account has been suspended. Please contact support.',
    accountInactive: 'Your account is inactive. Please contact support.',
    emailNotVerified: 'Please verify your email address before signing in.',
    paymentFailed: 'Payment failed. Please try again or use a different method.',
    orderFailed: 'Failed to place order. Please try again.',
    locationRequired: 'Please enable location access to use this feature.',
  },

  success: {
    registered: 'Account created successfully! Please verify your email.',
    loggedIn: 'Welcome back!',
    loggedOut: 'You have been signed out.',
    emailVerified: 'Email verified successfully!',
    passwordReset: 'Password reset successfully!',
    passwordChanged: 'Password changed successfully!',
    profileUpdated: 'Profile updated successfully!',
    addressAdded: 'Address added successfully!',
    addressUpdated: 'Address updated successfully!',
    addressDeleted: 'Address deleted successfully!',
    orderPlaced: 'Order placed successfully!',
    orderCancelled: 'Order cancelled successfully!',
    reviewSubmitted: 'Review submitted successfully!',
    addedToCart: 'Added to cart!',
    removedFromCart: 'Removed from cart!',
    addedToFavourites: 'Added to favourites!',
    removedFromFavourites: 'Removed from favourites!',
    promoApplied: 'Promo code applied successfully!',
    paymentSuccessful: 'Payment successful!',
    settingsUpdated: 'Settings updated successfully!',
  },

  restaurantDashboard: {
    dashboard: 'Dashboard',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    activeOrders: 'Active Orders',
    averageRating: 'Average Rating',
    todayOrders: "Today's Orders",
    todayRevenue: "Today's Revenue",
    pendingOrders: 'Pending Orders',
    menu: 'Menu',
    addItem: 'Add Item',
    editItem: 'Edit Item',
    deleteItem: 'Delete Item',
    toggleAvailability: 'Toggle Availability',
    restaurantSettings: 'Restaurant Settings',
    openClose: 'Open / Close',
    workingHours: 'Working Hours',
    deliverySettings: 'Delivery Settings',
    payoutSettings: 'Payout Settings',
  },

  riderDashboard: {
    dashboard: 'Dashboard',
    activeDelivery: 'Active Delivery',
    totalDeliveries: 'Total Deliveries',
    totalEarnings: 'Total Earnings',
    todayEarnings: "Today's Earnings",
    rating: 'Rating',
    availability: 'Availability',
    online: 'Online',
    offline: 'Offline',
    goOnline: 'Go Online',
    goOffline: 'Go Offline',
    currentDelivery: 'Current Delivery',
    deliveryHistory: 'Delivery History',
    earnings: 'Earnings',
    weeklyEarnings: 'Weekly Earnings',
    monthlyEarnings: 'Monthly Earnings',
    acceptDelivery: 'Accept Delivery',
    rejectDelivery: 'Reject Delivery',
    pickupOrder: 'Picked Up',
    deliverOrder: 'Mark as Delivered',
  },

  adminDashboard: {
    dashboard: 'Dashboard',
    totalUsers: 'Total Users',
    totalRestaurants: 'Total Restaurants',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    activeUsers: 'Active Users',
    pendingRestaurants: 'Pending Restaurants',
    users: 'Users',
    restaurants: 'Restaurants',
    orders: 'Orders',
    riders: 'Riders',
    payments: 'Payments',
    promotions: 'Promotions',
    analytics: 'Analytics',
    settings: 'Settings',
    verifyRestaurant: 'Verify Restaurant',
    rejectRestaurant: 'Reject Restaurant',
    suspendUser: 'Suspend User',
    activateUser: 'Activate User',
    createPromotion: 'Create Promotion',
    platformFee: 'Platform Fee',
    systemSettings: 'System Settings',
  },
};

// ─── Amharic Translations ─────────────────────────────────────────────────────
export const am: ITranslations = {
  common: {
    appName: 'Yene Delivery',
    appNameAm: 'የኔ ዴሊቨሪ',
    tagline: 'በኢትዮጵያ ምግብ ዴሊቨሪ',
    loading: 'በመጫን ላይ...',
    error: 'ስህተት',
    success: 'ተሳክቷል',
    cancel: 'ሰርዝ',
    confirm: 'አረጋግጥ',
    save: 'አስቀምጥ',
    edit: 'አርትዕ',
    delete: 'ሰርዝ',
    back: 'ተመለስ',
    next: 'ቀጣይ',
    previous: 'ቀዳሚ',
    close: 'ዝጋ',
    search: 'ፈልግ',
    filter: 'አጣራ',
    sort: 'ደርድር',
    viewAll: 'ሁሉንም ይመልከቱ',
    loadMore: 'ተጨማሪ ጫን',
    retry: 'እንደገና ሞክር',
    refresh: 'አድስ',
    submit: 'ላክ',
    send: 'ላክ',
    copy: 'ቅዳ',
    share: 'አጋራ',
    download: 'አውርድ',
    upload: 'ጫን',
    yes: 'አዎ',
    no: 'አይ',
    ok: 'እሺ',
    done: 'ተጠናቋል',
    apply: 'ተግብር',
    clear: 'አጽዳ',
    reset: 'ዳግም ጀምር',
    optional: 'አማራጭ',
    required: 'ያስፈልጋል',
    or: 'ወይም',
    and: 'እና',
    noResults: 'ምንም ውጤት አልተገኘም',
    noData: 'ምንም መረጃ የለም',
    comingSoon: 'በቅርቡ ይመጣል',
    new: 'አዲስ',
    popular: 'ታዋቂ',
    recommended: 'የሚመከር',
    featured: 'ልዩ',
  },

  nav: {
    home: 'መነሻ',
    restaurants: 'ምግብ ቤቶች',
    deals: 'ቅናሾች',
    trackOrder: 'ትዕዛዝ ክትትል',
    cart: 'ጋሪ',
    profile: 'መገለጫ',
    orders: 'ትዕዛዞች',
    favourites: 'ተወዳጆች',
    addresses: 'አድራሻዎች',
    settings: 'ቅንብሮች',
    help: 'እርዳታ',
    signIn: 'ግባ',
    signOut: 'ውጣ',
    register: 'ተመዝገብ',
    dashboard: 'ዳሽቦርድ',
    notifications: 'ማሳወቂያዎች',
  },

  auth: {
    signIn: 'ግባ',
    signUp: 'ተመዝገብ',
    signOut: 'ውጣ',
    register: 'ተመዝገብ',
    login: 'ግባ',
    logout: 'ውጣ',
    forgotPassword: 'የይለፍ ቃል ረስቻለሁ',
    resetPassword: 'የይለፍ ቃል ዳግም ያስጀምሩ',
    changePassword: 'የይለፍ ቃል ይቀይሩ',
    verifyEmail: 'ኢሜል ያረጋግጡ',
    verifyOtp: 'ኦቲፒ ያረጋግጡ',
    resendOtp: 'ኦቲፒ እንደገና ላክ',
    email: 'ኢሜል አድራሻ',
    password: 'የይለፍ ቃል',
    confirmPassword: 'የይለፍ ቃል ያረጋግጡ',
    currentPassword: 'የአሁኑ የይለፍ ቃል',
    newPassword: 'አዲስ የይለፍ ቃል',
    firstName: 'መጠሪያ ስም',
    lastName: 'የአባት ስም',
    phone: 'ስልክ ቁጥር',
    rememberMe: 'ለ7 ቀናት አስታውሰኝ',
    agreeToTerms: 'የአገልግሎት ውሎችን እና የግላዊነት ፖሊሲን እቀበላለሁ',
    termsOfService: 'የአገልግሎት ውሎች',
    privacyPolicy: 'የግላዊነት ፖሊሲ',
    alreadyHaveAccount: 'አካውንት አለዎት?',
    dontHaveAccount: 'አካውንት የለዎትም?',
    createAccount: 'አካውንት ፍጠር',
    welcomeBack: 'እንኳን ደህና መጡ',
    forgotPasswordQuestion: 'የይለፍ ቃልዎን ረስተዋል?',
    checkEmail: 'ኢሜልዎን ይፈትሹ',
    passwordResetSent: 'የይለፍ ቃል ዳግም ማስጀመሪያ ኮድ ወደ ኢሜልዎ ተልኳል',
    otpSent: 'የማረጋገጫ ኮድ ወደ ኢሜልዎ ተልኳል',
    otpExpires: 'ኮድ ያልቃል',
    resendIn: 'እንደገና ለመላክ',
    verificationCode: 'የማረጋገጫ ኮድ',
    enterOtp: '6-አሃዝ ኮድ ያስገቡ',
    role: {
      customer: 'ደንበኛ',
      restaurantOwner: 'የምግብ ቤት ባለቤት',
      rider: 'ዴሊቨሪ ደላላ',
      admin: 'አስተዳዳሪ',
    },
  },

  restaurant: {
    restaurants: 'ምግብ ቤቶች',
    nearYou: 'ቅርብ',
    popular: 'ታዋቂ',
    featured: 'ልዩ',
    all: 'ሁሉም',
    openNow: 'አሁን ክፍት',
    closed: 'ተዘግቷል',
    rating: 'ደረጃ',
    reviews: 'ግምገማዎች',
    deliveryTime: 'የዴሊቨሪ ጊዜ',
    deliveryFee: 'የዴሊቨሪ ክፍያ',
    minimumOrder: 'ዝቅተኛ ትዕዛዝ',
    menu: 'ሜኑ',
    categories: 'ምድቦች',
    addToCart: 'ወደ ጋሪ ጨምር',
    viewMenu: 'ሜኑ ይመልከቱ',
    searchRestaurants: 'ምግብ ቤቶችን ፈልግ...',
    filterBy: 'በ... አጣራ',
    sortBy: 'በ... ደርድር',
    cuisine: 'ምግብ አይነት',
    priceRange: 'የዋጋ ክልል',
    distance: 'ርቀት',
    noRestaurantsFound: 'ምንም ምግብ ቤት አልተገኘም',
    restaurantDetails: 'ዝርዝር',
    aboutRestaurant: 'ስለ ምግብ ቤቱ',
    workingHours: 'የስራ ሰዓቶች',
    location: 'አካባቢ',
    contact: 'ያግኙ',
    addReview: 'ግምገማ ጨምር',
    writeReview: 'ግምገማ ጻፍ',
  },

  food: {
    addToCart: 'ወደ ጋሪ ጨምር',
    removeFromCart: 'ከጋሪ አውጣ',
    quantity: 'ብዛት',
    price: 'ዋጋ',
    total: 'ጠቅላላ',
    calories: 'ካሎሪ',
    ingredients: 'ቅርጫቶች',
    allergens: 'አለርጂዎች',
    spicy: 'የሚቃጠል',
    vegetarian: 'አትክልታዊ',
    vegan: 'ቪጋን',
    glutenFree: 'ጉለተን-ነጻ',
    popular: 'ታዋቂ',
    new: 'አዲስ',
    recommended: 'የሚመከር',
    outOfStock: 'አልቋል',
    available: 'ይገኛል',
    customize: 'ብጁ ያድርጉ',
    addons: 'ተጨማሪዎች',
    specialInstructions: 'ልዩ መመሪያዎች',
  },

  cart: {
    cart: 'ጋሪ',
    myCart: 'የኔ ጋሪ',
    emptyCart: 'ጋሪዎ ባዶ ነው',
    emptyCartDescription: 'ለመጀመር ከምግብ ቤት ዕቃዎችን ይጨምሩ',
    startOrdering: 'ማዘዝ ጀምር',
    items: 'ዕቃዎች',
    subtotal: 'ድምር',
    deliveryFee: 'የዴሊቨሪ ክፍያ',
    discount: 'ቅናሽ',
    total: 'ጠቅላላ',
    promoCode: 'የፕሮሞ ኮድ',
    applyPromo: 'ተግብር',
    removePromo: 'አስወግድ',
    checkout: 'ወደ ክፍያ',
    continueShopping: 'መግዛት ቀጥል',
    clearCart: 'ጋሪ አጽዳ',
    orderSummary: 'የትዕዛዝ ማጠቃለያ',
    itemsInCart: 'ዕቃዎች በጋሪ',
  },

  checkout: {
    checkout: 'ክፍያ',
    deliveryAddress: 'የዴሊቨሪ አድራሻ',
    selectAddress: 'አድራሻ ምረጥ',
    addAddress: 'አዲስ አድራሻ ጨምር',
    paymentMethod: 'የክፍያ ዘዴ',
    selectPayment: 'የክፍያ ዘዴ ምረጥ',
    orderNotes: 'የትዕዛዝ ማስታወሻ',
    placeOrder: 'ትዕዛዝ ስጥ',
    processing: 'በሂደት ላይ...',
    scheduledDelivery: 'ዴሊቨሪ ቀን ይዘጋጁ',
    asap: 'በተቻለ ፍጥነት',
    scheduleFor: 'ለኋላ ቀን ያዝ',
    promoCode: 'የፕሮሞ ኮድ',
    orderTotal: 'የትዕዛዝ ጠቅላላ',
    confirmOrder: 'ትዕዛዝ አረጋግጥ',
  },

  payment: {
    payment: 'ክፍያ',
    selectPaymentMethod: 'የክፍያ ዘዴ ምረጥ',
    telebirr: 'ቴሌብር',
    chapa: 'ቻፓ',
    cbeBirr: 'ሲቢኢ ብር',
    cashOnDelivery: 'በዴሊቨሪ ጊዜ ጥሬ ገንዘብ',
    payNow: 'አሁን ክፈል',
    paymentSuccessful: 'ክፍያ ተሳክቷል',
    paymentFailed: 'ክፍያ አልተሳካም',
    paymentPending: 'ክፍያ በመጠባበቅ ላይ',
    transactionId: 'የግብይት መለያ',
    amount: 'መጠን',
    date: 'ቀን',
    status: 'ሁኔታ',
    refund: 'ተመላሽ ጠይቅ',
    paymentHistory: 'የክፍያ ታሪክ',
  },

  orders: {
    orders: 'ትዕዛዞች',
    myOrders: 'የኔ ትዕዛዞች',
    activeOrders: 'ንቁ ትዕዛዞች',
    orderHistory: 'የትዕዛዝ ታሪክ',
    orderDetails: 'የትዕዛዝ ዝርዝር',
    orderNumber: 'ትዕዛዝ #',
    orderDate: 'የትዕዛዝ ቀን',
    orderStatus: 'ሁኔታ',
    orderItems: 'ዕቃዎች',
    orderTotal: 'ጠቅላላ',
    deliveryAddress: 'የዴሊቨሪ አድራሻ',
    estimatedDelivery: 'የሚጠበቀው ዴሊቨሪ',
    trackOrder: 'ትዕዛዝ ክትትል',
    reorder: 'እንደገና ዘዝ',
    cancelOrder: 'ትዕዛዝ ሰርዝ',
    orderPlaced: 'ትዕዛዝ ተሰጥቷል',
    orderConfirmed: 'ትዕዛዝ ተረጋግጧል',
    preparing: 'በዝግጅት ላይ',
    readyForPickup: 'ለመውሰድ ዝግጁ',
    pickedUp: 'ተወስዷል',
    onTheWay: 'በመምጣት ላይ',
    delivered: 'ደርሷል',
    cancelled: 'ተሰርዟል',
    failed: 'አልተሳካም',
    noOrders: 'ምንም ትዕዛዝ የለም',
    noActiveOrders: 'ምንም ንቁ ትዕዛዝ የለም',
    rateOrder: 'ትዕዛዝ ደርጅ',
    leaveReview: 'ግምገማ ጻፍ',
  },

  tracking: {
    trackOrder: 'ትዕዛዝ ክትትል',
    liveTracking: 'ቀጥታ ክትትል',
    riderLocation: 'ደላላ አካባቢ',
    estimatedArrival: 'የሚጠበቀው መምጣት',
    orderStatus: 'የትዕዛዝ ሁኔታ',
    riderName: 'ደላላ',
    riderPhone: 'የደላላ ስልክ',
    contactRider: 'ደላላ ያናግሩ',
    minutesAway: 'ደቂቃ ርቀት',
    kmAway: 'ኪሎሜትር ርቀት',
    orderDelivered: 'ትዕዛዝ ደርሷል!',
    enjoyMeal: 'ምግብዎን ያጣጥሙ',
  },

  profile: {
    profile: 'መገለጫ',
    myProfile: 'የኔ መገለጫ',
    editProfile: 'መገለጫ አርትዕ',
    personalInfo: 'የግል መረጃ',
    firstName: 'መጠሪያ ስም',
    lastName: 'የአባት ስም',
    email: 'ኢሜል',
    phone: 'ስልክ',
    dateOfBirth: 'የትውልድ ቀን',
    gender: 'ፆታ',
    male: 'ወንድ',
    female: 'ሴት',
    preferNotToSay: 'ላለማስታወቅ እመርጣለሁ',
    avatar: 'የፕሮፋይል ፎቶ',
    changeAvatar: 'ፎቶ ቀይር',
    uploadPhoto: 'ፎቶ ጫን',
    accountSettings: 'የአካውንት ቅንብሮች',
    language: 'ቋንቋ',
    notifications: 'ማሳወቂያዎች',
    privacy: 'ግላዊነት',
    security: 'ደህንነት',
    deleteAccount: 'አካውንት ሰርዝ',
    deleteAccountWarning: 'ይህ ድርጊት መቀልበስ አይቻልም። ሁሉም መረጃዎ በቋሚነት ይሰረዛሉ።',
  },

  address: {
    addresses: 'አድራሻዎች',
    myAddresses: 'የኔ አድራሻዎች',
    addAddress: 'አድራሻ ጨምር',
    editAddress: 'አድራሻ አርትዕ',
    deleteAddress: 'አድራሻ ሰርዝ',
    setDefault: 'ዋና አድርግ',
    defaultAddress: 'ዋና አድራሻ',
    home: 'ቤት',
    work: 'ስራ',
    other: 'ሌላ',
    street: 'የጎዳና አድራሻ',
    city: 'ከተማ',
    subCity: 'ክፍለ ከተማ',
    woreda: 'ወረዳ',
    specificLocation: 'ልዩ አካባቢ',
    recipientName: 'የተቀባይ ስም',
    recipientPhone: 'የተቀባይ ስልክ',
    selectOnMap: 'በካርታ ምረጥ',
    noAddresses: 'ምንም አድራሻ አልተቀመጠም',
    addFirstAddress: 'የመጀመሪያ አድራሻዎን ጨምሩ',
  },

  notifications: {
    notifications: 'ማሳወቂያዎች',
    allNotifications: 'ሁሉም ማሳወቂያዎች',
    unread: 'ያልተነበቡ',
    markAsRead: 'እንደ ተነበበ ምልክት አድርግ',
    markAllAsRead: 'ሁሉንም እንደ ተነበቡ ምልክት አድርግ',
    deleteNotification: 'ሰርዝ',
    noNotifications: 'ምንም ማሳወቂያ የለም',
    orderUpdate: 'የትዕዛዝ ዝማኔ',
    promotion: 'ፕሮሞሽን',
    accountAlert: 'የአካውንት ማስጠንቀቂያ',
    newsletter: 'ዜና',
  },

  cities: {
    selectCity: 'ከተማ ምረጥ',
    deliverTo: 'ወደ... ያድርሱ',
    addisAbaba: 'አዲስ አበባ',
    adama: 'አዳማ',
    hawassa: 'ሐዋሳ',
    direDawa: 'ድሬ ዳዋ',
    bahirDar: 'ባህር ዳር',
    jimma: 'ጅማ',
    comingSoon: 'በቅርቡ ይመጣል',
  },

  errors: {
    somethingWentWrong: 'ችግር ተፈጥሯል። እንደገና ይሞክሩ።',
    networkError: 'የኔትወርክ ስህተት። ግንኙነትዎን ያረጋግጡ።',
    serverError: 'የሰርቨር ስህተት። ትንሽ ቆይተው እንደገና ይሞክሩ።',
    notFound: 'አልተገኘም።',
    unauthorized: 'ይህን ለማከናወን ፍቃድ የለዎትም።',
    forbidden: 'መዳረሻ ተከልክሏል።',
    sessionExpired: 'ክፍለ ጊዜዎ አብቅቷል። እንደገና ይግቡ።',
    invalidCredentials: 'ኢሜል ወይም የይለፍ ቃል ትክክል አይደለም።',
    emailAlreadyExists: 'ይህ ኢሜል ያለው አካውንት አስቀድሞ አለ።',
    phoneAlreadyExists: 'ይህ ስልክ ቁጥር ያለው አካውንት አስቀድሞ አለ።',
    invalidOtp: 'ትክክል ያልሆነ ማረጋገጫ ኮድ። እንደገና ይሞክሩ።',
    otpExpired: 'ማረጋገጫ ኮድ አብቅቷል። አዲስ ይጠይቁ።',
    tooManyAttempts: 'ብዙ ሙከራዎች። ትንሽ ቆይተው እንደገና ይሞክሩ።',
    accountSuspended: 'አካውንትዎ ታግዷል። ድጋፍ ያግኙ።',
    accountInactive: 'አካውንትዎ ንቁ አይደለም። ድጋፍ ያግኙ።',
    emailNotVerified: 'ከመግባቱ በፊት ኢሜልዎን ያረጋግጡ።',
    paymentFailed: 'ክፍያ አልተሳካም። እንደገና ይሞክሩ ወይም ሌላ ዘዴ ይጠቀሙ።',
    orderFailed: 'ትዕዛዝ መስጠት አልተሳካም። እንደገና ይሞክሩ።',
    locationRequired: 'ይህን ባህሪ ለመጠቀም አካባቢ ፈቃድ ያስፈልጋል።',
  },

  success: {
    registered: 'አካውንት ተፈጥሯል! ኢሜልዎን ያረጋግጡ።',
    loggedIn: 'እንኳን ደህና መጡ!',
    loggedOut: 'ወጥተዋል።',
    emailVerified: 'ኢሜል ተረጋግጧል!',
    passwordReset: 'የይለፍ ቃል ዳግም ተጀምሯል!',
    passwordChanged: 'የይለፍ ቃል ተቀይሯል!',
    profileUpdated: 'መገለጫ ተዘምኗል!',
    addressAdded: 'አድራሻ ተጨምሯል!',
    addressUpdated: 'አድራሻ ተዘምኗል!',
    addressDeleted: 'አድራሻ ተሰርዟል!',
    orderPlaced: 'ትዕዛዝ ተሰጥቷል!',
    orderCancelled: 'ትዕዛዝ ተሰርዟል!',
    reviewSubmitted: 'ግምገማ ቀርቧል!',
    addedToCart: 'ወደ ጋሪ ተጨምሯል!',
    removedFromCart: 'ከጋሪ ወጥቷል!',
    addedToFavourites: 'ወደ ተወዳጆች ተጨምሯል!',
    removedFromFavourites: 'ከተወዳጆች ወጥቷል!',
    promoApplied: 'የፕሮሞ ኮድ ተተግብሯል!',
    paymentSuccessful: 'ክፍያ ተሳክቷል!',
    settingsUpdated: 'ቅንብሮች ተዘምኗል!',
  },

  restaurantDashboard: {
    dashboard: 'ዳሽቦርድ',
    totalOrders: 'ጠቅላላ ትዕዛዞች',
    totalRevenue: 'ጠቅላላ ገቢ',
    activeOrders: 'ንቁ ትዕዛዞች',
    averageRating: 'አማካይ ደረጃ',
    todayOrders: 'የዛሬ ትዕዛዞች',
    todayRevenue: 'የዛሬ ገቢ',
    pendingOrders: 'በመጠባበቅ ላይ ያሉ',
    menu: 'ሜኑ',
    addItem: 'ዕቃ ጨምር',
    editItem: 'ዕቃ አርትዕ',
    deleteItem: 'ዕቃ ሰርዝ',
    toggleAvailability: 'ተደራሽነት ቀይር',
    restaurantSettings: 'የምግብ ቤት ቅንብሮች',
    openClose: 'ክፈት / ዝጋ',
    workingHours: 'የስራ ሰዓቶች',
    deliverySettings: 'የዴሊቨሪ ቅንብሮች',
    payoutSettings: 'የክፍያ ቅንብሮች',
  },

  riderDashboard: {
    dashboard: 'ዳሽቦርድ',
    activeDelivery: 'ንቁ ዴሊቨሪ',
    totalDeliveries: 'ጠቅላላ ዴሊቨሪዎች',
    totalEarnings: 'ጠቅላላ ገቢ',
    todayEarnings: 'የዛሬ ገቢ',
    rating: 'ደረጃ',
    availability: 'ዝጋጁነት',
    online: 'ኦንላይን',
    offline: 'ኦፍላይን',
    goOnline: 'ኦንላይን ሁን',
    goOffline: 'ኦፍላይን ሁን',
    currentDelivery: 'የአሁኑ ዴሊቨሪ',
    deliveryHistory: 'የዴሊቨሪ ታሪክ',
    earnings: 'ገቢ',
    weeklyEarnings: 'የሳምንት ገቢ',
    monthlyEarnings: 'የወር ገቢ',
    acceptDelivery: 'ዴሊቨሪ ተቀበል',
    rejectDelivery: 'ዴሊቨሪ ተቀበይ',
    pickupOrder: 'ተወሰደ',
    deliverOrder: 'እንደ ደረሰ ምልክት አድርግ',
  },

  adminDashboard: {
    dashboard: 'ዳሽቦርድ',
    totalUsers: 'ጠቅላላ ተጠቃሚዎች',
    totalRestaurants: 'ጠቅላላ ምግብ ቤቶች',
    totalOrders: 'ጠቅላላ ትዕዛዞች',
    totalRevenue: 'ጠቅላላ ገቢ',
    activeUsers: 'ንቁ ተጠቃሚዎች',
    pendingRestaurants: 'በመጠባበቅ ምግብ ቤቶች',
    users: 'ተጠቃሚዎች',
    restaurants: 'ምግብ ቤቶች',
    orders: 'ትዕዛዞች',
    riders: 'ደላሎች',
    payments: 'ክፍያዎች',
    promotions: 'ፕሮሞሽኖች',
    analytics: 'ትንታኔ',
    settings: 'ቅንብሮች',
    verifyRestaurant: 'ምግብ ቤት አረጋግጥ',
    rejectRestaurant: 'ምግብ ቤት ውድቅ አድርግ',
    suspendUser: 'ተጠቃሚ አግድ',
    activateUser: 'ተጠቃሚ አንቃ',
    createPromotion: 'ፕሮሞሽን ፍጠር',
    platformFee: 'የፕላትፎርም ክፍያ',
    systemSettings: 'የስርዓት ቅንብሮች',
  },
};

// ─── Translations Map ─────────────────────────────────────────────────────────
export const translations: Record<Locale, ITranslations> = { en, am };

export default translations;
