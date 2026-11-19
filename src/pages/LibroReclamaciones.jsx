import { useState } from 'react';
import { CheckCircle2, Mail, Printer } from 'lucide-react';
import { COMPANY, LEGAL_LINKS, trackEvent } from '../lib/company';
import { LegalLayout } from './LegalLayout';

const EMPTY = {
  nombre: '',
  tipoDoc: 'DNI',
  numDoc: '',
  domicilio: '',
  telefono: '',
  email: '',
  menorEdad: false,
  apoderado: '',
  bienTipo: 'Producto',
  monto: '',
  bienDescripcion: '',
  tipo: 'Reclamo',
  detalle: '',
  pedido: '',
  acepta: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data) {
  const e = {};
  if (data.nombre.trim().length < 3) e.nombre = 'Ingresa tu nombre completo.';
  if (!/^[A-Za-z0-9-]{6,15}$/.test(data.numDoc.trim())) e.numDoc = 'Ingresa un número de documento válido.';
  if (data.domicilio.trim().length < 5) e.domicilio = 'Ingresa tu domicilio.';
  if (!/^[+]?[0-9\s-]{7,20}$/.test(data.telefono.trim())) e.telefono = 'Ingresa un teléfono válido.';
  if (!EMAIL_PATTERN.test(data.email.trim())) e.email = 'Ingresa un correo válido. Ahí recibirás la copia de tu reclamo.';
  if (data.menorEdad && data.apoderado.trim().length < 3) e.apoderado = 'Ingresa el nombre del padre, madre o apoderado.';
  if (data.bienDescripcion.trim().length < 3) e.bienDescripcion = 'Describe el producto o servicio.';
  if (data.detalle.trim().length < 10) e.detalle = 'Describe con más detalle lo ocurrido.';
  if (data.pedido.trim().length < 3) e.pedido = 'Indica qué solución solicitas.';
  if (!data.acepta) e.acepta = 'Debes aceptar para registrar tu hoja de reclamación.';
  return e;
}

function buildNumber(date) {
  const p = (n) => String(n).padStart(2, '0');
  return `NBG-LR-${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}-${p(date.getHours())}${p(
    date.getMinutes()
  )}${p(date.getSeconds())}`;
}

function formatDate(date) {
  return date.toLocaleString('es-PE', { dateStyle: 'long', timeStyle: 'short' });
}

function buildText(d, numero, fecha) {
  return [
    `HOJA DE RECLAMACIÓN N.º ${numero}`,
    `Fecha: ${fecha}`,
    '',
    '1. PROVEEDOR',
    `${COMPANY.legalName} - RUC ${COMPANY.ruc}`,
    COMPANY.address,
    '',
    '2. CONSUMIDOR RECLAMANTE',
    `Nombre: ${d.nombre}`,
    `Documento: ${d.tipoDoc} ${d.numDoc}`,
    `Domicilio: ${d.domicilio}`,
    `Teléfono: ${d.telefono}`,
    `Correo: ${d.email}`,
    d.menorEdad ? `Menor de edad. Padre, madre o apoderado: ${d.apoderado}` : 'Mayor de edad',
    '',
    '3. BIEN CONTRATADO',
    `Tipo: ${d.bienTipo}`,
    `Monto reclamado: ${d.monto ? `S/ ${d.monto}` : 'No indicado'}`,
    `Descripción: ${d.bienDescripcion}`,
    '',
    '4. DETALLE DE LA RECLAMACIÓN',
    `Tipo: ${d.tipo}`,
    `Detalle: ${d.detalle}`,
    `Pedido del consumidor: ${d.pedido}`,
    '',
    '5. OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR',
    '(A completar por el proveedor)',
    '',
    'El proveedor dará respuesta en un plazo no mayor a quince (15) días hábiles improrrogables.',
    'La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.',
  ].join('\n');
}

const fieldBase =
  'mt-2 w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-white/55 outline-none transition focus:border-red-400';

function Field({ label, name, error, required = true, children, hint }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-white/85">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-white/50">{hint}</p>}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function Fieldset({ step, title, children }) {
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <legend className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
        {step}. {title}
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function LibroReclamaciones() {
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const update = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const input = (name, props = {}) => ({
    id: name,
    name,
    value: data[name],
    onChange: update(name),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: `${fieldBase} ${errors[name] ? 'border-red-400/70' : 'border-white/15'}`,
    ...props,
  });

  const mailtoFor = (res) =>
    `mailto:${COMPANY.email}?cc=${encodeURIComponent(res.email)}&subject=${encodeURIComponent(
      `Libro de Reclamaciones - ${res.tipo} ${res.numero}`
    )}&body=${encodeURIComponent(res.text)}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      trackEvent('reclamo_form_error', { fields: Object.keys(found).join(',') });
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    const now = new Date();
    const numero = buildNumber(now);
    const fecha = formatDate(now);
    const res = { numero, fecha, email: data.email.trim(), tipo: data.tipo, text: buildText(data, numero, fecha) };
    setResult(res);
    trackEvent('reclamo_submit', { tipo: data.tipo });
    window.scrollTo({ top: 0 });
    window.location.href = mailtoFor(res);
  };

  if (result) {
    return (
      <LegalLayout eyebrow="Libro de Reclamaciones" title={`Hoja N.º ${result.numero}`}>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 print:hidden">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={22} aria-hidden="true" />
            <div className="text-sm leading-6 text-white/85">
              <p className="font-semibold text-white">Tu hoja de reclamación está lista.</p>
              <p className="mt-1">
                Se abrió tu aplicación de correo con la hoja dirigida a {COMPANY.email} y con copia a {result.email}.{' '}
                <strong className="text-white">Pulsa “Enviar” en tu correo para completar el registro.</strong> Guarda
                también una copia en PDF con el botón de abajo.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={mailtoFor(result)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D2191F] px-5 text-sm font-bold text-white transition hover:bg-[#B8151B]"
            >
              <Mail size={18} aria-hidden="true" />
              Abrir el correo otra vez
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Printer size={18} aria-hidden="true" />
              Imprimir o guardar PDF
            </button>
          </div>
          <p className="mt-4 text-xs leading-5 text-white/60">
            Si tu correo no se abrió, envía esta hoja manualmente a {COMPANY.email} o escríbenos al {COMPANY.phone}.
          </p>
        </div>

        <pre className="mt-8 whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-sans text-sm leading-7 text-white/85 print:border-0 print:bg-white print:text-black">
          {result.text}
        </pre>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout
      eyebrow="Conforme al Código de Protección y Defensa del Consumidor"
      title="Libro de Reclamaciones"
      intro={
        <>
          <p>
            {COMPANY.legalName} · RUC {COMPANY.ruc}
            <br />
            {COMPANY.address}
          </p>
          <p className="mt-4 text-sm text-white/60">
            <strong className="text-white/85">Reclamo:</strong> disconformidad relacionada con los productos o servicios.{' '}
            <strong className="text-white/85">Queja:</strong> disconformidad no relacionada con los productos o servicios,
            o malestar respecto a la atención al público.
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="grid gap-6">
        <Fieldset step="1" title="Identificación del consumidor reclamante">
          <div className="sm:col-span-2">
            <Field label="Nombre completo" name="nombre" error={errors.nombre}>
              <input {...input('nombre', { autoComplete: 'name' })} />
            </Field>
          </div>
          <Field label="Tipo de documento" name="tipoDoc">
            <select {...input('tipoDoc')}>
              <option>DNI</option>
              <option>Carné de extranjería</option>
              <option>Pasaporte</option>
              <option>RUC</option>
            </select>
          </Field>
          <Field label="Número de documento" name="numDoc" error={errors.numDoc}>
            <input {...input('numDoc', { inputMode: 'numeric' })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Domicilio" name="domicilio" error={errors.domicilio}>
              <input {...input('domicilio', { autoComplete: 'street-address' })} />
            </Field>
          </div>
          <Field label="Teléfono" name="telefono" error={errors.telefono}>
            <input {...input('telefono', { type: 'tel', autoComplete: 'tel' })} />
          </Field>
          <Field label="Correo electrónico" name="email" error={errors.email} hint="Recibirás una copia de tu reclamo.">
            <input {...input('email', { type: 'email', autoComplete: 'email' })} />
          </Field>
          <label className="flex items-center gap-3 text-sm text-white/80 sm:col-span-2">
            <input
              type="checkbox"
              checked={data.menorEdad}
              onChange={update('menorEdad')}
              className="h-4 w-4 accent-[#E82127]"
            />
            Soy menor de edad
          </label>
          {data.menorEdad && (
            <div className="sm:col-span-2">
              <Field label="Nombre del padre, madre o apoderado" name="apoderado" error={errors.apoderado}>
                <input {...input('apoderado')} />
              </Field>
            </div>
          )}
        </Fieldset>

        <Fieldset step="2" title="Identificación del bien contratado">
          <Field label="Tipo" name="bienTipo">
            <select {...input('bienTipo')}>
              <option>Producto</option>
              <option>Servicio</option>
            </select>
          </Field>
          <Field label="Monto reclamado (S/)" name="monto" required={false}>
            <input {...input('monto', { inputMode: 'decimal', placeholder: '0.00' })} />
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Descripción"
              name="bienDescripcion"
              error={errors.bienDescripcion}
              hint="Producto, marca, medida, número de factura o boleta, fecha de compra."
            >
              <input {...input('bienDescripcion')} />
            </Field>
          </div>
        </Fieldset>

        <Fieldset step="3" title="Detalle de la reclamación y pedido del consumidor">
          <div className="sm:col-span-2">
            <span className="text-sm font-semibold text-white/85">
              Tipo <span className="text-red-400">*</span>
            </span>
            <div className="mt-2 flex gap-3">
              {['Reclamo', 'Queja'].map((option) => (
                <label
                  key={option}
                  className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-semibold transition ${
                    data.tipo === option ? 'border-red-400 bg-red-500/15 text-white' : 'border-white/15 text-white/70'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipo"
                    value={option}
                    checked={data.tipo === option}
                    onChange={update('tipo')}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <Field label="Detalle" name="detalle" error={errors.detalle}>
              <textarea {...input('detalle', { rows: 5 })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Pedido (¿qué solución solicitas?)" name="pedido" error={errors.pedido}>
              <textarea {...input('pedido', { rows: 3 })} />
            </Field>
          </div>
        </Fieldset>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-white/70">
          <p>
            Daremos respuesta a tu reclamo o queja en un plazo no mayor a <strong className="text-white">quince (15) días
            hábiles</strong> improrrogables, al correo electrónico que indiques.
          </p>
          <p className="mt-3">
            La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo
            para interponer una denuncia ante el INDECOPI.
          </p>
          <label className="mt-5 flex items-start gap-3 text-white/85">
            <input
              id="acepta"
              type="checkbox"
              checked={data.acepta}
              onChange={update('acepta')}
              aria-invalid={Boolean(errors.acepta)}
              aria-describedby={errors.acepta ? 'acepta-error' : undefined}
              className="mt-1 h-4 w-4 shrink-0 accent-[#E82127]"
            />
            <span>
              Declaro que los datos consignados son verdaderos y autorizo su tratamiento para la atención de mi reclamo,
              conforme a la{' '}
              <a href={LEGAL_LINKS.privacidad} className="text-red-300 underline underline-offset-2">
                Política de privacidad
              </a>
              .
            </span>
          </label>
          {errors.acepta && (
            <p id="acepta-error" className="mt-2 text-xs text-red-300">
              {errors.acepta}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-2xl bg-[#D2191F] text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#B8151B] sm:w-auto sm:px-10"
        >
          Registrar hoja de reclamación
        </button>
      </form>
    </LegalLayout>
  );
}
