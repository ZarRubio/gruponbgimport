import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="tab"], input, textarea, select, label, summary';

// Cursor decorativo (adaptado del portafolio de Adrián Rubio): un resplandor rojo suave que
// sigue al puntero y un anillo que se agranda sobre elementos interactivos y late al hacer clic.
// Solo con mouse o trackpad; se desactiva en pantallas táctiles y con "reducir movimiento".
export function CursorGlow() {
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!fine || reduced || !ring || !glow) return undefined;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;

    const tick = () => {
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      glow.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      frame = Math.abs(targetX - ringX) + Math.abs(targetY - ringY) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      ring.classList.add('is-visible');
      glow.classList.add('is-visible');
      ring.classList.toggle('is-hover', Boolean(event.target.closest?.(INTERACTIVE)));
      wake();
    };
    const onLeave = () => {
      ring.classList.remove('is-visible');
      glow.classList.remove('is-visible');
    };
    const onDown = () => {
      ring.classList.remove('is-click');
      void ring.offsetWidth; // reinicia la animación de pulso
      ring.classList.add('is-click');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span />
      </div>
    </>
  );
}
