# Nemo E-commerce App 🛍️

A modern, full-featured e-commerce mobile application built with **React Native** and **Expo**. This app demonstrates a complete shopping flow from product discovery to checkout, featuring a beautiful UI styled with **NativeWind**.

## 🚀 Features

-   **📱 Modern UI/UX**: Clean, responsive design using Tailwind CSS (NativeWind).
-   **🏠 Home Screen**:
    -   **Infinite Scroll**: Smooth performance with `VirtualizedList`.
    -   **Search & Filter**: Real-time product search and category filtering.
    -   **Trending Products**: Highlighted collections.
-   **🛒 Shopping Experience**:
    -   **Product Details**: Rich product views with image galleries and descriptions.
    -   **Cart Management**: Add/remove items, adjust quantities.
    -   **Wishlist**: Save favorite items for later.
-   **💳 Checkout Flow**:
    -   Shipping Address Form.
    -   Payment Method Selection.
    -   Order Summary & Success Screens.
-   **⚙️ Admin Dashboard** (Built-in):
    -   **Product Management**: Add, Edit, and Delete products directly from the app.
    -   **Form Handling**: Robust form validation for product details.

## 🛠️ Tech Stack

-   **Framework**: [React Native](https://reactnative.dev/) (Expo SDK 52)
-   **Language**: TypeScript / JavaScript
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Navigation**: [React Navigation](https://reactnavigation.org/) (Stack & Bottom Tabs)
-   **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
-   **Icons**: Expo Vector Icons (Ionicons)
-   **Backend**: Custom Node.js/Express API (Hosted on Vercel)

## 🏃‍♂️ Getting Started

### Prerequisites

-   Node.js installed.
-   [Expo Go](https://expo.dev/client) app installed on your iOS or Android device.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ArfatChowdhury/nemo-e-commerce-app.git
    cd nemo-e-commerce-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the app**:
    ```bash
    npx expo start --clear
    ```

4.  **Run on Device**:
    -   Scan the QR code with your Android (Expo Go) or iOS (Camera) device.

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (Cards, Headers, Buttons)
├── navigation/      # Stack and Tab navigators
├── screens/         # Application screens (Home, Cart, Profile, etc.)
├── Store/           # Redux slices and store configuration
├── constants/       # App constants and API config
└── ...
```

## 🔮 Future Improvements

-   [ ] **User Authentication**: Re-integrate Firebase for secure Login/Signup.
-   [ ] **Payment Gateway**: Integrate Stripe or PayPal for real payments.
-   [ ] **Push Notifications**: Order updates and promo alerts.

---

Made with ❤️ by Arfat Chowdhury
