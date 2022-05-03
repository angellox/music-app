import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clientAxios from '../config/axios';
// Internal Components
import Alert from '../components/Alert';
// Images imports
import musicMoving from '../images/music-moving.gif';

const ConfirmAccount = () => {

  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const { rol, token } = params;
  
  useEffect( () => {
    const confirmAccount = async () => {     

      const url = rol === 'artist' ? 
      `/profiles/confirm/artist/${token}` : 
      `/profiles/confirm/listener/${token}`;

      try {

        if(!loading) {
          const { data } = await clientAxios(url);
          setIsAccountConfirmed(true);
          setAlert({
            msg: data.msg,
            error: false
          });
        }

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }

      setLoading(false);
      
    };

    confirmAccount();
    
  }, [loading]);

  return (
    <>
        <div>
          <h1 className='text-center text-4xl mb-5'>
            Confirming your <span className=' text-cream-600 font-bold'>account</span>
          </h1>
        </div>

        {!loading && <Alert alert={alert} />}
        
        <div className='mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          <div className='m-auto mb-5 bg-no-repeat bg-cover h-32 w-52 relative' style={{ backgroundImage: `url(${musicMoving})` }}>
          </div>
          
          <nav className='lg:flex lg:justify-center space-x-10'>
            <Link
              className='block text-center text-zinc-600 hover:border-b-2 transition-all' 
              to="/"
            >
              You ready? Log in</Link>
            <Link 
              className='block text-center text-zinc-600 hover:border-b-2 transition-all'
              to="/sign-up"
            >
              Create your account here</Link>
          </nav>
        </div>
    </>
  )
};

export default ConfirmAccount;