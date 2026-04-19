import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Feedbacks = () => {
  return (
    <div className={`${styles.paddingX} py-10`}>
      <div className={`mt-12 bg-black-100/40 backdrop-blur-md rounded-[20px] border border-white/10`}>
        <div
          className={`bg-tertiary/50 rounded-2xl ${styles.padding} min-h-[300px]`}
        >
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>What others say</p>
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          </motion.div>
        </div>
        <div className={`-mt-20 pb-14 ${styles.padding} flex flex-wrap gap-7`}>
          <p className='text-white text-[18px]'>No testimonials available yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
