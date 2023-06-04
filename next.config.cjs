/** @type {import('next').NextConfig} */

const withMarkdoc = require("@markdoc/next.js");

const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  pageExtensions: ["ts", "tsx", "md"],
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withMarkdoc({ mode: "static" })(nextConfig);
