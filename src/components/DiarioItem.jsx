import React from 'react';
import { formatarData } from '../utils/datas';
import { Botao } from './Botao';

export function DiarioItem({ entrada, onEditar, onExcluir }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{formatarData(entrada.data)}</span>
        <span>ID: {entrada.id.slice(0, 8)}...</span>
      </div>

      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{entrada.texto}</p>

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
        <Botao variante="outline" onClick={() => onEditar(entrada)} className="text-xs py-1 px-3">
          Editar
        </Botao>
        <Botao variante="perigo" onClick={() => onExcluir(entrada.id)} className="text-xs py-1 px-3">
          Excluir
        </Botao>
      </div>
    </div>
  );
}