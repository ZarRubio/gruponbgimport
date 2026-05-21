import { useEffect, useState } from 'react';
import { ArrowRight, Bike, Handshake, Ship } from 'lucide-react';
import { motion } from 'framer-motion';

type WhyUsItem = {
  id: string;
  label: string;
  icon: typeof Ship;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

type WhyUsTabsProps = {
  reduceMotion?: boolean;
  onTabChange?: (tab: string, source: 'auto' | 'manual') => void;
  onCtaClick?: (cta: string) => void;
};

const AUTO_CHANGE_MS = 30000;

const tabs: WhyUsItem[] = [
  {
    id: 'importacion-directa',
    label: 'Importacion directa',
    icon: Ship,
    image: '/images/why-us/importacion-directa.webp',
    imageAlt: 'Contenedores maritimos, almacen moderno y cajas de importacion en ambiente logistico premium',
    title: 'Trabajamos directamente con marcas y fabricantes.',
    description:
      'Grupo NBG Import selecciona, importa y distribuye productos especializados para el sector motero peruano, manteniendo una oferta enfocada en calidad, disponibilidad y respaldo.',
    cta: 'Conoce nuestras marcas',
    href: '#marcas',
  },
  {
    id: 'red-comercial-nacional',
    label: 'Red comercial nacional',
    icon: Handshake,
    image: '/images/why-us/red-comercial-nacional.webp',
    imageAlt: 'Distribuidor de motos y atencion comercial profesional en taller especializado',
    title: 'Trabajamos con distribuidores y talleres en todo el Peru.',
    description:
      'Construimos relaciones comerciales con negocios, talleres y puntos de venta especializados en motocicletas, fortaleciendo nuestra presencia en distintas regiones del pais.',
    cta: 'Ver red comercial',
    href: '#contacto',
  },
  {
    id: 'especialistas-en-motos',
    label: 'Especialistas en motos',
    icon: Bike,
    image: '/images/why-us/especialistas-en-motos.webp',
    imageAlt: 'Motocicleta moderna con mecanico especializado, llantas, repuestos y accesorios',
    title: 'Conocemos el mercado de motocicletas desde dentro.',
    description:
      'Trabajamos con marcas enfocadas en llantas, repuestos y accesorios para motos, conectando soluciones comerciales con las necesidades reales de motociclistas, talleres y distribuidores.',
    cta: 'Explorar soluciones',
    href: '#contacto',
  },
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function WhyUsTabs({ reduceMotion, onTabChange, onCtaClick }: WhyUsTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % tabs.length;
        onTabChange?.(tabs[next].label, 'auto');
        return next;
      });
    }, AUTO_CHANGE_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, onTabChange]);

  const selectTab = (index: number) => {
    setActiveIndex(index);
    onTabChange?.(tabs[index].label, 'manual');
  };

  const ActiveIcon = activeTab.icon;

  return (
    <section className="relative border-y border-red-500/10 bg-slate-950/70">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-red-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">Ventajas comerciales</span>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            Por que elegir Grupo NBG Import?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Unimos importacion, red comercial y conocimiento tecnico para atender al mercado motero peruano con respaldo.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/55 p-4 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="grid gap-3 md:grid-cols-3" role="tablist" aria-label="Razones para elegir Grupo NBG Import">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const selected = index === activeIndex;

              return (
                <button
                  key={tab.id}
                  id={`${tab.id}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${tab.id}-panel`}
                  onClick={() => selectTab(index)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-[1.35rem] border px-4 py-4 text-left transition',
                    selected
                      ? 'border-red-500/40 bg-red-500/12 text-white shadow-lg shadow-red-950/20'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-red-500/30 hover:text-white'
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border',
                      selected ? 'border-red-400/40 bg-red-500/20 text-red-300' : 'border-slate-700 bg-slate-900 text-slate-400'
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.18em] sm:text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-[1.25rem] border border-slate-800 bg-slate-950/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Cambia automaticamente cada 30 segundos
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800 sm:w-56" aria-hidden="true">
              <motion.div
                key={activeTab.id}
                className="h-full rounded-full bg-red-500"
                initial={{ width: '0%' }}
                animate={reduceMotion ? { width: '100%' } : { width: '100%' }}
                transition={reduceMotion ? { duration: 0 } : { duration: AUTO_CHANGE_MS / 1000, ease: 'linear' }}
              />
            </div>
          </div>

          <div
            id={`${activeTab.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeTab.id}-tab`}
            className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950/80"
          >
            <img
              src={activeTab.image}
              alt={activeTab.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/82 to-slate-950/18" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/10" />
            <div className="absolute inset-0 bg-red-950/10" />

            <div className="relative z-10 grid min-h-[560px] lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-red-400/30 bg-red-500/15 text-red-300">
                  <ActiveIcon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="max-w-xl text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  {activeTab.title}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{activeTab.description}</p>
                <a
                  href={activeTab.href}
                  onClick={() => onCtaClick?.(activeTab.cta)}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                >
                  {activeTab.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="hidden lg:block" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
