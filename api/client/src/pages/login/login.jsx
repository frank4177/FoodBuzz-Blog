import React, { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

const Login = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "https://foodbuzz.herokuapp.com/api/auth/login",
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>SIGN IN</h1>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="username" ref={usernameRef} />
          <input placeholder="password" type="password" ref={passwordRef} />
          <button type="submit" disabled={isFetching}>
            LOGIN
          </button>
          <Link to="/signup">CREATE A NEW ACCOUNT</Link>
          <a>FORGOT PASSWORD?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
