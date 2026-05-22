import { FileText, MessageCircle, Truck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Cuéntanos qué necesitas',
    description: 'Escríbenos por WhatsApp o llena el formulario. Sin compromiso.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Recibís tu cotización en 24h',
    description: 'Un asesor comercial analiza tu pedido y te envía precios y disponibilidad.',
  },
  {
    number: '03',
    icon: Truck,
    title: 'Despacho a todo el Perú',
    description: 'Coordinamos la entrega a tu almacén, taller o punto de distribución.',
  },
];

export function ComoFunciona() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(180deg, #0f0000 0%, #1a0000 100%)' }}>
      <div className="mx-auto max-w-[800px] text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">PROCESO</span>
        </div>
        <h2 className="font-black uppercase leading-tight text-white" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
          ASÍ DE SIMPLE
          <br />
          ES TRABAJAR CON NOSOTROS
        </h2>
        <p className="mx-auto mt-3 text-[15px] text-white/70">En 3 pasos estás recibiendo tu pedido.</p>

        <div className="relative mt-14 grid gap-0 md:grid-cols-3">
          <div className="absolute left-[16.6%] right-[16.6%] top-[60px] hidden border-t border-dashed border-red-600/25 md:block" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex-1 px-6 py-8 text-center">
                {index < steps.length - 1 ? (
                  <div className="absolute bottom-[-14px] left-1/2 h-7 border-l border-dashed border-red-600/25 md:hidden" />
                ) : null}
                <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-red-600/50">{step.number}</div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-600/20 bg-red-600/10">
                  <Icon size={24} strokeWidth={1.5} className="text-red-500" aria-hidden="true" />
                </div>
                <h3 className="mb-2 mt-4 text-base font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-[1.6] text-white/70">{step.description}</p>
              </div>
            );
          })}
        </div>

        <a
          href="https://wa.me/51956701218?text=Hola,%20quiero%20cotizar%20repuestos"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-12 block w-fit rounded-lg bg-red-600 px-8 py-3.5 font-bold text-white transition-all duration-200 hover:-translate-y-px hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(220,38,38,0.45)] active:scale-[0.98]"
        >
          Empezar ahora por WhatsApp
        </a>
      </div>
    </section>
  );
}

export default ComoFunciona;
