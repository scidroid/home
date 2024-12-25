export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
        allow: []
      }
    ],
    sitemap: "https://testing.scidroid.co/sitemap.xml",
    host: "https://testing.scidroid.co"
  };
}
