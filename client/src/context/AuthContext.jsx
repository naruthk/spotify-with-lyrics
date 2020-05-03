import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { authenticateSpotifyUser } from "../apis/auth";
import { getHashParams, generateRandomString } from "../utils/strings";
import { SCOPES_LIST } from "../config";

export const AuthContext = React.createContext();
export const useAuthContext = () => useContext(AuthContext);

const stateKey = 'spotify_auth_state';

export const AuthProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const resetData = () => {
    // TO-DO:
  };

  const login = async () => {
    resetData();
  
    const state = generateRandomString(16);
  
    let url = process.env.REACT_APP_SPOTIFY_AUTH_API;
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
    url += '&scope=' + encodeURIComponent(SCOPES_LIST);
    url += '&redirect_uri=' + encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_URI);
    url += '&state=' + encodeURIComponent(state);

    localStorage.setItem(stateKey, state);

    window.location.href = url;
  };

  useEffect(() => {
    const refresh = async () => {
      const params = getHashParams();
  
      const { access_token: accessToken, state } = params;
      const storedState = localStorage.getItem(stateKey);
  
      if (accessToken && (state === null || state !== storedState)) {
        resetData();
        return;
      }
  
      localStorage.removeItem(stateKey);
  
      if (accessToken) {
        const userResponse = await authenticateSpotifyUser(accessToken);
        setUser(userResponse);
        setIsLoggedIn(true);
      }
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isLoggedIn
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    profileImage: PropTypes.string
  })
};

AuthProvider.defaultProps = {
  user: null
};