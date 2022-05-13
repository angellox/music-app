import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
// Internal libraries
import Alert from '../components/Alert';
import clientAxios from '../config/axios';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    
    if([email, password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true
      });
      return;
    }

    try {
      const { data } = await clientAxios.post('/profiles', { email, password });
      localStorage.setItem('MS_token_session', data.token);
      setAuth(data);


      if(data.isArtist) {
        navigate('/artist');
      }

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  };

  return (
    <>
        <div>
          <h1 className='text-center text-4xl mb-5'>
            Log in and upload your <span className=' text-cream-600 font-bold'>songs</span>
          </h1>
        </div>

        <Alert alert={alert} />

        <div className='mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className='uppercase text-2xl block font-bold text-zinc-700'
              >
                Email
              </label>
              <input 
                type="email" 
                placeholder="Type your email"
                className='text-sm border-b-2 w-full p-3 border-zinc-300 outline-none focus:border-zinc-400 transition-all font-light mt-3 bg-zinc-100 rounded-xl'
                value={email}
                onChange={ e => setEmail(e.target.value) }
              />
            </div>

            <div className='mt-7'>
              <label
                className='uppercase text-2xl block font-bold text-zinc-700'
              >
                Password
              </label>
              <input 
                type="password" 
                placeholder="Type your password"
                className='text-sm border-b-2 w-full p-3 border-zinc-300 outline-none focus:border-zinc-400 transition-all font-light mt-3 bg-zinc-100 rounded-xl'
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />
            </div>

            <input 
              type='submit'
              value='Log in'
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
              to="/forgotten-password"
            >
              Forgotten password?</Link>
          </nav>

        </div>
    </>
  )
}

export default Login;