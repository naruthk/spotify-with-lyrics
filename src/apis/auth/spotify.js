import spotify from "../data/spotify";
import { log, LOG_LEVELS } from "../../utils/logger";

export default async function authenticateSpotifyUser(accessToken) {
  const response = await spotify
    .get("/me",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      },
    )
    .catch(err => {
      log({
        message: "Unable to authenticate user with Spotify: ",
        err,
        level: LOG_LEVELS.INFO
      });

      throw err;
    });

  const { display_name: displayName, country, images, product } = response.data;

  return {
    displayName,
    country,
    images,
    product
  };
}