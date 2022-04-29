import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert';

const ConfirmAccount = () => {

  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const { rol, token } = params;
  
  useEffect( () => {
    const confirmAccount = async () => {

      const url = rol === 'artist' ? `http://localhost:4000/api/profiles/confirm/artist/${token}` : `http://localhost:4000/api/profiles/confirm/listener/${token}`;

      try {
        const { data } = await axios(url);

        setIsAccountConfirmed(true);
        setAlert({
          msg: data.msg,
          loading: data,
          error: false
        });

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }

      setLoading(false);

    };

    confirmAccount();
  }, []);

  return (
    <>
        <div>
          <h1 className='text-center text-4xl mb-5'>
            Confirm your <span className=' text-cream-600 font-bold'>account</span>
          </h1>
        </div>

          <Alert alert={alert}></Alert>

        <div className='mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        </div>
    </>
  )
};

export default ConfirmAccount;