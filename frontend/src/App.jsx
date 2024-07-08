import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

import './App.css'

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={auth ? <Home /> : <Navigate to='/login' />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to='/' />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
