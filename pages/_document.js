import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from '../utils/create-emotion-cache';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Dandela Crypto Converter - Financial freedom | Freedom to choose." />
          <link
            rel="icon"
            type="image/ico"
            href="/icons/favicon.ico"
          />
          <link
            rel="icon"
            type="image/ico"
            sizes="32x32"
            href="/icons/favicon32x32.ico"
          />
          <link rel="shortcut icon" href="/favicon32x32.ico" />

          <link
            rel="icon"
            type="image/ico"
            sizes="16x16"
            href="/icons/favicon16x16.ico"
          />
          <link
            rel="icon"
            type="image/ico"
            sizes="32x32"
            href="/icons/favicon32x32.ico"
          />
          <link rel="shortcut icon" href="/favicon32x32.ico" />

          <link
            rel="icon"
            type="image/ico"
            sizes="64x64"
            href="/icons/favicon64x64.ico"
          />
          <link rel="manifest" href="/manifest.json" />

          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=swap"
          />

          <meta name="theme-color" content="#094397" />

          <meta name="application-name" content="Dandela Crypto Converter" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Dandela Crypto Converter" />
          <meta name="description" content="Dandela Crypto Converter - Financial freedom | Freedom to choose" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-tap-highlight" content="no" />

          <link rel="apple-touch-icon" href="/static/images/logos/logo.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/images/logos/logo.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/images/logos/logo.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/static/images/logos/logo.png" />

          <link rel="icon" type="image/ico" sizes="32x32" href="/icons/favicon32x32.ico" />
          <link rel="icon" type="image/ico" sizes="16x16" href="/icons/favicon16x16.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/static/images/logos/maskable_icon.png" color="#FFFFFFFF" />
          <link rel="shortcut icon" href="/icons/favicon32x32.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://dandela.com" />
          <meta name="twitter:title" content="Dandela Crypto Converter - Financial freedom | Freedom to choose" />
          <meta name="twitter:description" content="Dandela Crypto Converter - Financial freedom | Freedom to choose" />
          <meta name="twitter:image" content="https://dandela.com/static/images/logos/logo.png" />
          <meta name="twitter:creator" content="@DrillDev" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Dandela | Crypto Converter" />
          <meta property="og:description" content="Dandela Crypto Converter - Financial freedom | Freedom to choose" />
          <meta property="og:site_name" content="Dandela Crypto Converter - Financial freedom | Freedom to choose" />
          <meta property="og:url" content="https://dandela.com" />
          <meta property="og:image" content="https://dandela.com/static/images/logos/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => (
      <App
        emotionCache={cache}
        {...props}
      />
    )
  });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  };
};

export default CustomDocument;
