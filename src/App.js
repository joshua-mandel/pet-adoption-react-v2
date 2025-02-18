import './App.scss'
import { useState } from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import PetList from './components/PetList';
import PetEditor from './components/PetEditor';
import NotFound from './components/NotFound';
import Home from './components/Home';

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  // const [screen, setScreen] = useState('/login');

  // function onNavigate(evt, href) {
  //   evt.preventDefault();
  //   setScreen(href);
  // }

  function onLogin(auth) {
    setAuth(auth);
    showSuccess('Logged In.');
    // setScreen('/pet/list');
    navigate('/pet/list');
  }

  function onLogout() {
    setAuth(null);
    // setScreen('/login');
    showSuccess('Logged Out.');
    navigate('login');
  }

  function showError(message) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }

  function showSuccess(message) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  return (
    <div className="App min-vh-100 d-flex flex-column">
      <Navbar auth={auth} onLogout={onLogout} />
      <div className="flex-grow-1">
        <ToastContainer />
        <main className="container my-5">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm onLogin={onLogin} showError={showError} />} />
            <Route path="/pet/list" element={<PetList auth={auth} />} />
            <Route path="/pet/:petId" element={<PetEditor auth={auth} showError={showError} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
