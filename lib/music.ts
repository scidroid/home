// Is more powerful than the spotify API but a pain in the ass to get those tokens ;(
// I actually have to pay 100USD/yr to get the apple developer account

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
  type?: string;
  show?: { name: string };
  album?: { images: { url: string }[] };
}

interface SpotifyResponse {
  item: SpotifyTrack;
  is_playing: boolean;
  progress_ms: number;
}

interface RecentlyPlayedResponse {
  items: { track: SpotifyTrack }[];
}

export interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
  artwork?: string;
}

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");

const ENDPOINTS = {
  nowPlaying:
    "https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode",
  recentlyPlayed:
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
  token: "https://accounts.spotify.com/api/token"
} as const;

async function getAccessToken(): Promise<string> {
  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN!
    });

    const response = await fetch(ENDPOINTS.token, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString(),
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify access token");
    }

    const { access_token } = await response.json();

    return access_token;
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);

    throw new Error("Failed to fetch Spotify access token");
  }
}

function formatArtist(track: SpotifyTrack): string {
  if (track.type === "episode") return track.show?.name ?? "Unknown Show";

  return (
    track.artists?.map(artist => artist.name).join(", ") ?? "Unknown Artist"
  );
}

export async function getNowPlaying(): Promise<NowPlaying> {
  try {
    const access_token = await getAccessToken();
    const headers = { Authorization: `Bearer ${access_token}` };

    // 1st attempt: get currently playing
    const nowPlayingResponse = await fetch(ENDPOINTS.nowPlaying, { headers });

    if (nowPlayingResponse.ok) {
      const { item } = (await nowPlayingResponse.json()) as SpotifyResponse;

      return {
        isPlaying: true,
        title: item.name,
        artist: formatArtist(item),
        url: item.external_urls.spotify,
        artwork: item.album?.images[0]?.url
      };
    }

    // 2nd attempt: get the last played track
    const recentlyPlayedResponse = await fetch(ENDPOINTS.recentlyPlayed, {
      headers
    });

    if (recentlyPlayedResponse.ok) {
      const { items } =
        (await recentlyPlayedResponse.json()) as RecentlyPlayedResponse;

      if (items?.[0]?.track) {
        const { track } = items[0];
        return {
          isPlaying: false,
          title: track.name,
          artist: formatArtist(track),
          url: track.external_urls.spotify,
          artwork: track.album?.images[0]?.url
        };
      }
    }

    return { isPlaying: false };
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return { isPlaying: false };
  }
}
