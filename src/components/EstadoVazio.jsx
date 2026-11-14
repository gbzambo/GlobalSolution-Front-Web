import React from 'react';

export function EstadoVazio({ icone = '📭', titulo, descricao }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2 my-4 shadow-sm">
      <span className="text-4xl">{icone}</span>
      <h3 className="font-semibold text-slate-800 text-base">{titulo}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">{descricao}</p>
    </div>
  );
}