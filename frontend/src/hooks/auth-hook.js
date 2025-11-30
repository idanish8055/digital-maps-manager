import { useState, useEffect, useCallback } from "react";
import { getUserInfo } from '../utils/api';
let logoutTimer;

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user_id, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const login = useCallback((user_id, token, role, name, email, expirationDate) => {
        //1000 * 60 * 60
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        setIsLoggedIn(true);
        setUserId(user_id);
        setToken(token);
        setRole(role);
        setName(name);
        setEmail(email);
        localStorage.setItem("userData", JSON.stringify({ token, user_id, role, name, email, expiration: tokenExpirationDate.toISOString() }));
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
        setToken(null);
        setTokenExpirationDate(null);
        setRole(null);
        setName(null);
        setEmail(null);
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        window.location.href = "/";
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        }
        else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);
    
    useEffect(() => {
        const sessionData = JSON.parse(localStorage.getItem("userData"));
        if (sessionData && sessionData.token && new Date(sessionData.expiration) > new Date()) {
            login(sessionData.user_id, sessionData.token, sessionData.role, sessionData.name, sessionData.email, new Date(sessionData.expiration));
        }
        else if (sessionData && new Date(sessionData.expiration) < new Date()) {
            logout();
        }
    }, [login]);
    return ({ token, user_id, isLoggedIn, role, login, logout, name, email });
}

export default useAuth;