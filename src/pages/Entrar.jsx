import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Campo } from '../components/Campo';
import { Botao } from '../components/Botao';
import { validarNome } from '../utils/validacoes';
import { Carregando } from '../components/Carregando';

export function Entrar({ onEntrar }) {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroValidacao = validarNome(nome);
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      await onEntrar(nome.trim());
      navigate('/home');
    } catch (err) {
      setErro(err.message || 'Erro ao entrar. Verifique sua conexão com o Supabase.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <span className="text-5xl">🌱</span>
          <h1 className="text-2xl font-bold text-slate-800">Bem-vindo ao Bimo Web</h1>
          <p className="text-xs text-slate-500">Seu assistente de saúde mental e bem-estar em CitizenTech (FIAP 2026.2).</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
          ⚠️ <strong>Aviso Acadêmico:</strong> Este é um projeto acadêmico sem fins lucrativos. Não insira dados pessoais reais ou confidenciais.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Campo
            label="Digite seu nome (2 a 20 caracteres)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Ana Silva"
            maxLength={20}
            erro={erro}
          />

          {carregando ? (
            <Carregando texto="Entrando no sistema..." />
          ) : (
            <Botao type="submit" className="w-full">Entrar / Cadastrar</Botao>
          )}
        </form>
      </div>
    </div>
  );
}