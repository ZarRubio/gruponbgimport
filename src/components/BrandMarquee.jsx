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

function TrustItem({ item }) {
  return (
    <div className="mx-2 inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.055] px-5 text-sm font-semibold tracking-[0.04em] text-[#C9C9C9] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
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
  const loopItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <section
      className="overflow-hidden border-y border-white/[0.08] bg-[#101010]/90 py-5"
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
      `}</style>
      <div className="flex overflow-hidden">
        <div className="nbg-trust-loop flex min-w-max items-center">
          {loopItems.map((item, index) => (
            <TrustItem key={`${item.label}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandMarquee;
