import React, { useState, useEffect } from 'react';
import { SeletorNota } from './SeletorNota';
import { SeletorEmocao } from './SeletorEmocao';
import { Campo } from './Campo';
import { Botao } from './Botao';
import { validarNota } from '../utils/validacoes';

export function CheckinForm({ checkinExistente, aoSalvar, carregando }) {
  const [nota, setNota] = useState(3);
  const [emocao, setEmocao] = useState('calmo');
  const [anotacao, setAnotacao] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (checkinExistente) {
      setNota(checkinExistente.nota);
      setEmocao(checkinExistente.emocao);
      setAnotacao(checkinExistente.anotacao || '');
    }
  }, [checkinExistente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroNota = validarNota(nota);
    if (erroNota) {
      setErro(erroNota);
      return;
    }
    if (anotacao.length > 200) {
      setErro('A anotação deve ter no máximo 200 caracteres.');
      return;
    }
    setErro(null);
    aoSalvar({ nota, emocao, anotacao });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">
          {checkinExistente ? 'Editar Check-in de Hoje' : 'Check-in de Humor'}
        </h2>
        <p className="text-xs text-slate-500">Registre como está sendo o seu dia no CitizenTech.</p>
      </div>

      <SeletorNota valorSelecionado={nota} aoSelecionar={setNota} />
      <SeletorEmocao emocaoSelecionada={emocao} aoSelecionar={setEmocao} />

      <Campo
        label="Anotação (opcional, máx. 200 caracteres)"
        tipo="textarea"
        value={anotacao}
        onChange={(e) => setAnotacao(e.target.value)}
        placeholder="Escreva brevemente o que marcou seu dia..."
        maxLength={200}
        rows={2}
      />

      {erro && <p className="text-xs text-red-600 font-medium">{erro}</p>}

      <Botao tipo="submit" disabled={carregando} className="w-full">
        {carregando ? 'Salvando...' : (checkinExistente ? 'Atualizar Check-in' : 'Salvar Check-in')}
      </Botao>
    </form>
  );
}