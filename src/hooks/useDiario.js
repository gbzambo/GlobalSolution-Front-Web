import { useState, useEffect, useCallback } from 'react';
import { diarioService } from '../services/diarioService';
import { obterDataLocalISO } from '../utils/datas';

export function useDiario(usuarioId) {
  const [entradas, setEntradas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarEntradas = useCallback(async () => {
    if (!usuarioId) return;
    try {
      setCarregando(true);
      setErro(null);
      const dados = await diarioService.listarPorUsuario(usuarioId);
      setEntradas(dados || []);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    carregarEntradas();
  }, [carregarEntradas]);

  const criarEntrada = async (texto) => {
    try {
      setCarregando(true);
      const nova = await diarioService.criar({
        usuario_id: usuarioId,
        data: obterDataLocalISO(),
        texto
      });
      setEntradas([nova, ...entradas]);
      return nova;
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  const atualizarEntrada = async (id, texto) => {
    try {
      setCarregando(true);
      const atualizada = await diarioService.atualizar(id, texto);
      setEntradas(entradas.map(e => e.id === id ? atualizada : e));
      return atualizada;
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  const excluirEntrada = async (id) => {
    try {
      setCarregando(true);
      await diarioService.excluir(id);
      setEntradas(entradas.filter(e => e.id !== id));
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  return {
    entradas,
    carregando,
    erro,
    criarEntrada,
    atualizarEntrada,
    excluirEntrada
  };
}