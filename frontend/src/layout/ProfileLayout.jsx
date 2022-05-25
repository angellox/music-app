import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// Layouts
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';

const ProfileLayout = () => {

    const { auth, loading } = useAuth();

    if(loading) return 'loading. . .'
    
    return (
        <>
            <HeaderLayout />
                { auth?._id ? (
                    <main className='container mx-auto py-8 px-3 '>
                        <Outlet />
                    </main>
                )  : <Navigate to='/'/> }
            <FooterLayout />
        </>
    )
}

export default ProfileLayout;