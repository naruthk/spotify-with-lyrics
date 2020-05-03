import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

import "./Login.scss";

function Login() {
  const { login } = useContext(AuthContext);

  return (
    <section className="LoginComponent">
      <section className="auth_wrapper">
        <h1>Spotify Lyric</h1>
        <button
          id="login_button"
          className="button --big --bg-dark"
          onClick={() => login()}
        >
          Log in with Spotify
        </button>
      </section>
      <section className="bottom_area">
        <div className="artwork_credit">
          <span className="artwork_credit --artist_name">
            Photo by 
            <a
              href="https://unsplash.com/@yannispap"
              target="_blank"
              rel="noreferrer"
            >Yannis Papanastasopoulos</a></span>
          <br />
          <span className="artwork_credit --service">Unsplash</span>
        </div>
      </section>
    </section>
  );
}

export default Login;
