import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import LinesEllipsis from "react-lines-ellipsis";
import StartPortfolio from "./StartPortfolio";
import Image from "next/image";
import blankProf from "../../../public/images/profile/blankProf.png";
import nl2 from "../../../public/images/nl2.png";
import {
  getFirestore,
  collection,
  getDocs,

} from "firebase/firestore";
const Preview = ({ data }) => {
  return <>
    <div
      className=' text-xs w-full p-2 flex gap-2 rounded overflow-hidden  text-black dark:text-gray-100 bg-white dark:bg-[#151829] border dark:border-[#231e39] relative'

    >
      <div
        className='absolute z-[0] w-[80%] h-[80%] right-[40%] rounded-full  opacity-30 bottom-4'
        style={{
          background: "linear-gradient(90deg, #6A15DA 40%, #960443 100%)",
          filter: "blur(900px)",
        }}
      />

      <Image
        src={data?.portfolioImg || nl2}
        alt={data?.name || "portfolio"}
        className='min-w-[80px] w-[20%] h-auto rounded z-10'

        priority
        width={400}
        height={900}
        sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,50vw'
      />
      <div class=' w-[70%] gap-2 flex flex-col z-10'>
        <h2 className='pb-1 text-lg'>{data?.name || "Portfolio"}</h2>
        <p className='flex flex-wrap'>
          <LinesEllipsis
            text={`I have created portfolio to Increase my work online better presence so i can get more outputs.. try now`}
            maxLine={2}
            ellipsis='...'
            trimRight
            basedOn='words'
          />
        </p>
        <div className='py-1 flex gap-2 justify-start items-center'>
          <a href={data?.profileLink} className="flex  gap-2 p-1 border border-pink-600 dark:border-pink-200  rounded items-center">
            visit <FaChevronRight className='animate-pulse text-pink-200' />
          </a>
        </div>
      </div>
    </div>
  </>
}
const PortfolioLists = () => {

  const [users, setUsers] = useState([]);

  const fetchPortfoliosData = async () => {
    const db = getFirestore();
    const usersRef = collection(db, "Users"); // Use collection() to reference a collection
    // // console.log("fetching pusers 📍📍🔥 ..");
    try {
      const userDataSnapshot = await getDocs(usersRef);
      // // console.log(" 📍📍🔥 users ..");
      if (!userDataSnapshot.empty) {
        const newUserData = userDataSnapshot.docs.map((doc) => doc.data().profileData).filter((data) => data.visibility === true);
        setUsers([...newUserData]);
        // // console.log("🔥 ..");
        // // console.log("new data :", newUserData);
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPortfoliosData();
      // // console.log("User public portfolio fetched done ✅");
    }
    fetchData();
  }, []);


  return (
    <div>
      <div className='max-w-[612px] min-w-[360px] text-white my-4 m-2 rounded-lg '>
        <div className='flex items-center gap-2 w-full px-2 flex-col pb-10  overflow-y-auto text-sm '>
          <StartPortfolio />

          {users && users.length > 0 && (
            users.map((data, index) => <Preview key={index} data={{ ...data }} />
            ))}

        </div>
      </div>
    </div>
  );
};

export default PortfolioLists;
