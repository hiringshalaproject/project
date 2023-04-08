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

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/platform" component={Platform} />
          <Route path="/contact-us" component={Contact} />
          <Route path="/blog" component={Blog} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
