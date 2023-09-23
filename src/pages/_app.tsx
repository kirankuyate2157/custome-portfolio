import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HomeDataProvider } from "./../context/DataProvider";
import KiranPortfolioData from "./../assets/portfolioData";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>my portfolio</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />

        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-NLKDG5322T'
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-NLKDG5322T');
      `,
          }}
        />
      </Head>
      <main
        className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}
      >
        <HomeDataProvider data={KiranPortfolioData}>
          <Navbar />
          <AnimatePresence mode='wait'>
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
          <Footer />
        </HomeDataProvider>
      </main>
    </>
  );
}
