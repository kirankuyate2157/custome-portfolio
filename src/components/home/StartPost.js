import { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import { CiImageOn } from "react-icons/ci";
import { BiSolidVideos } from "react-icons/bi";
import { IoCalendar } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";

const Media = ({ Icons, title, colors = "red", onClick }) => {
  return (
    <>
      <div
        className={`flex justify-center sm:p-1 md:p-2 p-3 hover:bg-gray-100 cursor-pointer md:gap-1 gap-2 items-center md:text-sm text-lg rounded-md`}
        onClick={onClick}
      >
        <Icons
          className={`md:w-[30px] w-[56px] h-auto text-${colors}-600`}
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
    router.push(`/write-post/${type}/true`); // Use route parameters format
  };

  return (
    <>
    
      <div className=' max-w-[612px] min-w-[310px] my-10 mx-2 rounded-xl text-black bg-white border'>
        <div className='flex gap-3 mx-5 py-2'>
          <div>
            <img
              src='https://avatars.githubusercontent.com/u/84271800?v=4'
              alt='placeholder'
              className='w-[60px] rounded-full'
            />
          </div>
          <Link
            href='/write-post'
            className='w-full h-auto hover:bg-gray-100 p-1 rounded-full cursor-pointer'
          >
            <h5 className='w-full rounded-full items-center flex h-full text-lg border-[1px] input-none focus:outline-none border-gray-300 px-5'>
              Start post ..
            </h5>
          </Link>
        </div>
        <div className='flex w-full justify-around mb-2 '>
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
