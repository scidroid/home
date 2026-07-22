interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
  type?: string;
  show?: { name: string };
  album?: { images: { url: string }[] };
}

export interface Music {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
  artwork?: string;
}

const ENDPOINTS = {
  nowPlaying:
    "https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode",
  recentlyPlayed:
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
  token: "https://accounts.spotify.com/api/token"
} as const;

async function getAccessToken(): Promise<string> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  // No explicit `cache: "no-store"`: POST requests are never cached by the
  // data cache anyway, and an explicit no-store would force dynamic
  // rendering on the statically generated pages that call this at build.
  const response = await fetch(ENDPOINTS.token, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN!
    })
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed: ${response.status}`);
  }

  const { access_token } = await response.json();

  return access_token;
}

function toMusic(track: SpotifyTrack, isPlaying: boolean): Music {
  const artist =
    track.type === "episode"
      ? (track.show?.name ?? "Unknown Show")
      : (track.artists?.map(artist => artist.name).join(", ") ??
        "Unknown Artist");

  return {
    isPlaying,
    title: track.name,
    artist,
    url: track.external_urls.spotify,
    artwork: track.album?.images[0]?.url
  };
}

export async function getNowPlaying(): Promise<Music> {
  try {
    const headers = { Authorization: `Bearer ${await getAccessToken()}` };

    // Spotify returns 204 with an empty body when nothing is playing.
    const nowPlaying = await fetch(ENDPOINTS.nowPlaying, { headers });
    if (nowPlaying.ok && nowPlaying.status !== 204) {
      const { item } = (await nowPlaying.json()) as { item?: SpotifyTrack };
      if (item?.name) return toMusic(item, true);
    }

    const recent = await fetch(ENDPOINTS.recentlyPlayed, { headers });
    if (recent.ok) {
      const { items } = (await recent.json()) as {
        items?: { track: SpotifyTrack }[];
      };
      if (items?.[0]?.track) return toMusic(items[0].track, false);
    }

    return { isPlaying: false };
  } catch (error) {
    console.error("Error fetching now playing:", error);

    return { isPlaying: false };
  }
}
