import querystring from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token
    }),
    cache: "no-store"
  });

  return response.json();
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const songData = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    cache: "no-store"
  });

  if (songData.status != 200) return { isPlaying: false };

  const { item: song } = await songData.json();

  return song.type === "episode"
    ? {
        isPlaying: true,
        title: song.name,
        artist: song.show.name,
        url: song.external_urls.spotify
      }
    : {
        isPlaying: true,
        title: song.name,
        artist: song.artists
          .map((artistInfo: { name: string }) => artistInfo.name)
          .join(", "),
        url: song.external_urls.spotify
      };
}
