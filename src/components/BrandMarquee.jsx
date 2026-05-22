const rowOne = [
  { label: 'CST TIRES', logo: '/images/brands/cst-tires-logo-orange.png', logoClassName: 'h-5' },
  { label: 'SAHM PARTS', logo: '/images/brands/sahm-logo-yellow.png' },
  { label: 'NBG PARTS', logo: '/images/brands/nbg-parts-logo-red.png', logoClassName: 'h-7' },
  { label: 'LIMA · PERÚ' },
  { label: 'IMPORTACIÓN DIRECTA' },
  { label: 'DISTRIBUCIÓN NACIONAL' },
  { label: 'TALLERES' },
  { label: 'DISTRIBUIDORES' },
  { label: 'FLOTAS' },
  { label: 'REPUESTOS' },
  { label: 'LLANTAS' },
  { label: 'ACCESORIOS MOTO' },
  { label: 'COBERTURA NACIONAL' },
];

function MarqueeRow({ items }) {
  const loopItems = [...items, ...items];

  return (
    <div className="flex overflow-hidden">
      <div className="flex min-w-max animate-marquee-left">
        {loopItems.map((item, index) => (
          <span
            key={`${item.label}-${index}`}
            className="mx-2 inline-flex h-10 items-center rounded-full border border-white/[0.12] bg-white/[0.065] px-5 text-[13px] font-medium tracking-[0.04em] text-white/70"
          >
            {item.logo ? (
              <>
                <span className="sr-only">{item.label}</span>
                <img
                  src={item.logo}
                  alt=""
                  aria-hidden="true"
                  className={`${item.logoClassName || 'h-5'} w-auto object-contain`}
                  loading="lazy"
                  decoding="async"
                />
              </>
            ) : (
              item.label
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BrandMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/[0.06] bg-black/40 py-5">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
      `}</style>
      <div>
        <MarqueeRow items={rowOne} />
      </div>
    </section>
  );
}

export default BrandMarquee;
