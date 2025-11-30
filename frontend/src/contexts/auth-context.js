import { createContext, useContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    role: null,
    name: null,
    email: null,
    vendorInfo: null,
    login: () => { },
    logout: () => { }
});

const AuthProvider = (props) => {
    const { isLoggedIn, userId, token, login, name, email, logout, role, vendorInfo } = props.value;
    return (<AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        token: token,
        role: role,
        name: name,
        email: email,
        vendorInfo: vendorInfo,
        login: login,
        logout: logout
    }}>
        {props.children}
    </AuthContext.Provider>);
}

const useAuthContext = () => {
    const Auth = useContext(AuthContext);
    return (Auth);
}

export { AuthProvider, useAuthContext };