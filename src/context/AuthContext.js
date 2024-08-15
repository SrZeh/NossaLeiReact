// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Certifique-se de que o auth é exportado do seu firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Crie o contexto de autenticação
const AuthContext = createContext();

// Provedor de Autenticação
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Função para logout
    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
    return useContext(AuthContext);
}
