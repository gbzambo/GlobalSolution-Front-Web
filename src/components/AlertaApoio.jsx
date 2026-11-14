import React from 'react';
import { CONTATOS_APOIO } from '../utils/constantes';

export function AlertaApoio({ mensagemPersonalizada }) {
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 my-4 shadow-sm animate-pulse">
      <div className="flex items-start gap-3">
        <span className="text-3xl">💛</span>
        <div className="space-y-2">
          <h3 className="font-bold text-amber-900 text-base">Estamos aqui com você</h3>
          <p className="text-amber-800 text-sm leading-relaxed">
            {mensagemPersonalizada || 'Notamos expressões que indicam um momento difícil ou sobrecarga emocional. Sua vida é muito importante e você não precisa passar por isso sozinho.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <p className="font-semibold text-slate-800 text-sm">{CONTATOS_APOIO.cvv.nome}</p>
              <p className="text-bimo-700 font-bold text-lg">Ligue {CONTATOS_APOIO.cvv.numero}</p>
              <p className="text-xs text-slate-500">{CONTATOS_APOIO.cvv.info}</p>
              <a 
                href={CONTATOS_APOIO.cvv.site} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-bimo-600 underline hover:text-bimo-700 mt-1 inline-block"
              >
                Acessar chat cvv.org.br &rarr;
              </a>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <p className="font-semibold text-slate-800 text-sm">{CONTATOS_APOIO.samu.nome}</p>
              <p className="text-red-600 font-bold text-lg">Ligue {CONTATOS_APOIO.samu.numero}</p>
              <p className="text-xs text-slate-500">{CONTATOS_APOIO.samu.info}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}