import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('MS_token_session');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            if(!token) {
                setLoading(false);
                return
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
        setAuth({});
    };

    const editProfile = async profile => {
        const token = localStorage.getItem('MS_token_session');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/profiles/users/${profile.id}`;
            const { data } = await clientAxios.put(url, profile, config);

            return {
                error: false
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    };

    return (
        <AuthContext.Provider
            // Value is a prop that defines all states or components that are going to be available on all app
            value={{
                auth,
                setAuth,
                loading,
                logOut,
                editProfile
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