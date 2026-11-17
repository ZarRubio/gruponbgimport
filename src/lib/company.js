// Datos legales y de contacto de la empresa. Fuente única para el footer,
// el Libro de Reclamaciones y la Política de privacidad.
export const COMPANY = {
  tradeName: 'Grupo NBG Import',
  legalName: 'NBG IMPORTACIONES S.R.L.',
  ruc: '20602017410',
  address: 'Av. Manco Cápac Nro. 115 Int. 225, La Victoria, Lima, Perú',
  addressShort: 'Av. Manco Cápac 115, Int. 225, La Victoria, Lima',
  hours: 'Lunes a viernes, de 9:00 a. m. a 6:00 p. m.',
  hoursShort: 'Lun – Vie · 9:00 a. m. – 6:00 p. m.',
  email: 'marketing@nbg.pe',
  phone: '+51 956 701 218',
  phoneHref: 'tel:+51956701218',
  whatsapp: '51956701218',
};

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61583968140347' },
  { name: 'Instagram', href: 'https://www.instagram.com/grupo.nbg/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/csttirespe/' },
];

export const LEGAL_LINKS = {
  libro: '/libro-de-reclamaciones/',
  privacidad: '/politica-de-privacidad/',
};

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
}
