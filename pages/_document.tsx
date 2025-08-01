import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="description" content="An online movie streaming app" />
        <link
          rel="icon"
          href="https://shoowflix.vercel.app/maskable_icon_x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="https://shoowflix.vercel.app/maskable_icon_x192.png"
        />
        <meta name="title" content="Shoowflix - Stream Movies" />
        <meta
          name="description"
          content="Torrent streaming website without ads "
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shoowflix.vercel.app" />
        <meta property="og:title" content="Shoowflix - Stream Movies" />
        <meta
          property="og:description"
          content="Torrent streaming website without ads "
        />
        <meta
          property="og:image"
          content="https://shoowflix.vercel.app/background.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shoowflix.vercel.app" />
        <meta property="twitter:title" content="Shoowflix - Stream Movies" />
        <meta
          property="twitter:description"
          content="Torrent streaming website without ads "
        />
        <meta
          property="twitter:image"
          content="https://shoowflix.vercel.app/background.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
