export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "reviews",
    title: "Reviews",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack & Cloud Architecture",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/web.png",
  },
  {
    title: "AI & Machine Learning Integration",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/mobile.png",
  },
  {
    title: "Cybersecurity & Systems Audits",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/backend.png",
  },
  {
    title: "Consulting & Custom Workarounds",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/creator.png",
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/html.png",
  },
  {
    name: "CSS 3",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/css.png",
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/javascript.png",
  },
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/typescript.png",
  },
  {
    name: "React JS",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/reactjs.png",
  },
  {
    name: "Tailwind CSS",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/tailwind.png",
  },
  {
    name: "Node JS",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/nodejs.png",
  },
  {
    name: "MongoDB",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/mongodb.png",
  },
  {
    name: "Three JS",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/threejs.svg",
  },
  {
    name: "git",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/git.png",
  },
  {
    name: "docker",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tech/docker.png",
  },
];

const experiences = [
  {
    title: "Full-Stack Developer",
    company_name: "Freelance",
    icon: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/company/shopify.png",
    iconBg: "#383E56",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js, Laravel, and Django.",
      "Collaborating with clients to create high-quality, scalable digital solutions.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Providing security audits and system hardening for client platforms.",
    ],
  },
];

const projects = [
  {
    name: "Asset Registry",
    description:
      "Web-based platform that allows users to track enterprise assets with real-time audit logs and advanced filtering.",
    tags: [
      {
        name: "laravel",
        color: "blue-text-gradient",
      },
      {
        name: "postgresql",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/jobit.png",
    source_code_link: "https://github.com/Kceecalvin/gfl-asset-registry",
  },
  {
    name: "Security Dashboard",
    description:
      "A real-time cybersecurity threat visualization dashboard with WebSocket integration for live network monitoring.",
    tags: [
      {
        name: "django",
        color: "blue-text-gradient",
      },
      {
        name: "d3js",
        color: "green-text-gradient",
      },
      {
        name: "nodejs",
        color: "pink-text-gradient",
      },
    ],
    image: "https://raw.githubusercontent.com/adrianhajdin/project_3d_developer_portfolio/main/src/assets/tripguide.png",
    source_code_link: "https://github.com/Kceecalvin/seroxide_entertainment",
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Kencalvin proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Kencalvin does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Kencalvin optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export { services, technologies, experiences, projects, testimonials };
