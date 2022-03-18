import React from "react";
import { Link } from "react-router-dom";
import useInput from "../../../hooks/use-input";
import "./Login.css";

const Login = () => {
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

    if (!enteredEmailIsValid && !enteredPasswordIsValid) return;

    console.log(enteredEmail, enteredPassword);

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

  return (
    <div className="login">
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
        </div>
        <button disabled={!formIsValid}>Submit</button>

        <h4>
          <span className="login__grey">New to Social App?</span>
          <Link className="login__link" to="/register">
            Sing Up now.
          </Link>
        </h4>
      </form>
    </div>
  );
};

export default Login;
