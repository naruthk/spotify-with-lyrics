import cheerio from "cheerio";
import axios from "axios";
import { log, LOG_LEVELS } from "../../utils/logger";

function prepStringForGeniusCrawl(str) {
  if (!str) return str;
  return String(str).trim().replace(" ", "-");
}

export default async function lyricCrawler({ artists, song }) {
  const artistsField = prepStringForGeniusCrawl(artists);
  const songField = prepStringForGeniusCrawl(song);

  const URL = `https://genius.com/${artistsField}-${songField}-lyrics`;

  // const response = await axios
  //   .get(URL)
  //   .catch(err => {
  //     log({
  //       message: "Unable to crawl for lyrics on Genius: ",
  //       err,
  //       level: LOG_LEVELS.INFO
  //     });

  //     throw err;
  //   });

  // if (response.statusCode !== 200) {
  //   log({
  //     message: `Unable to crawl for lyrics on Genius: status code is ${response.statusCode}`,
  //     level: LOG_LEVELS.INFO
  //   });
  // }

  const response = await axios.get('https://www.realtor.com/news/real-estate-news/');
  
  const $ = cheerio.load(response.data);
  // var bodyText = $('html > body').text();
  // const lyric = html_code.find("div", {"class": "lyrics"}).get_text()

            // return self.format_lyrics(lyric)
  console.log("Page title:  " + $('title').text());

  const lyricsHTML = $('title').text();

  return lyricsHTML;
};
