import { Link } from 'react-router-dom';

const ForgottenPassword = () => {
  return (
    <>
      <div>
        <h1 className='text-center text-4xl mb-5'>
          Retrieve your account and don't lose the <span className=' text-cream-600 font-bold'>tuning</span>
        </h1>
      </div>

      <div className='mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <form>
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