import React, { useState, useEffect } from 'react';
import { Campo } from './Campo';
import { Botao } from './Botao';
import { validarTextoDiario } from '../utils/validacoes';

export function DiarioForm({ entradaEditando, aoSalvar, aoCancelar, carregando }) {
  const [texto, setTexto] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (entradaEditando) {
      setTexto(entradaEditando.texto);
    } else {
      setTexto('');
    }
  }, [entradaEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroValidacao = validarTextoDiario(texto);
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }
    setErro(null);
    aoSalvar(texto);
    if (!entradaEditando) setTexto('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-800">
          {entradaEditando ? 'Editar Entrada no Diário' : 'Novo Registro no Diário'}
        </h2>
        <p className="text-xs text-slate-500">Escreva seus pensamentos e reflexões (entre 5 e 500 caracteres).</p>
      </div>

      <Campo
        tipo="textarea"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Como foi o seu dia? O que passou pela sua mente?"
        maxLength={500}
        rows={4}
        erro={erro}
      />

      <div className="flex justify-end gap-2">
        {entradaEditando && (
          <Botao variante="secundario" onClick={aoCancelar} className="text-xs">
            Cancelar
          </Botao>
        )}
        <Botao tipo="submit" disabled={carregando} className="text-xs">
          {carregando ? 'Salvando...' : (entradaEditando ? 'Atualizar Entrada' : 'Adicionar ao Diário')}
        </Botao>
      </div>
    </form>
  );
}