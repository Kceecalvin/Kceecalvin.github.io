'use client';

export default function LogoBar() {
  const partners = [
    { name: 'Supa Blox', icon: '○' },
    { name: 'Hype Blox', icon: '⧖' },
    { name: 'Frame Blox', icon: '◐' },
    { name: 'Ultra Blox', icon: '◑' }
  ];

  return (
    <div className="relative py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-32 opacity-20 grayscale hover:opacity-50 transition-folio cursor-default">
          {partners.map((partner, i) => (
            <div key={i} className="flex items-center gap-4 text-white font-black tracking-tighter">
              <span className="text-3xl text-primary-orange">{partner.icon}</span>
              <span className="text-2xl uppercase tracking-[0.2em]">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
