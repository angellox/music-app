import { Outlet } from 'react-router-dom';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';

const AuthLayout = () => {

  return (
    <>
      <HeaderLayout />

      <main className='container mx-auto xl:w-1/2 2xl:w-1/3 py-8 px-3 '>
        <Outlet />
      </main>

      <FooterLayout />
    </>
  )
}

export default AuthLayout;