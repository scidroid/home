// Is more powerful than the spotify API but a pain in the ass to get those tokens ;(
// I actually have to pay 100USD/yr to get the apple developer account

interface AppleMusicResponse {
  data: {
    attributes: {
      artwork: {
        width: number;
        height: number;
        url: string;
      };
      url: string;
      name: string;
      artistName: string;
      previews: {
        url: string;
      }[];
    };
  }[];
}

export interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
  preview?: string;
  artwork?: string;
}

const { APPLE_MUSIC_JWT, APPLE_MUSIC_MUT } = process.env;

export async function getNowPlaying(): Promise<NowPlaying> {
  const songData = await fetch(
    "https://api.music.apple.com/v1/me/recent/played/tracks?limit=1",
    {
      headers: {
        Authorization: `Bearer ${APPLE_MUSIC_JWT!}`,
        "Music-User-Token": APPLE_MUSIC_MUT!
      },
      cache: "no-store"
    }
  );

  if (songData.status != 200) return { isPlaying: false };

  const { data } = (await songData.json()) as AppleMusicResponse;

  if (data.length < 1) return { isPlaying: false };

  const song = data[0].attributes;

  return {
    isPlaying: true,
    title: song.name,
    artist: song.artistName,
    url: song.url,
    preview: song.previews[0].url,
    artwork: song.artwork.url.replace("{w}", "200").replace("{h}", "200")
  };
}
