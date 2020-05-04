import express from 'express';
import cors from 'cors';
import axios from 'axios';

import { log, LOG_LEVELS } from "./utils/logger";

const app = express();
app.use(cors());

app.get(`/crawl-genius`, async (req, res, _) => {
  const { artists, song } = req.query;
  console.log("url", `https://genius.com/${artists}-${song}-lyrics)`);

  const response = await axios
    .get(`https://genius.com/${artists}-${song}-lyrics`)
    .catch(err => {
      if (err.response && err.response.status === 403) {
        log({
          message: "[Backend] Unable to crawl for lyrics: You are blocked from accessing Genius to prevent potential attacks.",
          level: LOG_LEVELS.INFO
        });
        return;
      }
      if (err.response && err.response.status === 404) {
        console.log('hi im here');
        log({
          message: "[Backend] Unable to crawl for lyrics: Page not found.",
          level: LOG_LEVELS.INFO
        });
        return;
      }

      log({
        message: "[Backend] Unable to crawl for lyrics: ",
        err,
        level: LOG_LEVELS.INFO
      });
    });
  
  if (!response) return null;

  res.json({
    html: response.data
  });
});

app.listen(4000, () => {
  console.log(`✅ Express running on port: http://localhost:4000`);
});
