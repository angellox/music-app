import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Layouts
import AuthLayout from './layout/AuthLayout';
// Internal pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgottenPassword from './pages/ForgottenPassword';
import ConfirmAccount from './pages/ConfirmAccount';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />}/>
            <Route path='signup' element={<Signup />}/>
            <Route path='forgotten-password' element={<ForgottenPassword />}/>
            <Route path='confirm/:rol/:token' element={<ConfirmAccount />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
