import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com'  crossOrigin="" />
        <link
          href='https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap'
          rel='stylesheet'
        ></link>
        <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Script id='theme-switcher' strategy='beforeInteractive'>
          {`if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
