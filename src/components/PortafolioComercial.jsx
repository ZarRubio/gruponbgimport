const categories = [
  {
    image: '/images/catalogo/cat-llantas.webp',
    alt: 'Llantas para motos apiladas',
    title: 'Llantas para motos',
    text: 'Opciones urbanas, trabajo y uso comercial, incluyendo líneas CST Tires Perú.',
  },
  {
    image: '/images/catalogo/cat-camaras.webp',
    alt: 'Cámaras de aire para motos',
    title: 'Cámaras para motos',
    text: 'Medidas de rotación para tiendas, talleres y compras recurrentes.',
  },
  {
    image: '/images/catalogo/cat-repuestos.webp',
    alt: 'Pastillas de freno, bujías, filtros y cables para motos',
    title: 'Repuestos para motos',
    text: 'Componentes importados para mantenimiento, reparación y atención recurrente.',
  },
  {
    image: '/images/catalogo/cat-rodajes.webp',
    alt: 'Cadena, piñones y rodajes para motos',
    title: 'Rodajes y transmisión',
    text: 'Líneas para mantenimiento preventivo, reparación y reposición comercial.',
  },
  {
    image: '/images/catalogo/cat-carburadores.webp',
    alt: 'Carburadores para motos',
    title: 'Carburadores y partes',
    text: 'Soluciones para marcas del mercado motero peruano como Honda, Yamaha, Bajaj y TVS.',
  },
  {
    image: '/images/catalogo/cat-accesorios.webp',
    alt: 'Espejos, puños y direccionales para motos',
    title: 'Accesorios para motos',
    text: 'Productos complementarios para venta comercial y abastecimiento B2B.',
  },
];

export function PortafolioComercial() {
  return (
    <section className="nbg-ambient overflow-hidden bg-[#1C0D0D] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-black leading-[0.95] text-white sm:text-6xl">Portafolio de repuestos, llantas y accesorios para motos</h2>
            <p className="mt-4 text-base leading-[1.6] text-[#B8B8B8]">
              Categorías pensadas para abastecimiento, rotación y compras recurrentes de talleres, tiendas y distribuidores en Perú.
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex w-fit items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-[#E82127]/60 hover:bg-white/[0.06] lg:ml-auto"
          >
            Solicitar portafolio comercial
          </a>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <li key={item.title}>
              <img
                src={item.image}
                alt={item.alt}
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
              />
              <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-[1.6] text-[#B8B8B8]">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PortafolioComercial;
