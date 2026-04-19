import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  About, 
  Contact, 
  Experience, 
  Hero, 
  Navbar, 
  Tech, 
  Works, 
  StarsCanvas, 
  Feedbacks, 
  AIChatbot, 
  CustomCursor, 
  SocialSidebar 
} from "./components";

const App = () => {
  const [activeTab, setActiveTab] = useState("hero");

  const renderContent = () => {
    switch (activeTab) {
      case "hero":
        return <Hero key="hero" />;
      case "about":
        return (
          <div key="about" className="h-full overflow-y-auto">
            <About />
            <Tech />
          </div>
        );
      case "work":
        return (
          <div key="work" className="h-full overflow-y-auto">
            <Experience />
            <Works />
          </div>
        );
      case "reviews":
        return <Feedbacks key="reviews" />;
      case "contact":
        return <Contact key="contact" />;
      default:
        return <Hero key="hero" />;
    }
  };

  return (
    <div className='relative z-0 bg-primary w-screen h-screen overflow-hidden flex flex-col'>
      <CustomCursor />
      <SocialSidebar />
      <AIChatbot />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        
        {/* Fixed Background */}
        <div className='absolute inset-0 z-[-1] pointer-events-none'>
          <StarsCanvas />
        </div>
      </main>
    </div>
  );
}

export default App;
