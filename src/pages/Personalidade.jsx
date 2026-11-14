import React, { useState } from 'react';
import { Botao } from '../components/Botao';

export function Personalidade({ usuario, aoAtualizarPersonalidade }) {
  const [personalidadeSelecionada, setPersonalidadeSelecionada] = useState(usuario.personalidade || 'acolhedor');
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const personalidades = [
    { id: 'acolhedor', titulo: 'Acolhedor', icone: '🤗', desc: 'Foco em empatia, conforto e acolhimento emocional.' },
    { id: 'divertido', titulo: 'Divertido', icone: '🚀', desc: 'Tom leve, motivacional e descontraído para o seu dia.' },
    { id: 'calmo', titulo: 'Calmo', desc: 'Serenidade, respiração profunda e foco no momento presente.', icone: '🧘' }
  ];

  const handleSalvar = async () => {
    setSalvando(true);
    setSucesso(false);
    try {
      await aoAtualizarPersonalidade(personalidadeSelecionada);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Personalidade do Bimo</h1>
        <p className="text-xs text-slate-500">Escolha como o Bimo interage e apoia você.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {personalidades.map(p => {
          const selecionado = personalidadeSelecionada === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setPersonalidadeSelecionada(p.id)}
              className={`p-5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                selecionado
                  ? 'border-bimo-500 bg-bimo-50/50 shadow-md ring-2 ring-bimo-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <span className="text-3xl block">{p.icone}</span>
              <h3 className="font-bold text-slate-800 text-base">{p.titulo}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {sucesso && (
        <div className="bg-bimo-50 border border-bimo-200 rounded-lg p-3 text-xs text-bimo-700 font-medium">
          ✅ Personalidade atualizada com sucesso!
        </div>
      )}

      <Botao onClick={handleSalvar} disabled={salvando}>
        {salvando ? 'Salvando...' : 'Salvar Alteração'}
      </Botao>
    </div>
  );
}