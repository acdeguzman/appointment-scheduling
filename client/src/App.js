import { Route, Routes } from "react-router-dom";
// import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Appointments from "./pages/Appointments";
import Appointment from "./pages/Appointment";
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/appointments" element={<Appointments />}/>
      <Route path="/appointments/:id" element={<Appointment />}/>
      <Route path="/register" element={<Register />}/>
      <Route />
    </Routes>
  );


}

export default App;
