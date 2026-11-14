import React, { useState } from 'react';
import { BalaoMensagem } from './BalaoMensagem';
import { Campo } from './Campo';
import { Botao } from './Botao';
import { obterRespostaBimo } from '../utils/respostasBimo';

export function ChatBimo({ usuario, ultimoCheckin }) {
  const [mensagens, setMensagens] = useState([
    {
      remetente: 'bimo',
      texto: `Olá, ${usuario.nome}! Sou o Bimo, seu assistente de bem-estar em CitizenTech. Como posso te ajudar hoje?`
    }
  ]);
  const [input, setInput] = useState('');

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const textoUsuario = input.trim();
    const novasMensagens = [...mensagens, { remetente: 'usuario', texto: textoUsuario }];
    setMensagens(novasMensagens);
    setInput('');

    setTimeout(() => {
      const notaHumor = ultimoCheckin ? ultimoCheckin.nota : 3;
      const resposta = obterRespostaBimo(usuario.personalidade, notaHumor, textoUsuario);
      setMensagens(prev => [...prev, { remetente: 'bimo', texto: resposta }]);
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl flex items-center gap-3">
        <span className="text-2xl">🌱</span>
        <div>
          <h2 className="font-bold text-slate-800 text-sm">Bimo Assistant ({usuario.personalidade})</h2>
          <p className="text-xs text-slate-500">Pronto para conversar e apoiar você.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mensagens.map((m, idx) => (
          <BalaoMensagem key={idx} remetente={m.remetente} mensagem={m.texto} />
        ))}
      </div>

      <form onSubmit={enviarMensagem} className="p-3 border-t border-slate-100 flex gap-2 bg-slate-50 rounded-b-xl">
        <div className="flex-1">
          <Campo
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem para o Bimo..."
          />
        </div>
        <Botao type="submit" className="self-end">Enviar</Botao>
      </form>
    </div>
  );
}