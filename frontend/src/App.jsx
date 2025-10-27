import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import StarsCanvas from './components/StarsCanvas';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuthSuccess from './pages/OAuthSuccess';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Blockchain from './pages/Blockchain';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Documentation from './pages/Documentation';
import APIReference from './pages/APIReference';
import CookiePolicy from './pages/CookiePolicy';
import ContactUs from './pages/ContactUs';
import GitHubRepo from './pages/GitHubRepo';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  
  // Pages where footer should be hidden
  const hideFooterPaths = ['/dashboard', '/chat', '/blockchain'];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);
  
  return (
    <>
      <StarsCanvas/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/oauth-success' element={<OAuthSuccess/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/documentation' element={<Documentation/>}/>
        <Route path='/api-reference' element={<APIReference/>}/>
        <Route path='/cookie-policy' element={<CookiePolicy/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/github' element={<GitHubRepo/>}/>
        
        {/* Protected Routes */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
        <Route path='/blockchain' element={<PrivateRoute><Blockchain/></PrivateRoute>}/>
        
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {!shouldHideFooter && <Footer/>}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  );
}
