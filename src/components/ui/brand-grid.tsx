import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Brand = {
  id: string;
  name: string;
  category: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  logo?: string;
  logoClassName?: string;
  ariaLabel: string;
  quoteValue: string;
  isFeatured?: boolean;
  isPending?: boolean;
};

type BrandGridProps = {
  reduceMotion?: boolean;
  onBrandClick?: (brandName: string, type: 'external' | 'pending') => void;
  onQuoteClick?: (brandName: string) => void;
  onPendingClick?: (brandName: string) => void;
};

const brands: Brand[] = [
  {
    id: 'cst',
    name: 'CST Tires Perú',
    category: 'Llantas para negocios',
    description: 'Línea de llantas para talleres, tiendas y distribuidores que buscan rotación, variedad y respaldo.',
    cta: 'Visitar CST Tires',
    href: 'https://csttires.pe',
    image: '/images/brands/cst-tires-peru.jpg',
    logo: '/images/brands/cst-tires-logo-orange.png',
    logoClassName: 'h-12 sm:h-16',
    ariaLabel: 'Visitar ecommerce de CST Tires Perú',
    quoteValue: 'CST Tires Peru',
    isFeatured: true,
  },
  {
    id: 'sahm',
    name: 'SAHM Parts',
    category: 'Repuestos y accesorios',
    description: 'Cámaras, carburadores, repuestos y accesorios para abastecimiento comercial del mercado motero peruano.',
    cta: 'Visitar SAHM Parts',
    href: 'https://sahmparts.com',
    image: '/images/brands/sahm-parts.jpg',
    logo: '/images/brands/sahm-logo-yellow.png',
    logoClassName: 'h-12 sm:h-14',
    ariaLabel: 'Visitar ecommerce de SAHM Parts',
    quoteValue: 'SAHM Parts',
  },
  {
    id: 'nbg',
    name: 'NBG Parts',
    category: 'Componentes para motos',
    description: 'Productos y soluciones para talleres, distribuidores y empresas que necesitan compras recurrentes.',
    cta: 'Consultar disponibilidad',
    href: '#contacto',
    image: '/images/brands/nbg-parts.jpg',
    logo: '/images/brands/nbg-parts-logo-red.png',
    logoClassName: 'h-16 sm:h-20',
    ariaLabel: 'Consultar disponibilidad de NBG Parts',
    quoteValue: 'NBG Parts',
    isPending: true,
  },
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function BrandCard({
  brand,
  index,
  reduceMotion,
  onBrandClick,
  onQuoteClick,
  onPendingClick,
}: {
  brand: Brand;
  index: number;
  reduceMotion?: boolean;
  onBrandClick?: BrandGridProps['onBrandClick'];
  onQuoteClick?: BrandGridProps['onQuoteClick'];
  onPendingClick?: BrandGridProps['onPendingClick'];
}) {
  const isFeatured = Boolean(brand.isFeatured);

  const handlePrimaryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (brand.isPending) {
      event.preventDefault();
      onBrandClick?.(brand.name, 'pending');
      document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    onBrandClick?.(brand.name, 'external');
  };

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        'group relative flex min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-red-600/40 hover:shadow-[0_8px_32px_rgba(220,38,38,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010]',
        isFeatured && 'lg:row-span-2 lg:min-h-[620px]'
      )}
    >
      <img
        src={brand.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/74 to-[#101010]/10" />
      <div className="absolute inset-0 bg-red-600/0 transition duration-300 group-hover:bg-red-600/12" />

      <div className="relative z-10 mt-auto flex w-full flex-col p-6 sm:p-7">
        <div className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
          {brand.category}
        </div>

        {brand.logo ? (
          <>
            <h3 className="sr-only">{brand.name}</h3>
            <img
              src={brand.logo}
              alt=""
              aria-hidden="true"
              className={cn('mb-1 w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]', brand.logoClassName)}
              loading="lazy"
              decoding="async"
            />
          </>
        ) : (
          <h3 className={cn('font-black uppercase leading-none text-white', isFeatured ? 'text-4xl sm:text-5xl' : 'text-3xl')}>
            {brand.name}
          </h3>
        )}
        <p className={cn('mt-4 max-w-xl leading-7 text-white/80', isFeatured ? 'text-base sm:text-lg' : 'text-sm')}>
          {brand.description}
        </p>

        <a
          href={brand.href}
          target={brand.isPending ? undefined : '_blank'}
          rel={brand.isPending ? undefined : 'noreferrer'}
          aria-label={brand.ariaLabel}
          onClick={handlePrimaryClick}
          className={cn(
            'mt-6 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200',
            brand.isPending
              ? 'cursor-pointer border border-white/25 bg-transparent text-white/70 hover:-translate-y-px hover:border-red-600/50 hover:bg-red-900/20 hover:text-white'
              : 'bg-[#ef2428] text-white hover:-translate-y-px hover:scale-[1.03] hover:bg-red-500 hover:shadow-[0_8px_24px_rgba(220,38,38,0.45)] active:scale-[0.98]'
          )}
        >
          {brand.cta}
          {!brand.isPending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </a>
        <button
          type="button"
          onClick={() => onQuoteClick?.(brand.quoteValue)}
          className="mt-2 inline-flex w-fit cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-xs text-white/70 underline underline-offset-[3px] transition hover:text-white"
        >
          Cotizar esta marca →
        </button>
      </div>
    </motion.article>
  );
}

export function BrandGrid({ reduceMotion, onBrandClick, onQuoteClick, onPendingClick }: BrandGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr] lg:auto-rows-fr">
      {brands.map((brand, index) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          index={index}
          reduceMotion={reduceMotion}
          onBrandClick={onBrandClick}
          onQuoteClick={onQuoteClick}
          onPendingClick={onPendingClick}
        />
      ))}
    </div>
  );
}
