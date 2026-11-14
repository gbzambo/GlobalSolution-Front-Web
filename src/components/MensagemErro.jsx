import React from 'react';
import { Botao } from './Botao';

export function MensagemErro({ mensagem, onTentarNovamente }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-3 max-w-md mx-auto my-6">
      <span className="text-3xl">⚠️</span>
      <h3 className="font-bold text-red-800">Ops! Ocorreu um erro</h3>
      <p className="text-xs text-red-600">{mensagem}</p>
      {onTentarNovamente && (
        <Botao variante="primario" onClick={onTentarNovamente} className="mx-auto text-xs">
          Tentar novamente
        </Botao>
      )}
    </div>
  );
}