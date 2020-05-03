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
