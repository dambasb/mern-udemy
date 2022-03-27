import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Landing.css";

const Landing = ({ isAuthenticated }) => {
  const history = useHistory();
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark__overlay">
        <div className="landing__inner">
          <h1>Social Network App</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="landing__buttons">
            <button
              onClick={() => history.push("/register")}
              className="landing__singUp"
            >
              Sign Up
            </button>
            <button
              onClick={() => history.push("/login")}
              className="landing__login"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
