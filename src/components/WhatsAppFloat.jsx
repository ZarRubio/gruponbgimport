export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/51956701218?text=Hola,%20quiero%20cotizar%20repuestos"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/30 transition hover:scale-105"
      aria-label="Cotizar por WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" aria-hidden="true" />
      <span className="pointer-events-none absolute right-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/80 px-3 py-2 text-[13px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Cotizar por WhatsApp
      </span>
      <svg
        className="relative h-6 w-6"
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.01 3.2C8.95 3.2 3.2 8.95 3.2 16.01c0 2.26.6 4.47 1.73 6.41L3.1 29l6.74-1.77a12.75 12.75 0 0 0 6.17 1.58c7.06 0 12.81-5.74 12.81-12.8S23.07 3.2 16.01 3.2Zm0 23.45c-1.96 0-3.87-.54-5.54-1.56l-.4-.24-4 .99 1.07-3.9-.26-.41a10.58 10.58 0 0 1-1.52-5.52c0-5.87 4.78-10.65 10.65-10.65s10.65 4.78 10.65 10.65-4.78 10.64-10.65 10.64Zm5.84-7.97c-.32-.16-1.9-.94-2.19-1.05-.29-.1-.5-.16-.72.16-.21.32-.82 1.05-1.01 1.27-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.48 4.84.77.33 1.36.53 1.83.68.77.24 1.46.21 2.01.13.61-.09 1.9-.77 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}

export default WhatsAppFloat;
