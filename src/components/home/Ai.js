import React from 'react';4

import Image from "next/image";
import AiPower from "./../../../public/images/profile/AoEmpty.png"
const Ai = () => {
  return (
    <div>
       <div
                className={`flex-1 font-mono w-full pt-10 flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative  pb-4 md:pb-0`}
              >
                <div
                  className='absolute z-[1] w-[60%] h-[60%] right-[50%] rounded-full opacity-40 '
                  style={{
                    background:
                      "linear-gradient(90deg, #601d50 40%, #960443 100%)",
                    filter: "blur(900px)",
                  }}
                />
                <Image
                  src={AiPower}
                  alt='Ai coming soon..'
                  className='z-[10] w-[70%] md:w-[50%] h-full opacity-20 '
                />
              </div>
              <div className="w-full px-3 sm:text-sm flex justify-center text-gray-400"> Generative AI power on Application comming soon.. </div>
    </div>
  )
}

export default Ai;
