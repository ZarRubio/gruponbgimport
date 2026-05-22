import { ArrowRight, CheckCircle2, MessageCircle, Package, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { BorderBeam } from './magicui/border-beam';
import { Particles } from './magicui/particles';

const stats = [
  { value: '+500', label: 'productos disponibles' },
  { value: '100%', label: 'enfoque B2B' },
  { value: '+8', label: 'líneas de producto' },
];

const trustItems = ['Importación directa', 'Atención a negocios', 'Despacho nacional', 'Marcas especializadas'];

const heroPills = ['Llantas', 'Cámaras', 'Rodajes', 'Carburadores', 'Accesorios', 'Motopartes'];

export function HeroNBG({ onAction }) {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-[#0B0B0B]"
    >
      <Particles
        className="absolute inset-0 z-0 opacity-50"
        quantity={70}
        color="#ffffff"
        staticity={42}
        ease={70}
        size={0.28}
        vx={0.01}
        vy={-0.01}
      />
      <div className="absolute inset-0 z-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(232,33,39,0.18),transparent_34%),radial-gradient(ellipse_at_82%_24%,rgba(255,255,255,0.12),transparent_32%),linear-gradient(180deg,#111111_0%,#120909_100%)]" />
      <div
        className="hero-red-breath pointer-events-none absolute -left-[14%] top-[6%] z-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(232,33,39,0.20),rgba(232,33,39,0.08)_42%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="hero-red-breath pointer-events-none absolute -right-[12%] bottom-[6%] z-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(232,33,39,0.13),rgba(232,33,39,0.05)_45%,transparent_72%)] blur-2xl [animation-delay:-4s]"
        aria-hidden="true"
      />
      <div
        className="hero-tech-sweep pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[58%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.035),transparent),linear-gradient(90deg,transparent,rgba(232,33,39,0.045),transparent)] opacity-70"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.065] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C9C9C9]">
            <Package size={16} strokeWidth={1.5} className="text-[#E82127]" />
            Importador B2B en Perú
          </div>

          <h1 className="max-w-3xl text-[42px] font-black leading-[0.98] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[68px]">
            Importación B2B de repuestos para el sector moto
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-[1.6] text-[#B8B8B8] sm:text-lg">
            Abastecemos a talleres, tiendas, distribuidores y empresas con repuestos, llantas, cámaras y motopartes importadas con respaldo comercial y atención directa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/51956701218?text=Hola,%20quiero%20cotizar%20repuestos"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAction?.('hero_whatsapp_b2b')}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#E82127] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:scale-[1.02] hover:bg-[#FF2A2A] hover:shadow-[0_8px_24px_rgba(220,38,38,0.35)] active:scale-[0.98]"
            >
              <MessageCircle size={20} strokeWidth={1.5} />
              Cotizar por WhatsApp
            </a>
            <a
              href="#marcas"
              onClick={() => onAction?.('hero_marcas_importadas')}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:border-[#E82127]/60 hover:bg-white/[0.06]"
            >
              Ver marcas importadas
              <ArrowRight size={18} strokeWidth={1.5} />
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 py-3 text-sm text-[#C9C9C9]">
                <CheckCircle2 size={18} strokeWidth={1.5} className="shrink-0 text-[#E82127]" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex max-w-2xl border-t border-white/[0.08] pt-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className={index === 0 ? 'flex-1 pr-4' : 'flex-1 border-l border-white/10 px-4'}>
                <div className="text-[28px] font-black leading-none text-[#E82127]">{stat.value}</div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#B8B8B8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.06] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur">
            <BorderBeam size={90} duration={9} colorFrom="#ffffff" colorTo="#E82127" borderWidth={1} />
            <img
              src="/images/brand/nbg-isotipo.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rotate-6 object-contain opacity-10"
              loading="eager"
              decoding="async"
            />
            <div className="relative rounded-2xl border border-white/[0.12] bg-[#141010]/82 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8B8B8]">Portafolio importador</p>
                  <h2 className="mt-3 text-4xl font-black leading-none text-white sm:text-5xl">
                    Stock para
                    <br />
                    negocios
                  </h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.065] text-[#E82127]">
                  <Truck size={26} strokeWidth={1.5} />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {heroPills.map((item) => (
                  <div key={item} className="rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#C9C9C9]">
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-[#E82127]/25 bg-[#E82127]/10 px-4 py-4">
                <p className="text-sm leading-6 text-white">
                  Atención comercial directa para compras recurrentes, abastecimiento por línea y coordinación de despacho nacional.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroNBG;
