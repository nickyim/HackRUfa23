import React from 'react'

function Landing() {
    return (
      <motion.div
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}>
      </motion.div>
    );
  }
  
  export default Landing