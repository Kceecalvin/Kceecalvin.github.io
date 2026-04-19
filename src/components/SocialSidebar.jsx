import React from "react";
import { motion } from "framer-motion";

const SocialSidebar = () => {
  const socials = [
    { name: "GitHub", url: "https://github.com/Kceecalvin", icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/github.png" },
    { name: "LinkedIn", url: "#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" },
    { name: "Twitter", url: "#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" },
  ];

  return (
    <div className="fixed left-6 bottom-0 z-20 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-0.5 after:h-24 after:bg-[#915eff]">
      {socials.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -5, scale: 1.1 }}
          className="w-8 h-8 flex items-center justify-center p-1 bg-tertiary/50 backdrop-blur-sm rounded-full border border-white/10"
        >
          <img src={social.icon} alt={social.name} className="w-full h-full object-contain invert" />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialSidebar;
