import React, { useEffect, useState, useContext } from 'react';
import { getCurrentPlayback } from "../../apis/player";
import { getHashParams } from "../../utils/strings";
import { AuthContext } from "../../context/AuthContext";
import "./Player.scss";

function Player(props) {
  const { user } = useContext(AuthContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showError, setShowError] = useState(false);

  const [songInfo, setSongInfo] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  const getTrackingInfo = async (accessToken) => {
    const response = await getCurrentPlayback({
      accessToken: accessToken,
      market: user && user.country
    });

    if (!response) {
      setShowError(false);
      return;
    }
  
    const { device, artists, album } = response;

    setDeviceInfo(device);
    setArtistInfo(artists);
    setAlbumInfo(album);
    setSongInfo({
      id: response.song_id,
      name: response.song_name,
      duration: response.duration
    });
    setCurrentProgress(response.progress);

    setIsPlaying(true);
  }

  useEffect(() => {
    const params = getHashParams();
    const { access_token: accessToken } = params;

    getTrackingInfo(accessToken);
  }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (currentProgress >= songInfo && songInfo.duration) window.location.reload();
//       setCurrentProgress(currentProgress + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   });

  const renderPlayer = () => {
    if (!isPlaying) return null;

    return (
      <section className="player_content">
        <section className="device_information">
          <p className="device_information --top-label">Currently playing on</p>
          <p className="device_information --bottom-label">{deviceInfo && deviceInfo.name}</p>
        </section>
        <section className="album_information">
          <img
            className="album_image"
            src={albumInfo.images[0]}
            alt={songInfo.name}
          />
        </section>
        <section className="song_information">
          <p className="song_information --name">{songInfo.name}</p>
          <p className="song_information --artist">{artistInfo.join(", ")}</p>
        </section>
        <section className="progress_information">
          <div className="progress_bar">
            <span
              className="progress_bar --current_progress_indicator"
              style={{ width: `${(currentProgress / songInfo.duration) * 100}%` }}></span>
            <span
              className="progress_bar --wrapper"
              style={{ width: `${100 - ((currentProgress / songInfo.duration) * 100)}%` }}></span>
          </div>
          <div className="time_indicator">
            <span className="time_indicator --current">{currentProgress}</span>
            <span className="time_indicator --remaining">{songInfo.duration}</span>
          </div>
        </section>
      </section>
    );
  };

  const renderError = () => (
    <header className="App-header">
      <h1>Oops!</h1>
      <p>No song is being played. Please go to your device and play a song.</p>
    </header>
  );

  return (
    <div className="PlayerComponent">
      {renderPlayer()}
      {/* {isPlaying & renderPlayer()}
      {showError & renderError()} */}
    </div>
  );
}

export default Player;
