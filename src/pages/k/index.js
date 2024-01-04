import Head from "next/head";
import NavbarHome from "@/components/home/NavbarHome";
import StartPost from "@/components/home/StartPost";
import Post from "@/components/home/Post";
import Profile from "@/components/home/Profile";
import { useEffect } from "react";
import { useRouter } from "next/router";
const Home = () => {
  return (
    <>
      <Head>
        <title> portfolio | kiran.dev</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='min-h-screen w-full'>
        <NavbarHome />
        <div className='sm:p-0 px-10  flex flex-row justify-start gap-2 '>
          <div
            className='md:hidden max-w-[612px] min-w-[310px]   overflow-y-auto'
            style={{ height: "100vh" }}
          >
            <Profile />
          </div>
          <div className=' w-full max-w-[612px] min-w-[310px] '>
          <div
            className='flex flex-col max-w-[612px] min-w-[310px] hide-scrollbar  overflow-y-auto'
            style={{ height: "100vh" }}
          >
            <StartPost />
            <Post />
            <Post />
          </div>
        </div>
        </div>
      </main>
    </>
  );
};

export default Home;
