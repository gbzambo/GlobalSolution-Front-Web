import React, { useState } from 'react';
import { DiarioForm } from '../components/DiarioForm';
import { DiarioItem } from '../components/DiarioItem';
import { Modal } from '../components/Modal';
import { EstadoVazio } from '../components/EstadoVazio';
import { MensagemErro } from '../components/MensagemErro';
import { Carregando } from '../components/Carregando';
import { AlertaApoio } from '../components/AlertaApoio';
import { detectarRisco } from '../utils/risco';

export function Diario({ usuario, diarioHook }) {
  const { entradas, carregando, erro, criarEntrada, atualizarEntrada, excluirEntrada } = diarioHook;
  const [entradaEditando, setEntradaEditando] = useState(null);
  const [modalExclusaoId, setModalExclusaoId] = useState(null);

  const handleSalvar = async (texto) => {
    if (entradaEditando) {
      await atualizarEntrada(entradaEditando.id, texto);
      setEntradaEditando(null);
    } else {
      await criarEntrada(texto);
    }
  };

  const temRiscoGeral = entradas.some(e => detectarRisco(e.texto));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Diário de Bem-Estar</h1>
        <p className="text-xs text-slate-500">Escreva seus pensamentos com total liberdade e segurança.</p>
      </div>

      {temRiscoGeral && <AlertaApoio />}

      <DiarioForm
        entradaEditando={entradaEditando}
        aoSalvar={handleSalvar}
        aoCancelar={() => setEntradaEditando(null)}
        carregando={carregando}
      />

      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-800">Suas Anotações</h2>

        {carregando && entradas.length === 0 ? (
          <Carregando texto="Carregando diário..." />
        ) : erro ? (
          <MensagemErro mensagem={erro} />
        ) : entradas.length === 0 ? (
          <EstadoVazio icone="📖" titulo="Seu diário está vazio" descricao="Escreva sua primeira reflexão acima para ganhar 15 pontos." />
        ) : (
          <div className="space-y-3">
            {entradas.map(e => (
              <DiarioItem
                key={e.id}
                entrada={e}
                onEditar={(item) => setEntradaEditando(item)}
                onExcluir={(id) => setModalExclusaoId(id)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        aberto={Boolean(modalExclusaoId)}
        titulo="Excluir Entrada"
        mensagem="Tem certeza que deseja excluir esta entrada do diário?"
        onConfirmar={async () => {
          await excluirEntrada(modalExclusaoId);
          setModalExclusaoId(null);
        }}
        onCancelar={() => setModalExclusaoId(null)}
      />
    </div>
  );
}