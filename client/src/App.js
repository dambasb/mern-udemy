import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import "./App.css";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}

      <Router>
        <Switch>
          <Landing exact path="/" />
          <Login path="/login" />
          <Register path="/register" />
        </Switch>
      </Router>
    </Router>
  );
};

export default App;
