import React, { useContext } from 'react';

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";

import { AuthContext } from "./context/AuthContext";
import './App.scss';

function App(props) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      {!isLoggedIn ? <Login /> : (
        <>
          <Home />
          <Profile />
        </>
      )}
    </div>
  );
}

export default App;
