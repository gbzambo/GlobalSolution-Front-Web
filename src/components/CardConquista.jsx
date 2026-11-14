import React from 'react';

export function CardConquista({ conquista, desbloqueada }) {
  return (
    <div className={`rounded-xl border p-4 flex items-center gap-4 transition-all ${
      desbloqueada 
        ? 'bg-bimo-50/50 border-bimo-200 shadow-sm' 
        : 'bg-slate-50 border-slate-200 opacity-60 grayscale'
    }`}>
      <span className="text-3xl">{conquista.icone}</span>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-slate-800 text-sm">{conquista.titulo}</h4>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            desbloqueada ? 'bg-bimo-100 text-bimo-700' : 'bg-slate-200 text-slate-600'
          }`}>
            {desbloqueada ? 'Desbloqueada' : 'Bloqueada'}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{conquista.descricao}</p>
      </div>
    </div>
  );
}