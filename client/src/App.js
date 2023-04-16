import React from "react";
import "./app.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import About from "./pages/about";
import Platform from "./pages/platform";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from './pages/Signup'
import AdminDashboard from "./pages/adminDashboard";

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div  className='w-screen h-screen bg-white flex flex-col'>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/platform" element={<Platform/>} />
          <Route path="/contact-us" element={<Contact/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/login" element = {<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element = {<Signup setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="Dashboard" element={<Dashboard/>} />
        </Routes>
    </div>
  );
}

export default App;
