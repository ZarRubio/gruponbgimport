import { COMPANY, LEGAL_LINKS } from '../lib/company';
import { LegalLayout } from './LegalLayout';

const UPDATED = '17 de noviembre de 2026';

function Section({ title, children }) {
  return (
    <section className="border-t border-white/10 py-8">
      <h2 className="text-xl font-black sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#C9C9C9] [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-white">
        {children}
      </div>
    </section>
  );
}

export function PoliticaPrivacidad() {
  return (
    <LegalLayout
      eyebrow="Protección de datos personales"
      title="Política de privacidad"
      intro={
        <p>
          En {COMPANY.legalName} ({COMPANY.tradeName}) protegemos los datos personales que nos confías, conforme a la Ley
          N.º 29733, Ley de Protección de Datos Personales, y su Reglamento. Esta política explica qué datos recopilamos
          en este sitio web, para qué los usamos y cómo puedes ejercer tus derechos. Última actualización: {UPDATED}.
        </p>
      }
    >
      <Section title="1. Responsable del tratamiento">
        <ul>
          <li>
            <strong>Razón social:</strong> {COMPANY.legalName}
          </li>
          <li>
            <strong>RUC:</strong> {COMPANY.ruc}
          </li>
          <li>
            <strong>Domicilio:</strong> {COMPANY.address}
          </li>
          <li>
            <strong>Correo de contacto:</strong>{' '}
            <a className="text-red-300 underline underline-offset-2" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </li>
        </ul>
      </Section>

      <Section title="2. Datos que recopilamos">
        <p>Solo recopilamos los datos que tú nos proporcionas o que son necesarios para el funcionamiento del sitio:</p>
        <ul>
          <li>
            <strong>Formulario de cotización:</strong> nombre y empresa, número de celular o WhatsApp, tipo de negocio,
            producto de interés y el mensaje que escribas.
          </li>
          <li>
            <strong>Libro de Reclamaciones:</strong> nombre completo, tipo y número de documento, domicilio, teléfono,
            correo electrónico y el detalle del reclamo o queja.
          </li>
          <li>
            <strong>Contacto directo:</strong> los datos que nos envíes por WhatsApp, correo electrónico o teléfono.
          </li>
          <li>
            <strong>Datos de navegación:</strong> información técnica y estadística (páginas visitadas, dispositivo,
            navegador, ubicación aproximada) recogida mediante cookies de Google Analytics.
          </li>
        </ul>
        <p>No solicitamos datos sensibles ni datos de menores de edad.</p>
      </Section>

      <Section title="3. Finalidades del tratamiento">
        <ul>
          <li>Atender tus solicitudes de cotización y enviarte precios, disponibilidad y condiciones comerciales.</li>
          <li>Gestionar la relación comercial: pedidos, facturación, despachos y servicio posventa.</li>
          <li>Registrar, atender y responder los reclamos y quejas del Libro de Reclamaciones.</li>
          <li>Medir el uso del sitio web para mejorar su contenido y funcionamiento.</li>
        </ul>
        <p>
          Solo te enviaremos información comercial o promocional adicional si nos das tu consentimiento expreso para ello,
          y podrás retirarlo en cualquier momento.
        </p>
      </Section>

      <Section title="4. Base legal">
        <p>
          Tratamos tus datos porque son necesarios para responder a tu solicitud y para la preparación o ejecución de una
          relación comercial contigo, para cumplir obligaciones legales (como la atención del Libro de Reclamaciones) o
          porque nos has dado tu consentimiento al enviarnos tus datos.
        </p>
      </Section>

      <Section title="5. Con quién compartimos tus datos">
        <p>No vendemos ni alquilamos tus datos personales. Para operar, utilizamos proveedores que pueden tratarlos por encargo nuestro:</p>
        <ul>
          <li>
            <strong>WhatsApp (Meta Platforms):</strong> cuando eliges cotizar por WhatsApp, el mensaje se envía a través de
            esa plataforma.
          </li>
          <li>
            <strong>Google (Google Analytics):</strong> para estadísticas de uso del sitio.
          </li>
          <li>
            <strong>Proveedor de hosting y correo electrónico</strong> del sitio web.
          </li>
          <li>Empresas de transporte, solo con los datos necesarios para entregar tu pedido.</li>
        </ul>
        <p>
          Algunos de estos proveedores almacenan información en servidores ubicados fuera del Perú (por ejemplo, en
          Estados Unidos), lo que constituye un flujo transfronterizo de datos. Solo trabajamos con proveedores que
          ofrecen niveles adecuados de protección.
        </p>
        <p>También podremos entregar datos a autoridades públicas cuando una norma o un mandato legal lo exija.</p>
      </Section>

      <Section title="6. Plazo de conservación">
        <p>
          Conservamos los datos de cotizaciones mientras exista una relación comercial o sean útiles para atenderte, y
          los eliminamos cuando dejen de ser necesarios. Los datos del Libro de Reclamaciones se conservan por el plazo
          que exige la normativa de protección al consumidor. Los datos vinculados a facturación se conservan por los
          plazos que establecen las normas tributarias.
        </p>
      </Section>

      <Section title="7. Tus derechos">
        <p>Como titular de tus datos puedes ejercer en cualquier momento tus derechos de:</p>
        <ul>
          <li>
            <strong>Acceso e información:</strong> saber qué datos tuyos tratamos y cómo.
          </li>
          <li>
            <strong>Rectificación y actualización:</strong> corregir datos inexactos o incompletos.
          </li>
          <li>
            <strong>Cancelación o supresión:</strong> pedir que eliminemos tus datos cuando ya no sean necesarios.
          </li>
          <li>
            <strong>Oposición:</strong> oponerte a un tratamiento determinado, incluido el envío de publicidad.
          </li>
        </ul>
        <p>
          Para ejercerlos, escríbenos a{' '}
          <a className="text-red-300 underline underline-offset-2" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>{' '}
          indicando tu nombre completo, el derecho que deseas ejercer y una copia de tu documento de identidad. Te
          responderemos dentro de los plazos establecidos en la Ley N.º 29733 y su Reglamento.
        </p>
        <p>
          Si consideras que no hemos atendido tu solicitud correctamente, puedes presentar una reclamación ante la
          Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.
        </p>
      </Section>

      <Section title="8. Cookies">
        <p>
          Este sitio usa cookies de Google Analytics para obtener estadísticas anónimas de navegación. Puedes bloquear o
          eliminar las cookies desde la configuración de tu navegador sin que eso impida usar el sitio.
        </p>
      </Section>

      <Section title="9. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a pérdida, uso indebido o
          acceso no autorizado. El sitio funciona íntegramente bajo conexión cifrada (HTTPS).
        </p>
      </Section>

      <Section title="10. Cambios a esta política">
        <p>
          Podemos actualizar esta política para reflejar cambios legales o en nuestros servicios. Publicaremos siempre la
          versión vigente en esta página, con su fecha de actualización.
        </p>
        <p>
          Si tienes un reclamo sobre un producto o la atención recibida, usa nuestro{' '}
          <a className="text-red-300 underline underline-offset-2" href={LEGAL_LINKS.libro}>
            Libro de Reclamaciones
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
