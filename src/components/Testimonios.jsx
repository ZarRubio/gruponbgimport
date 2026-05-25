const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Dueño de Taller',
    company: 'Taller Mecánico El Rápido',
    city: 'Lima',
    quote:
      'Trabajo con NBG Import hace 2 años. La respuesta comercial es rápida y los precios son competitivos. Sin duda los recomiendo.',
    rating: 5,
  },
  {
    name: 'Roberto Salas',
    role: 'Gerente Comercial',
    company: 'Distribuidora Salas Hnos.',
    city: 'Arequipa',
    quote:
      'Las llantas CST Tires tienen excelente acogida en el mercado local. NBG nos da soporte técnico y despacho rápido.',
    rating: 5,
  },
  {
    name: 'María Quispe',
    role: 'Administradora',
    company: 'Repuestos Universal Moto',
    city: 'Trujillo',
    quote:
      'Empezamos con un pedido pequeño y ya somos distribuidores frecuentes. La calidad de SAHM Parts es consistente.',
    rating: 5,
  },
];

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
}

function Star() {
  return (
    <svg className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="m10 1.6 2.56 5.18 5.72.83-4.14 4.04.98 5.7L10 14.66l-5.12 2.69.98-5.7-4.14-4.04 5.72-.83L10 1.6Z" />
    </svg>
  );
}

export function Testimonios() {
  return (
    <section className="nbg-ambient overflow-hidden px-4 py-24 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(180deg, #101010 0%, #1C0D0D 50%, #101010 100%)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-red-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">CLIENTES</span>
          </div>
          <h2 className="font-black uppercase leading-tight text-white" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            LO QUE DICEN
            <br />
            NUESTROS CLIENTES
          </h2>
          <p className="mt-3 text-[15px] text-white/70">Distribuidores y talleres que ya trabajan con nosotros.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-white/[0.12] bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/30"
            >
              <div className="flex gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} />
                ))}
              </div>
              <p className="my-4 text-sm italic leading-[1.7] text-white/75">“{item.quote}”</p>
              <div className="border-t border-white/[0.08]" />
              <div className="mt-4 flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7f1d1d] to-[#dc2626] text-base font-bold text-white">
                  {initials(item.name)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                  <p className="text-xs text-[#B8B8B8]">
                    {item.role} · {item.company}
                  </p>
                  <p className="mt-0.5 text-[11px] text-red-500">{item.city}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonios;
