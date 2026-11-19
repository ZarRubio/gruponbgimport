import { useState } from 'react';
import { Bike, Handshake, Ship } from 'lucide-react';
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

const tabs: WhyUsItem[] = [
  {
    id: 'importacion-directa',
    label: 'Importación directa',
    icon: Ship,
    image: '/images/why-us/importacion-directa.webp',
    imageAlt: 'Contenedores marítimos, almacén moderno y cajas de importación en ambiente logístico premium',
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
    imageAlt: 'Distribuidor de motos y atención comercial profesional en taller especializado',
    title: 'Trabajamos con distribuidores y talleres en todo el Perú.',
    description:
      'Construimos relaciones comerciales con negocios, talleres y puntos de venta especializados en motocicletas, fortaleciendo nuestra presencia en distintas regiones del país.',
    cta: 'Ver red comercial',
    href: '#contacto',
  },
  {
    id: 'especialistas-en-motos',
    label: 'Especialistas en motos',
    icon: Bike,
    image: '/images/why-us/especialistas-en-motos.webp',
    imageAlt: 'Motocicleta moderna con mecánico especializado',
    title: 'Conocemos el mercado de motocicletas desde dentro.',
    description:
      'Trabajamos con marcas enfocadas en llantas, cámaras, rodajes y carburadores para motos y vehículos menores, conectando soluciones comerciales con las necesidades reales de motociclistas, talleres y distribuidores.',
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

  // Sin rotación automática: el contenido solo cambia cuando la persona elige una pestaña (WCAG 2.2.2).
  const selectTab = (index: number) => {
    setActiveIndex(index);
    onTabChange?.(tabs[index].label, 'manual');
  };

  const ActiveIcon = activeTab.icon;

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Un aliado importador para hacer crecer tu negocio
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Combinamos experiencia comercial, portafolio especializado y atención directa para ayudarte a comprar mejor.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/[0.12] bg-white/[0.06] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur sm:p-5">
          <div
            className="grid gap-3 md:grid-cols-3"
            role="tablist"
            aria-label="Razones para elegir Grupo NBG Import"
          >
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
                    'flex w-full items-center gap-3 rounded-[1.35rem] border px-4 py-3 text-left transition md:py-4',
                    selected
                      ? 'border-red-600/40 bg-red-600/20 font-semibold text-white shadow-lg shadow-red-950/20'
                      : 'border-white/[0.12] bg-white/[0.06] text-white/70 hover:bg-white/[0.09]'
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border',
                      selected ? 'border-red-600/40 bg-red-600/20 text-white' : 'border-white/[0.12] bg-white/[0.06] text-white/70'
                    )}
                  >
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeTab.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            id={`${activeTab.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeTab.id}-tab`}
            className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[#101010]/82"
          >
            <img
              src={activeTab.image}
              alt={activeTab.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101010] via-[#101010]/80 to-[#101010]/16" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/22 to-[#101010]/8" />
            <div className="absolute inset-0 bg-red-950/10" />

            <div className="relative z-10 grid min-h-[560px] lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
                  <ActiveIcon size={24} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
                  {activeTab.title}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">{activeTab.description}</p>
                <a
                  href={activeTab.href}
                  onClick={() => onCtaClick?.(activeTab.cta)}
                  className="mt-8 inline-flex w-fit items-center rounded-xl bg-[#D2191F] px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#B8151B]"
                >
                  {activeTab.cta}
                </a>
              </div>

              <div className="hidden lg:block" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </section>
  );
}
