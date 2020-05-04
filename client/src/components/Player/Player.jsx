import React, { useEffect, useState } from 'react';
import { millisToMinutesAndSeconds } from "../../utils/time";

import "./Player.scss";

function Player({ isPlaying, activeSongInfo, updateSong }) {
  const { device, song, album, artists} = activeSongInfo;

  const [timeElapsed, setTimeElapsed] = useState(activeSongInfo.timeElapsed);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    let interval = null;

    if (timeElapsed >= song.duration) {
      clearInterval(interval);
      updateSong();
    }

    interval = setInterval(() => {
      setTimeElapsed(timeElapsed => timeElapsed + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeElapsed, isPlaying, song.duration, updateSong]);

  return (
    <div className="PlayerComponent">
      <section className="player_content">

        {/* Device Information */}
        <section className="device_information">
          <p className="device_information --top-label">Currently playing on</p>
          <p className="device_information --bottom-label">{device.name}</p>
          <p>Removed this => {timeElapsed}</p>
        </section>

        {/* Album Artwork */}
        {album.images && (
          <section className="album_information">
            <img
              className="album_image"
              src={album.images[0]}
              alt={song.name}
            />
          </section>
        )}

        {/* Song Information */}
        <section className="song_information">
          <p className="song_information --name">{song.name}</p>
          <p className="song_information --artist">{artists.join(", ")}</p>
        </section>

        {/* Progress Indicator */}
        <section className="progress_information">
          <div className="progress_bar">
            <span
              className="progress_bar --current_progress_indicator"
              style={{ width: `${(timeElapsed / song.duration) * 100}%` }}></span>
            <span
              className="progress_bar --wrapper"
              style={{ width: `${100 - ((timeElapsed / song.duration) * 100)}%` }}></span>
          </div>
          <div className="time_indicator">
            <span className="time_indicator --current">{millisToMinutesAndSeconds(timeElapsed)}</span>
            <span className="time_indicator --remaining">{millisToMinutesAndSeconds(song.duration)}</span>
          </div>
        </section>
  
      </section>
    </div>
  );
}

export default Player;
