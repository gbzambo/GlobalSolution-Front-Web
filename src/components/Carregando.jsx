import React from 'react';

export function Carregando({ texto = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-8 h-8 border-4 border-bimo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-slate-600 font-medium">{texto}</p>
    </div>
  );
}