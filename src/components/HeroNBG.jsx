import { motion } from 'framer-motion';
import { ArrowRight, Boxes, Phone, Ship, Truck } from 'lucide-react';
import { BorderBeam } from './magicui/border-beam';
import { Particles } from './magicui/particles';

const heroStats = [
  { value: '+500', label: 'Referencias disponibles' },
  { value: '100%', label: 'Importación directa' },
  { value: '+8', label: 'Años en el mercado' },
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
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-[14px] py-1 text-xs uppercase tracking-[0.06em] text-white/80"
            style={{
              background: 'rgba(220,38,38,0.15)',
              borderColor: 'rgba(220,38,38,0.35)',
            }}
          >
            ✓ Importación directa · Lima, Perú
          </div>

          <h1
            className="max-w-2xl uppercase text-white"
            style={{
              fontSize: 'clamp(42px, 6vw, 72px)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
          >
            REPUESTOS DIRECTOS
            <br />
            DE FÁBRICA
          </h1>

          <p
            className="mt-4 max-w-[420px] text-base"
            style={{
              color: 'rgba(255,255,255,0.70)',
              lineHeight: 1.6,
            }}
          >
            CST Tires, SAHM Parts y NBG Parts para talleres, distribuidores y flotas en Lima y todo el Perú.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#marcas"
              onClick={() => onAction?.('hero_magic_ver_marcas')}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#ef2428] px-7 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-red-950/25 transition-all duration-200 hover:-translate-y-px hover:scale-[1.03] hover:bg-red-500 hover:shadow-[0_8px_24px_rgba(220,38,38,0.45)] active:scale-[0.98]"
            >
              Ver marcas
              <ArrowRight size={18} strokeWidth={1.5} className="ml-2" />
            </a>
            <a
              href="#contacto"
              onClick={() => onAction?.('hero_magic_contacto')}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/35 bg-white/20 px-7 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-px hover:border-red-600/50 hover:bg-red-900/20"
            >
              Contactar
            </a>
          </div>

          <div className="mt-8 flex max-w-2xl border-t border-white/[0.08] pt-6">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className={index === 0 ? 'flex-1 pr-5' : 'flex-1 border-l border-white/10 px-5'}
              >
                <div className="text-[28px] font-black leading-none text-[#ef4444]">
                  {stat.value}
                </div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white/50">
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
              loading="eager"
              decoding="async"
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
                  <img
                    src="/images/brand/nbg-isotipo.png"
                    alt=""
                    className="h-full w-full rounded-xl object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {operationCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="group rounded-xl border border-white/30 bg-white/[0.05] p-4 transition hover:border-white/60 hover:bg-white/10">
                      <div className="flex gap-4">
                        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
                          <Icon size={20} strokeWidth={1.5} />
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
