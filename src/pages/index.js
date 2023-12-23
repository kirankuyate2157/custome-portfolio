import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";
import ProfilePic from "../../public/images/profile/pa3.png";
import AnimatedText from "../components/AnimatedText";
import Hireme from "../components/Hireme";
import { LinkArrow } from "../components/icons";
import TransitionEffect from "../components/TransitionEffect";
import { motion } from "framer-motion";
import Navbar from "../components/Main/Navbar";
export default function Home() {
  return (
    <>
      <Head>
        <title> Kways | kiran2157.dev</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='min-h-[80vh]'>
        <div className='relative'>
          <Navbar />
        </div>
      </main>
    </>
  );
}
