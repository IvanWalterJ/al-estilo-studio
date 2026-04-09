export function Footer() {
  return (
    <footer className="bg-black-deep border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-xl text-white tracking-widest">
          AL ESTILO<span className="text-pink-miami">.</span>
        </span>
        <p className="text-white/20 text-xs tracking-widest">
          © {new Date().getFullYear()} Al Estilo Studio · Todos los derechos reservados
        </p>
        <div className="flex gap-4 text-white/30 text-xs tracking-widest uppercase">
          <a href="#hero" className="hover:text-white transition-colors">Inicio</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Galería</a>
          <a href="#booking" className="hover:text-white transition-colors">Reservar</a>
        </div>
      </div>
    </footer>
  );
}
