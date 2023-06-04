import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en" className="max-h-screen">
    <Head>
      <meta charSet="UTF-8" />
      <meta name="description" content="Minimal CLI-powered markdown blog" />
      <meta name="keywords" content="blog, CLI, software, markdown" />
      <meta name="author" content="Quinn Salas" />
      <link rel="icon" href="/assets/favicon.svg" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
