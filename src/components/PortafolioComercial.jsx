import { MessageCircle } from 'lucide-react';

const waLink = (text) => `https://wa.me/51956701218?text=${encodeURIComponent(text)}`;

// Líneas que la empresa importa actualmente. Si se agrega una línea nueva, sumarla aquí,
// en el formulario de contacto (App.jsx) y en el JSON-LD de index.html.
const categories = [
  {
    image: '/images/catalogo/cat-llantas.webp',
    alt: 'Llantas para motos y vehículos menores',
    slug: 'llantas',
    title: 'Llantas para vehículos menores',
    text: 'Para moto, ATV, UTV, scooter eléctrico y moto eléctrica, incluyendo líneas CST Tires Perú.',
  },
  {
    image: '/images/catalogo/cat-camaras.webp',
    alt: 'Cámaras de aire para motos',
    slug: 'camaras',
    title: 'Cámaras',
    text: 'Medidas de rotación para tiendas, talleres y compras recurrentes.',
  },
  {
    image: '/images/catalogo/cat-rodajes.webp',
    alt: 'Rodajes de distintas medidas',
    slug: 'rodajes',
    title: 'Rodajes',
    text: 'Medidas de alta rotación para mantenimiento, reparación y reposición comercial.',
  },
  {
    image: '/images/catalogo/cat-carburadores.webp',
    alt: 'Carburadores para motos',
    slug: 'carburadores',
    title: 'Carburadores',
    text: 'Para marcas del mercado motero peruano como Honda, Yamaha, Bajaj y TVS.',
  },
];

export function PortafolioComercial({ onAction }) {
  return (
    <section className="overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-black leading-[0.95] text-white sm:text-6xl">Llantas, cámaras, rodajes y carburadores</h2>
            <p className="mt-4 text-base leading-[1.6] text-[#B8B8B8]">
              Líneas importadas para abastecimiento, rotación y compras recurrentes de talleres, tiendas y distribuidores en Perú.
            </p>
          </div>
          <a
            href={waLink('Hola, ¿me pueden enviar su catálogo de productos?')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onAction?.('portafolio_catalogo')}
            className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-[#E82127]/60 hover:bg-white/[0.06] active:scale-[0.97] lg:ml-auto"
          >
            <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
            Pedir catálogo por WhatsApp
          </a>
        </div>

        {/* Cada línea abre WhatsApp con el producto ya escrito. En celular, dos columnas para no ocupar cuatro pantallas. */}
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {categories.map((item) => (
            <li key={item.title}>
              <a
                href={waLink(`Hola, quiero cotizar ${item.title.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onAction?.(`portafolio_${item.slug}`)}
                className="group block rounded-2xl"
              >
              <img
                src={item.image}
                alt={item.alt}
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover transition-colors duration-200 group-hover:border-[#E82127]/60"
              />
              <h3 className="mt-3 text-base font-bold leading-snug text-white sm:mt-4 sm:text-lg">{item.title}</h3>
              <p className="mt-1.5 hidden text-sm leading-[1.6] text-[#B8B8B8] sm:block">{item.text}</p>
              <span className="mt-2 inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-red-300 group-hover:text-white">
                <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
                Cotizar
              </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PortafolioComercial;
