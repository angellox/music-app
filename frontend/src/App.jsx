import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Layouts Publics
import AuthLayout from './layout/AuthLayout';
// Layouts Privates
import ProfileLayout from './layout/ProfileLayout';
// Components
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgottenPassword from './pages/ForgottenPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import DashArtist from './pages/DashArtist';
// Context Providers
import { AuthProvider } from './context/AuthProvider';
import { SongsProvider } from './context/SongsProvider';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <SongsProvider>
          <Routes>

            <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />}/>
                <Route path='sign-up' element={<Signup />}/>
                <Route path='forgotten-password' element={<ForgottenPassword />}/>
                <Route path='forgotten-password/:rol/:token' element={<NewPassword />}/>
                <Route path='confirm/:rol/:token' element={<ConfirmAccount />}/>
            </Route>

            <Route path='/artist' element={<ProfileLayout />}>
                <Route index element={<DashArtist />}></Route>
            </Route>

          </Routes>
        </SongsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
