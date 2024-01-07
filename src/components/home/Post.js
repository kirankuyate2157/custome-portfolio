import { useState, useEffect } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import Image from "next/image";
import myphoto from "../../../public/images/profile/rp1.jpg";
import { SlLike, SlOptionsVertical } from "react-icons/sl";
import { FaRegComment, FaShare, FaHandHoldingHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { TbBulbFilled } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { MdCelebration } from "react-icons/md";
import Comments from "./Comments";
import { getUserData } from "@/services/firebaseConfig.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

const Icons = [
  { Icon: SlLike, label: "Like", color: "blue" },
  { Icon: AiFillHeart, label: "Love", color: "red" },
  { Icon: MdCelebration, label: "Celebrate", color: "red" },
  { Icon: FaHandHoldingHeart, label: "Support", color: "green" },
  { Icon: TbBulbFilled, label: "Insightful", color: "yellow" },
];
const Post = ({data,onChanges}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [reactionOptionsVisible, setReactionOptionsVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState(null);
  
  const [react, setReact] = useState({
    label: "Like",
    icon: SlLike,
    color: "blue",
  });
  const [update,setUpdate] = useState(false);
  const [uids, setUids] = useState(new Set(data?.reactions?.uids || []));
  const [reactionCounts, setReactionCounts] = useState({...data?.reactions} ||{
    Like: 0,
    Love: 0,
    Celebrate: 0,
    Support: 0,
    Insightful: 0,
    uids:[],
  });

  const user = getUserData();
  const db = getFirestore();

  const updateLikeData = () => {

      const updatedData = { ...data, reactions: {...reactionCounts}  };
      

      if(data?.id){
      // Update the document in Firestore
      const postRef = doc(db, "posts", data?.id);
      // console.log("cloud data 🌧️🌧️",updatedData);
      updateDoc(postRef, updatedData)
        .then(() => {
          // console.log("Likes data updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating Home data :", error);
        });
      }
  };
  useEffect(() => {
      if(update){
        updateLikeData();
        onChanges();
      }
      setLikeCount(()=>(reactionCounts?.uids?.length+1)||0);
  }, [reactionCounts]);

const prevReactionUpdate=()=>{
  if(react){
    uids.delete(user.uid);

    setReactionCounts((prevCounts) => ({
      ...prevCounts,
      [react.label]: prevCounts[`${react.label}`]>0?prevCounts[`${react.label}`]-1:0,
      uids: Array.from(uids),
    }));
  }
}

    const handleReactionSelect = (reaction) => {
    if (isLiked) {
      prevReactionUpdate();
      uids.delete(user.uid);
      setReactionCounts((prevCounts) => ({
        ...prevCounts,
        [reaction.label]: prevCounts[`${reaction.label}`]>0?prevCounts[`${reaction.label}`]-1:0,
        uids: Array.from(uids),
      }));
      setReact({
        label: "Like",
        icon: SlLike,
        color: "blue",
      });
      setLikeCount((prevLikeCount) => prevLikeCount - 1);

    } else if (!isLiked) {
      prevReactionUpdate();
      uids.add(user?.uid);
      setReactionCounts((prevCounts) => ({
        ...prevCounts,
        [reaction.label]: prevCounts[`${reaction.label}`]+1,
        uids: Array.from(uids),
      }));

      const selectedIcon =
      Icons.find((icon) => icon.label === reaction.label)?.Icon || SlLike;
    const selectedColor =
      Icons.find((icon) => icon.label === reaction.label)?.color || "gray";
      let label = reaction.label;
    setReact({ label, icon: selectedIcon, color: selectedColor });

      setLikeCount((prevLikeCount) =>
        prevLikeCount + (selectedReaction ? 0 : 1)
      );
    }
    setIsLiked((prev)=>!prev);
    setUpdate(!update);
    setReactionOptionsVisible(false);
  };

  const handleReactionHover = () => {
    if (!isLiked) {
      setReactionOptionsVisible(true);
    }
  };

  const handleReactionLeave = () => {
    if (!isLiked) {
      setTimeout(() => {
        setReactionOptionsVisible(false);
      }, 2000); // 2 seconds delay
    }
  };

  const ReactionOptions = ({ onSelectReaction }) => {
    const reactionOptions = [
      { label: "Like", emoji: "👍" },
      { label: "Love", emoji: "❤️" },
      { label: "Celebrate", emoji: "🎉" },
      { label: "Support", emoji: "🤝" },
      { label: "Insightful", emoji: "💡" },
    ];

    const onReact=(option)=>{
      prevReactionUpdate();
    onSelectReaction(option); 
    }
    const [hoveredEmoji, setHoveredEmoji] = useState(null);

    return (
      <div className='absolute bottom-2 flex bg-white rounded-lg text-xl shadow-2xl p-1 z-10'>
        {reactionOptions.map((option) => (
          <div
            key={option.label}
            className={`relative cursor-pointer hover:bottom-3 hover:bg-transparent   rounded p-2 transform transition-transform ${
              hoveredEmoji === option.emoji ? "scale-100 opacity-150" : ""
            }`}
            onClick={() => onReact(option)}
            onMouseEnter={() => setHoveredEmoji(option.emoji)}
            onMouseLeave={() => setHoveredEmoji(null)}
          >
            {option.emoji}
            {hoveredEmoji === option.emoji && (
              <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-lg'>
                {option.label}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const Reaction = ({
    Icons,
    title,
    onClick,
    isActive,
    color,
    onMouseLeave,
    onMouseEnter,
  }) => {
    return (
      <div
        className={`flex w-full justify-center sm:p-2 p-4 my-2  hover:bg-gray-100 cursor-pointer md:gap-1 gap-2 items-center md:text-sm text-md font-bold rounded-lg ${
          isActive ? `text-red-500` : "text-gray-600"
        }`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Icons className={`sm:w-[20px] md:w-[25px]  w-[30px] h-auto`} />
        <span className='sm:hidden flex'>{title}</span>
      </div>
    );
  };

  return (
    <div className='max-w-[612px] min-w-[310px] text-black  m-2 rounded-lg bg-white'>
      <div className='flex items-center  text-sm md:mx-2 mx-5'>
        <div className='sm:w-14 md:w-[4rem] w-16 rounded  m-2'>
          <Image
            src={data?.avatar || "https://lh3.googleusercontent.com/a/AAcHTteViK4iyFuRAycZL9F16vca-LMEqOfcEW5Z4o64JDLlDFo=s96-c"}
            alt='profile'
            className='w-14 sm:w-16 h-14 rounded-full'
            priority
            width={300}
            height={400}
            sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,50vw'
          />
        </div>
        <div className='mr-1 my-2 flex flex-col sm:w-[76%] w-[85%] text-gray-700'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex justify-start  gap-1 md:text-sm text-lg'>
              <h1 className='font-semibold  text-black'>Kiran Kuyate</h1>
              <span>{`${data?.gender?"(He/Him)":"(She/Her)"}`}</span>
            </div>
            <SlOptionsVertical />
          </div>
          <div className='flex items-center'>
            <p className='flex md:text-[0.6rem] text-xs overflow-hidden whitespace-nowrap overflow-ellipsis  w-[80%] max-w-lg'>
             {data?.handle}
            </p>
            <span>...</span>
          </div>
          <h6 className='md:text-[0.6rem] text-sm'>13hr 🌏</h6>
        </div>
        <div></div>
      </div>
      <div className='sm:text-xs text-black text-sm md:mx-3 mx-5 mb-3'>
        <LinesEllipsis
          text={data?.text}
          maxLine={showFullText ? 1000 : 3}
          ellipsis='.. See more...'
          trimRight
          basedOn='words'
          onClick={() => setShowFullText(!showFullText)}
        />
      </div>
      <div className='mx-2 flex justify-center sm:mx-0'>
        <Image
          src={data?.file || myphoto}
          alt='post image'
          priority
          width={700}
            height={900}
          className='max-h-[500px] min-h-[300px]  w-auto'
          sizes='(max-width:768px) 100vw,(max-width:1200px) 70vw,50vw'
        />
      </div>
      <div className='md:mx-2 mx-5 text-gray-600'>
        <div className='flex justify-between text-xs p-1'>
          <div className='flex gap-1 relative'>
            <div className='flex items-center cursor-pointer ml-2'>
              {reactionCounts.Like > 0 && (
                <span className='bg-green-300 border rounded-full ml-[-8px] '>
                  👍
                </span>
              )}
              {reactionCounts.Love > 0 && (
                <span className='bg-red-700 border rounded-full ml-[-8px]'>
                  ❤️
                </span>
              )}
              {reactionCounts.Celebrate > 0 && (
                <span className='bg-yellow-500 border border-gray-300 rounded-full ml-[-8px]'>
                  🎉
                </span>
              )}
              {reactionCounts.Support > 0 && (
                <span className='bg-blue-500 border border-gray-300 rounded-full ml-[-8px]'>
                  🤝
                </span>
              )}
              {reactionCounts.Insightful > 0 && (
                <span className='bg-purple-500 border border-gray-300 rounded-full ml-[-8px]'>
                  💡
                </span>
              )}
            </div>
            {reactionOptionsVisible && (
              <ReactionOptions onSelectReaction={(option)=>handleReactionSelect(option)} />
            )}
            <div>
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </div>
          </div>
          <div className='flex px-2 gap-2'>
            <h6> 3 comments • 2 reposts </h6>
          </div>
        </div>
        <hr className='mt-1' />
        <div className='flex w-full mb-2 '>
          <Reaction
            Icons={react.icon}
            title={react.label}
            onClick={() =>{ handleReactionSelect({ label: "Like", emoji: SlLike }),
          setIsLiked(!isLiked)}}
            isActive={isLiked === true}
            color={react.color ? react.color : "red"}
            onMouseEnter={()=>handleReactionHover()}
            onMouseLeave={handleReactionLeave}
          />
          <Reaction
            Icons={FaRegComment}
            title={"Comment"}
            onClick={() => setShowComments(!showComments)}
          />
          <Reaction Icons={BiRepost} title={"Repost"} />
          <Reaction Icons={FaShare} title={"Send"} />
        </div>
      </div>
      {showComments && <Comments  postId={data?.id}Data={[...data?.comments]} />}
    </div>
  );
};

export default Post;
