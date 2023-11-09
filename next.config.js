const million = require('million/compiler');
const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

module.exports = million.next(
  withContentlayer(nextConfig), { auto: { rsc: true } }
);
