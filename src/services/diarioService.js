import { supabaseFetch } from './api';

export const diarioService = {
  async listarPorUsuario(usuarioId) {
    return await supabaseFetch(`diario?usuario_id=eq.${usuarioId}&order=data.desc,criado_em.desc`, {
      method: 'GET'
    });
  },

  async criar(diarioData) {
    const data = await supabaseFetch('diario', {
      method: 'POST',
      body: JSON.stringify(diarioData)
    });
    return data[0];
  },

  async atualizar(id, texto) {
    const data = await supabaseFetch(`diario?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ texto })
    });
    return data[0];
  },

  async excluir(id) {
    return await supabaseFetch(`diario?id=eq.${id}`, {
      method: 'DELETE'
    });
  }
};