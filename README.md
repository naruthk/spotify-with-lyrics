# 🎤  Spotify Lyrics

🎧 🎹 Show currently playing song and its lyrics 🎸 🪕

A **React.js** application that connects to your Spotify account to display your currently playing song and its lyrics.

<img src="LoginScreen.png" alt="Login Screen" width="600" />

<img src="PlayerScreen.png" alt="Player Screen" width="600" />

## Background

Unlike its mobile app, the Spotify web application (as of May 4, 2020) does not have the ability to display lyrical information for a currently playing song. So I created **Spotify Lyrics** to achieve this.

But please note that my app does not have full functionalities like the actual Spotify web application. It might not be a good idea if you're looking to rely on this as your actual Spotify web player 🤹‍♂️.

## Installation

This project contains a front-end project (`client)` and a back-end (`server`) for serving APIs.

1. Clone the repo
2. Inside our `client/` folder, rename `.env.example` with as `.env` and supply necessary credentials. [See Spotify Developer portal for more detail.](https://developer.spotify.com/dashboard/login)
3. **Server**: `npm install` then `npm run dev` then run *Express* app
4. **Client**: `npm install` then `npm run start` to run *Creact React App*

**Ports:**

- Client: `3000`
- Server: `4000`

## Architecture

React, Axios, Cheerio (scraping Genius website), Express

## Remaining Tasks / Improvements

- Logout function
- Unit tests coverage
- Player controls
- Improve progress bar
- UI enhancement