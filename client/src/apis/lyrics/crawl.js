import cheerio from "cheerio";
import axios from "axios";
import { log, LOG_LEVELS } from "../../utils/logger";

function prepStringForGeniusCrawl(str) {
  if (!str) return str;
  return String(str).trim().replace(/\s/g, "-");
}

export default async function lyricCrawler({ artists, song }) {
  const artistsJoinedString = artists.join(" and ");
  const artistsField = prepStringForGeniusCrawl(artistsJoinedString);
  const songField = prepStringForGeniusCrawl(song);

  const response = await axios
    .get(`http://localhost:4000/crawl-genius?artists=${artistsField}&song=${songField}`)
    .catch(err => {
      if (err.response && err.response.status === 403) {
        log({
          message: "Unable to crawl for lyrics: You are blocked from accessing Genius to prevent potential attacks.",
          level: LOG_LEVELS.INFO
        });
        return;
      }
      if (err.response && err.response.status === 404) {
        log({
          message: "Unable to crawl for lyrics: Page not found.",
          err,
          level: LOG_LEVELS.INFO
        });
        return;
      }

      log({
        message: "Unable to crawl for lyrics: ",
        err,
        level: LOG_LEVELS.INFO
      });

      throw err;
    });

  const { html } = response.data;
  const $ = cheerio.load(html);
  const lyricsHTML = $("div.lyrics").text();

  return lyricsHTML.trim();
};
