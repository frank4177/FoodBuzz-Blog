import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "https://foodbuzz.herokuapp.com/api/auth/register",
        {
          username,
          email,
          password,
          name,
        }
      );
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1>CREATE AN ACCOUNT</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="agreement">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </div>
          <button type="submit">Create</button>
        </form>
        {error && <span>Something went wrong</span>}
      </div>
    </div>
  );
};

export default SignUp;
