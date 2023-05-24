import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import Home from './pages/home/home';
import Degree from './pages/degree/degree';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/*" element={<Degree />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
