import { ClipboardCheck, MessageCircle, PackageCheck, Truck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Nos escribes',
    description: 'Cuéntanos qué producto o línea necesitas para tu negocio.',
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Te asesoramos',
    description: 'Un asesor revisa tu consulta y te orienta según disponibilidad y rotación.',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Confirmamos disponibilidad',
    description: 'Validamos marca, categoría, cantidades y condiciones comerciales.',
  },
  {
    number: '04',
    icon: Truck,
    title: 'Coordinamos compra y despacho',
    description: 'Cerramos la atención y coordinamos entrega a tu taller, tienda o almacén.',
  },
];

export function ComoFunciona() {
  return (
    <section className="nbg-ambient overflow-hidden bg-[#1C0D0D] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px] text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#E82127]" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E82127]">PROCESO</span>
        </div>
        <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
          Así de simple es trabajar con nosotros
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.6] text-[#B8B8B8]">
          Cotiza, recibe asesoría y coordina tu compra con atención directa.
        </p>

        <div className="relative mt-12 grid gap-4 md:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-[60px] hidden border-t border-dashed border-[#E82127]/25 md:block" />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className="relative rounded-[20px] border border-white/[0.12] bg-white/[0.06] px-5 py-8 text-center">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#E82127]/70">{step.number}</div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#E82127]/20 bg-[#E82127]/10">
                  <Icon size={24} strokeWidth={1.5} className="text-[#E82127]" aria-hidden="true" />
                </div>
                <h3 className="mb-2 mt-4 text-base font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-[1.6] text-[#B8B8B8]">{step.description}</p>
              </article>
            );
          })}
        </div>

        <a
          href="https://wa.me/51956701218?text=Hola,%20quiero%20cotizar%20repuestos"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-12 inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-[#E82127] px-8 py-3.5 font-bold text-white transition-all duration-200 hover:-translate-y-px hover:scale-[1.02] hover:bg-[#FF2A2A] hover:shadow-[0_8px_24px_rgba(220,38,38,0.35)] active:scale-[0.98]"
        >
          Empezar ahora por WhatsApp
        </a>
      </div>
    </section>
  );
}

export default ComoFunciona;
