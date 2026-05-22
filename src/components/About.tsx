'use client';

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[3/4] rounded-[40px] sm:rounded-[80px] overflow-hidden group">
              <img 
                src="/assets/founder.jpg" 
                alt="Kencalvin Mwenda"
                className="w-full h-full object-cover object-[center_30%] grayscale transition-folio group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-orange/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-folio" />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-primary-orange font-black text-xs uppercase tracking-[0.3em] mb-6 sm:mb-8 block">THE PRINCIPAL</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8 sm:mb-10 uppercase">
              BRIDGING ADVANCED <br /> 
              ENGINEERING WITH <br />
              COMMERCIAL LEADERSHIP.
            </h2>
            <div className="space-y-6 sm:space-y-8 max-w-2xl">
              <p className="text-white/65 text-lg sm:text-xl leading-relaxed">
                We are a premier engineering advisory specialising in industrial-grade architectures that resolve complex enterprise challenges.
              </p>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                Whether designing a high-frequency clearing engine or a global physical asset relay, our mandate remains singular: delivering absolute engineering fidelity.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-8 sm:gap-12 border-t border-white/10 pt-8 sm:pt-10">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block mb-1 sm:mb-2">MMXIX — PRESENT</span>
                <span className="text-[10px] font-black text-white/65 uppercase tracking-widest">ESTABLISHED ADVISORY</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block mb-1 sm:mb-2">XXV+ MANDATES</span>
                <span className="text-[10px] font-black text-white/65 uppercase tracking-widest">COMMISSIONED & COMPLETED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

