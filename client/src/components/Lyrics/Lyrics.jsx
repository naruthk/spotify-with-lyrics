import React, { useEffect, useState } from 'react';
import { lyricCrawler } from "../../apis/lyrics";
import Error from "../Error/Error";

import "./Lyrics.scss";

function Lyrics({ isPlaying, artists, song }) {
  const [showError, setShowError] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);

  const getLyrics = async ({ artists, song}) => {
    const response = await lyricCrawler({ artists, song: song.name });

    console.log(response);

    if (!response) {
      setShowError(true);
      return;
    }
  }

  useEffect(() => {
    getLyrics({ artists, song });
  }, []);

  const renderLyrics = () => {
    if (!isPlaying) return setShowError(true);

    return (
      <section className="player_content">
        <section className="device_information">
          <p className="device_information --top-label">AAA</p>
          <p className="device_information --bottom-label">BBB</p>
        </section>
        <section className="song_information">
          <p className="song_information --name">Hello</p>
          <p className="song_information --artist">Hi</p>
        </section>
      </section>
    );
  };

  return (
    <div className="LyricsComponent">
      {isPlaying && renderLyrics()}
      {showError && <Error />}
    </div>
  );
}

export default Lyrics;
