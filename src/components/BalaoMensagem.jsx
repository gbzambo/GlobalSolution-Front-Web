import React from 'react';

export function BalaoMensagem({ remetente, mensagem }) {
  const ehBimo = remetente === 'bimo';

  return (
    <div className={`flex items-start gap-3 ${ehBimo ? '' : 'flex-row-reverse'}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 ${
        ehBimo ? 'bg-bimo-100 text-bimo-700' : 'bg-slate-200 text-slate-700'
      }`}>
        {ehBimo ? '🌱' : '👤'}
      </div>
      <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
        ehBimo ? 'bg-white border border-slate-200 text-slate-800' : 'bg-bimo-600 text-white'
      }`}>
        <p className="text-xs font-semibold mb-1 opacity-75">{ehBimo ? 'Bimo' : 'Você'}</p>
        <p>{mensagem}</p>
      </div>
    </div>
  );
}