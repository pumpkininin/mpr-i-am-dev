import { createContext, useState } from 'react';

export const AuthContext = createContext({
    email: '',
    token: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {}
})

function AuthProvider({ children }) {
    const [email, setEmail] = useState();
    const [authToken, setAuthToken] = useState();

    function authenticate(email, token) {
        setEmail(email)
        setAuthToken(token)
    }

    function logout() {
        setAuthToken('')
    }

    const values = {
        email: email,
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;