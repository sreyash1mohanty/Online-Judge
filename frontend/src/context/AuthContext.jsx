import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
const cookies = new Cookies();
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userId,setUserId]=useState(null);
    useEffect(() => {
        const token = cookies.get('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setIsAuthenticated(true);
            setUserRole(decodedToken.role);
            setUserId(decodedToken.id);
        }
    }, []);

    const login = (token) => {
        const decodedToken = jwtDecode(token);
        cookies.set('token', token, { path: '/' });
        setIsAuthenticated(true);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.id);
    };

    const logout = () => {
        cookies.remove('token', { path: '/' });
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout,userRole,userId }}>
            {children}
        </AuthContext.Provider>
    );
};
