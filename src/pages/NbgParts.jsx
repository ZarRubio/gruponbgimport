import { ArrowLeft, MessageCircle } from 'lucide-react';
import { COMPANY, LEGAL_LINKS, trackEvent } from '../lib/company';
import { CursorGlow } from '../components/CursorGlow';
import { AmbientBackground } from '../components/AmbientBackground';
import { RodajeSelector } from './RodajeSelector';

// Catálogo de NBG Parts. Fotos reales en public/images/nbg-parts/ (fondo blanco de estudio).
// Medidas estándar de cada código en mm: d = interior, D = exterior, B = ancho.
export const RODAJES = [
  { code: '6004-2NSL', d: 20, D: 42, B: 12, image: '/images/nbg-parts/rodaje-6004.webp' },
  { code: '6202-2NSL', d: 15, D: 35, B: 11, image: '/images/nbg-parts/rodaje-6202.webp' },
  { code: '6204-2NSL', d: 20, D: 47, B: 14, image: '/images/nbg-parts/rodaje-6204.webp' },
  { code: '6301-2NSL', d: 12, D: 37, B: 12, image: '/images/nbg-parts/rodaje-6301.webp' },
  { code: '6302-2NSL', d: 15, D: 42, B: 13, image: '/images/nbg-parts/rodaje-6302.webp' },
  { code: '6304-2NSL', d: 20, D: 52, B: 15, image: '/images/nbg-parts/rodaje-6304.webp' },
];

const waLink = (text) => `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;

const primaryBtn =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#E82127] px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#FF2A2A]';
const secondaryBtn =
  'inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-[#E82127]/60 hover:bg-white/[0.06]';

export function NbgParts() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen text-white">
      <AmbientBackground />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex shrink-0 items-center" aria-label={`${COMPANY.tradeName} - Inicio`}>
            <img src="/images/brand/nbg-logo-white.png" alt={COMPANY.tradeName} className="h-10 w-auto object-contain" />
          </a>
          <nav aria-label="Secciones de NBG Parts" className="hidden items-center gap-1 sm:flex">
            <a href="#rodajes" className="px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
              Rodajes
            </a>
            <a href="#asientos" className="px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
              Asientos para mototaxi
            </a>
          </nav>
          <a
            href="/#marcas"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
            <span className="hidden sm:inline">Todas las marcas</span>
            <span className="sm:hidden">Inicio</span>
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <img
              src="/images/brands/nbg-parts-logo-red.png"
              alt="NBG Parts"
              className="h-16 w-auto object-contain sm:h-20"
            />
            <h1 className="mt-8 text-[52px] font-black leading-[0.92] sm:text-[72px] lg:text-[80px]">
              Rodajes y asientos para mototaxi
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.6] text-[#B8B8B8] sm:text-lg">
              NBG Parts es la línea de Grupo NBG Import con rodajes sellados 2NSL en seis medidas y asientos para motokar
              Wanxin. Venta al por mayor para talleres, tiendas y distribuidores en todo el Perú.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink('Hola, quiero cotizar productos NBG Parts.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { cta: 'nbg_hero_whatsapp' })}
                className={primaryBtn}
              >
                <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
                Cotizar por WhatsApp
              </a>
              <a href="#rodajes" className={secondaryBtn}>
                Ver rodajes
              </a>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <img
              src="/images/nbg-parts/hero-nbg-parts.webp"
              alt="Asiento NBG Parts para motokar Wanxin y rodaje 6304-2NSL con su caja"
              width="1200"
              height="900"
              fetchpriority="high"
              className="aspect-[4/3] w-full object-contain"
            />
          </figure>
        </section>

        {/* Rodajes */}
        <section id="rodajes" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black leading-[0.95] sm:text-6xl">Rodajes 2NSL</h2>
              <p className="mt-4 text-base leading-[1.6] text-[#B8B8B8]">
                Rodajes de bolas con doble sello de goma, que protege del polvo y el agua y mantiene la grasa dentro. Elige la
                medida para ver su foto y su plano a escala.
              </p>
            </div>

            <div className="mt-12">
              <RodajeSelector items={RODAJES} waLink={waLink} />
            </div>
            <p className="mt-10 text-xs leading-5 text-white/50">
              Medidas en milímetros: diámetro interior × diámetro exterior × ancho. Son las medidas estándar de cada código;
              consulta stock y aplicación con tu asesor.
            </p>
          </div>
        </section>

        {/* Asientos */}
        <section id="asientos" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[28px] bg-white">
              <img
                src="/images/nbg-parts/asiento-mototaxi-wanxin.webp"
                alt="Asiento NBG Parts para motokar Wanxin, fabricado en Vietnam"
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black leading-[0.95] sm:text-6xl">Asiento para mototaxi</h2>
              <p className="mt-4 max-w-xl text-base leading-[1.6] text-[#B8B8B8]">
                Asiento de reemplazo para el pasajero, diseñado específicamente para el motokar Wanxin.
              </p>
              <dl className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-sm text-white/50">Compatible con</dt>
                  <dd className="mt-1 font-semibold">Motokar Wanxin</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/50">Fabricado en</dt>
                  <dd className="mt-1 font-semibold">Vietnam</dd>
                </div>
              </dl>
              <a
                href={waLink('Hola, quiero cotizar el asiento NBG Parts para motokar Wanxin.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { cta: 'nbg_asiento' })}
                className={`${primaryBtn} mt-8`}
              >
                <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
                Cotizar asiento
              </a>
            </div>
          </div>

          <figure className="mx-auto mt-16 max-w-4xl">
            <video
              controls
              playsInline
              preload="none"
              poster="/images/nbg-parts/video-asiento-poster.webp"
              onPlay={() => trackEvent('video_play', { video: 'asiento_mototaxi_nbg' })}
              className="aspect-[3/2] w-full rounded-[28px] bg-black object-contain"
            >
              <source src="/videos/asiento-mototaxi-nbg.mp4" type="video/mp4" />
            </video>
            <figcaption className="mt-3 text-sm text-white/50">Video del asiento NBG Parts para mototaxi.</figcaption>
          </figure>
        </section>

        {/* Cierre */}
        <section className="px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-black leading-[0.95] sm:text-5xl">¿Pedido por volumen u otra medida?</h2>
              <p className="mt-3 max-w-xl text-base leading-[1.6] text-[#B8B8B8]">
                Escríbenos con el código y la cantidad. Te respondemos con disponibilidad y condiciones comerciales.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a
                href={waLink('Hola, quiero hacer un pedido de productos NBG Parts.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { cta: 'nbg_cierre_whatsapp' })}
                className={primaryBtn}
              >
                <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
                Cotizar por WhatsApp
              </a>
              <a href="/#contacto" className={secondaryBtn}>
                Usar el formulario
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {COMPANY.legalName} — RUC {COMPANY.ruc}
          </p>
          <nav aria-label="Enlaces legales" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/" className="transition-colors hover:text-white">
              Grupo NBG Import
            </a>
            <a href={LEGAL_LINKS.libro} className="transition-colors hover:text-white">
              Libro de Reclamaciones
            </a>
            <a href={LEGAL_LINKS.privacidad} className="transition-colors hover:text-white">
              Política de privacidad
            </a>
          </nav>
        </div>
      </footer>

      <CursorGlow />
    </div>
  );
}
