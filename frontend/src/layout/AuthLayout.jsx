import { Outlet } from 'react-router-dom';
import background from '../images/header-background.jpg';

const AuthLayout = () => {
  return (
    <>
        <header>
            <div className='  bg-no-repeat bg-cover h-60 relative flex flex-col justify-center items-center' style={{backgroundImage: `url(${background})`}}>
              <div className='bg-black opacity-10 w-full h-full absolute'></div>
              <div className='absolute uppercase text-center font-bold text-4xl'>
                <h1 className='text-white'>Music Sharing {' '}
                  <p className='text-sm'>The best site to find your song</p>
                </h1>
              </div>
            </div>
        </header>

        <main className='container mx-auto'>
          <Outlet />
        </main>

        <footer>
          <div className='bg-no-repeat bg-cover bg-center h-10 relative' style={{backgroundImage: `url(${background})`}}>
            <div className='text-white flex justify-between flex-wrap'>
              <p className='mx-auto my-2'>© 2022 Music Sharing. All rights reserved</p>
              <p className='mx-auto my-2'>This page was created by @angellox</p>
            </div>
            
          </div>
        </footer>
    </>
  )
}

export default AuthLayout;