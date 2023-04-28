import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Platform from "./pages/platform";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar/Navbar";
import AddJob from "./pages/AddJob";
import AdminDashboard from "./pages/AdminDashboard";
import EditJob from "./pages/EditJob";
import GetAllJobs from "./pages/getAllJobs";
import GetAllSeekers from "./pages/GetAllSeekers";
import AddSeeker from "./pages/AddSeeker";
import AddEmployee from "./pages/AddEmployee";
import GetAllEmployees from "./pages/GetAllEmployee";

function App() {
  const location = useLocation();

  // Check if the current path is "/dashboard"
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      {!isDashboardPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/addSeeker" element={<AddSeeker />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/getEmployee" element={<GetAllEmployees />} />
        <Route path="/getJobs" element={<GetAllJobs />} />
        <Route path="/getSeekers" element={<GetAllSeekers />} />
        <Route path="/edit" element={<EditJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
