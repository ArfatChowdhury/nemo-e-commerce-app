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

## 🔗 Backend Repository

The backend server for this application can be found here:
[https://github.com/ArfatChowdhury/backend-of-nemo](https://github.com/ArfatChowdhury/backend-of-nemo)

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
    Nemo — E‑commerce Mobile App

    Nemo is a React Native + Expo mobile storefront showcasing a complete shopping experience: browse products, manage cart & wishlist, and run a built-in product management flow. The app uses NativeWind (Tailwind) for styling and Redux Toolkit for state.

    **Status:** Example / demo app (Expo SDK 52)

    **Key features**
    - Product browsing and detailed product pages
    - Cart, wishlist, and checkout flow (UI-level)
    - Product management screens (add / edit products)
    - Firebase integration helpers and image picker utilities

    **Tech stack**
    - React Native + Expo
    - TypeScript / JavaScript
    - Redux Toolkit (store under `src/Store`)
    - React Navigation (stack & tabs)
    - NativeWind (Tailwind for RN) + TailwindCSS tooling
    - Firebase (client SDK)

    ## Getting started

    ### Prerequisites
    - Node.js (16+ recommended)
    - Expo CLI (optional) or use `npx expo`
    - For device testing: Expo Go on iOS/Android

    ### Install
    ```bash
    git clone https://github.com/ArfatChowdhury/nemo-e-commerce-app.git
    cd nemo-e-commerce-app
    npm install
    ```

    ### Run
    - Start Metro / Expo:
    ```bash
    npx expo start
    ```
    - Run on Android / iOS / Web using the Expo UI or:
    ```bash
    npm run android
    npm run ios
    npm run web
    ```

    Scripts available (from `package.json`): `start`, `android`, `ios`, `web`.

    ## Project layout
    ```
    .
    ├─ App.tsx                 # App entry (providers, splash, navigator)
    ├─ index.tsx               # Expo registerRootComponent
    ├─ assets/                 # images and static assets
    ├─ src/
    │  ├─ components/         # presentational components (ProductCard, Header, etc.)
    │  ├─ navigation/         # AppNavigator and route types
    │  ├─ screens/            # Screens (Home, ProductDetails, Cart, Profile...)
    │  ├─ Store/              # Redux store and slices
    │  └─ constants/          # API config and app constants
    ```

    ## Configuration notes
    - Firebase config lives under `src/constants/firebase.ts` — supply your own project keys for auth/database usage.
    - Environment variables: the project uses `dotenv` in dev; follow your own workflow to load `.env` values if needed.

    ## Contributing & next steps
    - This repo is a demo/sample. If you want to adapt it:
      - Wire a production backend (API, payments)
      - Add real user auth and secure endpoints
      - Harden forms and add validations where necessary
