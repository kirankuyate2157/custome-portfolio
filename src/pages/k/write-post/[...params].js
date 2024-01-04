import Head from "next/head";
import NavbarHome  from '@/components/home/NavbarHome';
import StartPost from '@/components/home/StartPost';
import Post from '@/components/home/Post';
import WritePost from "../../../components/home/WritePost";
import { useRouter } from "next/router";
const Home = () => {

  const router=useRouter();
  const dataPrams=router.query;
  console.log("write post .. :", dataPrams)
  return (
    <>
      <Head>
        <title> portfolio | kiran.dev</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className="min-h-[100vh] w-full">
        <div className="w-full md:hidden">
        <NavbarHome/>
        </div>
        <div className="min-w-[300px] sm:mx-0 md:mx-2 w-full flex justify-center">
          <WritePost/>
          </div>
      </main>
    </>
  );
};

export default Home;
