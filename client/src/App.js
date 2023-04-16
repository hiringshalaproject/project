import React from "react";
import "./app.css";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Platform from "./pages/platform";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import AddJob from "./pages/addJob";
import AdminDashboard from "./pages/adminDashboard";
import GetAllJobs from "./pages/getAllJobs";

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        
        <Switch>
          <Route path="/" exact component={AdminDashboard} />
          <Route path="/about" component={About} />
          <Route path="/platform" component={Platform} />
          <Route path="/contact-us" component={Contact} />
          <Route path="/blog" component={Blog} />
          <Route path="/addJob" exact component={AddJob} />
          <Route path="/get" exact component={GetAllJobs} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
