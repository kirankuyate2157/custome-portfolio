import { useState } from "react";
import Image from "next/image";
import { SlLike, SlOptions } from "react-icons/sl";
import LinesEllipsis from "react-lines-ellipsis";

const Comments = ({Data}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [react, setReact] = useState({
    label: "Like",
  });
















  // ---------------------------new code ---------------------------------
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Kiran Kuyate",
      handle: `SDE aspirants 💫 | final yr | web dev (MERN) | DS | DSA | AI
      enthusiast | 2x100DaysOfCode`,
      avatar: "https://avatars.githubusercontent.com/u/84271800?v=4",
      time: new Date("2023-07-20T10:13:00"),
      content:
        "I'm happy to share that I have obtained a new certification of Advanced Software Engineering Virtual Program of Walmart Global Tech, it was provided by Forage. #walmartglobaltech #theforage #softwareengineer #virtualexperience",
      likes: {
        Like: 2,
        Love: 0,
        Celebrate: 0,
        Support: 0,
        Insightful: 0,
        uids:[]
      },
      totalLikes: 2,
      reactionOptionsVisible: false,
    },
    {
      id: 2,
      user: "Jane Smith",
      handle: `SDE aspirants 💫 | final yr | web dev (MERN) | DS | DSA | AI
      enthusiast | 2x100DaysOfCode`,
      avatar: "https://avatars.githubusercontent.com/u/84271800?v=4",
      time: new Date("2023-07-28T12:34:56"),
      content: "Congratulations! That's amazing!",
      likes: {
        Like: 0,
        Love: 0,
        Celebrate: 0,
        Support: 1,
        Insightful: 0,
        uids:[]
      },
      totalLikes: 1,
      reactionOptionsVisible: false,
    },
    // Add more sample comments here...
  ]);

  const updateTotalLikes = () => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        const totalLikes = Object.values(data.reactions).reduce(
          (total, count) => total + count,
          0
        );
        return { ...comment, totalLikes };
      })
    );
  };

  const handleReactionSelect = (commentId, reaction) => {
    setComments((prevComments) =>
      prevComments.map((data) => {
        if (data?.id === commentId) {
          const currentLikes = data.reactions[reaction.label];
          const updatedComment = {
            ...comment,
            likes: {
              ...data.reactions,
              [reaction.label]:
                currentLikes + (selectedReaction === reaction ? -1 : 1),
            },
          };
          return updatedComment;
        }
        return comment;
      })
    );

    setSelectedReaction((prevReaction) =>
      prevReaction === reaction ? null : reaction
    );

    updateTotalLikes(); // Recalculate and update totalLikes for each comment
  };

  const handleReactionHover = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        data?.id === commentId
          ? { ...comment, reactionOptionsVisible: true }
          : comment
      )
    );
  };

  const handleReactionLeave = (commentId) => {
    setTimeout(() => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          data?.id === commentId
            ? { ...comment, reactionOptionsVisible: false }
            : comment
        )
      );
    }, 2000); // 2 seconds delay
  };
  const formatTimeDifference = (commentTime) => {
    const currentTime = new Date();
    const commentTimeObj = new Date(commentTime);

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

  const ReactionOptions = ({ commentId, onSelectReaction }) => {
    const reactionOptions = [
      { label: "Like", emoji: "👍" },
      { label: "Love", emoji: "❤️" },
      { label: "Celebrate", emoji: "🎉" },
      { label: "Support", emoji: "🤝" },
      { label: "Insightful", emoji: "💡" },
    ];

    const [hoveredEmoji, setHoveredEmoji] = useState(null);

    return (
      <div className='absolute bottom-5 flex bg-white rounded-lg text-lg shadow-2xl  z-10'>
        {reactionOptions.map((option) => (
          <div
            key={option.label}
            className={`relative cursor-pointer hover:bottom-3 hover:bg-transparent   rounded p-2 transform transition-transform ${
              hoveredEmoji === option.emoji ? "scale-100 opacity-150" : ""
            }`}
            onClick={() => onSelectReaction(commentId, option)}
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

  const [commentInput, setCommentInput] = useState("");

  const handlePostComment = () => {
    if (commentInput.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        user: "John Doe", // Replace with the actual user name
        handle: `SDE aspirants 💫 | final yr | web dev (MERN) | DS | DSA | AI\nenthusiast | 2x100DaysOfCode`, // Replace with the actual user handle
        avatar: "https://avatars.githubusercontent.com/u/12345678?v=4", // Replace with the actual user avatar URL
        time: new Date(), // Replace with the actual timestamp
        content: commentInput,
        likes: {
          Like: 0,
          Love: 0,
          Celebrate: 0,
          Support: 0,
          Insightful: 0,
        },
        reactionOptionsVisible: false,
      };
      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentInput("");
    }
  };




  return (
    <div>
      <div className='flex gap-3 mx-5 py-2'>
        <div>
          <Image
            src={'https://avatars.githubusercontent.com/u/84271800?v=4'}
            alt='placeholder'
            className='w-[50px]  rounded-full'
            priority
          width={50}
            height={50}
          sizes='(max-width:768px) 100vw,(max-width:1200px) 70vw,50vw'
          />
        </div>
        <div className='w-full flex flex-col h-auto hover:bg-gray-100 text-black p-1 rounded-2xl cursor-pointer'>
          <input
            className='w-full rounded-full items-center p-1 flex h-full sm:text-[0.6rem] md:text-xs  border-[1px] input-none focus:outline-none border-gray-300 px-5'
            placeholder='add comments..'
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          {commentInput.trim() !== "" && (
            <button
              className='self-end bg-blue-500 text-white px-3 rounded-xl mt-2'
              onClick={handlePostComment}
            >
              Post
            </button>
          )}
        </div>
      </div>
      {Data.map((data) => (
        <div key={data?.id} className='p-4 mx-1'>
          <div className='flex flex-col text-sm'>
            <div className='flex items-start text-[9px] ml-1 md:mx-3'>
              <div className='md:w-8 sm:w-[3rem] w-12 rounded m-2'>
                <Image
                  src={data?.avatar || 'https://avatars.githubusercontent.com/u/84271800?v=4' }
                  alt='user profile'
                  className='w-full rounded-full'
                  priority
                  width={50}
                    height={50}
                  sizes='(max-width:768px) 100vw,(max-width:1200px) 70vw,50vw'
                />
              </div>
              <div className='mr-1 items-center w-[85%] text-gray-700'>
                <div className='bg-slate-100 rounded-b rounded-r-lg  p-1'>
                  <div className='flex justify-between w-full'>
                    <div className='flex justify-start gap-1 sm:text-[0.6rem] md:text-xs text-sm'>
                      <h1 className='font-semibold text-black'>
                        {data?.name}
                      </h1>
                      <span>{`${data?.gender?"(He/Him)":"(She/Her)"}`}</span>
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
                  <p className='p-2 sm:text-[0.7rem] md:text-xs text-[0.77rem] '>
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
                  {data && (
                    <ReactionOptions
                      commentId={data?.id}
                      onSelectReaction={handleReactionSelect}
                    />
                  )}
                  <span
                    className={`${isLiked ? "text-blue-500" : ""}`}
                    onClick={() =>
                      handleReactionSelect(data?.id, { label: "Like" })
                    }
                    onMouseEnter={() => handleReactionHover(data?.id)}
                    onMouseLeave={() => handleReactionLeave(data?.id)}
                  >
                    {react.label}
                  </span>
                  •
                  <span className='p-1'>
                    <span className='text-[0.50rem] rounded-full'>
                      {data.reactions.Like > 0 && (
                        <span className='bg-green-300 border rounded-full ml-[-8px] '>
                          👍
                        </span>
                      )}
                      {data.reactions.Love > 0 && (
                        <span className='bg-red-700 border rounded-full ml-[-8px]'>
                          ❤️
                        </span>
                      )}
                      {data.reactions.Celebrate > 0 && (
                        <span className='bg-yellow-500 border border-gray-300 rounded-full ml-[-8px]'>
                          🎉
                        </span>
                      )}
                      {data.reactions.Support > 0 && (
                        <span className='bg-blue-500 border border-gray-300 rounded-full ml-[-8px]'>
                          🤝
                        </span>
                      )}
                      {data.reactions.Insightful > 0 && (
                        <span className='bg-purple-500 border border-gray-300 rounded-full ml-[-8px]'>
                          💡
                        </span>
                      )}
                    </span>
                  </span>
                  <span>
                    {data?.reactions?.uids?.length > 0 ? data?.reactions?.uids?.length  : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
