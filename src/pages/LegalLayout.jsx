import { ArrowLeft } from 'lucide-react';
import { COMPANY, LEGAL_LINKS } from '../lib/company';
import { CursorGlow } from '../components/CursorGlow';
import { AmbientBackground } from '../components/AmbientBackground';

export function LegalLayout({ eyebrow, title, intro, children }) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen text-white">
      <AmbientBackground />
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center" aria-label={`${COMPANY.tradeName} - Inicio`}>
            <img src="/images/brand/nbg-logo-white.png" alt={COMPANY.tradeName} className="h-12 w-auto object-contain" />
          </a>
          <a
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#B8B8B8] transition hover:text-red-300"
          >
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-400">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">{title}</h1>
        {intro && <div className="mt-5 max-w-3xl text-base leading-7 text-[#B8B8B8]">{intro}</div>}
        <div className="mt-10">{children}</div>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {COMPANY.legalName} · RUC {COMPANY.ruc}
          </p>
          <nav aria-label="Enlaces legales" className="flex gap-5">
            <a href={LEGAL_LINKS.libro} className="transition hover:text-red-300">
              Libro de Reclamaciones
            </a>
            <a href={LEGAL_LINKS.privacidad} className="transition hover:text-red-300">
              Política de privacidad
            </a>
          </nav>
        </div>
      </footer>
      <CursorGlow />
    </div>
  );
}
