import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  MessageCircle,
  Mail,
  Phone,
  ArrowUpRight,
  MapPin,
  Clock,
  BookOpen,
} from 'lucide-react';
import { COMPANY, LEGAL_LINKS, SOCIAL_LINKS } from './lib/company';

function SocialIcon({ name }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  const paths = {
    Facebook:
      'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z',
    LinkedIn:
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  };
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
import { BrandGrid } from './components/ui/brand-grid';
import { WhyUsTabs } from './components/ui/why-us-tabs';
import { HeroNBG } from './components/HeroNBG';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { CursorGlow } from './components/CursorGlow';
import { AmbientBackground } from './components/AmbientBackground';
import { BrandMarquee } from './components/BrandMarquee';
import { ComoFunciona } from './components/ComoFunciona';
import { Testimonios } from './components/Testimonios';
import { FAQ } from './components/FAQ';
import { SolucionesNegocios } from './components/SolucionesNegocios';
import { PortafolioComercial } from './components/PortafolioComercial';

const NAV_ITEMS = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Preguntas', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

const FOOTER_BRANDS = [
  { name: 'CST Tires Perú', href: 'https://csttires.pe', external: true },
  { name: 'SAHM Parts', href: 'https://sahmparts.com', external: true },
  { name: 'NBG Parts', href: '/nbg-parts/', external: false },
];

const PHONE_PATTERN =/^[+]?[0-9\s-]{7,20}$/;
const WHATSAPP_PHONE = '51956701218';

function validateField(name, value) {
  const trimmed = value.trim();

  if (name === 'name') {
    if (!trimmed) {
      return 'Ingresa tu nombre.';
    }
    if (trimmed.length < 3) {
      return 'Usa al menos 3 caracteres.';
    }
  }

  if (name === 'phone') {
    if (!trimmed) {
      return 'Ingresa tu celular o WhatsApp.';
    }
    if (!PHONE_PATTERN.test(trimmed)) {
      return 'Teléfono no válido.';
    }
  }

  if (name === 'businessType' && !trimmed) {
    return 'Selecciona el tipo de negocio.';
  }

  if (name === 'productInterest' && !trimmed) {
    return 'Selecciona un producto de interés.';
  }

  if (name === 'message' && trimmed && trimmed.length < 10) {
    return 'Describe un poco más tu consulta.';
  }

  return '';
}

function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function buildWhatsAppQuoteUrl(formData) {
  const message = [
    'Hola, quiero cotizar con Grupo NBG Import.',
    '',
    `Nombre y empresa: ${formData.name}`,
    `Celular / WhatsApp: ${formData.phone}`,
    `Tipo de negocio: ${formData.businessType}`,
    `Producto de interés: ${formData.productInterest}`,
    '',
    `Mensaje: ${formData.message}`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function Button({ asChild = false, className = '', variant = 'default', size = 'default', children, ...props }) {
  const variantClass =
    variant === 'outline'
      ? 'border border-white/20 bg-transparent text-white hover:bg-white/[0.06]'
      : 'bg-[#E82127] text-white hover:bg-[#FF2A2A]';
  const sizeClass = size === 'lg' ? 'h-12 px-7 text-sm' : 'h-10 px-5 text-xs';
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-bold uppercase tracking-[0.22em] transition-all duration-200 hover:-translate-y-px active:scale-[0.98]',
    variant === 'outline'
      ? 'hover:border-red-600/50 hover:bg-red-900/20'
      : 'hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(220,38,38,0.45)]',
    variantClass,
    sizeClass,
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: cn(classes, children.props.className),
    });
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

function Card({ className = '', children }) {
  return <div className={cn('rounded-2xl border border-white/[0.12] bg-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.32)]', className)}>{children}</div>;
}

function CardContent({ className = '', children }) {
  return <div className={className}>{children}</div>;
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-2xl border border-[rgba(180,20,20,0.3)] bg-white/[0.07] px-4 text-white placeholder:text-white/40',
        'focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20',
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={cn(
        'w-full rounded-2xl border border-[rgba(180,20,20,0.3)] bg-white/[0.07] px-4 py-3 text-white placeholder:text-white/40',
        'focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20',
        className
      )}
      {...props}
    />
  );
}

// Antes animaba cada sección al entrar en pantalla; ahora es un contenedor simple.
function Reveal({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function SectionHeader({ title, description, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h2>

      {description ? (
        <p className={cn('mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base', center ? 'mx-auto' : '')}>{description}</p>
      ) : null}
    </div>
  );
}

export default function App() {
  const currentYear = new Date().getFullYear();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    productInterest: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const redGlassCard = 'border-white/[0.12] bg-white/[0.06] backdrop-blur-md';
  const scrollMilestonesRef = useRef({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => setReduceMotion(media.matches);
    applyMotionPreference();

    media.addEventListener('change', applyMotionPreference);
    return () => media.removeEventListener('change', applyMotionPreference);
  }, []);

  useEffect(() => {
    // Se observa también #inicio para que, al volver arriba, ningún ítem del menú quede marcado.
    const sections = ['#inicio', ...NAV_ITEMS.map((item) => item.href)]
      .map((href) => document.querySelector(href))
      .filter(Boolean);

    // La raíz es una línea de 1% de alto al 40% del viewport: la sección que la cruza es la activa.
    // (Usar intersectionRatio no sirve: en secciones altas nunca llega al umbral.)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { threshold: 0, rootMargin: '-40% 0px -59% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScrollDepth = () => {
      const viewport = window.innerHeight;
      const fullHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const denominator = Math.max(fullHeight - viewport, 1);
      const progress = Math.round((window.scrollY / denominator) * 100);

      [25, 50, 75, 100].forEach((mark) => {
        if (progress >= mark && !scrollMilestonesRef.current[mark]) {
          trackEvent('scroll_depth', { depth_percent: mark });
          scrollMilestonesRef.current[mark] = true;
        }
      });
    };

    window.addEventListener('scroll', onScrollDepth, { passive: true });
    onScrollDepth();
    return () => window.removeEventListener('scroll', onScrollDepth);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextTouched = {
      name: true,
      phone: true,
      businessType: true,
      productInterest: true,
      message: true,
    };

    const nextErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      businessType: validateField('businessType', formData.businessType),
      productInterest: validateField('productInterest', formData.productInterest),
      message: validateField('message', formData.message),
    };

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      trackEvent('lead_form_error', {
        fields_with_error: Object.entries(nextErrors)
          .filter(([, value]) => value)
          .map(([field]) => field)
          .join(','),
      });
      return;
    }

    trackEvent('lead_form_submit', { source: 'contact_form', channel: 'whatsapp' });
    window.open(buildWhatsAppQuoteUrl(formData), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleBrandQuote = (brand) => {
    setFormData((prev) => ({ ...prev, productInterest: brand }));
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      <AmbientBackground />
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled || mobileOpen
            ? 'border-b border-[rgba(180,20,20,0.2)] bg-[rgba(10,0,0,0.88)] backdrop-blur-[12px]'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-[padding] duration-300 sm:px-6 lg:px-8',
            scrolled ? 'py-2.5' : 'py-4'
          )}
        >
          <a href="#inicio" className="flex shrink-0 items-center" aria-label="Grupo NBG Import - Inicio">
            <img
              src="/images/brand/nbg-logo-white.png"
              alt=""
              className={cn('w-auto object-contain transition-[height] duration-300', scrolled ? 'h-10' : 'h-12')}
              loading="eager"
              decoding="async"
            />
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => trackEvent('nav_click', { target: item.href, location: 'header_desktop' })}
                  aria-current={active ? 'location' : undefined}
                  className={cn(
                    'relative px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors',
                    "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-[#E82127] after:transition-transform after:duration-300 after:content-['']",
                    active ? 'text-white after:scale-x-100' : 'text-white/70 after:scale-x-0 hover:text-white hover:after:scale-x-100'
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={COMPANY.phoneHref}
              onClick={() => trackEvent('contact_click', { channel: 'header_phone' })}
              className="hidden items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white xl:inline-flex"
            >
              <Phone size={16} strokeWidth={1.75} className="text-red-400" aria-hidden="true" />
              {COMPANY.phone}
            </a>

            <Button asChild className="hidden whitespace-nowrap rounded-full px-5 sm:inline-flex">
              <a href="#contacto" onClick={() => trackEvent('cta_click', { cta: 'cotizar_header' })}>
                <span className="lg:hidden xl:inline">Solicitar cotización</span>
                <span className="hidden lg:inline xl:hidden">Cotizar</span>
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#101010]/85 transition hover:border-red-400/60 lg:hidden"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              id="mobile-nav"
              className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-red-500/10 bg-[#101010]/95 px-4 pb-5 pt-4 backdrop-blur-xl lg:hidden"
            >
              <nav aria-label="Navegación móvil" className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      trackEvent('nav_click', { target: item.href, location: 'header_mobile' });
                      setMobileOpen(false);
                    }}
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition',
                      activeSection === item.href
                        ? 'border-red-500/40 bg-red-500/10 text-red-300'
                        : 'border-white/10 text-white/80 hover:border-red-500/40 hover:text-red-400'
                    )}
                  >
                    {item.label}
                  </a>
                ))}
                <Button asChild className="mt-2 rounded-2xl">
                  <a
                    href="#contacto"
                    onClick={() => {
                      trackEvent('cta_click', { cta: 'cotizar_mobile' });
                      setMobileOpen(false);
                    }}
                  >
                    Solicitar cotización
                  </a>
                </Button>
                <div className="mt-2 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
                  <a
                    href={COMPANY.phoneHref}
                    onClick={() => trackEvent('contact_click', { channel: 'menu_phone' })}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 font-semibold text-white/80"
                  >
                    <Phone size={16} strokeWidth={1.75} className="text-red-400" aria-hidden="true" />
                    Llamar
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}?text=Hola,%20quiero%20cotizar%20repuestos`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('contact_click', { channel: 'menu_whatsapp' })}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 font-semibold text-white/80"
                  >
                    <MessageCircle size={16} strokeWidth={1.75} className="text-[#25D366]" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
                <p className="text-center text-xs text-white/50">{COMPANY.hoursShort}</p>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <HeroNBG onAction={(cta) => trackEvent('cta_click', { cta })} />
        <BrandMarquee />
        <SolucionesNegocios />

        <section
          id="marcas"
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <Reveal className="relative z-10 mx-auto max-w-7xl">
            <SectionHeader
              title="Marcas importadas para un portafolio más competitivo"
              description="Representamos y comercializamos líneas especializadas para negocios que buscan calidad, rotación y respaldo."
            />
          </Reveal>

          <div className="relative z-10 mx-auto mt-12 max-w-7xl">
            <BrandGrid
              reduceMotion={reduceMotion}
              onBrandClick={(brand, type) => trackEvent('brand_click', { brand, type })}
              onQuoteClick={handleBrandQuote}
            />
          </div>
        </section>
        <PortafolioComercial />

        <section className="overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
          <Reveal className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[1.75rem] border border-white/[0.12] bg-white/[0.06] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.32)] sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                ¿Buscas abastecer tu taller, tienda o distribuidora?
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#B8B8B8]">
                Cuéntanos qué línea necesitas y un asesor te orienta con disponibilidad, marcas y condiciones comerciales.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button asChild size="lg" className="bg-[#E82127] hover:bg-[#FF2A2A]">
                <a
                  href="https://wa.me/51956701218?text=Hola,%20quiero%20cotizar%20repuestos"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('cta_click', { cta: 'cta_intermedio_whatsapp' })}
                >
                  Cotizar por WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contacto" onClick={() => trackEvent('cta_click', { cta: 'cta_intermedio_formulario' })}>
                  Formulario
                </a>
              </Button>
            </div>
          </Reveal>
        </section>

        <WhyUsTabs
          reduceMotion={reduceMotion}
          onTabChange={(tab, source) => trackEvent('why_us_tab_change', { tab, source })}
          onCtaClick={(cta) => trackEvent('cta_click', { cta })}
        />

        <ComoFunciona />
        <Testimonios />
        <FAQ />

        <section
          id="contacto"
          className="relative overflow-hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-28">
            <Reveal>
              <SectionHeader
                title="¿Listo para cotizar?"
                description="También puedes escribirnos directamente por WhatsApp para una atención más rápida."
              />

              <div className="mt-8 grid gap-4">
                <Card className={cn('rounded-[1.75rem]', redGlassCard)}>
                  <CardContent className="flex items-start gap-4 p-5">
                    <MessageCircle size={20} strokeWidth={1.5} className="mt-1 text-red-400" />
                    <div>
                      <div className="text-sm font-bold text-white">WhatsApp</div>
                      <a
                        href="https://wa.me/51956701218"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent('contact_click', { channel: 'whatsapp_card' })}
                        className="mt-1 inline-block text-sm text-white/70 transition hover:text-red-400"
                      >
                        +51 956 701 218
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className={cn('rounded-[1.75rem]', redGlassCard)}>
                  <CardContent className="flex items-start gap-4 p-5">
                    <Mail size={20} strokeWidth={1.5} className="mt-1 text-red-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Correo</div>
                      <a
                        href="mailto:marketing@nbg.pe"
                        onClick={() => trackEvent('contact_click', { channel: 'email_card' })}
                        className="mt-1 inline-block text-sm text-white/70 transition hover:text-red-400"
                      >
                        marketing@nbg.pe
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className={cn('rounded-[1.75rem]', redGlassCard)}>
                  <CardContent className="flex items-start gap-4 p-5">
                    <Phone size={20} strokeWidth={1.5} className="mt-1 text-red-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Teléfono</div>
                      <a
                        href="tel:+51956701218"
                        onClick={() => trackEvent('contact_click', { channel: 'phone_card' })}
                        className="mt-1 inline-block text-sm text-white/70 transition hover:text-red-400"
                      >
                        +51 956 701 218
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Reveal>

            <Reveal>
              <Card className={cn('rounded-[2rem] shadow-2xl shadow-black/20', redGlassCard)}>
                <CardContent className="p-6 sm:p-8">
                  <p className="mb-5 text-sm text-white/70" aria-live="polite">
                    {submitted ? 'Abriendo WhatsApp con tu cotización cargada.' : 'Completa tus datos y te ayudamos a cotizar rápido.'}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white/85">
                          Nombre y empresa
                        </label>
                        <Input
                          id="name"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Ej.: Juan Pérez, Taller Moto Sur"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={errors.name ? 'border-red-500/70' : ''}
                        />
                        {errors.name && touched.name ? (
                          <p id="name-error" className="mt-2 text-xs text-red-300">
                            {errors.name}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-white/85">
                          Celular o WhatsApp
                        </label>
                        <Input
                          id="phone"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="tel"
                          placeholder="Ej.: 987 654 321"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          className={errors.phone ? 'border-red-500/70' : ''}
                        />
                        {errors.phone && touched.phone ? (
                          <p id="phone-error" className="mt-2 text-xs text-red-300">
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="businessType" className="mb-2 block text-sm font-semibold text-white/85">
                          Tipo de negocio
                        </label>
                        <select
                          id="businessType"
                          required
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={Boolean(errors.businessType)}
                          aria-describedby={errors.businessType ? 'businessType-error' : undefined}
                          className={cn(
                            'h-12 w-full rounded-2xl border border-[rgba(180,20,20,0.3)] bg-white/[0.07] px-4 text-white focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20',
                            errors.businessType ? 'border-red-500/70' : ''
                          )}
                        >
                          <option className="bg-[#101010]" value="">
                            Selecciona una opción
                          </option>
                          <option className="bg-[#101010]" value="Taller">
                            Taller
                          </option>
                          <option className="bg-[#101010]" value="Tienda">
                            Tienda
                          </option>
                          <option className="bg-[#101010]" value="Distribuidor">
                            Distribuidor
                          </option>
                          <option className="bg-[#101010]" value="Empresa">
                            Empresa
                          </option>
                          <option className="bg-[#101010]" value="Otro">
                            Otro
                          </option>
                        </select>
                        {errors.businessType && touched.businessType ? (
                          <p id="businessType-error" className="mt-2 text-xs text-red-300">
                            {errors.businessType}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="productInterest" className="mb-2 block text-sm font-semibold text-white/85">
                          Producto de interés
                        </label>
                        <select
                          id="productInterest"
                          required
                          name="productInterest"
                          value={formData.productInterest}
                        onChange={handleChange}
                        onBlur={handleBlur}
                          aria-invalid={Boolean(errors.productInterest)}
                          aria-describedby={errors.productInterest ? 'productInterest-error' : undefined}
                          className={cn(
                            'h-12 w-full rounded-2xl border border-[rgba(180,20,20,0.3)] bg-white/[0.07] px-4 text-white focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20',
                            errors.productInterest ? 'border-red-500/70' : ''
                          )}
                        >
                          <option className="bg-[#101010]" value="">
                            Selecciona una opción
                          </option>
                          {['Llantas para vehículos menores', 'Cámaras', 'Rodajes', 'Carburadores', 'CST Tires Perú', 'SAHM Parts', 'NBG Parts', 'Otra / No sé'].map((option) => (
                            <option key={option} className="bg-[#101010]" value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.productInterest && touched.productInterest ? (
                          <p id="productInterest-error" className="mt-2 text-xs text-red-300">
                            {errors.productInterest}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white/85">
                        ¿Qué necesitas cotizar?
                      </label>
                      <Textarea
                        id="message"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Producto, medida, marca de moto y cantidad aproximada."
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={errors.message ? 'border-red-500/70' : ''}
                      />
                      {errors.message && touched.message ? (
                        <p id="message-error" className="mt-2 text-xs text-red-300">
                          {errors.message}
                        </p>
                      ) : null}
                    </div>

                    <Button
                      type="submit"
                      className={cn(
                        'h-12 w-full rounded-2xl text-sm tracking-[0.18em]',
                        submitted ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-[#E82127] hover:bg-[#FF2A2A]'
                      )}
                    >
                      {submitted ? 'Abrir WhatsApp' : 'Enviar cotización'}
                    </Button>
                    <p className="text-center text-xs leading-5 text-white/55">
                      Al enviar, aceptas que usemos tus datos para responder tu cotización, según nuestra{' '}
                      <a href={LEGAL_LINKS.privacidad} className="underline underline-offset-2 hover:text-red-300">
                        Política de privacidad
                      </a>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pb-8 lg:px-8 lg:pt-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.2fr] lg:gap-x-10">
            <div className="col-span-2 lg:col-span-1">
              <img
                src="/images/brand/nbg-logo-white.png"
                alt="Grupo NBG Import"
                className="h-16 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
                Importador B2B de llantas para motos y vehículos menores, cámaras, rodajes y carburadores para talleres,
                tiendas y distribuidores en todo el Perú.
              </p>
              <ul className="-ml-3 mt-5 flex gap-1" aria-label="Redes sociales">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${COMPANY.tradeName} en ${social.name}`}
                      onClick={() => trackEvent('social_click', { network: social.name.toLowerCase(), location: 'footer' })}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white"
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Secciones del sitio">
              <h2 className="font-sans text-sm font-semibold normal-case text-white">Navegación</h2>
              <ul className="mt-3">
                {NAV_ITEMS.map((item) => (
                  <li key={`footer-${item.href}`}>
                    <a
                      href={item.href}
                      onClick={() => trackEvent('nav_click', { target: item.href, location: 'footer' })}
                      className="inline-flex min-h-10 items-center text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-sans text-sm font-semibold normal-case text-white">Marcas</h2>
              <ul className="mt-3">
                {FOOTER_BRANDS.map((brand) => (
                  <li key={`footer-brand-${brand.name}`}>
                    <a
                      href={brand.href}
                      {...(brand.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={() => trackEvent('brand_click', { brand: brand.name, type: 'footer' })}
                      className="inline-flex min-h-10 items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {brand.name}
                      {brand.external && <ArrowUpRight size={14} strokeWidth={1.75} aria-label="(abre en otra pestaña)" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <h2 className="font-sans text-sm font-semibold normal-case text-white">Contacto</h2>
              <ul className="mt-3 space-y-1 text-sm text-white/60">
                <li>
                  <a
                    href={COMPANY.phoneHref}
                    onClick={() => trackEvent('contact_click', { channel: 'footer_phone' })}
                    className="inline-flex min-h-10 items-center gap-3 transition-colors hover:text-white"
                  >
                    <Phone size={16} strokeWidth={1.75} className="shrink-0 text-[#E82127]" aria-hidden="true" />
                    {COMPANY.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    onClick={() => trackEvent('contact_click', { channel: 'footer_email' })}
                    className="inline-flex min-h-10 items-center gap-3 transition-colors hover:text-white"
                  >
                    <Mail size={16} strokeWidth={1.75} className="shrink-0 text-[#E82127]" aria-hidden="true" />
                    {COMPANY.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 py-2.5">
                  <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[#E82127]" aria-hidden="true" />
                  <span>{COMPANY.addressShort}</span>
                </li>
                <li className="flex items-start gap-3 py-2.5">
                  <Clock size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[#E82127]" aria-hidden="true" />
                  <span>{COMPANY.hours}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:pr-20 md:flex-row md:items-center md:justify-between">
            <p>
              © {currentYear} {COMPANY.legalName} — RUC {COMPANY.ruc}
            </p>
            <nav aria-label="Enlaces legales" className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={LEGAL_LINKS.libro}
                onClick={() => trackEvent('legal_click', { target: 'libro_reclamaciones' })}
                className="inline-flex min-h-10 items-center gap-2 font-semibold text-white/75 transition-colors hover:text-white"
              >
                <BookOpen size={16} strokeWidth={1.75} className="text-[#E82127]" aria-hidden="true" />
                Libro de Reclamaciones
              </a>
              <a
                href={LEGAL_LINKS.privacidad}
                onClick={() => trackEvent('legal_click', { target: 'politica_privacidad' })}
                className="inline-flex min-h-10 items-center transition-colors hover:text-white"
              >
                Política de privacidad
              </a>
            </nav>
          </div>
        </div>
      </footer>

      <WhatsAppFloat onAction={(cta) => trackEvent('cta_click', { cta })} />
      <CursorGlow />
    </div>
  );
}
