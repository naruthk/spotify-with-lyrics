import spotify from "../data/spotify";
import { log, LOG_LEVELS } from "../../utils/logger";

export default async function getCurrentPlayback({ accessToken, market }) {
  const response = await spotify
    .get(`/me/player?market=${market}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      },
    )
    .catch(err => {
      log({
        message: "Unable to get current playback: ",
        err,
        level: LOG_LEVELS.INFO
      });

      throw err;
    });

  if (response.status === 204) {
    log({
      message: "Unable to get current playback: No song is being played.",
      level: LOG_LEVELS.INFO
    });

    return null;
  }

  const { device, item, progress_ms } = response.data;

  const { id, album, artists, duration_ms, name } = item;

  const artists_names_list = artists.map(artist => artist.name);

  const album_images_list = album.images.map(image => image.url);

  return {
    device: {
      name: device.name,
      type: device.type,
      is_active: device.is_active,
      volume: device.volume_percent
    },
    album: {
      name: album.name,
      images: album_images_list
    },
    artists: artists_names_list,
    song_id: id,
    song_name: name,
    duration: duration_ms,
    progress: progress_ms
  }
}