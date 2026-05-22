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
  ariaLabel: string;
  isFeatured?: boolean;
  isPending?: boolean;
};

type BrandGridProps = {
  reduceMotion?: boolean;
  onBrandClick?: (brandName: string, type: 'external' | 'pending') => void;
  onPendingClick?: (brandName: string) => void;
};

const brands: Brand[] = [
  {
    id: 'cst',
    name: 'CST Tires Perú',
    category: 'Llantas para motocicletas',
    description: 'Llantas para motos urbanas, doble propósito, scooters, mototaxis, ATV, UTV y más.',
    cta: 'Visitar CST Tires',
    href: 'https://csttires.pe',
    image: '/images/brands/cst-tires-peru.png',
    ariaLabel: 'Visitar ecommerce de CST Tires Perú',
    isFeatured: true,
  },
  {
    id: 'sahm',
    name: 'SAHM Parts',
    category: 'Repuestos y accesorios',
    description: 'Cámaras, carburadores, repuestos y accesorios para el mercado motero peruano.',
    cta: 'Visitar SAHM Parts',
    href: 'https://sahmparts.com',
    image: '/images/brands/sahm-parts.png',
    ariaLabel: 'Visitar ecommerce de SAHM Parts',
  },
  {
    id: 'nbg',
    name: 'NBG Parts',
    category: 'Componentes para motos',
    description: 'Productos y soluciones para talleres, distribuidores y motociclistas en todo el Perú.',
    cta: 'Próximamente',
    href: '#',
    image: '/images/brands/nbg-parts.png',
    ariaLabel: 'NBG Parts próximamente',
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
  onPendingClick,
}: {
  brand: Brand;
  index: number;
  reduceMotion?: boolean;
  onBrandClick?: BrandGridProps['onBrandClick'];
  onPendingClick?: BrandGridProps['onPendingClick'];
}) {
  const isFeatured = Boolean(brand.isFeatured);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (brand.isPending) {
      event.preventDefault();
      onBrandClick?.(brand.name, 'pending');
      onPendingClick?.(brand.name);
      return;
    }

    onBrandClick?.(brand.name, 'external');
  };

  return (
    <motion.a
      href={brand.href}
      target={brand.isPending ? undefined : '_blank'}
      rel={brand.isPending ? undefined : 'noreferrer'}
      aria-label={brand.ariaLabel}
      onClick={handleClick}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        'group relative flex min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/25 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#230000]',
        isFeatured && 'lg:row-span-2 lg:min-h-[620px]'
      )}
    >
      <img
        src={brand.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading={isFeatured ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#230000] via-[#230000]/72 to-[#230000]/10" />
      <div className="absolute inset-0 bg-red-600/0 transition duration-300 group-hover:bg-red-600/12" />

      <div className="relative z-10 mt-auto flex w-full flex-col p-6 sm:p-7">
        <div className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
          {brand.category}
        </div>

        <h3 className={cn('font-black uppercase leading-none text-white', isFeatured ? 'text-4xl sm:text-5xl' : 'text-3xl')}>
          {brand.name}
        </h3>
        <p className={cn('mt-4 max-w-xl leading-7 text-white/80', isFeatured ? 'text-base sm:text-lg' : 'text-sm')}>
          {brand.description}
        </p>

        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#ef2428] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition group-hover:bg-red-500">
          {brand.cta}
          {!brand.isPending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </span>
      </div>
    </motion.a>
  );
}

export function BrandGrid({ reduceMotion, onBrandClick, onPendingClick }: BrandGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr] lg:auto-rows-fr">
      {brands.map((brand, index) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          index={index}
          reduceMotion={reduceMotion}
          onBrandClick={onBrandClick}
          onPendingClick={onPendingClick}
        />
      ))}
    </div>
  );
}
