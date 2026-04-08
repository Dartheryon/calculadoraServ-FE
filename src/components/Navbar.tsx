interface Props {
  onCodesOpen: () => void
}

const Navbar = ({ onCodesOpen }: Props) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-emerald-100/80 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-black text-xl tracking-tight text-slate-900">
          Calculadora{' '}
          <span className="text-emerald-600">Suba</span>
        </span>

        {/* Desktop link */}
        <button
          onClick={onCodesOpen}
          className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          Códigos de pago
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={onCodesOpen}
          aria-label="Abrir códigos de pago"
          className="md:hidden p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
