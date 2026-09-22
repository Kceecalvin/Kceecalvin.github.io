export const profile = {
  name: "Kencalvin Mwenda",
  brand: "CALDEV",
  email: "kcalvinmwenda@gmail.com",
  location: "Nairobi, Kenya",
  github: "https://github.com/Kceecalvin",
  linkedin: "https://www.linkedin.com/in/kencalvin-mwenda-a71752283",
  site: "https://cal-dev.me",
};
export type Project = {
  slug: string;
  title: string;
  category: "Web platforms" | "Brand experiences" | "Experiments";
  status: string;
  headline: string;
  summary: string;
  image: string;
  alt: string;
  stack: string[];
  role: string;
  overview: string;
  decisions: { title: string; text: string }[];
  href?: string;
  repository?: string;
};
export const projects: Project[] = [
  {
    slug: "serotix",
    title: "SeroTix",
    category: "Web platforms",
    status: "Live product",
    headline: "Good nights start with a better experience.",
    summary:
      "Event discovery, ticketing and planning with your people. A product built around the feeling of going out.",
    image: "/work/serotix.png",
    alt: "The SeroTix event discovery homepage",
    stack: ["Django", "Python", "JavaScript", "Responsive UI"],
    role: "Product interface & web engineering",
    overview:
      "SeroTix connects people with events in Kenya. The interface brings event discovery, ticket access and group planning into one experience, with a visual identity built for music, culture and nights out.",
    decisions: [
      {
        title: "Start with discovery",
        text: "Let people explore by category, location and date, with clear navigation from the homepage to events.",
      },
      {
        title: "Make it personal",
        text: "Find My Vibe offers a short quiz to help people find experiences that fit their mood.",
      },
      {
        title: "Think in groups",
        text: "A squad shortlist gives people a place to collect event ideas before making a plan.",
      },
    ],
    href: "https://serotix.co.ke",
    repository: "https://github.com/Kceecalvin/seroxide_entertainment",
  },
  {
    slug: "ceo-manuu",
    title: "CEO Manuu",
    category: "Brand experiences",
    status: "In development",
    headline: "One founder. A connected world of businesses.",
    summary:
      "A founder portfolio that gives a diverse business vision a clear identity, useful navigation and focused inquiries.",
    image: "/work/manuu.png",
    alt: "CEO Manuu portfolio homepage, showing its ivory and blue identity and Manuu Spaces artwork",
    stack: ["Next.js", "React", "TypeScript", "Framer Motion"],
    role: "Brand experience & frontend engineering",
    overview:
      "The CEO Manuu portfolio brings Manuu Spaces and its business areas into a coherent founder story. The redesign uses product previews, an interactive business explorer and contextual inquiries to help visitors find their next step.",
    decisions: [
      {
        title: "Let the work speak",
        text: "Real SeroTix screens show the product behind the story, with dedicated views for phones and larger displays.",
      },
      {
        title: "Connect the businesses",
        text: "A business explorer lets visitors inspect nine areas without losing the overall picture.",
      },
      {
        title: "Make contact relevant",
        text: "Digital, creative and business collaboration paths carry the selected interest into the contact form.",
      },
    ],
    repository: "https://github.com/Kceecalvin/ceo-manuu-portfolio",
  },
  {
    slug: "systems-lab",
    title: "The request lab",
    category: "Experiments",
    status: "Interactive demo",
    headline: "Small details. More dependable software.",
    summary:
      "A small, working browser demo that makes input validation and response states visible.",
    image: "/assets/sovereign_algorithmic.png",
    alt: "Concept illustration of connected software systems, not a product screenshot",
    stack: ["TypeScript", "React", "Input validation"],
    role: "Interaction design & local prototype",
    overview:
      "A simple demonstration of a useful software habit: validate input before accepting it. Try a sample JSON request to inspect the success and error paths. It runs locally in the browser and sends no data.",
    decisions: [
      {
        title: "Make states visible",
        text: "Show the incoming input, validation outcome and response instead of hiding what happened behind a spinner.",
      },
      {
        title: "Handle invalid input",
        text: "An error is part of the experience. Explain what needs to change and let the user try again.",
      },
      {
        title: "Be clear about scope",
        text: "This is a local prototype. It does not create an account, send email or represent production performance.",
      },
    ],
  },
];
export const articles = [
  {
    slug: "scaling-fintech-infrastructure",
    title: "Event-driven financial systems",
    summary:
      "From the notebook: execution paths, event sourcing and the separation of reads and writes.",
    category: "Architecture",
    date: "May 13, 2026",
  },
  {
    slug: "iot-hardware-abstraction",
    title: "Connecting hardware and software",
    summary:
      "From the notebook: hardware abstraction, connected devices and the boundaries between systems.",
    category: "Embedded systems",
    date: "April 28, 2026",
  },
];
