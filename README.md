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
-   **⚙️ Admin Dashboard** (Built-in,Admin access only):
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
    # Nemo — E‑commerce (Mobile + Web)

    This repository contains the React Native / Expo mobile app for Nemo. A separate repository provides the Web (Next.js) storefront. Below you'll find mobile setup details and links/instructions for the web version.

    ## Mobile (React Native / Expo)

    Quick summary: mobile storefront built with Expo, NativeWind for styling, and Redux Toolkit for state.

    Prerequisites
    - Node.js (16+ recommended)
    - Expo Go for device testing (optional)

    Install & run (mobile)
    ```bash
    git clone https://github.com/ArfatChowdhury/nemo-e-commerce-app.git
    cd nemo-e-commerce-app
    npm install
    npx expo start
    ```

    Run shortcuts
    ```bash
    npm run android
    npm run ios
    npm run web
    ```

    Project layout (mobile)
    ```
    .
    ├─ App.tsx                 # App entry (providers, splash, navigator)
    ├─ index.tsx               # Expo registerRootComponent
    ├─ assets/                 # images and static assets
    ├─ src/
    │  ├─ components/         # presentational components
    │  ├─ navigation/         # AppNavigator and route types
    │  ├─ screens/            # Screens (Home, ProductDetails, Cart, Profile...)
    │  ├─ Store/              # Redux store and slices
    │  └─ constants/          # API config and app constants
    ```

    Notes
    - Firebase helpers are under `src/constants/firebase.ts`. Provide your own Firebase config for auth/storage.
    - The mobile app expects a backend API (link in this README). Use `.env` or your preferred method to provide keys.

    ## Web (Next.js) — separate repository

    There is a full-featured web storefront in a separate repository and live site:

    - Repository: https://github.com/ArfatChowdhury/nemo-e-commerce-web-app
    - Live site: https://nemo-e-commerce-web-app.vercel.app/

    Highlights from the web project
    - Built with Next.js (App Router) + React 19 + TypeScript
    - Tailwind CSS + DaisyUI for styling
    - Redux Toolkit for state management
    - Firebase for authentication and backend services
    - ImgBB used for image uploads in admin flows
    - Admin dashboard with product management, analytics, and role-based access
    - APK download and app-promotional banner supported via `public/apps` on the web repo

    Quick web setup
    ```bash
    git clone https://github.com/ArfatChowdhury/nemo-e-commerce-web-app.git
    cd nemo-e-commerce-web-app
    npm install
    ```

    Create `.env.local` (example keys used by the web app)
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
    NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
    NEXT_PUBLIC_API_URL=https://backend-of-nemo.vercel.app
    ```

    Run web dev server
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Build for production
    ```bash
    npm run build
    npm start
    ```

    Notes about the web project
    - The web project includes SEO-optimized product pages, responsive layout, toast notifications, and skeleton loaders.
    - Admin features rely on ImgBB for image host uploads; add `NEXT_PUBLIC_IMGBB_API_KEY` to enable uploads.
    - The web repo is deployed on Vercel and uses environment variables configured in the Vercel dashboard for production.

    ## Backend

    The backend API used by both apps is available at:
    https://github.com/ArfatChowdhury/backend-of-nemo

    Configure `NEXT_PUBLIC_API_URL` (web) and the mobile app's API endpoint to point to your backend deployment.

    ---
    Made with ❤️ by Arfat
