import React from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const BentoCard = ({ children, className, delay = 0 }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.75)}
    initial="hidden"
    animate="show"
    className={`bg-tertiary/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-card hover:border-[#915eff]/50 transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

const About = () => {
  return (
    <div className={`${styles.paddingX} pt-20 pb-10 max-w-7xl mx-auto h-full overflow-y-auto custom-scrollbar`}>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Bento Overview.</h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4">
        {/* Main Intro */}
        <BentoCard className="md:col-span-2 md:row-span-2 text-left items-start overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#915eff]/20 blur-3xl rounded-full -mr-10 -mt-10" />
          <h3 className="text-3xl font-bold text-white mb-4">Software Engineer & AI Enthusiast</h3>
          <p className="text-secondary text-sm leading-relaxed mb-6">
            I'm Kencalvin, a student at Kirinyaga University mastery in Full-Stack and Cybersecurity. 
            I build systems that bridge the gap between human intelligence and machine efficiency.
          </p>
          <div className="flex gap-4 mt-auto">
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl">2+</span>
              <span className="text-[10px] uppercase text-secondary">Years Exp</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-4">
              <span className="text-white font-bold text-xl">15+</span>
              <span className="text-[10px] uppercase text-secondary">Projects</span>
            </div>
          </div>
        </BentoCard>

        {/* Location */}
        <BentoCard className="md:col-span-1" delay={0.2}>
          <div className="text-4xl mb-2">📍</div>
          <h4 className="text-white font-bold">Location</h4>
          <p className="text-secondary text-xs">Based in Kirinyaga, Kenya</p>
          <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "100%" }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full bg-[#915eff]" 
            />
          </div>
        </BentoCard>

        {/* Tech Stack Mini */}
        <BentoCard className="md:col-span-1" delay={0.3}>
          <h4 className="text-white font-bold mb-4 uppercase text-[10px] tracking-widest">Top Skills</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {["React", "Node", "Python", "AWS", "PHP"].map(s => (
              <span key={s} className="px-2 py-1 bg-[#915eff]/10 rounded-md text-[#915eff] text-[10px] font-bold border border-[#915eff]/20">
                {s}
              </span>
            ))}
          </div>
        </BentoCard>

        {/* GitHub Calendar */}
        <BentoCard className="md:col-span-2 md:row-span-1 items-start" delay={0.4}>
          <h4 className="text-white font-bold mb-4 uppercase text-[10px] tracking-widest">Engineering Activity</h4>
          <div className="w-full flex justify-center">
            <GitHubCalendar 
              username="Kceecalvin" 
              blockSize={12}
              blockMargin={5}
              color="#915eff"
              fontSize={12}
              style={{ color: "#aaa6c3" }}
            />
          </div>
        </BentoCard>

        {/* Education */}
        <BentoCard className="md:col-span-2" delay={0.5}>
           <div className="flex items-center gap-4 w-full">
             <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#915eff]"><GraduationCap size={24} /></div>
             <div className="text-left">
               <h4 className="text-white font-bold text-sm">BSc. Software Engineering</h4>
               <p className="text-secondary text-xs italic">Kirinyaga University</p>
             </div>
             <div className="ml-auto text-[10px] bg-[#915eff] text-white px-2 py-1 rounded-full font-bold">2022-2026</div>
           </div>
        </BentoCard>
      </div>
    </div>
  );
};

export default About;
;

export default About;
