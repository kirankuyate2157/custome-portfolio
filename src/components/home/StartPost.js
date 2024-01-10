import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import { CiImageOn } from "react-icons/ci";
import { BiSolidVideos } from "react-icons/bi";
import { IoCalendar } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";
import blankProf from "./../../../public/images/profile/blankProf.png"
import { useAccount } from "../../context/AccoundData";
const Media = ({ Icons, title, colors = "red", onClick }) => {
  return (
    <>
      <div
        className={`flex justify-center sm:p-1 md:p-2 p-3 hover:bg-gray-100 dark:hover:bg-[#231e39] cursor-pointer md:gap-1 gap-2 items-center text-sm rounded-md`}
        onClick={onClick}
      >
        <Icons
          className={`md:w-[30px] w-[32px] h-auto text-${colors}-600`}
          style={{ color: colors }}
        />
        <span className='sm:hidden w-full'>{title}</span>
      </div>
    </>
  );
};

const StartPost = () => {
  const [documentType, setDocumentType] = useState("");
  const router = useRouter()
  const handleDocumentClick = (type) => {
    setDocumentType(type);
    router.push(`/k/write-post/${type}/true`); // Use route parameters format
  };
  const ac=useAccount();

  return (
    <>
    
      <div className=' max-w-[612px] min-w-[310px]  my-3 mx-2 rounded-xl text-black dark:text-gray-100 bg-white dark:bg-[#151829] border dark:border-[#231e39]'>
        <div className='flex gap-3 mx-5 py-2'>
          <div>
            <Image
              src={ac?.avatar || blankProf }
              alt='user'
              className='w-[60px] rounded-full'
              priority
              width={50}
              height={50}
              sizes='(max-width:768px) 100vw,(max-width:1200px) 70vw,50vw'
           
            />
          </div>
          <Link
            href='/k/write-post/documents'
            className='w-full h-auto hover:bg-gray-100  dark:hover:bg-[#231e39] p-1 rounded-full cursor-pointer'
          >
            <h5 className='w-full rounded-full items-center flex h-full text-lg border-[1px] input-none focus:outline-none border-gray-300 dark:border-gray-500 px-5'>
              Start post ..
            </h5>
          </Link>
        </div>
        <div className='flex  justify-around mb-2 overflow-hidden'>
          <Media
            title={"Photo"}
            Icons={CiImageOn}
            onClick={() => handleDocumentClick("Images")}
          />
          <Media
            title={"Video"}
            Icons={BiSolidVideos}
            onClick={() => handleDocumentClick("Videos")}
          />
          <Media
            title={"Articles"}
            Icons={GrArticle}
            onClick={() => handleDocumentClick("Documents")}
          />
          <Media
            title={"Events"}
            Icons={IoCalendar}
            onClick={() => handleDocumentClick("Events")}
          />
        </div>
      </div>
    </>
  );
};

export default StartPost;
