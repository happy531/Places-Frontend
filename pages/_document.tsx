import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang={"en"}>
        <Head />
        <body>
          <div id="delete_overlay" />
          <div id="edit_overlay" />
          <div id="map_overlay" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
