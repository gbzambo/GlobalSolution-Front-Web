import React from 'react';

export function BarraProgresso({ nivel, pontos }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{nivel.icone}</span>
          <div>
            <p className="text-xs text-slate-400">Nível Atual</p>
            <h3 className="font-bold text-slate-800 text-lg">{nivel.nome}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-bimo-600">{pontos} pts</p>
          <p className="text-xs text-slate-400">{nivel.proximo ? `Próximo: ${nivel.proximo}` : 'Nível máximo!'}</p>
        </div>
      </div>

      {nivel.proximo && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>Progresso</span>
            <span>{nivel.progresso}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-bimo-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(nivel.progresso, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}