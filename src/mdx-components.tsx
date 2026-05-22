import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-16 mb-6 border-l-4 border-primary-orange pl-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-white/80 uppercase tracking-wide mt-10 mb-4">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-white/55 leading-relaxed mb-6 text-lg">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="text-white font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-primary-orange/80 not-italic font-medium">{children}</em>
    ),
    a: ({ children, href }) => (
      <a href={href} className="text-primary-orange underline decoration-primary-orange/30 underline-offset-4 hover:decoration-primary-orange transition-colors font-bold" target="_blank" rel="noopener noreferrer">{children}</a>
    ),
    ul: ({ children }) => (
      <ul className="space-y-3 mb-8 ml-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-3 mb-8 ml-2 list-decimal list-inside">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-white/55 text-lg leading-relaxed flex items-start gap-3">
        <span className="text-primary-orange mt-2 text-xs">▸</span>
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-orange/40 bg-primary-orange/5 rounded-r-2xl px-8 py-6 my-8 text-white/70 italic text-lg">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-white/5 border border-white/10 px-2 py-1 rounded text-primary-orange font-mono text-sm">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[#050510] border border-white/5 p-6 sm:p-8 rounded-2xl overflow-x-auto mb-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] text-sm leading-relaxed">{children}</pre>
    ),
    hr: () => (
      <hr className="border-white/5 my-16" />
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-orange border-b border-white/10 pb-3 px-4">{children}</th>
    ),
    td: ({ children }) => (
      <td className="text-white/50 text-sm py-3 px-4 border-b border-white/5">{children}</td>
    ),
    img: ({ src, alt }) => (
      <figure className="my-10">
        <img src={src} alt={alt || ''} className="w-full rounded-2xl border border-white/5 grayscale brightness-75 contrast-110" />
        {alt && <figcaption className="text-center text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mt-4">{alt}</figcaption>}
      </figure>
    ),
    ...components,
  };
}
