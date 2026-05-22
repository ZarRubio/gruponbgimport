import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const faqs = [
  {
    question: '¿Hacen envíos fuera de Lima?',
    answer:
      'Sí, tenemos cobertura nacional. Coordinamos despacho a Arequipa, Trujillo, Cusco, Piura y todas las regiones del Perú a través de transportistas asociados.',
  },
  {
    question: '¿Cuál es el pedido mínimo?',
    answer:
      'No tenemos un mínimo fijo. Atendemos tanto pedidos individuales para talleres como órdenes mayoristas para distribuidores. Consúltanos según tu volumen.',
  },
  {
    question: '¿Los productos tienen garantía?',
    answer:
      'Sí. Todos nuestros productos son originales de fábrica con garantía del fabricante. CST Tires, SAHM Parts y NBG Parts cuentan con respaldo internacional.',
  },
  {
    question: '¿Cómo recibo mi cotización?',
    answer:
      'Una vez que completes el formulario o nos escribas por WhatsApp, un asesor te responde en menos de 24 horas hábiles con precios, disponibilidad y condiciones.',
  },
  {
    question: '¿Trabajan con empresas y personas naturales?',
    answer:
      'Sí. Atendemos tanto a empresas con RUC como a personas naturales. Emitimos factura y boleta según corresponda.',
  },
  {
    question: '¿Qué marcas de motos cubren los repuestos?',
    answer:
      'Nuestro catálogo cubre las principales marcas del mercado peruano: Honda, Yamaha, Bajaj, TVS, Lifan, Ronco y más. Consúltanos por tu marca específica.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="nbg-ambient overflow-hidden px-6 py-24" style={{ background: 'linear-gradient(180deg,#0B0B0B 0%,#120909 100%)' }}>
      <div className="mx-auto max-w-[720px]">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-red-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">FAQ</span>
          </div>
          <h2 className="text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
            PREGUNTAS
            <br />
            FRECUENTES
          </h2>
          <p className="mt-3 text-[15px] text-white/70">Todo lo que necesitás saber antes de cotizar.</p>
        </div>

        <div className="mt-10">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            const Icon = open ? Minus : Plus;
            return (
              <div key={faq.question} className="border-b border-white/[0.08] py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <span className="text-[15px] font-semibold text-white">{faq.question}</span>
                  <Icon size={20} strokeWidth={1.5} className="shrink-0 text-red-500 transition-transform duration-300" aria-hidden="true" />
                </button>
                <div
                  className={open ? 'grid grid-rows-[1fr] transition-all duration-300' : 'grid grid-rows-[0fr] transition-all duration-300'}
                >
                  <div className="overflow-hidden">
                    <p className="pr-6 pt-3 text-sm leading-[1.7] text-white/70">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
