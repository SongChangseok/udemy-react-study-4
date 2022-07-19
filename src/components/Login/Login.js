import { useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const initValue = { value: "", isValid: null };
const validateEmail = (email) => email.includes("@");
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: validateEmail(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: validateEmail(state.value) };
  }

  return { ...initValue };
};
const validatePassword = (password) => password.trim().length > 6;
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: validatePassword(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: validatePassword(state.value) };
  }

  return { ...initValue };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispathEmail] = useReducer(emailReducer, { ...initValue });
  const [passwordState, dispathPassword] = useReducer(passwordReducer, {
    ...initValue
  });

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispathEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(validateEmail(event.target.value) && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispathPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(emailState.isValid && validatePassword(event.target.value));
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispathEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispathPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
