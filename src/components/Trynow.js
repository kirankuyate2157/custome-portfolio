import React from "react";
import { motion } from "framer-motion";

const Trynow = () => {
  return (
    <motion.div
      className='bg-blue-700 px-4 hover:bg-primary cursor-pointer rounded-md py-1 sm:ml-0 ml-5  text-sm text-center items-center text-white'
      whileInView={{
        backgroundColor: [
          "#121212",
          "rgba(131,58,180,1)",
          "rgba(253,29,29,1)",
          "rgba(252,176,69,1)",
          "rgba(131,58,180,1)",
          "#121212",
        ],
        transition: { duration: 1, repeat: Infinity },
      }}
    >
      Try now !
    </motion.div>
  );
};

export default Trynow;
