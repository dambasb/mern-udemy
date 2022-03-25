import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  console.log(localStorage.profile);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Landing exact path="/" />
          <Login path="/login" />
          <Register path="/register" />
        </Switch>
        <Switch>
          <Navbar />
          <Dashboard path="/dashboard" />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
