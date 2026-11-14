import React from 'react';
import { BarraProgresso } from '../components/BarraProgresso';
import { CardConquista } from '../components/CardConquista';
import { CONQUISTAS_DEF } from '../utils/constantes';

export function Recompensas({ recompensaData }) {
  const { pontos, nivel, streak, conquistas, estatisticas } = recompensaData;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Recompensas e Conquistas</h1>
        <p className="text-xs text-slate-500">Acompanhe seu progresso e evolução no CitizenTech.</p>
      </div>

      <BarraProgresso nivel={nivel} pontos={pontos} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1 shadow-sm">
          <p className="text-xs text-slate-400">Streak</p>
          <p className="text-xl font-bold text-slate-800">{streak} dias</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1 shadow-sm">
          <p className="text-xs text-slate-400">Total Check-ins</p>
          <p className="text-xl font-bold text-bimo-600">{estatisticas.totalCheckins}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1 shadow-sm">
          <p className="text-xs text-slate-400">Média Humor</p>
          <p className="text-xl font-bold text-slate-800">{estatisticas.mediaHumor}/5</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1 shadow-sm">
          <p className="text-xs text-slate-400">Emoção Frequente</p>
          <p className="text-sm font-bold text-slate-800 truncate">{estatisticas.emocaoFrequente}</p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-bold text-slate-800">Conquistas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONQUISTAS_DEF.map(c => (
            <CardConquista
              key={c.id}
              conquista={c}
              desbloqueada={conquistas[c.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}