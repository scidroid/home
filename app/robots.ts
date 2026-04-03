export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
        allow: []
      }
    ],
    sitemap: "https://almanza.cc/sitemap.xml",
    host: "https://almanza.cc"
  };
}
