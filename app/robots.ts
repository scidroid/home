export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"]
      }
    ],
    sitemap: "https://almanza.cc/sitemap.xml",
    host: "https://almanza.cc"
  };
}
