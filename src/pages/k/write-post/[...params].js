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
        <title> Kways </title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className="min-h-screen relative w-full overflow-hidden">
      {/* Background content */}
      <div className="bg-image w-full h-screen">
        <NavbarHome />
      </div>

      {/* Modal overlay */}
      <div className="modal-overlay absolute inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm flex justify-center  sm:pt-10 sm:items-start items-center">
        {/* Modal content */}
        <WritePost />
      </div>
    </main>
    </>
  );
};

export default Home;
