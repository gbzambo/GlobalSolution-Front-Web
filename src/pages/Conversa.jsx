import React from 'react';
import { ChatBimo } from '../components/ChatBimo';

export function Conversa({ usuario, checkinHoje }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Conversa com o Bimo</h1>
        <p className="text-xs text-slate-500">Troque ideias com seu assistente baseado na sua personalidade escolhida.</p>
      </div>

      <ChatBimo usuario={usuario} ultimoCheckin={checkinHoje} />
    </div>
  );
}