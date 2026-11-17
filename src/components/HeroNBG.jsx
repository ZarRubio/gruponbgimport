import { CheckCircle2, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const trustItems = ['Importación directa', 'Atención a negocios', 'Despacho a todo el Perú', 'Marcas especializadas'];

const productLines = ['Llantas', 'Cámaras', 'Rodajes', 'Carburadores'];

// Hero: un solo momento de movimiento (entrada de texto y foto) y la foto de producto como protagonista.
export function HeroNBG({ onAction }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#151515_0%,#1C0D0D_100%)]"
    >
      <div
        className="pointer-events-none absolute -left-[14%] top-[6%] z-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(232,33,39,0.16),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:pb-24 lg:pt-36">
        <motion.div
          initial={reduceMotion ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <h1 className="max-w-3xl text-[52px] font-black leading-[0.92] text-white sm:text-[72px] lg:text-[84px]">
            Importador de repuestos para motos en Perú
          </h1>

          <p className="mt-6 max-w-xl text-base leading-[1.6] text-[#B8B8B8] sm:text-lg">
            Abastecemos a talleres, tiendas, distribuidores y empresas con llantas para motos y vehículos menores, cámaras, rodajes y carburadores importados, al por mayor y con respaldo comercial.
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
              Ver marcas y productos
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 py-3 text-sm text-[#C9C9C9]">
                <CheckCircle2 size={18} strokeWidth={1.5} className="shrink-0 text-[#E82127]" />
                {item}
              </div>
            ))}
          </div>

        </motion.div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative overflow-hidden rounded-[28px] border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        >
          <img
            src="/images/catalogo/hero-almacen.webp"
            alt="Almacén con llantas y repuestos para motos listos para despacho"
            width="1200"
            height="900"
            className="aspect-[4/3] w-full object-cover"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-5 pb-5 pt-16 sm:px-6">
            <ul className="flex flex-wrap gap-2" aria-label="Líneas de producto">
              {productLines.map((item) => (
                <li key={item} className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                  {item}
                </li>
              ))}
            </ul>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default HeroNBG;
