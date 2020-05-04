import React, { useEffect, useState, useContext, useCallback } from 'react';
import { getCurrentPlayback } from "../../apis/player";
import { getHashParams } from "../../utils/strings";
import { AuthContext } from "../../context/AuthContext";

import Player from "../Player/Player";
import Lyrics from "../Lyrics/Lyrics";
import Error from "../Error/Error";

const params = getHashParams();
const { access_token: accessToken } = params;

function Home() {
  const { user } = useContext(AuthContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activeSongInfo, setActiveSongInfo] = useState(null);

  const getActiveSongInfo = useCallback(async () => {
    const response = await getCurrentPlayback({
      accessToken: accessToken,
      market: user && user.country
    });

    if (!response) {
      setShowError(true);
      return;
    }

    const { device, artists, album, timeElapsed } = response;

    setActiveSongInfo({
      device,
      artists,
      album,
      song: {
        id: response.songId,
        name: response.songName,
        duration: response.duration
      },
      timeElapsed
    })

    setIsPlaying(true);
  }, [user]);

  useEffect(() => {
    getActiveSongInfo(accessToken);
  }, [getActiveSongInfo]);

  return (
    <div className="PlayerComponent">
      {isPlaying && <Player isPlaying={isPlaying} activeSongInfo={activeSongInfo} updateSong={getActiveSongInfo} />}
      {isPlaying && <Lyrics isPlaying={isPlaying} activeSongInfo={activeSongInfo} />}
      {showError && <Error />}
    </div>
  );
}

export default Home;
