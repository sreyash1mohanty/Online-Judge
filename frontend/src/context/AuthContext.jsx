import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = cookies.get('token');
        setIsAuthenticated(!!token);
    }, []);

    const login = (token) => {
        cookies.set('token', token, { path: '/' });
        setIsAuthenticated(true);
    };

    const logout = () => {
        cookies.remove('token', { path: '/' });
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
