import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const trustItems = [
  {
    label: 'CST Tires',
    logo: '/images/brands/cst-tires-logo-orange.png',
    logoHeight: 22,
    maxWidth: 118,
  },
  {
    label: 'SAHM Parts',
    logo: '/images/brands/sahm-logo-yellow.png',
    logoHeight: 22,
    maxWidth: 118,
  },
  {
    label: 'NBG Parts',
    logo: '/images/brands/nbg-parts-logo-red.png',
    logoHeight: 28,
    maxWidth: 132,
  },
  {
    label: 'Importación directa',
    meta: 'Fábrica',
  },
  {
    label: 'Distribución nacional',
    meta: 'Perú',
  },
  {
    label: 'Atención B2B',
    meta: 'Negocios',
  },
];

function TrustItem({ item, hidden }) {
  return (
    <div aria-hidden={hidden || undefined} className="mx-2 inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.055] px-5 text-sm font-semibold tracking-[0.04em] text-[#C9C9C9] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      {item.logo ? (
        <>
          <span className="sr-only">{item.label}</span>
          <img
            src={item.logo}
            alt=""
            aria-hidden="true"
            className="block w-auto object-contain"
            style={{
              height: `${item.logoHeight}px`,
              maxWidth: `${item.maxWidth}px`,
            }}
            loading="lazy"
            decoding="async"
          />
        </>
      ) : (
        <span className="inline-flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E82127] shadow-[0_0_14px_rgba(232,33,39,0.7)]" aria-hidden="true" />
          <span>{item.label}</span>
          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-red-200/85">
            {item.meta}
          </span>
        </span>
      )}
    </div>
  );
}

export function BrandMarquee({ placement = 'top' }) {
  // Tres copias para el bucle continuo; el lector de pantalla solo lee la primera.
  const loopItems = [...trustItems, ...trustItems, ...trustItems];
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.08] bg-black/20 py-5"
      aria-label={placement === 'bottom' ? 'Marcas y señales comerciales de cierre' : 'Marcas y señales comerciales'}
    >
      <style>{`
        @keyframes nbg-trust-loop {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .nbg-trust-loop {
          animation: nbg-trust-loop 32s linear infinite;
        }
        .nbg-trust-loop[data-paused='true'],
        .nbg-trust-wrap:hover .nbg-trust-loop {
          animation-play-state: paused;
        }
      `}</style>
      <div className="nbg-trust-wrap flex overflow-hidden pl-14">
        <div className="nbg-trust-loop flex min-w-max items-center" data-paused={paused}>
          {loopItems.map((item, index) => (
            <TrustItem key={`${item.label}-${index}`} item={item} hidden={index >= trustItems.length} />
          ))}
        </div>
      </div>
      {/* Todo movimiento automático debe poder detenerse (WCAG 2.2.2). */}
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? 'Reanudar el desplazamiento de marcas' : 'Pausar el desplazamiento de marcas'}
        className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#101010]/90 text-white/70 transition-colors hover:text-white active:scale-[0.95] motion-reduce:hidden"
      >
        {paused ? <Play size={16} strokeWidth={1.75} aria-hidden="true" /> : <Pause size={16} strokeWidth={1.75} aria-hidden="true" />}
      </button>
    </section>
  );
}

export default BrandMarquee;
