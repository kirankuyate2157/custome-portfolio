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
        className={`flex justify-center sm:p-1 md:p-2 p-3 hover:bg-gray-100 cursor-pointer md:gap-1 gap-2 items-center text-sm rounded-md`}
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

const StartPortfolio = () => {
  const [documentType, setDocumentType] = useState("");
  const router = useRouter()
  const handleDocumentClick = (type) => {
    setDocumentType(type);
    router.push(`/id/demo`); // Use route parameters format
  };

  return (
    <>
    
      <div className=' max-w-[612px] min-w-[310px] w-full  my-3 px-4 rounded-xl text-gray-200 '  style={{
          backgroundImage:
            "linear-gradient(to bottom,  #7c134d, #601d50, #601d50,#44214b,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829)",
        }}>
        <div className='flex gap-3  py-2'>
          <div>
            <img
              src='https://avatars.githubusercontent.com/u/84271800?v=4'
              alt='placeholder'
              className='w-[60px] rounded-full'
            />
          </div>
          <Link
            href='/id/demo'
            className='w-full h-auto hover:bg-[#151829] p-1 rounded-full cursor-pointer'
          >
            <h5 className='w-full rounded-full items-center flex h-full text-lg border-[1px] input-none focus:outline-none border-gray-500 px-5'>
              Start portfolio ..
            </h5>
          </Link>
        </div>
       
      </div>
    </>
  );
};

export default StartPortfolio;
