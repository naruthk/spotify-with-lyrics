import React, { useContext } from 'react';

import Login from "./components/Login";
import Player from "./components/Player/Player";
import Profile from "./components/Profile/Profile";

import { AuthContext } from "./context/AuthContext";
import './App.scss';

function App(props) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      {!isLoggedIn ? <Login /> : (
        <>
          <Player />
          <Profile />
        </>
      )}
    </div>
  );
}

export default App;
