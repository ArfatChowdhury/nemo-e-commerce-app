import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    User,
    updateProfile
} from 'firebase/auth';
import { auth } from '../constants/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Sign up with email and password
    const signUp = async (email: string, password: string, name: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update profile with display name
        if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName: name });
        }
    };

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    // Log out
    const logOut = async () => {
        await signOut(auth);
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        signUp,
        signIn,
        logOut
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
