// Fondo único de toda la página: dos resplandores rojos muy tenues, fijos al viewport,
// que se desplazan lentamente (estilos en styles.css → .ambient-bg). Así las secciones
// comparten un mismo fondo continuo, sin cortes. Sin animación si el usuario pidió reducir movimiento.
export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <span className="ambient-bg__a" />
      <span className="ambient-bg__b" />
    </div>
  );
}
