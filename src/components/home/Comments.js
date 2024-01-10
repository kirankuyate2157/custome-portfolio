import { useState, useEffect } from "react";
import Image from "next/image";
import { SlLike, SlOptions } from "react-icons/sl";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegComment, FaShare, FaHandHoldingHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { TbBulbFilled } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { MdCelebration } from "react-icons/md";
import {blankProf} from "./../../../public/images/profile/blankProf.png"
import { useAccount } from "../../context/AccoundData";
import LinesEllipsis from "react-lines-ellipsis";
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
import { nanoid } from "nanoid";

const generateDateString = () => {
  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Extract time components
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Generate the formatted date string
  const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return dateString;
};

// console.log("comenet data ",generateDateString());
const Icons = [
  { Icon: SlLike, label: "Like", color: "red" },
  { Icon: AiFillHeart, label: "Love", color: "red" },
  { Icon: MdCelebration, label: "Celebrate", color: "red" },
  { Icon: FaHandHoldingHeart, label: "Support", color: "green" },
  { Icon: TbBulbFilled, label: "Insightful", color: "yellow" },
];


const Comment = ({ data, postId }) => {

  const [isLiked, setIsLiked] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const [reactionOptionsVisible, setReactionOptionsVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const [react, setReact] = useState({
    label: "Like",
    icon: SlLike,
    color: "red",
  });
  const [update, setUpdate] = useState(false);
  const [uids, setUids] = useState(new Set(data?.reactions?.uids || []));
  const [reactionCounts, setReactionCounts] = useState(
    { ...data?.reactions } || {
      Like: 0,
      Love: 0,
      Celebrate: 0,
      Support: 0,
      Insightful: 0,
      uids: [],
    }
  );

  const user = getUserData();
  const db = getFirestore();

  const updateCommentReaction = (postId, commentId) => {
    const db = getFirestore();
    const postRef = doc(db, "posts", postId);

    // Get the post document
    getDoc(postRef)
      .then((postDoc) => {
        if (postDoc.exists()) {
          // Find the index of the comment within the comments array
          const commentIndex = postDoc.data().comments.findIndex(
            (comment) => comment.id === commentId
          );

          if (commentIndex !== -1) {
            // Update reactions within the found comment
            const updatedComments = [...postDoc.data().comments];
            updatedComments[commentIndex] = {
              ...updatedComments[commentIndex],
              reactions: reactionCounts,
            };

            // Update the post document with the modified comments array
            updateDoc(postRef, { comments: updatedComments })
              .then(() => {
                // // console.log("Comment reactions updated successfully.");
              })
              .catch((error) => {
                console.error("Error updating comment reactions:", error);
              });
          }
          //  else {
          //   console.error("Comment not found in the post.");
          // }
        }
        // else {
        //   console.error("Post document not found.");
        // }
      })
      .catch((error) => {
        console.error("Error fetching post document:", error);
      });
  };

  useEffect(() => {
    if (update && postId && data.id) {
      updateCommentReaction(postId, data.id,);
    }
    setLikeCount(() => reactionCounts?.uids?.length + 1 || 0);
  }, [reactionCounts]);

  const prevReactionUpdate = () => {
    if (react) {
      uids.delete(user.uid);

      setReactionCounts((prevCounts) => ({
        ...prevCounts,
        [react.label]:
          prevCounts[`${react.label}`] > 0
            ? prevCounts[`${react.label}`] - 1
            : 0,
        uids: Array.from(uids),
      }));
    }
  };

  const handleReactionSelect = (reaction) => {
    if (isLiked) {
      prevReactionUpdate();
      uids.delete(user.uid);
      setReactionCounts((prevCounts) => ({
        ...prevCounts,
        [reaction.label]:
          prevCounts[`${reaction.label}`] > 0
            ? prevCounts[`${reaction.label}`] - 1
            : 0,
        uids: Array.from(uids),
      }));

      setReact({
        label: "Like",
        icon: SlLike,
        color: "red",
      });
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
    } else if (!isLiked) {
      prevReactionUpdate();
      uids.add(user?.uid);
      setReactionCounts((prevCounts) => ({
        ...prevCounts,
        [reaction.label]: prevCounts[`${reaction.label}`] + 1,
        uids: Array.from(uids),
      }));

      const selectedIcon =
        Icons.find((icon) => icon.label === reaction.label)?.Icon || SlLike;
      const selectedColor =
        Icons.find((icon) => icon.label === reaction.label)?.color || "gray";
      let label = reaction.label;
      setReact({ label, icon: selectedIcon, color: selectedColor });

      setLikeCount(
        (prevLikeCount) => prevLikeCount + (selectedReaction ? 0 : 1)
      );
    }
    setIsLiked((prev) => !prev);
    setUpdate(!update);
    setReactionOptionsVisible(false);
  };

  const handleReactionHover = () => {
    if (!isLiked) {
      setReactionOptionsVisible(true);
    }
  };


  const formatTimeDifference = (commentTime) => {
    const currentTime = new Date();
    const commentTimeObj = new Date(commentTime); // Convert Firebase Timestamp to JavaScript Date object

    const timeDifference = currentTime - commentTimeObj;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} ${years === 1 ? "year" : "years"}`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? "month" : "months"}`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"}`;
    } else if (hours > 0) {
      return `${hours} hr`;
    } else if (minutes > 0) {
      return `${minutes} min`;
    } else {
      return `${seconds} sec`;
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

    const onReact = (option) => {
      prevReactionUpdate();
      onSelectReaction(option);
    };
    const [hoveredEmoji, setHoveredEmoji] = useState(null);

    return (
      <div className='absolute bottom-2 flex bg-white dark:bg-[#151829] rounded-lg text-xl shadow-2xl p-1 z-10'>
        {reactionOptions.map((option) => (
          <div
            key={option.label}
            className={`relative cursor-pointer hover:bottom-3 hover:bg-transparent   rounded p-2 transform transition-transform ${hoveredEmoji === option.emoji ? "scale-100 opacity-150" : ""
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
        className={`flex w-full justify-center sm:p-2 p-4 my-2  hover:bg-gray-100 cursor-pointer md:gap-1 gap-2 items-center md:text-sm text-md font-bold rounded-lg ${isActive ? `text-red-500` : "text-gray-600"
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







  return <>
    <div key={data?.id} className='p-4 mx-1'>
      <div className='flex flex-col text-sm'>
        <div className='flex items-start text-[9px] ml-1 md:mx-3'>
          
          <div className='md:w-8 sm:w-[3rem] w-12 rounded m-2 relative'>
          <div
              className='absolute z-[0] w-[80%] h-[60%] right-[40%] rounded-full  opacity-20 shadow shadow-b-lg bottom-4'
              style={{
                background: "linear-gradient(90deg, #6A15DA 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
            <Image
              src={data?.avatar || blankProf}
              alt='user profile'
              className='w-full rounded-full z-10'
              priority
              width={50}
              height={50}
              sizes='(max-width:768px) 100vw,(max-width:1200px) 70vw,50vw'
            />
          </div>
          <div className='mr-1 z-10 items-center w-[85%] text-gray-700 dark:text-gray-400 '>
            <div className='bg-slate-100 dark:bg-[#231e39] rounded-b rounded-r-lg  p-1'>
              <div className='flex justify-between w-full'>
                <div className='flex justify-start gap-1 sm:text-[0.6rem] md:text-xs text-sm'>
                  <h1 className='font-semibold text-black dark:text-gray-200'>{data?.name}</h1>
                  <span className="md:text-[0.5rem] text-xs">{`${data?.gender=="M"?"(He/Him)":data?.gender=="F"?"(She/Her)":""}`}</span>
                </div>
                <div className='flex items-center md:gap-1 gap-2 text-xs md:text-sm mr-1'>
                  <h6 className='sm:text-[0.6rem] md:text-xs '>
                    {formatTimeDifference(data?.time)}
                  </h6>
                  <SlOptions />
                </div>
              </div>
              <div className='flex'>
                <span className='flex sm:text-[0.5rem] md:text-xs  overflow-hidden whitespace-nowrap overflow-ellipsis sm:max-w-[12rem] max-w-[81%]'>
                  {data?.handle}
                </span>
                <span>...</span>
              </div>
              <p className='p-2 sm:text-[0.7rem] md:text-xs text-[0.77rem] dark:text-gray-100  '>
                <LinesEllipsis
                  text={data.text}
                  maxLine={showFullText ? 1000 : 1}
                  ellipsis='.. See more'
                  trimRight
                  basedOn='words'
                  onClick={() => setShowFullText(!showFullText)}
                />
              </p>
            </div>
            <div className='ml-2 flex gap-1 justify-start items-center relative'>
              {data && reactionOptionsVisible && (
                <ReactionOptions
                  onSelectReaction={(option) =>
                    handleReactionSelect(option)
                  }
                />
              )}
              <span
                className={`${isLiked ? "text-red-500" : ""}`}
                onClick={() => {
                  handleReactionSelect({
                    label: "Like",
                    emoji: SlLike,
                  }),
                    setIsLiked(!isLiked);
                }}
                onMouseEnter={() => handleReactionHover(data?.id)}
                onMouseLeave={() => handleReactionLeave(data?.id)}
              >
                {react.label}
              </span>
              •
              <span className='p-1'>
                <span className='text-[0.50rem] rounded-full'>
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
                    <span className='bg-red-500 border border-gray-300 rounded-full ml-[-8px]'>
                      🤝
                    </span>
                  )}
                  {reactionCounts.Insightful > 0 && (
                    <span className='bg-purple-500 border border-gray-300 rounded-full ml-[-8px]'>
                      💡
                    </span>
                  )}
                </span>
              </span>
              <span>
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}



const Comments = ({ Data, postId }) => {

  // ---------------------------new code ---------------------------------
  const [comments, setComments] = useState([...Data]||[])
  const [commentInput, setCommentInput] = useState("");

  // ---------------------------new comment ---------------------------
  const user = getUserData();
  const ac=useAccount();
  const addNewComment = async(postId, newComment) => {
    const db = getFirestore();
    const postRef = doc(db, "posts", postId);

    // Get the post document
    if (commentInput && postId && user && user.uid) {
      getDoc(postRef)
        .then((postDoc) => {
          if (postDoc.exists()) {
            // Add the new comment to the comments array
            const updatedComments = [...postDoc.data().comments, newComment];

            // Update the post document with the modified comments array
             updateDoc(postRef, { comments: updatedComments })
              .then((resp) => {
                // console.log("New comment added successfully.");
                setCommentInput("");
              })
              .catch((error) => {
                console.error("Error updating post with new comment:", error);
              });
          } else {
            console.error("Post document not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching post document:", error);
        });
    }
  };

  const newCommentData = {
    id:nanoid(),
    uid: user?.uid,
    name: ac?.name ||user?.displayName,
    handle:ac?.handle,
    gender: ac?.gender || "",
    time: generateDateString(),
    reactions: {
      Like: 0,
      Insightful: 0,
      Love: 0,
      Celebrate: 0,
      Support: 0,
      uids: [],
    },
    text: commentInput,
    avatar: ac?.avatar || user?.photoURL,
  };


  const handlePostComment = () => {
    if(postId&&commentInput&&user)
    addNewComment(postId, newCommentData);
 };

  return (
    <div>
      <div className='flex gap-3 mx-5 py-2'>
        <div>
          <Image
            src= {ac?.avatar || user?.photoURL ||blankProf }
            alt='placeholder'
            className='w-[50px]  rounded-full'
            priority
            width={50}
            height={50}
            sizes='(max-width:768px) 100vw,(max-width:1200px) 70vw,50vw'
          />
        </div>
        <div className='w-full flex flex-col h-auto hover:bg-gray-100  dark:hover:bg-[#231e39] text-black dark:text-white p-1 rounded-2xl cursor-pointer'>
          <input
            className='w-full rounded-full items-center p-1 flex h-full sm:text-[0.6rem] md:text-xs  border-[1px] input-none focus:outline-none border-gray-300 dark:border-gray-400 dark:bg-[#151829] px-5'
            placeholder='add comments..'
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          {commentInput.trim() !== "" && (
            <button
              className='self-end bg-pink-500 text-white px-3 rounded-xl mt-2'
              onClick={handlePostComment}
            >
              Post
            </button>
          )}
        </div>
      </div>
      {Data.map((data, index) => (
        <Comment key={index} postId={postId} data={{...data}}/>
      ))}
    </div>
  );
};

export default Comments;
