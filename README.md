<div align="center">

# Juan Almanza's Website

**_My home in the internet_**

</div>

<div align="center">

![](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)
![](https://img.shields.io/badge/Maintained%3F-Yes-brightgreen.svg)

</div>

<div align="center">

![Website Preview](https://raw.githubusercontent.com/scidroid/home/main/public/screenshot.png)

</div>

> This website is a beta and is Work In Progress. You can see the actual version in [scidroid.co](https://scidroid.co/).
>
> Try the beta live version in [home.scidroid.co](https://home.scidroid.co/)

This is the source code for my personal website. It is built using [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/).

Also, I use [Vercel](https://vercel.com/) to deploy the website and [ContentLayer](https://contentlayer.dev/) to manage the content and [Vercel KV](https://vercel.com/docs/storage/vercel-kv) as database.

## Features

- [ ] About me
- [ ] Projects
- [x] Blog
- [x] Contact
- [x] Now Playing
- [x] Health Data
- [x] Open Graph Image generation
- [x] Analytics
- [x] Sitemap
- [ ] Terminal easter egg

## Getting Started

First do you need to add the environment variables. You can do this by creating a `.env.local` file in the root directory. You can use the `.env.example` file as a template.

You need 9 environment variables:

- `RESEND_API_KEY` This is the API key for [Resend](https://resend.com) service that allow me to send emails.
- `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` and `KV_REST_API_READ_ONLY_TOKEN` is the API key for [Vercel KV](https://vercel.com/docs/storage/vercel-kv) database.
- `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` is the ids of your Spotify app. This is needed for the Now Playing section.
- `PASSWORD` is the password for the health endpoint, needed to secure the `/api/health` endpoint.

Then, install the dependencies:

```bash
bun i
```

Finally, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Contentlayer](https://contentlayer.dev/)
- [Vercel](https://vercel.com/)
- [Vercel KV](https://www.sanity.io/docs/storage/kv)
- [Resend](https://resend.com/)
- [Bun](https://bun.sh/)
- [Spotify API](https://developer.spotify.com/)

## Contact

If you want to contact me you can reach me at [hi@scidroid.co](mailto:hi@scidroid.co).
