import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  MessageCircle,
  Mail,
  Phone,
} from 'lucide-react';
import { BrandGrid } from './components/ui/brand-grid';
import { WhyUsTabs } from './components/ui/why-us-tabs';
import { HeroNBG } from './components/HeroNBG';
import { CurvedLines } from './components/CurvedLines';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { BrandMarquee } from './components/BrandMarquee';
import { ComoFunciona } from './components/ComoFunciona';
import { Testimonios } from './components/Testimonios';
import { FAQ } from './components/FAQ';
import { SolucionesNegocios } from './components/SolucionesNegocios';
import { PortafolioComercial } from './components/PortafolioComercial';
import { PruebaComercial } from './components/PruebaComercial';

const NAV_ITEMS = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Contacto', href: '#contacto' },
];

const PHONE_PATTERN = /^[+]?[0-9\s-]{7,20}$/;
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

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, description, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className={cn('mb-4 flex items-center gap-3', center ? 'justify-center' : '')}>
        {!center && <span className="h-px w-10 bg-red-500" />}
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">{eyebrow}</span>
      </div>

      <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h2>

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
  const [pendingBrand, setPendingBrand] = useState(null);
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
    const sections = NAV_ITEMS
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { threshold: [0.3, 0.55], rootMargin: '-18% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setPendingBrand(null);
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
    <div className="min-h-screen overflow-x-hidden bg-[#0B0B0B] text-white">
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-[rgba(180,20,20,0.2)] bg-[rgba(10,0,0,0.85)] backdrop-blur-[12px]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex items-center" aria-label="Grupo NBG Import">
            <img
              src="/images/brand/nbg-logo-white.png"
              alt=""
              className="h-12 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => trackEvent('nav_click', { target: item.href, location: 'header_desktop' })}
                aria-current={activeSection === item.href ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition',
                  activeSection === item.href
                    ? 'bg-red-500/20 text-red-300'
                    : 'text-white/75 hover:text-red-400'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden rounded-full px-5 sm:inline-flex">
              <a href="#contacto" onClick={() => trackEvent('cta_click', { cta: 'cotizar_header' })}>
                Cotizar
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0B0B0B]/85 md:hidden"
              aria-label="Abrir menu"
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
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              id="mobile-nav"
              className="border-t border-red-500/10 bg-[#0B0B0B]/95 px-4 pb-5 pt-4 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-3">
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
                    Cotizar
                  </a>
                </Button>
              </div>
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
          className="nbg-ambient relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
          style={{
            background: 'linear-gradient(180deg, #111111 0%, #140909 52%, #0B0B0B 100%)',
          }}
        >
          <CurvedLines />
          <Reveal className="relative z-10 mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Marcas importadas"
              title="Marcas importadas para un portafolio más competitivo"
              description="Representamos y comercializamos líneas especializadas para negocios que buscan calidad, rotación y respaldo."
            />
          </Reveal>

          <div className="relative z-10 mx-auto mt-12 max-w-7xl">
            <BrandGrid
              reduceMotion={reduceMotion}
              onBrandClick={(brand, type) => trackEvent('brand_click', { brand, type })}
              onQuoteClick={handleBrandQuote}
              onPendingClick={setPendingBrand}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </section>
        <PortafolioComercial />

        <section className="nbg-ambient overflow-hidden bg-[#0B0B0B] px-4 py-14 sm:px-6 lg:px-8">
          <Reveal className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[1.75rem] border border-white/[0.12] bg-white/[0.06] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.32)] sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">Cotización comercial</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
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
        <PruebaComercial />
        <Testimonios />
        <FAQ />

        <section
          id="contacto"
          className="nbg-ambient relative overflow-hidden border-t border-white/10"
          style={{ background: 'linear-gradient(180deg, #0B0B0B 0%, #1A0B0B 55%, #120909 100%)' }}
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-28">
            <Reveal>
              <SectionHeader
                eyebrow="Contáctanos"
                title={
                  <>
                    ¿Listo para
                    <br />
                    cotizar?
                  </>
                }
                description="También puedes escribirnos directamente por WhatsApp para una atención más rápida."
              />

              <div className="mt-8 grid gap-4">
                <Card className={cn('rounded-[1.75rem]', redGlassCard)}>
                  <CardContent className="flex items-start gap-4 p-5">
                    <MessageCircle size={20} strokeWidth={1.5} className="mt-1 text-red-400" />
                    <div>
                      <div className="text-sm font-black uppercase tracking-[0.18em] text-white">WhatsApp</div>
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
                      <div className="text-sm font-black uppercase tracking-[0.18em] text-white">Correo</div>
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
                      <div className="text-sm font-black uppercase tracking-[0.18em] text-white">Teléfono</div>
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

            <Reveal delay={0.1}>
              <Card className={cn('rounded-[2rem] shadow-2xl shadow-black/20', redGlassCard)}>
                <CardContent className="p-6 sm:p-8">
                  <p className="mb-5 text-sm text-white/70" aria-live="polite">
                    {submitted ? 'Abriendo WhatsApp con tu cotización cargada.' : 'Completa tus datos y te ayudamos a cotizar rápido.'}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="sr-only">
                          Nombre y empresa
                        </label>
                        <Input
                          id="name"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Nombre y empresa"
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
                        <label htmlFor="phone" className="sr-only">
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
                          placeholder="Celular / WhatsApp"
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
                        <label htmlFor="businessType" className="sr-only">
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
                          <option className="bg-[#0B0B0B]" value="">
                            Tipo de negocio
                          </option>
                          <option className="bg-[#0B0B0B]" value="Taller">
                            Taller
                          </option>
                          <option className="bg-[#0B0B0B]" value="Tienda">
                            Tienda
                          </option>
                          <option className="bg-[#0B0B0B]" value="Distribuidor">
                            Distribuidor
                          </option>
                          <option className="bg-[#0B0B0B]" value="Empresa">
                            Empresa
                          </option>
                          <option className="bg-[#0B0B0B]" value="Otro">
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
                        <label htmlFor="productInterest" className="sr-only">
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
                          <option className="bg-[#0B0B0B]" value="">
                            Producto de interés
                          </option>
                          {['Llantas', 'Cámaras', 'Repuestos', 'Rodajes', 'Carburadores', 'Accesorios', 'CST Tires Peru', 'SAHM Parts', 'NBG Parts', 'Otra / No sé'].map((option) => (
                            <option key={option} className="bg-[#0B0B0B]" value={option}>
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
                      <label htmlFor="message" className="sr-only">
                        Detalle de consulta
                      </label>
                      <Textarea
                        id="message"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Cuéntanos qué producto, volumen o línea necesitas cotizar."
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
                  </form>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>
        <div
          aria-hidden="true"
          className="h-20"
          style={{ background: 'linear-gradient(to bottom, #120909, #080808)' }}
        />
      </main>

      <AnimatePresence>
        {pendingBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={() => setPendingBrand(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-[2rem] border border-white/[0.12] bg-[#0B0B0B] p-7 shadow-2xl shadow-black/35"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-400">Consultar disponibilidad</div>
              <h3 className="text-2xl font-black uppercase text-white">{pendingBrand}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">
                Esta sección todavía no está lista. Consulta disponibilidad con nuestro equipo comercial.
              </p>
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={() => setPendingBrand(null)} className="px-6">
                  Entendido
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer
        className="relative overflow-hidden border-t border-white/10"
        style={{ background: 'linear-gradient(180deg, #120909 0%, #0B0B0B 55%, #070707 100%)' }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="pointer-events-none absolute -right-28 top-10 h-72 w-72 rounded-full bg-[#E82127]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.85fr_1.2fr]">
            <div>
              <img
                src="/images/brand/nbg-logo-white.png"
                alt="Grupo NBG Import"
                className="h-20 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <p className="mt-4 max-w-md text-sm leading-7 text-[#B8B8B8]">
                Importación B2B de repuestos, llantas, cámaras y motopartes para talleres, tiendas, distribuidores y empresas del sector moto en Perú.
              </p>
              <div className="mt-5 grid max-w-md grid-cols-2 gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                {['Importación directa', 'Atención B2B', 'Despacho nacional', 'Portafolio moto'].map((item) => (
                  <span key={item} className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-2">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">Secciones</h4>
              <ul className="mt-5 grid gap-3">
                {NAV_ITEMS.map((item) => (
                  <li key={`footer-${item.href}`}>
                    <a
                      href={item.href}
                      onClick={() => trackEvent('nav_click', { target: item.href, location: 'footer' })}
                      className="inline-flex min-h-11 items-center text-sm font-medium text-[#B8B8B8] transition hover:text-red-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">Canal comercial</h4>
              <p className="mt-4 text-sm leading-7 text-[#B8B8B8]">
                Para una respuesta más rápida, envíanos tu requerimiento por WhatsApp y un asesor revisará disponibilidad y condiciones.
              </p>
              <div className="mt-5 grid gap-3">
                <a
                  href="https://wa.me/51956701218?text=Hola,%20quiero%20cotizar%20repuestos"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('contact_click', { channel: 'footer_whatsapp' })}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#E82127] px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:scale-[1.02] hover:bg-[#FF2A2A] hover:shadow-[0_8px_24px_rgba(220,38,38,0.35)] active:scale-[0.98]"
                >
                  <MessageCircle size={20} strokeWidth={1.5} className="text-white" />
                  <span>Cotizar por WhatsApp</span>
                </a>

                <div className="grid gap-2 rounded-2xl border border-white/12 bg-white/[0.06] p-4 text-sm text-[#B8B8B8]">
                  <a
                    href="tel:+51956701218"
                    onClick={() => trackEvent('contact_click', { channel: 'footer_phone' })}
                    className="inline-flex min-h-10 items-center gap-3 transition hover:text-red-300"
                  >
                    <Phone size={18} strokeWidth={1.5} className="text-red-400" />
                    <span>+51 956 701 218</span>
                  </a>
                  <a
                    href="mailto:marketing@nbg.pe"
                    onClick={() => trackEvent('contact_click', { channel: 'footer_email' })}
                    className="inline-flex min-h-10 items-center gap-3 transition hover:text-red-300"
                  >
                    <Mail size={18} strokeWidth={1.5} className="text-red-400" />
                    <span>marketing@nbg.pe</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 pb-16 text-center sm:flex-row sm:items-center sm:justify-between sm:pb-0 sm:text-left">
            <p className="text-xs uppercase tracking-[0.16em] text-white/50">
              {currentYear} Grupo NBG Import. Todos los derechos reservados.
            </p>
            <a
              href="mailto:marketing@nbg.pe"
              onClick={() => trackEvent('contact_click', { channel: 'footer_email_legal' })}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:text-red-400"
            >
              Soporte comercial: marketing@nbg.pe
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}
