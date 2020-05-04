import React, { useEffect, useState } from 'react';
import { lyricCrawler } from "../../apis/lyrics";

import "./Lyrics.scss";

function Lyrics({ isPlaying, activeSongInfo }) {
  const [lyrics, setLyrics] = useState([]);
  const [isOpeningLyricsModal, setIsOpeningLyricsModal] = useState(false);

  const getLyrics = async ({ artists, song}) => {
    try {
      const response = await lyricCrawler({ artists, song: song.name });
      setLyrics(response);
    } catch (err) {
      // TO-DO: Handle server crash
    };
  }

  useEffect(() => {
    const { artists, song } = activeSongInfo;
    getLyrics({ artists, song });
  }, [activeSongInfo]);

  const renderLyricsToolbar = () => (
    lyrics.length !== 0 ? (
      <section className="LyricsToolbar">
        <div 
          className="lyrics_toolbar_options"
          onClick={() => setIsOpeningLyricsModal(!isOpeningLyricsModal)}
        >
          <span className="lyrics_toolbar_options --show-lyrics-button">
            {!isOpeningLyricsModal ? "Display" : "Hide"} Lyrics
          </span>
        </div>
      </section>
    ) : null
  );

  const renderLyrics = () => (
    <section className="LyricsModal">
      <div className="LyricsModal__container">
        <div className="LyricsModal__dim-layer" onClick={() => setIsOpeningLyricsModal(false)} />
        <div className="LyricsModal__content">
          {lyrics}
          <div className="LyricsModal__content--bottom-label">Lyrics from Genius</div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="LyricsComponent">
      {isPlaying && renderLyricsToolbar()}
      {isOpeningLyricsModal && renderLyrics()}
    </div>
  );
}

export default Lyrics;
