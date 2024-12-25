<div align="center">

# Juan Almanza's Website

**_My home in the internet_**

</div>

<div align="center">

![](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)
![](https://img.shields.io/badge/Maintained%3F-Yes-brightgreen.svg)

</div>

<div align="center">

![Website Preview](https://raw.githubusercontent.com/scidroid/home/refs/heads/testing/public/screenshot.jpg)

</div>

> Try the live version at [testing.scidroid.co](https://testing.scidroid.co/)

This is my personal website built with the latest web technologies. It serves as my digital home, showcasing my work, thoughts, and experiences.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vercel](https://vercel.com/) - Platform for deployment and hosting
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) - Redis database
- [Bun](https://bun.sh/) - JavaScript runtime & package manager

## Features

- [x] About me section with profile
- [] Projects portfolio
- [x] Blog
- [x] Contact form with email and telegram notifications
- [x] Now Playing integration with Apple Music
- [x] Health data integration
- [x] Dynamic OG image generation
- [x] Analytics
- [x] Auto-generated sitemap
- [x] Terminal easter egg
- [x] View transitions API
- [x] Responsive design

## Getting Started

First do you need to add the environment variables. You can do this by creating a `.env.local` file in the root directory. You can use the `.env.example` file as a template.

You need the following environment variables:

- `KV_REST_API_READ_ONLY_TOKEN` - Read-only access token for [KV REST API](https://vercel.com/docs/storage/vercel-kv)
- `KV_REST_API_TOKEN` - Full access token for [KV REST API](https://vercel.com/docs/storage/vercel-kv)
- `KV_REST_API_URL` - Base URL for [KV REST API](https://vercel.com/docs/storage/vercel-kv) endpoints
- `KV_URL` - Redis connection URL for [KV database](https://vercel.com/docs/storage/vercel-kv)
- `PASSWORD` - Application password for secure access
- `RESEND_API_KEY` - API key for [Resend](https://resend.com) email service
- `APPLE_MUSIC_JWT` - JSON Web Token for [Apple Music API](https://developer.apple.com/documentation/applemusicapi) authentication
- `APPLE_MUSIC_MUT` - Music User Token for [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- `TELEGRAM_BOT_TOKEN` - API token for [Telegram Bot API](https://core.telegram.org/bots/api)
- `TELEGRAM_CHAT_ID` - Chat ID for [Telegram](https://telegram.org) notifications

Then, install the dependencies:

```bash
bun i
```

Finally, run the development server:

```bash
bun dev
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Production

To build the website for production, run:

```bash
bun run build
```

Then, to start the production server, run:

```bash
bun run start
```

This repository has a deployment configuration for Vercel. So to deploy the website, just push the changes to the `main` branch.

But, if you want to deploy the website in another platform, you need to add the environment variables to the production server and just run the `bun run build` and `bun run start` commands.

If you want to deploy it in Vercel, you can just run `vercel` in the root directory and follow the instructions.

## License

This project is licensed under the GNU AGPLv3 License - see the [LICENSE](LICENSE) file for details.

## Contact

If you want to contact me you can reach me at [hi@scidroid.co](mailto:hi@scidroid.co).
