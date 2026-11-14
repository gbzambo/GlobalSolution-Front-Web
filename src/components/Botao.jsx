import React from 'react';

export function Botao({ children, variante = 'primario', tipo, type, onClick, disabled = false, className = '' }) {
  const estilosBase = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantes = {
    primario: "bg-bimo-600 text-white hover:bg-bimo-700 shadow-sm",
    secundario: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    perigo: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50"
  };

  return (
    <button
      type={type || tipo || 'button'}
      onClick={onClick}
      disabled={disabled}
      className={`${estilosBase} ${variantes[variante]} ${className}`}
    >
      {children}
    </button>
  );
}