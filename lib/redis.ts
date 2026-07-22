// Zero-dependency client for the Upstash Redis REST API.
// Works with both Upstash (UPSTASH_REDIS_REST_*) and legacy Vercel KV
// (KV_REST_API_*) credentials. Values are JSON-serialized like @vercel/kv
// did, so existing stored data stays readable.

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

async function command<T>(...args: (string | number)[]): Promise<T> {
  if (!url || !token) {
    throw new Error("Missing Upstash Redis REST credentials");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(args)
  });

  if (!res.ok) {
    throw new Error(`Redis request failed: ${res.status} ${await res.text()}`);
  }

  const { result, error } = await res.json();

  if (error) {
    throw new Error(`Redis error: ${error}`);
  }

  return result as T;
}

export const redis = {
  async get<T>(key: string): Promise<T | null> {
    const result = await command<string | null>("GET", key);

    if (result === null) return null;

    try {
      return JSON.parse(result) as T;
    } catch {
      return result as T;
    }
  },

  async set(
    key: string,
    value: unknown,
    options?: { ex?: number }
  ): Promise<void> {
    const args: (string | number)[] = ["SET", key, JSON.stringify(value)];

    if (options?.ex) {
      args.push("EX", options.ex);
    }

    await command(...args);
  },

  async del(key: string): Promise<void> {
    await command("DEL", key);
  },

  async incr(key: string): Promise<number> {
    return await command<number>("INCR", key);
  }
};
