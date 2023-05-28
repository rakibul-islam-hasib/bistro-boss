import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../config/firebase/firebase.config';


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const auth = getAuth(app);

    const signUp = async (email, password) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error
        }
    }
    const login = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error
        }
    }
    const logout = async () => {
        try {
            return await signOut(auth)
        } catch (error) {
            throw error
        }
    }

    // Observe user state (auth)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoader(false);
        });
        return () => unsubscribe();
    }, [])
    const contextVale = { user, loader, setLoader, signUp, login, logout }
    return (
        <AuthContext.Provider value={contextVale}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;