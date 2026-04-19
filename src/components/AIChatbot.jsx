import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I'm Kencalvin's AI Assistant. How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const qaPairs = [
    { q: "What is your primary tech stack?", a: "I specialize in Full-Stack development using React, Node.js, PHP/Laravel, and Python/Django. I also have deep expertise in AI integration and Cybersecurity." },
    { q: "Are you available for hire?", a: "Yes! I'm currently open to freelance opportunities and full-time roles in Software Engineering or AI development. You can contact me through the Contact tab!" },
    { q: "Tell me about your AI experience.", a: "I integrate LLMs (like GPT-4 and Gemini) into applications, build RAG systems, and develop predictive models using TensorFlow and PyTorch." },
    { q: "What is your philosophy on code?", a: "I believe in 'Precision Engineering'—balancing high-performance logic with robust security and a seamless user experience." },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuestion = (qa) => {
    setMessages((prev) => [...prev, { type: "user", text: qa.q }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: qa.a }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] h-[500px] bg-tertiary/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#915eff] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-bold text-white text-sm uppercase tracking-wider">Kencalvin AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.type === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.type === "bot" ? "bg-black-100 text-white" : "bg-[#915eff] text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-black-100 p-3 rounded-2xl text-white text-xs animate-pulse italic">
                    Kencalvin is thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Prompts */}
            <div className="p-4 border-t border-white/5 space-y-2">
              <p className="text-[10px] text-secondary uppercase font-bold mb-2">Suggested Questions</p>
              <div className="flex flex-wrap gap-2">
                {qaPairs.map((qa) => (
                  <button
                    key={qa.q}
                    onClick={() => handleQuestion(qa)}
                    className="text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1.5 rounded-lg text-white transition-colors text-left"
                  >
                    {qa.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#915eff] rounded-full shadow-lg shadow-primary flex items-center justify-center text-2xl"
      >
        {isOpen ? "✕" : "🤖"}
      </motion.button>
    </div>
  );
};

export default AIChatbot;
