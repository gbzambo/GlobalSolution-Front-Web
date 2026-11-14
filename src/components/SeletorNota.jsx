import React from 'react';

export function SeletorNota({ valorSelecionado, aoSelecionar }) {
  const notas = [
    { nota: 1, label: 'Muito Ruim', emoji: '😢' },
    { nota: 2, label: 'Ruim', emoji: '🙁' },
    { nota: 3, label: 'Neutro', emoji: '😐' },
    { nota: 4, label: 'Bem', emoji: '🙂' },
    { nota: 5, label: 'Excelente', emoji: '😄' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">Como você avalia seu dia? (1 a 5)</label>
      <div className="grid grid-cols-5 gap-2">
        {notas.map(n => {
          const selecionado = valorSelecionado === n.nota;
          return (
            <button
              key={n.nota}
              type="button"
              onClick={() => aoSelecionar(n.nota)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                selecionado 
                  ? 'border-bimo-500 bg-bimo-50 text-bimo-700 shadow-sm scale-105' 
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
              }`}
            >
              <span className="text-2xl mb-1">{n.emoji}</span>
              <span className="text-xs font-bold">{n.nota}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}