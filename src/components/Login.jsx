import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

function Login(props) {
  const { login } = useContext(AuthContext);

  return (
    <div className="App">
      <h1>Login</h1>
      <button
        id="login-button"
        className="btn btn-primary"
        onClick={() => login()}
      >
        Log in with Spotify
      </button>
    </div>
  );
}

export default Login;
