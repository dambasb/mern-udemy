import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import PropTypes from "prop-types";
import useInput from "../../../hooks/use-input";
import "./Login.css";
import Alert from "../../alert/Alert";
import { login } from "../../../actions/auth";

const Login = ({ setAlert, login, isAuthenticated }) => {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  // Disable submit button
  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  // Submit form
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid && !enteredPasswordIsValid) {
      setAlert("Form is invalid", "danger");
      return;
    }

    login({
      email: enteredEmail,
      password: enteredPassword,
    });

    setAlert("You have successfully Logged in", "success");

    resetNameInput();
    resetPasswordInput();
  };

  // Error classes
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div className="login">
      <Alert />
      <form onSubmit={formSubmissionHandler}>
        <h1>Login</h1>
        <div className={emailInputClasses}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className="text-error">Please enter valid Email.</p>
          )}
        </div>
        <div className={passwordInputClasses}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <p className="text-error">Please enter your Password.</p>
          )}
          {enteredPassword.length > 0 && enteredPassword.length < 6 && (
            <p className="text-error">
              Password must contain at last 6 characters.
            </p>
          )}
        </div>
        <button disabled={!formIsValid}>Submit</button>

        <h4>
          <span className="login__grey">New to Social App? </span>
          <Link className="login__link" to="/register">
            Sing Up now.
          </Link>
        </h4>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
