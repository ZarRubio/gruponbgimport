const rowOne = [
  'CST TIRES',
  'SAHM PARTS',
  'NBG PARTS',
  'LIMA · PERÚ',
  'IMPORTACIÓN DIRECTA',
  'DISTRIBUCIÓN NACIONAL',
  'CST TIRES',
  'SAHM PARTS',
];

const rowTwo = [
  'TALLERES',
  'DISTRIBUIDORES',
  'FLOTAS',
  'REPUESTOS',
  'LLANTAS',
  'ACCESORIOS MOTO',
  'COBERTURA NACIONAL',
  'TALLERES',
];

function MarqueeRow({ items, reverse = false }) {
  const loopItems = [...items, ...items];

  return (
    <div className="flex overflow-hidden">
      <div className={reverse ? 'flex min-w-max animate-marquee-right' : 'flex min-w-max animate-marquee-left'}>
        {loopItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-2 rounded-full border border-white/[0.08] bg-white/[0.05] px-5 py-2 text-[13px] font-medium tracking-[0.04em] text-white/60"
          >
            {item}
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
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
      `}</style>
      <div className="space-y-3">
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />
      </div>
    </section>
  );
}

export default BrandMarquee;
