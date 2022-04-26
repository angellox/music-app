import { Outlet } from 'react-router-dom';
import background from '../images/header-background.jpg';

const AuthLayout = () => {

  const date = new Date().getFullYear();

  return (
    <>
      <header>
        <div className='bg-no-repeat bg-cover h-60 relative flex flex-col justify-center items-center' style={{ backgroundImage: `url(${background})` }}>
          <div className='bg-black opacity-10 w-full h-full absolute'></div>
          <div className='absolute uppercase text-center font-bold text-white'>
            <h1 className='text-6xl'>Music Sharing {' '}</h1>
            <p className='text-xl'>The best site to find your song</p>
          </div>
        </div>
      </header>

      <main className='container mx-auto xl:w-1/2 2xl:w-1/3 py-8 px-3 '>
        <Outlet />
      </main>

      <footer>
        <div className='bg-cream-600 flex py-5 text-center md:justify-center items-center md:space-x-72 flex-col md:flex-row'>
          <div>
            <p className='mx-auto my-2 text-white'>© {date} Music Sharing. All rights reserved. Created by <span className='font-bold'>angellox_o</span></p>
          </div>
          <div className='flex space-x-4'>
            <div style={{ background: 'rgba(0,0,0,0.17)' }} className='rounded-full p-1'>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                </svg>
              </a>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.17)' }} className='rounded-full p-1'>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-snapchat" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.882 7.842a4.882 4.882 0 0 0 -9.764 0c0 4.273 -.213 6.409 -4.118 8.118c2 .882 2 .882 3 3c3 0 4 2 6 2s3 -2 6 -2c1 -2.118 1 -2.118 3 -3c-3.906 -1.709 -4.118 -3.845 -4.118 -8.118zm-13.882 8.119c4 -2.118 4 -4.118 1 -7.118m17 7.118c-4 -2.118 -4 -4.118 -1 -7.118" />
                </svg>
              </a>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.17)' }} className='rounded-full p-1'>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                </svg>
              </a>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.17)' }} className='rounded-full p-1'>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-youtube" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="3" y="5" width="18" height="14" rx="4" />
                  <path d="M10 9l5 3l-5 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AuthLayout;