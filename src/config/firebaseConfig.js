// Firebase configuration
// Lazy initialization to avoid React Native 0.76 new architecture conflicts

const firebaseConfig = {
    apiKey: "AIzaSyDh08N9bC9lUQVg01IJ1DccB4vBBU9Y9GQ",
    authDomain: "nemo-e-commerce.firebaseapp.com",
    projectId: "nemo-e-commerce",
    storageBucket: "nemo-e-commerce.firebasestorage.app",
    messagingSenderId: "206111615276",
    appId: "1:206111615276:web:8cf10da42619d91977e489"
};

let app = null;
let auth = null;

// Lazy initialize Firebase only when auth is actually needed
export const getFirebaseAuth = async () => {
    if (!auth) {
        const { initializeApp } = await import('firebase/app');
        const { getAuth } = await import('firebase/auth');

        if (!app) {
            app = initializeApp(firebaseConfig);
        }
        auth = getAuth(app);
    }
    return auth;
};

export default getFirebaseAuth;
