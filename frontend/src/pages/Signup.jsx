import { useState } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../config/axios';
// Internal components
import Alert from '../components/Alert';
import Genres from '../components/Genres';

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [photo, setPhoto] = useState();
  const [genre, setGenre] = useState('');

  const [alert, setAlert] = useState({});


  const handleSubmit = async e => {
    e.preventDefault();
    
    if([name, email, password, repeatPassword].includes('')) {
      setAlert({ msg: 'Empty fields. There are mandatory fields', error: true });
      return;
    }

    if(password !== repeatPassword) {
      setAlert({ msg: 'Passwords are not equal. Review them', error: true });
      return;
    }

    if(password.length < 6) {
      setAlert({ msg: 'Password too short. Minimum 6 characters length', error: true });
      return;
    }

    // Creating an user in API
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('photo', photo);
      data.append('genre', genre);
      
      await clientAxios.post('/profiles/sign-up', data);
      setName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
      setPhoto();
      setGenre('');
      // Sending message to customer
      setAlert({
        msg: 'Cuenta creada exitosamente. Revise su email',
        error: false
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
            Sign up and keep in <span className=' text-cream-600 font-bold'>tuning</span>
          </h1>
        </div>
        <div className='mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

          <Alert alert={alert}></Alert>

          <form onSubmit={handleSubmit}>
            <div className='text-sm mb-2'>
              <span className='text-red-700 font-bold'>* </span>Please, fill the mandatory fields
            </div>

            <div>
              <label
                className='uppercase text-2xl block font-bold text-zinc-700'
              >
                Name <span className='text-red-700 font-bold text-sm'>*</span>
              </label>
              <input 
                type="text" 
                placeholder="Type your full or short name"
                className='text-sm border-b-2 w-full p-3 border-zinc-300 outline-none focus:border-zinc-400 transition-all font-light mt-3 bg-zinc-100 rounded-xl'
                value={name}
                onChange={ e => setName(e.target.value) }
              />
            </div>

            <div className='mt-7'>
              <label
                className='uppercase text-2xl block font-bold text-zinc-700'
              >
                Email <span className='text-red-700 font-bold text-sm'>*</span>
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
                Password <span className='text-red-700 font-bold text-sm'>*</span>
              </label>
              <input 
                type="password" 
                placeholder="Choose your password"
                className='text-sm border-b-2 w-full p-3 border-zinc-300 outline-none focus:border-zinc-400 transition-all font-light mt-3 bg-zinc-100 rounded-xl'
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />
            </div>

            <div className='mt-7'>
              <label
                className='uppercase text-2xl block font-bold text-zinc-700'
              >
                Repeat your password <span className='text-red-700 font-bold text-sm'>*</span>
              </label>
              <input 
                type="password" 
                placeholder="Repeat your password"
                className='text-sm border-b-2 w-full p-3 border-zinc-300 outline-none focus:border-zinc-400 transition-all font-light mt-3 bg-zinc-100 rounded-xl'
                value={repeatPassword}
                onChange={ e => setRepeatPassword(e.target.value) }
              />
            </div>

            <div className='mt-7'>
              <label
                className='uppercase text-2xl block font-bold text-zinc-700'
              >
                Upload your profile image <span className='text-cream-600'>(optional)</span>
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                placeholder="Upload an image jpeg/png. No more than 1MB"
                className='text-sm border-b-2 w-full p-3 border-zinc-300 outline-none focus:border-zinc-400 transition-all font-light mt-3 bg-zinc-100 rounded-xl file:mr-4 file:rounded-full file:border-0 file:font-bold file:bg-cream-600 file:text-white file:py-2 file:px-4 file:hover:bg-cream-700 file:hover:cursor-pointer'
                onChange={ e => setPhoto(e.target.files[0]) }
              />
            </div>

            <div className='mt-7'>
              <label
                className='uppercase text-2xl block font-bold text-zinc-700'
              >
                Choose your genre <span className='text-cream-600'>(just for artists)</span>
              </label>
              <select 
                className='text-sm appearance-none block border-b-2 w-full p-3 border-zinc-300 outline-none focus:border-zinc-400 transition-all font-light mt-3 bg-zinc-100 rounded-xl'
                value={genre}
                onChange={ e => setGenre(e.target.value) }
              >
                <option value="">-- I am NOT an artist --</option>
                <Genres />
              </select>
            </div>

            <input 
              type='submit'
              value='Sign up & join us'
              className='bg-cream-600 w-full rounded-xl py-2 px-10 uppercase font-bold text-white text-lg mt-5 hover:cursor-pointer hover:bg-cream-700 md:w-auto'
            />
          </form>

          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link
              className='block text-center text-zinc-600 hover:border-b-2 transition-all' 
              to="/"
            >
              Do you have an account already? Log in</Link>
            <Link 
              className='block text-center text-zinc-600 hover:border-b-2 transition-all'
              to="/forgotten-password"
            >
              Forgotten password?</Link>
          </nav>

        </div>
    </>
  )
}

export default Signup;