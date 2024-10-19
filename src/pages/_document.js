import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/logo/Ecomedge.png" />
          <meta
            property="og:title"
            content="TriDyota - Electric Item Wholesale Marketplace"
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content="Electric Item Wholesale Marketplace"
          />
          <meta
            property="og:url"
            content="https://tridyota.com/"
          />
          <meta
            property="og:image"
            content="https://tridyota.com/"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
