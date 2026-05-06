'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Financial Architecture',
    description: 'Engineering high-frequency algorithmic signaling systems and automated asset processing engines.',
    tags: ['XAUUSD', 'BTCUSD', 'HFT', 'Quantum Analysis']
  },
  {
    title: 'IoT Ecosystems',
    description: 'Designing secure, hardware-accelerated communication protocols for embedded systems and relay networks.',
    tags: ['ESP32', 'MQTT', 'Edge Computing', 'Secure SoC']
  },
  {
    title: 'Operational Strategy',
    description: 'Developing mathematical models for commercial logistical optimization and resource management.',
    tags: ['Scalability', 'Predictive Ops', 'Logic Flow', 'Efficiency']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-24">
          <span className="text-primary-orange font-black text-xs uppercase tracking-[0.3em] mb-6 block">Capabilities</span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
            Engineering <br />
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 sm:p-10 rounded-[40px] sm:rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-primary-orange/30 transition-folio"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 tracking-tight">{service.title}</h3>
              <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-primary-orange bg-primary-orange/5 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
