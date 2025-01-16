import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const api_endpoint = 'http://127.0.0.1:8000/api'
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [authenticated, setAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState((localStorage.getItem('token')) || null);
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('user_email') || null);

    const navigate = useNavigate();


    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        if (authToken) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }

    }, [authToken]);






    const signUp = async (username, email, password) => {
        try {
            const header = {

            }
            const body = {
                'email': email,
                'username': username,
                'password': password

            }
            const response = await axios.post(`${api_endpoint}/user/register`, body, { headers: { 'Content-Type': 'application/json' } });

            const res = await axios.post(`${api_endpoint}/token`, body, { headers: { 'Content-Type': 'application/json' } });

            console.log(res.data)


        } catch (error) {
            console.error('Failed to sign up:', error);
            setAuthenticated(false);
        }
    };


    const login = async (username, password) => {
        try {
            const header = {
                'Content-Type': 'application/json'
            }
            const body = {
                'username': username,
                'password': password

            }
            const response = await axios.post(`${api_endpoint}/api/token`, body, {
                header
            });

        } catch (error) {
            console.log('Failed to sign in:', error);
            setAuthenticated(false)
        }
    };

    const logout = () => {
        setAuthToken(null);
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        navigate('/');

    };

    return (
        <AuthContext.Provider value={{
            theme,
            setTheme,
            authenticated,
            authToken,
            userId,
            userEmail,
            signUp,
            login,
            logout,
            api_endpoint
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
