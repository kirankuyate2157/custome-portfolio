import Head from "next/head";
import NavbarHome  from '@/components/home/NavbarHome';
import StartPost from '@/components/home/StartPost';
import Post from '@/components/home/Post';
import WritePost from "../../../components/home/WritePost";
const Home = () => {
  return (
    <>
      <Head>
        <title> portfolio | kiran.dev</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className="min-h-[100vh] w-full">
        <NavbarHome/>
        <div className="min-w-[300px] sm:mx-0 md:mx-2 ">
          <WritePost/>
          </div>
      </main>
    </>
  );
};

export default Home;
