import { Building2, Factory, Store, Wrench } from 'lucide-react';

const solutions = [
  {
    icon: Wrench,
    title: 'Talleres mecánicos',
    text: 'Abastecimiento confiable para trabajos recurrentes, mantenimientos y pedidos urgentes.',
  },
  {
    icon: Store,
    title: 'Tiendas de repuestos',
    text: 'Líneas de alta rotación para ampliar tu vitrina y responder mejor a tus clientes.',
  },
  {
    icon: Factory,
    title: 'Distribuidores',
    text: 'Portafolio comercial para compras por volumen, variedad y continuidad de stock.',
  },
  {
    icon: Building2,
    title: 'Flotas y empresas',
    text: 'Atención directa para operaciones que requieren disponibilidad y despacho coordinado.',
  },
];

export function SolucionesNegocios() {
  return (
    <section id="soluciones" className="nbg-ambient overflow-hidden bg-[#101010] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#E82127]" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E82127]">NEGOCIOS</span>
          </div>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Soluciones para negocios del sector moto
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[1.6] text-[#B8B8B8]">
            Trabajamos con empresas que necesitan abastecimiento constante, variedad de productos y atención comercial confiable.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[20px] border border-white/[0.12] bg-white/[0.06] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.32)] transition duration-200 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.065] text-[#E82127]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.6] text-[#B8B8B8]">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SolucionesNegocios;
