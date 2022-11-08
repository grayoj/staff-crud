// Auth Component

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/Form.css";

function Auth() {
  const [usernameAuth, setUsernameAuth] = useState("");
  const [passwordAuth, setPasswordAuth] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const register = () => {
    axios
      .post("http://localhost:5000/register", {
        username: usernameAuth,
        password: passwordAuth,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);
  return (
    <div className='App'>
      <form className='registration'>
        <h1>Signup</h1>
        <label>Username</label>
        <input
          type='text'
          onChange={(e) => {
            setUsernameAuth(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type='text'
          onChange={(e) => {
            setPasswordAuth(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </form>

      <form className='login'>
        <h1>Signin</h1>
        <input
          type='text'
          placeholder='Username...'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type='password'
          placeholder='Password...'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
      </form>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default Auth;
