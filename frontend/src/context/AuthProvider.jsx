import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('MS_token_session');

            if(!token) {
                setLoading(false);
                return
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clientAxios('/profiles/users', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setLoading(false);
        };

        authUser();
    }, []);

    const logOut = () => {
        localStorage.removeItem('MS_token_session');
        setAuth({})
    };

    return (
        <AuthContext.Provider
            // Value is a prop that defines all states or components that are going to be available on all app
            value={{
                auth,
                setAuth,
                loading,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export {
    AuthProvider
}

export default AuthContext;