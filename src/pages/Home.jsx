import React from 'react';
import { Link } from 'react-router-dom';
import { BarraProgresso } from '../components/BarraProgresso';
import { AlertaApoio } from '../components/AlertaApoio';
import { detectarRisco } from '../utils/risco';

export function Home({ usuario, checkinHoje, checkins, diario, recompensaData }) {
  const { pontos, nivel, streak } = recompensaData;

  // Verificar se há risco nas últimas anotações de check-in ou diário
  const temRisco = checkins.some(c => detectarRisco(c.anotacao)) || diario.some(d => detectarRisco(d.texto));
  
  // Verificar se as últimas 3 notas são 1 ou 2
  const ultimasTresNotas = checkins.slice(0, 3);
  const notasBaixasSeguidas = ultimasTresNotas.length >= 3 && ultimasTresNotas.every(c => c.nota <= 2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-gradient-to-r from-bimo-600 to-bimo-700 text-white rounded-2xl p-6 shadow-md space-y-2">
        <h1 className="text-2xl font-bold">Olá, {usuario.nome}! 💚</h1>
        <p className="text-xs text-bimo-100">Que bom ter você por aqui no CitizenTech. Como está sendo o seu dia?</p>
      </div>

      {(temRisco || notasBaixasSeguidas) && (
        <AlertaApoio mensagemPersonalizada={
          notasBaixasSeguidas 
            ? 'Notamos que seus últimos check-ins indicam dias difíceis seguidos. Que tal conversar com alguém de confiança ou buscar apoio profissional?' 
            : undefined
        } />
      )}

      <BarraProgresso nivel={nivel} pontos={pontos} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
          <p className="text-xs text-slate-400 font-medium">Check-in de Hoje</p>
          {checkinHoje ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 text-sm">Nota: {checkinHoje.nota}/5</p>
                <p className="text-xs text-slate-500">Emoção: {checkinHoje.emocao}</p>
              </div>
              <Link to="/checkin" className="text-xs font-semibold text-bimo-600 hover:underline">Editar &rarr;</Link>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-600">Você ainda não fez o check-in de hoje.</p>
              <Link to="/checkin" className="mt-2 inline-block text-xs font-bold bg-bimo-600 text-white px-3 py-1.5 rounded-lg hover:bg-bimo-700 transition-colors">
                Fazer Check-in (+10 pts)
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
          <p className="text-xs text-slate-400 font-medium">Streak Consecutivo</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="text-xl font-bold text-slate-800">{streak} dias</p>
              <p className="text-xs text-slate-500">Mantenha o hábito diário de cuidado!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/checkin" className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-bimo-500 transition-all shadow-sm group">
          <span className="text-2xl block mb-1">😊</span>
          <span className="text-xs font-bold text-slate-800 group-hover:text-bimo-600">Check-in</span>
        </Link>
        <Link to="/diario" className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-bimo-500 transition-all shadow-sm group">
          <span className="text-2xl block mb-1">📖</span>
          <span className="text-xs font-bold text-slate-800 group-hover:text-bimo-600">Diário</span>
        </Link>
        <Link to="/conversa" className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-bimo-500 transition-all shadow-sm group">
          <span className="text-2xl block mb-1">🤖</span>
          <span className="text-xs font-bold text-slate-800 group-hover:text-bimo-600">Conversar com Bimo</span>
        </Link>
        <Link to="/recompensas" className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-bimo-500 transition-all shadow-sm group">
          <span className="text-2xl block mb-1">⭐</span>
          <span className="text-xs font-bold text-slate-800 group-hover:text-bimo-600">Recompensas</span>
        </Link>
      </div>
    </div>
  );
}