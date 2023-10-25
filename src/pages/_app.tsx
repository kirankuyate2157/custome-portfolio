import "@/styles/globals.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HomeDataProvider } from "./../context/DataProvider";
import KiranPortfolioData from "./../assets/portfolioData";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { Component } from "react";
import { getUserPortfolioData } from "./../services/dataCRUD.js";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }: AppProps) {
  const [PortfolioData, setPortfolioData] = useState(KiranPortfolioData);
  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      // Get the user's UID
      // const user = getUserData();
      // if (user)
      const userId = "IewXRnC69XRTnbgRf41EmKuU9cu2";
      const userPortfolioData = await getUserPortfolioData(userId);
      console.log("user data home  ", userPortfolioData);
      if (userPortfolioData) {
        setPortfolioData(userPortfolioData);
      }
    };

    fetchData();
  }, []);

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
        <HomeDataProvider data={PortfolioData}>
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
