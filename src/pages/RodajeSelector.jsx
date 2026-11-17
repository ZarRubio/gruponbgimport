import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/company';

const STEEL = '#C9CDD2';
const RING = '#2A2D31';
const RED = '#E82127';

// Escala común para todos los códigos: así el dibujo de un 6304 se ve realmente más grande que el de un 6301.
const SCALE = 3.3; // px por mm
const CY = 112;
const FRONT_CX = 112;
const SECTION_CX = 292;

/**
 * Plano técnico de un rodaje rígido de bolas con doble sello (2NSL):
 * vista frontal (izquierda) y corte transversal (derecha), con cotas ⌀d, ⌀D y B.
 * Dibujado a escala real a partir de las medidas del código seleccionado.
 */
function BearingDiagram({ d, D, B }) {
  const reduce = useReducedMotion();
  const t = reduce ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 24 };

  const rD = (D / 2) * SCALE;
  const rd = (d / 2) * SCALE;
  const h = rD - rd; // alto de la sección del anillo
  const ring = h * 0.28; // espesor de cada aro
  const w = B * SCALE;
  const ball = Math.min(h * 0.24, w * 0.36);
  const xL = SECTION_CX - w / 2;

  // Una mitad (superior) del corte; la inferior se refleja con sign = 1.
  const half = (sign) => {
    const outerY = CY + sign * rD;
    const innerY = CY + sign * rd;
    const ballY = CY + sign * (rd + h / 2);
    const y = (a, b) => Math.min(a, b);
    return (
      <g key={sign}>
        <motion.rect animate={{ x: xL, y: y(outerY, outerY - sign * ring), width: w, height: ring }} transition={t} fill={RING} stroke={STEEL} strokeWidth="1.2" />
        <motion.rect animate={{ x: xL, y: y(innerY, innerY + sign * ring), width: w, height: ring }} transition={t} fill={RING} stroke={STEEL} strokeWidth="1.2" />
        <motion.circle animate={{ cx: SECTION_CX, cy: ballY, r: ball }} transition={t} fill="none" stroke={STEEL} strokeWidth="1.2" />
        {/* Sellos de goma a ambos lados */}
        <motion.rect animate={{ x: xL - 1, y: y(outerY - sign * ring, innerY + sign * ring), width: 3, height: h - 2 * ring }} transition={t} fill={RED} />
        <motion.rect animate={{ x: xL + w - 2, y: y(outerY - sign * ring, innerY + sign * ring), width: 3, height: h - 2 * ring }} transition={t} fill={RED} />
      </g>
    );
  };

  return (
    <svg viewBox="0 0 380 250" className="w-full" role="img" aria-label={`Plano del rodaje: interior ${d} mm, exterior ${D} mm, ancho ${B} mm`}>
      {/* Ejes */}
      <line x1={FRONT_CX - 104} x2={FRONT_CX + 104} y1={CY} y2={CY} stroke={STEEL} strokeOpacity="0.3" strokeDasharray="6 4" />
      <line x1={FRONT_CX} x2={FRONT_CX} y1={CY - 104} y2={CY + 104} stroke={STEEL} strokeOpacity="0.3" strokeDasharray="6 4" />
      <line x1={SECTION_CX - 50} x2={SECTION_CX + 50} y1={CY} y2={CY} stroke={STEEL} strokeOpacity="0.3" strokeDasharray="6 4" />

      {/* Vista frontal */}
      <motion.circle animate={{ r: rD }} cx={FRONT_CX} cy={CY} transition={t} fill={RING} stroke={STEEL} strokeWidth="1.2" />
      <motion.circle animate={{ r: rD - ring }} cx={FRONT_CX} cy={CY} transition={t} fill={RED} stroke={STEEL} strokeWidth="1" />
      <motion.circle animate={{ r: rd + ring }} cx={FRONT_CX} cy={CY} transition={t} fill={RING} stroke={STEEL} strokeWidth="1" />
      <motion.circle animate={{ r: rd }} cx={FRONT_CX} cy={CY} transition={t} fill="#101010" stroke={STEEL} strokeWidth="1.2" />

      {/* Corte */}
      {half(-1)}
      {half(1)}

      {/* Cota ⌀D, debajo de la vista frontal */}
      <motion.line animate={{ x1: FRONT_CX - rD, x2: FRONT_CX + rD }} y1="236" y2="236" transition={t} stroke={STEEL} strokeWidth="1" />
      <motion.line animate={{ x1: FRONT_CX - rD, x2: FRONT_CX - rD }} y1="230" y2="242" transition={t} stroke={STEEL} strokeWidth="1" />
      <motion.line animate={{ x1: FRONT_CX + rD, x2: FRONT_CX + rD }} y1="230" y2="242" transition={t} stroke={STEEL} strokeWidth="1" />
      <text x={FRONT_CX} y="228" textAnchor="middle" className="fill-white text-[12px] font-semibold tabular-nums">⌀{D}</text>

      {/* Cota ⌀d, a través del agujero */}
      <motion.line animate={{ x1: FRONT_CX - rd, x2: FRONT_CX + rd }} y1={CY} y2={CY} transition={t} stroke="white" strokeWidth="1" />
      <text x={FRONT_CX} y={CY - 6} textAnchor="middle" className="fill-white text-[12px] font-semibold tabular-nums">⌀{d}</text>

      {/* Cota B, sobre el corte */}
      <motion.line animate={{ x1: xL, x2: xL + w, y1: CY - rD - 12, y2: CY - rD - 12 }} transition={t} stroke={STEEL} strokeWidth="1" />
      <motion.text animate={{ y: CY - rD - 18 }} x={SECTION_CX} transition={t} textAnchor="middle" className="fill-white text-[12px] font-semibold tabular-nums">
        {B}
      </motion.text>
    </svg>
  );
}

/**
 * Selector de medidas: la lista de códigos funciona como pestañas (flechas del teclado incluidas)
 * y el panel muestra la foto real, el plano a escala y el botón para cotizar ese código.
 */
export function RodajeSelector({ items, waLink }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const item = items[active];

  const select = (index, source = 'click') => {
    setActive(index);
    trackEvent('nbg_rodaje_select', { product: items[index].code, source });
  };

  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key in keys) {
      event.preventDefault();
      const next = (active + keys[event.key] + items.length) % items.length;
      select(next, 'keyboard');
      tabsRef.current[next]?.focus();
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      <div
        role="tablist"
        aria-label="Medidas de rodaje"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-2 self-start lg:grid-cols-1 lg:gap-0 lg:border-t lg:border-white/10"
      >
        {items.map((it, index) => {
          const selected = index === active;
          return (
            <button
              key={it.code}
              ref={(el) => (tabsRef.current[index] = el)}
              id={`tab-${it.code}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="panel-rodaje"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              className={[
                'group relative flex flex-col items-start rounded-xl border px-3 py-3 text-left transition-colors',
                'lg:flex-row lg:items-baseline lg:justify-between lg:rounded-none lg:border-0 lg:border-b lg:border-white/10 lg:px-0 lg:py-4 lg:pl-5',
                selected ? 'border-[#E82127] bg-[#E82127]/10 lg:bg-transparent' : 'border-white/10 hover:border-white/30',
              ].join(' ')}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-3 left-0 hidden w-[3px] rounded-full transition-colors lg:block ${selected ? 'bg-[#E82127]' : 'bg-transparent'}`}
              />
              <span className={`font-display text-xl font-bold leading-none sm:text-2xl lg:text-4xl ${selected ? 'text-white' : 'text-white/55 group-hover:text-white/80'}`}>
                {it.code.replace('-2NSL', '')}
                <span className="text-[0.6em] lg:text-[0.55em]">-2NSL</span>
              </span>
              <span className={`mt-1 text-xs tabular-nums lg:mt-0 lg:text-sm ${selected ? 'text-white/80' : 'text-white/45'}`}>
                {it.d} × {it.D} × {it.B}
                <span className="hidden lg:inline"> mm</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Escritorio: foto | código + cotizar; debajo, plano a lo ancho junto a las medidas.
          Celular: foto, código, plano, medidas y botón, en ese orden. */}
      <div
        id="panel-rodaje"
        role="tabpanel"
        aria-labelledby={`tab-${item.code}`}
        className="grid gap-6 sm:grid-cols-2 sm:gap-x-8"
      >
        <div className="overflow-hidden rounded-[24px] bg-white sm:col-start-1 sm:row-span-2 sm:row-start-1">
          <img
            key={item.code}
            src={item.image}
            alt={`Rodaje NBG Parts ${item.code}`}
            width="800"
            height="800"
            className="aspect-square w-full object-contain"
          />
        </div>

        <h3 className="font-display text-5xl font-bold uppercase leading-none sm:col-start-2 sm:row-start-1 sm:self-end sm:text-6xl">
          {item.code}
        </h3>

        <div className="grid items-center gap-6 border-white/10 sm:col-span-2 sm:row-start-3 sm:grid-cols-[1.4fr_1fr] sm:border-t sm:pt-6">
          <BearingDiagram d={item.d} D={item.D} B={item.B} />
          <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-sm sm:grid-cols-1 sm:border-0 sm:pt-0">
            <div>
              <dt className="text-white/50">Interior (d)</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums">{item.d} mm</dd>
            </div>
            <div>
              <dt className="text-white/50">Exterior (D)</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums">{item.D} mm</dd>
            </div>
            <div>
              <dt className="text-white/50">Ancho (B)</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums">{item.B} mm</dd>
            </div>
          </dl>
        </div>

        <a
          href={waLink(`Hola, quiero cotizar el rodaje NBG Parts ${item.code}.`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('cta_click', { cta: 'nbg_rodaje', product: item.code })}
          className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-[#E82127] px-6 text-sm font-bold text-white transition-colors hover:bg-[#FF2A2A] sm:col-start-2 sm:row-start-2"
        >
          <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
          Cotizar {item.code}
        </a>
      </div>
    </div>
  );
}
