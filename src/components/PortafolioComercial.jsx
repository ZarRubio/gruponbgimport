import { CircleDot, Disc3, Gauge, Settings, ShoppingBag, Wrench } from 'lucide-react';

const categories = [
  { icon: CircleDot, title: 'Llantas', text: 'Opciones urbanas, trabajo y uso comercial.' },
  { icon: Disc3, title: 'Cámaras', text: 'Medidas de rotación para tiendas y talleres.' },
  { icon: Settings, title: 'Repuestos', text: 'Componentes para atención recurrente.' },
  { icon: Gauge, title: 'Rodajes', text: 'Líneas para mantenimiento y reparación.' },
  { icon: Wrench, title: 'Carburadores', text: 'Soluciones para mercado motero peruano.' },
  { icon: ShoppingBag, title: 'Accesorios', text: 'Productos complementarios para venta comercial.' },
];

export function PortafolioComercial() {
  return (
    <section className="nbg-ambient overflow-hidden bg-[#1C0D0D] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#E82127]" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E82127]">PORTAFOLIO</span>
            </div>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">Portafolio comercial para negocios</h2>
            <p className="mt-4 text-base leading-[1.6] text-[#B8B8B8]">
              Categorías pensadas para abastecimiento, rotación y compras recurrentes.
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex w-fit items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:border-[#E82127]/60 hover:bg-white/[0.06] lg:ml-auto"
          >
            Solicitar portafolio comercial
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[20px] border border-white/[0.12] bg-white/[0.06] p-5 transition duration-200 hover:-translate-y-1">
                <Icon size={20} strokeWidth={1.5} className="text-[#E82127]" />
                <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.6] text-[#B8B8B8]">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PortafolioComercial;
