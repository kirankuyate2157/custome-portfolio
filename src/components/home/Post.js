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

const Icons = [
  { Icon: SlLike, label: "Like", color: "blue" },
  { Icon: AiFillHeart, label: "Love", color: "green" },
  { Icon: MdCelebration, label: "Celebrate", color: "green" },
  { Icon: FaHandHoldingHeart, label: "Support", color: "green" },
  { Icon: TbBulbFilled, label: "Insightful", color: "green" },
];
const Post = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [reactionOptionsVisible, setReactionOptionsVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [react, setReact] = useState({
    label: "Like",
    icon: SlLike,
    color: "blue",
  });
  const [reactionCounts, setReactionCounts] = useState({
    Like: 0,
    Love: 0,
    Celebrate: 0,
    Support: 0,
    Insightful: 0,
  });

  useEffect(() => {
    const highestCountReaction = Object.entries(reactionCounts).reduce(
      (prev, [label, count]) => {
        if (count > prev.count) {
          return { label, count };
        }
        return prev;
      },
      { label: "Like", count: 0 }
    );

    const { label, count } = highestCountReaction;
    const selectedIcon =
      Icons.find((icon) => icon.label === label)?.Icon || SlLike;
    const selectedColor =
      Icons.find((icon) => icon.label === label)?.color || "gray";

    setReact({ label, icon: selectedIcon, color: selectedColor });
    setLikeCount((prevLikeCount) => prevLikeCount + count);

    console.log("react color: ", react.color);
  }, [reactionCounts]);

  const handleLikeClick = () => {
    setLikeCount((prevLikeCount) =>
      prevIsLiked
        ? prevLikeCount - reactionCounts.Like
        : prevLikeCount + reactionCounts.Like
    );
    setSelectedReaction(null); // Clear the selected reaction when the user clicks the Like button
  };

  const handleReactionSelect = (reaction) => {
    if (selectedReaction === reaction) {
      // If the same reaction is selected, clear the selection
      setSelectedReaction(null);

      setReactionCounts((prevCounts) => ({
        ...prevCounts,
        [reaction.label]: 0, // Set the count of the selected reaction to 0
      }));
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
    } else {
      // If a different reaction is selected, update the selection
      setSelectedReaction(reaction);
      setReactionCounts((prevCounts) => ({
        // Set the count of the selected reaction to 1 and all others to 0
        Like: reaction.label === "Like" ? 1 : 0,
        Love: reaction.label === "Love" ? 1 : 0,
        Celebrate: reaction.label === "Celebrate" ? 1 : 0,
        Support: reaction.label === "Support" ? 1 : 0,
        Insightful: reaction.label === "Insightful" ? 1 : 0,
      }));

      setLikeCount(
        (prevLikeCount) =>
          // Adjust the like count based on the selected reaction
          prevLikeCount + (selectedReaction ? 0 : 1)
      );
    }
    setIsLiked(!isLiked);
    console.log("liked : ", isLiked);

    setReactionOptionsVisible(false);
  };

  const handleReactionHover = () => {
    console.log("📍📍");
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

    const [hoveredEmoji, setHoveredEmoji] = useState(null);

    return (
      <div className='absolute bottom-2 flex bg-white rounded-lg text-xl shadow-2xl p-1 z-10'>
        {reactionOptions.map((option) => (
          <div
            key={option.label}
            className={`relative cursor-pointer hover:bottom-3 hover:bg-transparent   rounded p-2 transform transition-transform ${
              hoveredEmoji === option.emoji ? "scale-100 opacity-150" : ""
            }`}
            onClick={() => onSelectReaction(option)}
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
          isActive ? `text-${color}-500` : "text-gray-600"
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
        <div className='sm:w-14 md:w-[4rem] w-20 rounded  m-2'>
          <img
            src='https://avatars.githubusercontent.com/u/84271800?v=4'
            alt='user profile'
            className='w-full rounded-full'
          />
        </div>
        <div className='mr-1 my-2 flex flex-col sm:w-[76%] w-[85%] text-gray-700'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex justify-start  gap-1 md:text-sm text-lg'>
              <h1 className='font-semibold  text-black'>Kiran Kuyate</h1>
              <span>(He/Him)</span>
            </div>
            <SlOptionsVertical />
          </div>
          <div className='flex items-center'>
            <p className='flex md:text-[0.6rem] text-xs overflow-hidden whitespace-nowrap overflow-ellipsis  w-[80%] max-w-lg'>
              SDE aspirants 💫 | final yr | web dev (MERN) | DS | DSA | AI
              enthusiast | 2x100DaysOfCode
            </p>
            <span>...</span>
          </div>
          <h6 className='md:text-[0.6rem] text-sm'>13hr 🌏</h6>
        </div>
        <div></div>
      </div>
      <div className='sm:text-xs text-black text-sm md:mx-3 mx-5 mb-3'>
        <LinesEllipsis
          text={`I'm happy to share that I have obtained a new certification of Advanced Software Engineering Virtual Program of Walmart Global Tech, it was provided by Forage. #walmartglobaltech #theforage #softwareengineer #virtualexperience`}
          maxLine={showFullText ? 1000 : 3}
          ellipsis='.. See more...'
          trimRight
          basedOn='words'
          onClick={() => setShowFullText(!showFullText)}
        />
      </div>
      <div className='mx-2 flex justify-center sm:mx-0'>
        <Image
          src={myphoto}
          alt='post image'
          priority
          className='max-h-[500px] min-h-[300px]  w-auto'
          sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,50vw'
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
              <ReactionOptions onSelectReaction={handleReactionSelect} />
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
            onClick={() => handleReactionSelect({ label: "Like", emoji: "👍" })}
            isActive={isLiked === true}
            color={react.color ? react.color : "Yellow"}
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
      {showComments && <Comments />}
    </div>
  );
};

export default Post;
