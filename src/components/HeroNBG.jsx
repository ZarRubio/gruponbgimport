import { motion } from 'framer-motion';
import { ArrowRight, Boxes, MapPin, Phone, Ship, Truck } from 'lucide-react';
import { AnimatedGradientText } from './magicui/animated-gradient-text';
import { BorderBeam } from './magicui/border-beam';
import { NumberTicker } from './magicui/number-ticker';
import { Particles } from './magicui/particles';
import { WordRotate } from './magicui/word-rotate';

const heroStats = [
  { value: 3, suffix: '+', label: 'Marcas del grupo' },
  { value: 100, suffix: '%', label: 'Importación directa' },
  { value: 1, suffix: '', label: 'Hub comercial en Lima' },
];

const operationCards = [
  {
    icon: Ship,
    title: 'Importación',
    text: 'Selección directa de marcas y fabricantes para el mercado peruano.',
  },
  {
    icon: Truck,
    title: 'Distribución',
    text: 'Abastecimiento para distribuidores, talleres y puntos de venta.',
  },
  {
    icon: Boxes,
    title: 'Repuestos',
    text: 'Llantas, componentes y accesorios para negocios moteros.',
  },
];

export function HeroNBG({ onAction }) {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 20% 30%, #C0392B 0%, #8B0000 45%, #3D0000 100%)',
      }}
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={95}
        color="#ffffff"
        staticity={35}
        ease={60}
        size={0.38}
        vx={0.02}
        vy={-0.01}
      />

      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 70% 50%, rgba(180,30,30,0.4), transparent)',
        }}
      />
      <div className="absolute inset-0 z-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-t from-[#3D0000] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-red-950/20">
            <MapPin className="mr-2 h-4 w-4 text-white" />
            Lima, Perú
          </div>

          <h1 className="max-w-2xl">
            <span className="sr-only">Grupo NBG Import</span>
            <img
              src="/images/brand/nbg-logo-white.png"
              alt=""
              className="w-full max-w-[520px] object-contain drop-shadow-2xl"
            />
          </h1>

          <div className="mt-4 font-display text-4xl uppercase leading-none text-white/90 sm:text-6xl">
            <span className="text-white/80">Soluciones para </span>
            <WordRotate
              words={['repuestos', 'llantas', 'talleres', 'distribuidores']}
              duration={2100}
              className="text-white"
              motionProps={{
                initial: { opacity: 0, y: -28 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 28 },
                transition: { duration: 0.22, ease: 'easeOut' },
              }}
            />
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Importadora de repuestos automotrices y productos para motocicletas en Lima, Perú.
            Conectamos marcas especializadas con distribuidores, talleres y negocios del sector.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#marcas"
              onClick={() => onAction?.('hero_magic_ver_marcas')}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#ef2428] px-7 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-red-950/25 transition hover:bg-red-500"
            >
              Ver marcas
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#contacto"
              onClick={() => onAction?.('hero_magic_contacto')}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/35 bg-white/20 px-7 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white/30"
            >
              Contactar
            </a>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
            {heroStats.map((stat, index) => (
              <div key={stat.label} className="rounded-xl border border-white/45 bg-white/[0.06] p-4 backdrop-blur">
                <div className="font-display text-4xl leading-none text-white sm:text-5xl">
                  <NumberTicker value={stat.value} delay={index * 0.12} />
                  {stat.suffix}
                </div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/55 bg-white/[0.06] p-5 shadow-2xl shadow-red-950/20 backdrop-blur-xl">
            <img
              src="/images/brand/nbg-isotipo.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-6 object-contain opacity-20 sm:h-96 sm:w-96"
            />
            <BorderBeam size={90} duration={8} colorFrom="#ffffff" colorTo="#ef2428" borderWidth={1.5} />
            <BorderBeam size={60} duration={10} delay={4} colorFrom="#fecaca" colorTo="#ffffff" borderWidth={1} reverse />

            <div className="relative rounded-xl border border-white/35 bg-white/[0.05] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">Operación comercial</p>
                  <h2 className="mt-3 font-display text-5xl uppercase leading-none text-white sm:text-6xl">
                    Importación
                    <br />
                    directa
                  </h2>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-1.5 text-white ring-1 ring-white/30">
                  <img src="/images/brand/nbg-isotipo.png" alt="" className="h-full w-full rounded-xl object-cover" />
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {operationCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="group rounded-xl border border-white/30 bg-white/[0.05] p-4 transition hover:border-white/60 hover:bg-white/10">
                      <div className="flex gap-4">
                        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/75">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-4 py-3">
                <Phone className="h-5 w-5 text-white" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Canal comercial</p>
                  <p className="text-sm font-semibold text-white">WhatsApp +51 956 701 218</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
