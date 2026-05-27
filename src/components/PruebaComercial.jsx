import { CheckCircle2, PackageCheck, Warehouse } from 'lucide-react';

const proofs = [
  'Importador de repuestos para motos en Perú',
  'Atención comercial para empresas y negocios',
  'Coordinación de compras y despacho nacional',
  'Portafolio especializado en sector moto',
];

export function PruebaComercial() {
  return (
    <section className="nbg-ambient overflow-hidden bg-[#101010] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.06] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.12] bg-[#1A1414] p-5">
              <Warehouse size={28} strokeWidth={1.5} className="text-[#E82127]" />
              <h3 className="mt-5 text-xl font-black text-white">Almacén y stock</h3>
              <p className="mt-3 text-sm leading-[1.6] text-[#B8B8B8]">
                Líneas comerciales de llantas, cámaras, rodajes, carburadores, accesorios y repuestos para motos.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.12] bg-[#1A1414] p-5 sm:mt-10">
              <PackageCheck size={28} strokeWidth={1.5} className="text-[#E82127]" />
              <h3 className="mt-5 text-xl font-black text-white">Despacho coordinado</h3>
              <p className="mt-3 text-sm leading-[1.6] text-[#B8B8B8]">
                Atención directa para confirmar disponibilidad, compra y entrega.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#E82127]" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E82127]">RESPALDO</span>
          </div>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Confianza comercial para importar y comprar mejor
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-[#B8B8B8]">
            Grupo NBG Import trabaja con líneas especializadas para negocios que buscan disponibilidad, rotación, respaldo y atención directa en cada compra de motopartes.
          </p>
          <div className="mt-8 grid gap-3">
            {proofs.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-sm text-[#B8B8B8]">
                <CheckCircle2 size={20} strokeWidth={1.5} className="shrink-0 text-[#E82127]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PruebaComercial;
