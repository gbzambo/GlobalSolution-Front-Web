import React from 'react';
import { EMOCOES } from '../utils/constantes';

export function SeletorEmocao({ emocaoSelecionada, aoSelecionar }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">Qual emoção melhor define você agora?</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {EMOCOES.map(e => {
          const selecionado = emocaoSelecionada === e.id;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => aoSelecionar(e.id)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                selecionado
                  ? 'border-bimo-500 bg-bimo-50 text-bimo-700 font-semibold shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-xl">{e.emoji}</span>
              <span className="text-xs">{e.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}