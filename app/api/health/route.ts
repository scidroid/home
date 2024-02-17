// this endpoint is being fetched by a shortcut on my iphone that retrieves data
// from the heatlh app and send the data to this endpoint to be stored in key-value
// more info in https://scidroid.co/apple-health
import { kv } from "@vercel/kv";

const { PASSWORD } = process.env;

export async function POST(request: Request) {
  const password = new URL(request.url).searchParams.get("password");

  if (password != PASSWORD) {
    return Response.json(
      {
        error: "incorrect password"
      },
      { status: 401 }
    );
  }

  const res = await request.json();

  if (res.value > 200) {
    return Response.json(
      {
        erorr: "Max hearth rate is 200 BPM"
      },
      { status: 400 }
    );
  }

  const data = { date: new Date(res.date).toISOString(), value: res.value };

  await kv.set("health", data);

  return Response.json(data);
}
