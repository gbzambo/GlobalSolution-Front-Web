import { useState, useEffect, useCallback } from 'react';
import { checkinsService } from '../services/checkinsService';
import { obterDataLocalISO } from '../utils/datas';

export function useCheckins(usuarioId) {
  const [checkins, setCheckins] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarCheckins = useCallback(async () => {
    if (!usuarioId) return;
    try {
      setCarregando(true);
      setErro(null);
      const dados = await checkinsService.listarPorUsuario(usuarioId);
      setCheckins(dados || []);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    carregarCheckins();
  }, [carregarCheckins]);

  const criarOuAtualizarCheckin = async (dadosCheckin) => {
    try {
      setCarregando(true);
      const hoje = obterDataLocalISO();
      const existente = checkins.find(c => c.data === hoje);

      let resultado;
      if (existente) {
        resultado = await checkinsService.atualizar(existente.id, {
          nota: dadosCheckin.nota,
          emocao: dadosCheckin.emocao,
          anotacao: dadosCheckin.anotacao
        });
        setCheckins(checkins.map(c => c.id === existente.id ? resultado : c));
      } else {
        resultado = await checkinsService.criar({
          usuario_id: usuarioId,
          data: hoje,
          ...dadosCheckin
        });
        setCheckins([resultado, ...checkins]);
      }
      return resultado;
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  const excluirCheckin = async (id) => {
    try {
      setCarregando(true);
      await checkinsService.excluir(id);
      setCheckins(checkins.filter(c => c.id !== id));
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  const checkinHoje = checkins.find(c => c.data === obterDataLocalISO());

  return {
    checkins,
    checkinHoje,
    carregando,
    erro,
    criarOuAtualizarCheckin,
    excluirCheckin,
    recarregarCheckins: carregarCheckins
  };
}