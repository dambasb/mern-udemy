import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import PropTypes from "prop-types";
import useInput from "../../../hooks/use-input";
import "./Register.css";
import Alert from "../../alert/Alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
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
  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredEmailIsValid &&
      !enteredPasswordIsValid &&
      !enteredConfirmPasswordIsValid &&
      enteredPassword !== enteredConfirmPassword
    ) {
      //setAlert("Form is invalid", "danger");
      return;
    }

    console.log(enteredName, enteredEmail, enteredPassword);

    register({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    });
    setAlert("You have successfully registered", "success");

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

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div className="register">
      <Alert />
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
            required
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
            required
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
            required
            minLength="6"
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
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={confirmPasswordChangedHandler}
            onBlur={confirmPasswordBlurHandler}
            value={enteredConfirmPassword}
            required
            minLength="6"
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
          <span className="register__grey">Already have account? </span>
          <Link className="register__link" to="/login">
            Login.
          </Link>
        </h4>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// use connect to work with redux
// export setAlert so it's available as props
export default connect(mapStateToProps, { setAlert, register })(Register);
