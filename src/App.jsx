import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Mail,
  Phone,
  ShieldCheck,
  Globe2,
} from 'lucide-react';
import { BrandGrid } from './components/ui/brand-grid';
import { WhyUsTabs } from './components/ui/why-us-tabs';
import { HeroNBG } from './components/HeroNBG';
import { CurvedLines } from './components/CurvedLines';

const NAV_ITEMS = [
  { label: 'Marcas', href: '#marcas' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

const FEATURES = [
  'Importación directa desde fabricante',
  'Marcas reconocidas internacionalmente',
  'Asesoría técnica especializada',
  'Distribución a nivel nacional',
  'Garantía y respaldo en los productos',
];

const TICKER = [
  'CST Tires',
  'SHAM',
  'NBG',
  'Importación directa',
  'Repuestos de calidad',
  'Grupo NBG Import',
  'Cobertura nacional',
  'Asesoría técnica',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[0-9\s-]{7,20}$/;

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

  if (name === 'email') {
    if (!trimmed) {
      return 'Ingresa tu correo.';
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      return 'Correo no válido.';
    }
  }

  if (name === 'phone' && trimmed && !PHONE_PATTERN.test(trimmed)) {
    return 'Teléfono no válido.';
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

function Button({ asChild = false, className = '', variant = 'default', size = 'default', children, ...props }) {
  const variantClass =
    variant === 'outline'
      ? 'border border-red-900/30 bg-[#0a0000]/40 text-white hover:bg-[#1a0000]'
      : 'bg-red-600 text-white hover:bg-red-500';
  const sizeClass = size === 'lg' ? 'h-12 px-7 text-sm' : 'h-10 px-5 text-xs';
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-bold uppercase tracking-[0.22em] transition',
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
  return <div className={cn('rounded-2xl border border-red-900/30 bg-[#0a0000]/70', className)}>{children}</div>;
}

function CardContent({ className = '', children }) {
  return <div className={className}>{children}</div>;
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-2xl border border-[rgba(180,20,20,0.3)] bg-white/[0.05] px-4 text-white placeholder:text-white/35',
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
        'w-full rounded-2xl border border-[rgba(180,20,20,0.3)] bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/35',
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
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const redGlassCard = 'border-red-900/25 bg-[rgba(30,0,0,0.6)] backdrop-blur-md';
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
      email: true,
      phone: true,
      message: true,
    };

    const nextErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
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

    const subject = encodeURIComponent(`Consulta web de ${formData.name || 'cliente'}`);
    const body = encodeURIComponent(`Nombre: ${formData.name}\nCorreo: ${formData.email}\nTeléfono: ${formData.phone}\n\nMensaje:\n${formData.message}`);

    trackEvent('lead_form_submit', { source: 'contact_form', channel: 'mailto' });
    window.location.href = `mailto:marketing@nbg.pe?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a0000] text-white">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-900/30 bg-[#0a0000]/80 md:hidden"
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              className="border-t border-red-500/10 bg-[#0a0000]/95 px-4 pb-5 pt-4 backdrop-blur-xl md:hidden"
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
                        : 'border-red-900/30 text-white/80 hover:border-red-500/40 hover:text-red-400'
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
        <section
          className="relative border-y border-red-950/40 py-4"
          style={{ background: '#1a0000' }}
        >
          <div className="overflow-hidden whitespace-nowrap">
            <motion.div
              className="flex w-max gap-10 px-4"
              animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
              transition={reduceMotion ? undefined : { duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...TICKER, ...TICKER].map((item, index) => (
                <span key={`${item}-${index}`} className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-white/95">
                  <span className="text-white/40">◆</span>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <section
          id="marcas"
          className="relative overflow-hidden px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pb-10 lg:pt-28"
          style={{
            background: 'linear-gradient(180deg, #4A0000 0%, #2C1010 25%, #1a0000 60%, #0f0000 100%)',
          }}
        >
          <CurvedLines />
          <Reveal className="relative z-10 mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Nuestras marcas"
              title="Nuestras marcas"
              description="Grupo NBG Import reúne marcas especializadas para motociclistas, distribuidores y talleres de todo el Perú."
            />
          </Reveal>

          <div className="relative z-10 mx-auto mt-12 max-w-7xl">
            <BrandGrid
              reduceMotion={reduceMotion}
              onBrandClick={(brand, type) => trackEvent('brand_click', { brand, type })}
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
        <div
          aria-hidden="true"
          className="h-20"
          style={{ background: 'linear-gradient(to bottom, #1a0000, #1a0000)' }}
        />

        <WhyUsTabs
          reduceMotion={reduceMotion}
          onTabChange={(tab, source) => trackEvent('why_us_tab_change', { tab, source })}
          onCtaClick={(cta) => trackEvent('cta_click', { cta })}
        />
        <div
          aria-hidden="true"
          className="h-20"
          style={{ background: 'linear-gradient(to bottom, #1a0000, #1a0000)' }}
        />

        <section id="nosotros" className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="relative mx-auto w-full max-w-xl">
                <div className="rounded-[2rem] border border-red-900/30 bg-[#0a0000] p-8 shadow-2xl shadow-black/20">
                  <p className="text-center text-2xl font-black uppercase leading-tight text-white sm:text-4xl">
                    Importación
                    <br />
                    directa
                    <br />
                    de calidad
                  </p>
                </div>

                <motion.div
                  initial={{ y: 8 }}
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative ml-auto mt-4 w-fit rounded-[1.75rem] bg-red-600 px-8 py-7 text-center shadow-2xl shadow-red-950/30"
                >
                  <div className="text-4xl font-black text-white sm:text-6xl">100%</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-100/80">Importación garantizada</div>
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeader
                eyebrow="Quienes somos"
                title={
                  <>
                    Expertos en
                    <br />
                    importación
                  </>
                }
                description="Grupo NBG Import es una empresa especializada en importación y distribución de repuestos automotrices. Esta versión mejora la jerarquía visual, la lectura del contenido y la presentación comercial del sitio original."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: 'Respaldo',
                    text: 'Productos con enfoque en calidad, soporte y confianza comercial.',
                  },
                  {
                    icon: Globe2,
                    title: 'Cobertura',
                    text: 'Capacidad para atender oportunidades en distintos puntos del país.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="rounded-[1.75rem]">
                      <CardContent className="p-5">
                        <Icon className="h-7 w-7 text-red-400" />
                        <h3 className="mt-4 text-lg font-black uppercase text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-white/70">{item.text}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-3">
                {FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl border border-red-900/30 bg-[#0a0000]/60 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    <span className="text-sm leading-7 text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <div
          aria-hidden="true"
          className="h-20"
          style={{ background: 'linear-gradient(to bottom, #1a0000, #1a0000)' }}
        />

        <section
          id="contacto"
          className="relative border-t border-white/10"
          style={{ background: 'linear-gradient(180deg, #1a0000 0%, #3D0000 50%, #6B0000 100%)' }}
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
                description="Escríbenos y un asesor podrá ayudarte con marcas, repuestos, categorías o una consulta comercial más específica."
              />

              <div className="mt-8 grid gap-4">
                <Card className={cn('rounded-[1.75rem]', redGlassCard)}>
                  <CardContent className="flex items-start gap-4 p-5">
                    <MessageCircle className="mt-1 h-5 w-5 text-red-400" />
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
                    <Mail className="mt-1 h-5 w-5 text-red-400" />
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
                    <Phone className="mt-1 h-5 w-5 text-red-400" />
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
                    {submitted ? 'Abriendo tu correo con la consulta cargada.' : 'Completa tus datos y te ayudamos a cotizar rápido.'}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="sr-only">
                          Nombre completo
                        </label>
                        <Input
                          id="name"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Nombre completo"
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
                        <label htmlFor="email" className="sr-only">
                          Correo electrónico
                        </label>
                        <Input
                          id="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="email"
                          placeholder="Correo electrónico"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={errors.email ? 'border-red-500/70' : ''}
                        />
                        {errors.email && touched.email ? (
                          <p id="email-error" className="mt-2 text-xs text-red-300">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="sr-only">
                        Teléfono o WhatsApp
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="tel"
                        placeholder="Teléfono / WhatsApp"
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
                        placeholder="¿Qué repuestos, categorías o marcas necesitas?"
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
                        'h-12 w-full rounded-2xl text-sm tracking-[0.24em]',
                        submitted ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-red-600 hover:bg-red-500'
                      )}
                    >
                      {submitted ? 'Abrir correo' : 'Enviar consulta'}
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
          style={{ background: 'linear-gradient(to bottom, #6B0000, #3D0000)' }}
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
              className="w-full max-w-md rounded-[2rem] border border-red-900/30 bg-[#0a0000] p-7 shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-400">Próximamente</div>
              <h3 className="text-2xl font-black uppercase text-white">{pendingBrand}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">
                Esta sección todavía no está lista. Próximamente estará disponible su página oficial dentro del sitio.
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
        className="relative border-t border-white/10"
        style={{ background: 'linear-gradient(180deg, #1a0000 0%, #0D0000 50%, #050000 100%)' }}
      >
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 border-b border-red-900/30 pb-10 md:grid-cols-[1.1fr_0.9fr_1fr]">
            <div>
              <img
                src="/images/brand/nbg-logo-white.png"
                alt="Grupo NBG Import"
                className="h-24 w-auto object-contain"
              />
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
                Importación y distribución de repuestos automotrices con enfoque comercial, tiempos de respuesta rápidos y respaldo para cada línea.
              </p>
              <div className="mt-5 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Atención comercial activa
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-white/50">Navegación</h4>
              <ul className="mt-4 space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={`footer-${item.href}`}>
                    <a
                      href={item.href}
                      onClick={() => trackEvent('nav_click', { target: item.href, location: 'footer' })}
                      className="text-sm font-medium text-white/80 transition hover:text-red-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-white/50">Contacto directo</h4>
              <div className="mt-4 space-y-3">
                <a
                  href="https://wa.me/51956701218"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('contact_click', { channel: 'footer_whatsapp' })}
                  className="flex items-center gap-3 rounded-xl border border-red-900/30 bg-[#0a0000]/70 px-3 py-2.5 text-sm text-white/80 transition hover:border-red-500/40 hover:text-red-300"
                >
                  <MessageCircle className="h-4 w-4 text-red-400" />
                  <span>+51 956 701 218</span>
                </a>

                <a
                  href="mailto:marketing@nbg.pe"
                  onClick={() => trackEvent('contact_click', { channel: 'footer_email' })}
                  className="flex items-center gap-3 rounded-xl border border-red-900/30 bg-[#0a0000]/70 px-3 py-2.5 text-sm text-white/80 transition hover:border-red-500/40 hover:text-red-300"
                >
                  <Mail className="h-4 w-4 text-red-400" />
                  <span>marketing@nbg.pe</span>
                </a>

                <a
                  href="#contacto"
                  onClick={() => trackEvent('cta_click', { cta: 'footer_cotizar' })}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
                >
                  Cotizar ahora
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40">
              {currentYear} Grupo NBG Import. Todos los derechos reservados.
            </p>
            <a
              href="mailto:marketing@nbg.pe"
              onClick={() => trackEvent('contact_click', { channel: 'footer_email_legal' })}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 transition hover:text-red-400"
            >
              Soporte comercial: marketing@nbg.pe
            </a>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/51956701218"
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent('contact_click', { channel: 'floating_whatsapp' })}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/30 transition hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
