import React from "react";
import { Link } from "react-router-dom";
import useInput from "../../../hooks/use-input";
import "./Register.css";

const Register = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value.trim() !== "");

  // Disable submit button
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid &&
    enteredPassword === enteredConfirmPassword
  ) {
    formIsValid = true;
  }

  // Submit form
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredEmailIsValid &&
      !enteredPasswordIsValid &&
      !enteredConfirmPasswordIsValid &&
      enteredPassword !== enteredConfirmPassword
    )
      return;

    console.log(enteredEmail, enteredPassword);

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
  };

  // Error classes
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div className="register">
      <form onSubmit={formSubmissionHandler}>
        <h1>Sing Up</h1>
        <div className={nameInputClasses}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && (
            <p className="text-error">Please enter your Name.</p>
          )}
        </div>
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
        <div className={confirmPasswordInputClasses}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={confirmPasswordChangedHandler}
            onBlur={confirmPasswordBlurHandler}
            value={enteredConfirmPassword}
          />
          {confirmPasswordInputHasError && (
            <p className="text-error">Please enter your Password.</p>
          )}
          {enteredConfirmPassword !== "" &&
            enteredPassword !== enteredConfirmPassword && (
              <p className="text-error">Please enter the same Password.</p>
            )}
        </div>
        <button disabled={!formIsValid}>Submit</button>

        <h4>
          <span className="register__grey">Already have account?</span>
          <Link className="register__link" to="/login">
            Login.
          </Link>
        </h4>
      </form>
    </div>
  );
};

export default Register;
