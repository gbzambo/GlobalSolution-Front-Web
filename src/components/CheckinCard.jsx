import React from 'react';
import { formatarData } from '../utils/datas';
import { EMOCOES } from '../utils/constantes';
import { Botao } from './Botao';

export function CheckinCard({ checkin, onEditar, onExcluir }) {
  const emocaoObj = EMOCOES.find(e => e.id === checkin.emocao) || { emoji: '✨', label: checkin.emocao };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emocaoObj.emoji}</span>
          <div>
            <p className="font-semibold text-slate-800 text-sm">{emocaoObj.label}</p>
            <p className="text-xs text-slate-400">{formatarData(checkin.data)}</p>
          </div>
        </div>
        <div className="bg-bimo-50 text-bimo-700 font-bold px-2.5 py-1 rounded-lg text-xs">
          Nota {checkin.nota}/5
        </div>
      </div>

      {checkin.anotacao && (
        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
          "{checkin.anotacao}"
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
        <Botao variante="outline" onClick={() => onEditar(checkin)} className="text-xs py-1 px-3">
          Editar
        </Botao>
        <Botao variante="perigo" onClick={() => onExcluir(checkin.id)} className="text-xs py-1 px-3">
          Excluir
        </Botao>
      </div>
    </div>
  );
}