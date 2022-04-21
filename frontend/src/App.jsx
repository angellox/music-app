import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Songs from './pages/Songs';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
            <Route index element={<Songs />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
