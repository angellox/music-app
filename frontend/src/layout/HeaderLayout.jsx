import background from '../images/header-background.jpg';
import useAuth from '../hooks/useAuth';

const HeaderLayout = () => {
    const { auth, logOut } = useAuth();
    return (
        <header>
            <div className='flex justify-center items-center bg-no-repeat bg-cover relative h-60' style={{ backgroundImage: `url(${background})` }}>
                <div className='bg-black opacity-10 w-full h-full absolute'></div>
                <div className='absolute text-center'>
                    <div className='flex flex-col uppercase font-bold text-white'>
                        <h1 className='text-6xl'>Music Sharing {' '}</h1>
                        <p className='text-xl'>The best site to find your song</p>
                    </div>

                    {
                        auth?._id && (
                            <nav className='mt-3'>
                                <button
                                    type='button'
                                    className='text-black text-sm uppercase font-bold bg-white py-2 px-5 rounded-md hover:bg-black hover:text-white transition-all ease-in-out'
                                    onClick={logOut}
                                >Log out</button>
                            </nav>
                        )
                    }

                </div>
            </div>

        </header>
    )
}

export default HeaderLayout;