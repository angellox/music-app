import { useState } from 'react';
import { Link } from 'react-router-dom';
// Internal libraries
import Alert from '../components/Alert';
import clientAxios from '../config/axios';

const ForgottenPassword = () => {

  const [email, setEmail] = useState('');
  const [alert, setAlert]  = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '' || email.length < 6) {
      setAlert({ msg: 'Email is required', error: true });
      return;
    }

    try {

      const { data } = await clientAxios.post('/profiles/forgotten-password', { email });
      
      setAlert({
        msg: data.msg
      });

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
          Retrieve your account and don't lose the <span className=' text-cream-600 font-bold'>tuning</span>
        </h1>
      </div>

      <Alert alert={alert}/>

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

          <input
            type='submit'
            value='Retrieve your password'
            className='bg-cream-600 w-full rounded-xl py-1 px-10 uppercase font-bold text-white text-lg mt-5 hover:cursor-pointer hover:bg-cream-700 md:w-auto'
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center text-zinc-700 hover:border-b-2 transition-all'
            to="/"
          >
            Do you have an account already? Log in</Link>
          <Link
            className='block text-center text-zinc-700 hover:border-b-2 transition-all'
            to="/sign-up"
          >
            Don't have an account yet? Sign up</Link>
        </nav>

      </div>
    </>
  )
}

export default ForgottenPassword;