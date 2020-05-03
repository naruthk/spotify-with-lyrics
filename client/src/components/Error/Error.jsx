import React from 'react';

import "./Error.scss";

function Error() {

  return (
    <section className="ErrorComponent">
      <section className="MessageContainer">
        <h1>Oops!</h1>
        <p>Looks like a song is not being played. Please play a song on your device and reload the page.</p>
      </section>
    </section>
  );
}

export default Error;
