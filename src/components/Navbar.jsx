import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function Navbar({ usuario, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!usuario) return null;

  const isActive = (path) => location.pathname === path;
  const linkClass = (path) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive(path) 
      ? 'bg-bimo-500 text-white' 
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/home" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-bold text-xl text-bimo-700 tracking-tight">Bimo Web</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/home" className={linkClass('/home')}>Início</Link>
            <Link to="/checkin" className={linkClass('/checkin')}>Check-in</Link>
            <Link to="/diario" className={linkClass('/diario')}>Diário</Link>
            <Link to="/conversa" className={linkClass('/conversa')}>Conversa</Link>
            <Link to="/recompensas" className={linkClass('/recompensas')}>Recompensas</Link>
            <Link to="/personalidade" className={linkClass('/personalidade')}>Personalidade</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-500">Cidadão(ã)</p>
            <p className="text-sm font-semibold text-slate-800">{usuario.nome}</p>
          </div>
          <button
            onClick={() => {
              onLogout();
              navigate('/');
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
      {/* Navegação mobile inferior ou secundária */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-100 gap-1 bg-white">
        <Link to="/home" className={linkClass('/home')}>Início</Link>
        <Link to="/checkin" className={linkClass('/checkin')}>Check-in</Link>
        <Link to="/diario" className={linkClass('/diario')}>Diário</Link>
        <Link to="/conversa" className={linkClass('/conversa')}>Conversa</Link>
        <Link to="/recompensas" className={linkClass('/recompensas')}>Recompensas</Link>
        <Link to="/personalidade" className={linkClass('/personalidade')}>Personalidade</Link>
      </div>
    </header>
  );
}