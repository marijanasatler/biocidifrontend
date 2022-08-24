
import Document, { Html, Head, Main, NextScript } from 'next/document';
import CookieConsent from "react-cookie-consent";
import getConfig from 'next/config';
const {publicRuntimeConfig}=getConfig();
import App from "next/app";



export default class MyDocument extends  Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
    render() {
        return (
            <Html>
                <Head>
                <meta charSet="UTF-8" />
      
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"/>
                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
          <link rel="stylesheet" href="/static/css/styles.css" />
          <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
  
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7_dtp.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="bower_components/aos/dist/aos.css" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
          <script type="text/javascript" src="http://connect.facebook.net/en_US/all.js"></script>
  
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9317053946095659" crossOrigin="anonymous"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-6KLHV1CDBJ"></script>
          <script src="bower_components/aos/dist/aos.js"></script> 
          <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
          <script>
    AOS.init();
  </script>
        <script type="module" src="pages/index.js"></script>
  

                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </ Html>
        );
    }
}