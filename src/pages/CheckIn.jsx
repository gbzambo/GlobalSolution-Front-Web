import React, { useState } from 'react';
import { CheckinForm } from '../components/CheckinForm';
import { CheckinCard } from '../components/CheckinCard';
import { Modal } from '../components/Modal';
import { EstadoVazio } from '../components/EstadoVazio';
import { MensagemErro } from '../components/MensagemErro';
import { Carregando } from '../components/Carregando';
import { AlertaApoio } from '../components/AlertaApoio';
import { detectarRisco } from '../utils/risco';

export function Checkin({ usuario, checkinsHook }) {
  const { checkins, checkinHoje, carregando, erro, criarOuAtualizarCheckin, excluirCheckin } = checkinsHook;
  const [checkinEditando, setCheckinEditando] = useState(null);
  const [modalExclusaoId, setModalExclusaoId] = useState(null);

  const handleSalvar = async (dados) => {
    await criarOuAtualizarCheckin(dados);
    setCheckinEditando(null);
  };

  const temRiscoGeral = checkins.some(c => detectarRisco(c.anotacao));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Check-in de Humor</h1>
        <p className="text-xs text-slate-500">Acompanhe seu estado emocional diariamente.</p>
      </div>

      {temRiscoGeral && <AlertaApoio />}

      <CheckinForm
        checkinExistente={checkinEditando || checkinHoje}
        aoSalvar={handleSalvar}
        carregando={carregando}
      />

      {checkinEditando && (
        <button
          onClick={() => setCheckinEditando(null)}
          className="text-xs text-slate-500 underline hover:text-slate-800"
        >
          Cancelar edição e voltar ao check-in de hoje
        </button>
      )}

      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-800">Histórico de Check-ins</h2>

        {carregando && checkins.length === 0 ? (
          <Carregando texto="Carregando check-ins..." />
        ) : erro ? (
          <MensagemErro mensagem={erro} />
        ) : checkins.length === 0 ? (
          <EstadoVazio icone="📊" titulo="Nenhum check-in registrado" descricao="Faça seu primeiro check-in acima para acumular pontos." />
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {checkins.map(c => (
              <CheckinCard
                key={c.id}
                checkin={c}
                onEditar={(item) => setCheckinEditando(item)}
                onExcluir={(id) => setModalExclusaoId(id)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        aberto={Boolean(modalExclusaoId)}
        titulo="Excluir Check-in"
        mensagem="Tem certeza que deseja excluir este registro de check-in?"
        onConfirmar={async () => {
          await excluirCheckin(modalExclusaoId);
          setModalExclusaoId(null);
        }}
        onCancelar={() => setModalExclusaoId(null)}
      />
    </div>
  );
}