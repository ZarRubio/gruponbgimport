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
  PackageSearch,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Marcas', href: '#marcas' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

const BRANDS = [
  {
    id: '01',
    name: 'CST Tires',
    tag: 'Neumaticos',
    href: 'https://csttires.pe/',
    accent: 'from-orange-500 via-red-600 to-zinc-900',
    kicker: 'CST',
    description: 'Neumaticos y lineas especializadas con presencia internacional.',
  },
  {
    id: '02',
    name: 'SHAM',
    tag: 'Repuestos',
    accent: 'from-slate-500 via-slate-700 to-slate-950',
    kicker: 'SHAM',
    description: 'Repuestos y componentes para distintas necesidades del mercado.',
  },
  {
    id: '03',
    name: 'NBG',
    tag: 'Marca propia',
    accent: 'from-amber-500 via-orange-600 to-zinc-950',
    kicker: 'NBG',
    description: 'Linea propia con proyeccion comercial y crecimiento progresivo.',
  },
];

const FEATURES = [
  'Importacion directa desde fabricante',
  'Marcas reconocidas internacionalmente',
  'Asesoria tecnica especializada',
  'Distribucion a nivel nacional',
  'Garantia y respaldo en los productos',
];

const TICKER = [
  'CST Tires',
  'SHAM',
  'NBG',
  'Importacion directa',
  'Repuestos de calidad',
  'Grupo NBG Import',
  'Cobertura nacional',
  'Asesoria tecnica',
];

const STATS = [
  { value: '3+', label: 'Marcas lideres' },
  { value: '100%', label: 'Importacion directa' },
  { value: 'Peru', label: 'Cobertura comercial' },
];

const CONTACT_PILLS = [
  { label: 'Respuesta rapida', value: '< 1h habil' },
  { label: 'Canal principal', value: 'WhatsApp' },
  { label: 'Atencion', value: 'Lun - Sab' },
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
      return 'Correo no valido.';
    }
  }

  if (name === 'phone' && trimmed && !PHONE_PATTERN.test(trimmed)) {
    return 'Telefono no valido.';
  }

  if (name === 'message' && trimmed && trimmed.length < 10) {
    return 'Describe un poco mas tu consulta.';
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
      ? 'border border-slate-700 bg-slate-900/40 text-slate-100 hover:bg-slate-800'
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
  return <div className={cn('rounded-2xl border border-slate-800 bg-slate-900/70', className)}>{children}</div>;
}

function CardContent({ className = '', children }) {
  return <div className={className}>{children}</div>;
}

function Input({ className = '', ...props }) {
  return <input className={cn('h-12 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 text-slate-100 placeholder:text-slate-500', className)} {...props} />;
}

function Textarea({ className = '', ...props }) {
  return <textarea className={cn('w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500', className)} {...props} />;
}

function Badge({ className = '', children }) {
  return <span className={cn('inline-flex items-center rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.28em]', className)}>{children}</span>;
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
        <p className={cn('mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base', center ? 'mx-auto' : '')}>{description}</p>
      ) : null}
    </div>
  );
}

function BrandCard({ brand, delay, onPendingClick }) {
  const content = (
    <div className="group">
      <div className="overflow-hidden rounded-md border border-slate-700 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-red-500/40">
        <div className={cn('relative aspect-[3/4] overflow-hidden bg-gradient-to-br', brand.accent)}>
          <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/10" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
            <div className="rounded-sm bg-red-600 px-3 py-1 text-sm font-black uppercase tracking-[0.18em] text-white shadow-md">{brand.kicker}</div>
            <div className="rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">{brand.tag}</div>
          </div>
        </div>
      </div>

      <div className="px-1 pt-3 text-center">
        <h3 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl">{brand.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{brand.description}</p>
      </div>
    </div>
  );

  return (
    <Reveal delay={delay}>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        {brand.href ? (
          <a
            href={brand.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ir a ${brand.name}`}
            className="block h-full"
            onClick={() => trackEvent('brand_click', { brand: brand.name, type: 'external' })}
          >
            {content}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => {
              trackEvent('brand_click', { brand: brand.name, type: 'pending' });
              onPendingClick?.(brand.name);
            }}
            aria-label={`Ver disponibilidad de ${brand.name}`}
            className="block h-full w-full text-left"
          >
            {content}
          </button>
        )}
      </motion.div>
    </Reveal>
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
    const body = encodeURIComponent(`Nombre: ${formData.name}\nCorreo: ${formData.email}\nTelefono: ${formData.phone}\n\nMensaje:\n${formData.message}`);

    trackEvent('lead_form_submit', { source: 'contact_form', channel: 'mailto' });
    window.location.href = `mailto:marketing@nbg.pe?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.08),transparent_24%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:56px_56px]" />

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'border-b border-red-500/15 bg-slate-950/85 backdrop-blur-xl' : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="text-xl font-black uppercase tracking-[0.25em] sm:text-2xl">
            Grupo <span className="text-red-500">NBG</span> Import
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
                    : 'text-slate-300 hover:text-red-400'
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 md:hidden"
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
              className="border-t border-red-500/10 bg-slate-950/95 px-4 pb-5 pt-4 backdrop-blur-xl md:hidden"
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
                        : 'border-slate-800 text-slate-200 hover:border-red-500/40 hover:text-red-400'
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
        <section id="inicio" className="relative">
          <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pt-36">
            <Reveal>
              <div>
                <Badge className="mb-5 border border-red-500/20 bg-red-500/10 text-red-300">Importacion de repuestos</Badge>

                <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-[7rem]">
                  <span className="text-red-500">Grupo</span>
                  <br />
                  <span className="text-white">NBG</span>
                  <br />
                  <span className="text-transparent [-webkit-text-stroke:1px_rgb(226_232_240)]">Import</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                  Distribuimos marcas lideres en repuestos y accesorios de importacion para el sector automotriz peruano, con enfoque en calidad, respaldo y atencion comercial agil.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {CONTACT_PILLS.map((pill) => (
                    <span key={pill.label} className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                      {pill.label}: <span className="text-red-300">{pill.value}</span>
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <a href="#marcas" onClick={() => trackEvent('cta_click', { cta: 'hero_ver_marcas' })}>
                      Ver marcas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <Button asChild size="lg" variant="outline">
                    <a href="#contacto" onClick={() => trackEvent('cta_click', { cta: 'hero_contactarnos' })}>
                      Contactarnos
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-4">
                <Card className="overflow-hidden rounded-[2rem] border-red-500/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-2xl shadow-red-950/20">
                  <CardContent className="p-6 sm:p-7">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">Respaldo comercial</p>
                        <h3 className="mt-2 text-2xl font-black uppercase text-white sm:text-3xl">Importacion confiable</h3>
                      </div>
                      <ShieldCheck className="h-9 w-9 text-red-400" />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {STATS.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                          <div className="text-2xl font-black text-red-400">{item.value}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="rounded-[2rem]">
                    <CardContent className="p-6">
                      <PackageSearch className="h-8 w-8 text-red-400" />
                      <h4 className="mt-4 text-xl font-black uppercase text-white">Catalogo multimarca</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Una propuesta mas clara y ordenada para mostrar lineas, categorias y beneficios de cada marca.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-[2rem]">
                    <CardContent className="p-6">
                      <Globe2 className="h-8 w-8 text-red-400" />
                      <h4 className="mt-4 text-xl font-black uppercase text-white">Presencia comercial</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Diseno preparado para una presentacion mas moderna, profesional y adaptable a desktop y movil.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-red-500/10 bg-red-600 py-4">
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

        <section id="marcas" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Nuestras marcas"
              title={
                <>
                  Marcas que
                  <br />
                  importamos
                </>
              }
              description="Explora nuestras marcas principales en un formato visual mas limpio, directo y comercial."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {BRANDS.map((brand, index) => (
              <BrandCard key={brand.id} brand={brand} delay={index * 0.08} onPendingClick={setPendingBrand} />
            ))}
          </div>
        </section>

        <section id="nosotros" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="relative mx-auto w-full max-w-xl">
                <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20">
                  <p className="text-center text-2xl font-black uppercase leading-tight text-white sm:text-4xl">
                    Importacion
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
                  className="absolute -bottom-6 -right-2 rounded-[1.75rem] bg-red-600 px-8 py-7 text-center shadow-2xl shadow-red-950/30 sm:-right-6"
                >
                  <div className="text-4xl font-black text-white sm:text-6xl">100%</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-100/80">Importacion garantizada</div>
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
                    importacion
                  </>
                }
                description="Grupo NBG Import es una empresa especializada en importacion y distribucion de repuestos automotrices. Esta version mejora la jerarquia visual, la lectura del contenido y la presentacion comercial del sitio original."
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
                    text: 'Capacidad para atender oportunidades en distintos puntos del pais.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="rounded-[1.75rem]">
                      <CardContent className="p-5">
                        <Icon className="h-7 w-7 text-red-400" />
                        <h3 className="mt-4 text-lg font-black uppercase text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-3">
                {FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    <span className="text-sm leading-7 text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contacto" className="border-t border-red-500/10 bg-slate-900/50">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-28">
            <Reveal>
              <SectionHeader
                eyebrow="Contactanos"
                title={
                  <>
                    Listo para
                    <br />
                    cotizar?
                  </>
                }
                description="Escribenos y un asesor podra ayudarte con marcas, repuestos, categorias o una consulta comercial mas especifica."
              />

              <div className="mt-8 grid gap-4">
                <Card className="rounded-[1.75rem] bg-slate-950/80">
                  <CardContent className="flex items-start gap-4 p-5">
                    <MessageCircle className="mt-1 h-5 w-5 text-red-400" />
                    <div>
                      <div className="text-sm font-black uppercase tracking-[0.18em] text-white">WhatsApp</div>
                      <a
                        href="https://wa.me/51956701218"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent('contact_click', { channel: 'whatsapp_card' })}
                        className="mt-1 inline-block text-sm text-slate-300 transition hover:text-red-400"
                      >
                        +51 956 701 218
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[1.75rem] bg-slate-950/80">
                  <CardContent className="flex items-start gap-4 p-5">
                    <Mail className="mt-1 h-5 w-5 text-red-400" />
                    <div>
                      <div className="text-sm font-black uppercase tracking-[0.18em] text-white">Correo</div>
                      <a
                        href="mailto:marketing@nbg.pe"
                        onClick={() => trackEvent('contact_click', { channel: 'email_card' })}
                        className="mt-1 inline-block text-sm text-slate-300 transition hover:text-red-400"
                      >
                        marketing@nbg.pe
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[1.75rem] bg-slate-950/80">
                  <CardContent className="flex items-start gap-4 p-5">
                    <Phone className="mt-1 h-5 w-5 text-red-400" />
                    <div>
                      <div className="text-sm font-black uppercase tracking-[0.18em] text-white">Telefono</div>
                      <a
                        href="tel:+51956701218"
                        onClick={() => trackEvent('contact_click', { channel: 'phone_card' })}
                        className="mt-1 inline-block text-sm text-slate-300 transition hover:text-red-400"
                      >
                        +51 956 701 218
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="rounded-[2rem] bg-slate-950/80 shadow-2xl shadow-black/20">
                <CardContent className="p-6 sm:p-8">
                  <p className="mb-5 text-sm text-slate-300" aria-live="polite">
                    {submitted ? 'Abriendo tu correo con la consulta cargada.' : 'Completa tus datos y te ayudamos a cotizar rapido.'}
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
                          Correo electronico
                        </label>
                        <Input
                          id="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="email"
                          placeholder="Correo electronico"
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
                        Telefono o WhatsApp
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="tel"
                        placeholder="Telefono / WhatsApp"
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
                        placeholder="Que repuestos, categorias o marcas necesitas?"
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
              className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-950 p-7 shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-400">Proximamente</div>
              <h3 className="text-2xl font-black uppercase text-white">{pendingBrand}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Esta seccion todavia no esta lista. Proximamente estara disponible su pagina oficial dentro del sitio.
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

      <footer className="border-t border-slate-800/80 bg-gradient-to-b from-slate-950 to-black">
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 border-b border-slate-800/80 pb-10 md:grid-cols-[1.1fr_0.9fr_1fr]">
            <div>
              <div className="text-xl font-black uppercase tracking-[0.22em] text-white">
                Grupo <span className="text-red-500">NBG</span> Import
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                Importacion y distribucion de repuestos automotrices con enfoque comercial, tiempos de respuesta rapidos y respaldo para cada linea.
              </p>
              <div className="mt-5 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Atencion comercial activa
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Navegacion</h4>
              <ul className="mt-4 space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={`footer-${item.href}`}>
                    <a
                      href={item.href}
                      onClick={() => trackEvent('nav_click', { target: item.href, location: 'footer' })}
                      className="text-sm font-medium text-slate-200 transition hover:text-red-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Contacto directo</h4>
              <div className="mt-4 space-y-3">
                <a
                  href="https://wa.me/51956701218"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('contact_click', { channel: 'footer_whatsapp' })}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200 transition hover:border-red-500/40 hover:text-red-300"
                >
                  <MessageCircle className="h-4 w-4 text-red-400" />
                  <span>+51 956 701 218</span>
                </a>

                <a
                  href="mailto:marketing@nbg.pe"
                  onClick={() => trackEvent('contact_click', { channel: 'footer_email' })}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200 transition hover:border-red-500/40 hover:text-red-300"
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
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              {currentYear} Grupo NBG Import. Todos los derechos reservados.
            </p>
            <a
              href="mailto:marketing@nbg.pe"
              onClick={() => trackEvent('contact_click', { channel: 'footer_email_legal' })}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition hover:text-red-400"
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
