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
      log({
        message: "Unable to crawl for lyrics on Genius: ",
        err,
        level: LOG_LEVELS.INFO
      });

      throw err;
    });

  res.json({
    html: response.data
  });
});

app.listen(4000, () => {
  console.log(`✅ Express running on port: http://localhost:4000`);
});
