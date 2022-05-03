import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Internal Libraries
import Alert from '../components/Alert';
import clientAxios from '../config/axios';

const NewPassword = () => {

  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState({});
  const [isRequestValid, setIsRequestValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const { rol, token } = params;

  const handleSubmit = async e => {
    e.preventDefault();

    if (newPassword === '' || newPassword.length < 6) {
      setAlert({
        msg: 'Password is required and must be at least 6 characters length',
        error: true
      });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/profiles/forgotten-password/${rol}/${token}`, { newPassword });

      setAlert({
        msg: data.msg
      });

      setTimeout(() => {
        navigate('/');
      }, 6000);

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  useEffect(() => {
    const validateRequest = async () => {

      try {

        if (!loading) {
          await clientAxios(`/profiles/forgotten-password/${rol}/${token}`);
          setAlert({
            msg: 'Set your new password here. At least 6 characters length'
          });
          setIsRequestValid(true);
        }

      } catch (error) {
        setAlert({
          msg: 'This link is not valid',
          error: true
        });
      }

      setLoading(false);
    };

    validateRequest();

  }, [loading]);

  return (
    <>
      <div>
        <h1 className='text-center text-4xl mb-5'>
          Set your <span className=' text-cream-600 font-bold'>new password</span>
        </h1>
      </div>

      <Alert alert={alert} />

      <div className='mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {isRequestValid ? (
          <>
            <form onSubmit={handleSubmit}>

              <div className='mt-7'>
                <label
                  className='uppercase text-2xl block font-bold text-zinc-700'
                >
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Type your new password"
                  className='text-sm border-b-2 w-full p-3 border-zinc-300 outline-none focus:border-zinc-400 transition-all font-light mt-3 bg-zinc-100 rounded-xl'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>

              <input
                type='submit'
                value='Set new password'
                className='bg-cream-600 w-full rounded-xl py-1 px-10 uppercase font-bold text-white text-lg mt-5 hover:cursor-pointer hover:bg-cream-700 md:w-auto'
              />
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
              <Link
                className='block text-center text-zinc-700 hover:border-b-2 transition-all'
                to="/sign-up"
              >
                Don't have an account yet? Sign up</Link>
              <Link
                className='block text-center text-zinc-700 hover:border-b-2 transition-all'
                to="/"
              >
                You ready? Log in</Link>
            </nav>
          </>
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-octagon" width="64" height="64" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#B4445C" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>

            <p className='text-2xl font-light'>Wrong request {':('}</p>
          </div>

        )
        }
      </div>
    </>
  )
}

export default NewPassword;