import React from 'react';
import { Botao } from './Botao';

export function Modal({ aberto, titulo, mensagem, onConfirmar, onCancelar }) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-bold text-slate-800">{titulo}</h3>
        <p className="text-sm text-slate-600">{mensagem}</p>
        <div className="flex justify-end gap-3 pt-2">
          <Botao variante="secundario" onClick={onCancelar}>Cancelar</Botao>
          <Botao variante="perigo" onClick={onConfirmar}>Confirmar</Botao>
        </div>
      </div>
    </div>
  );
}