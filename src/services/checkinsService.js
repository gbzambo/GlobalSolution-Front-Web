import { supabaseFetch } from './api';

export const checkinsService = {
  async listarPorUsuario(usuarioId) {
    return await supabaseFetch(`checkins?usuario_id=eq.${usuarioId}&order=data.desc`, {
      method: 'GET'
    });
  },

  async criar(checkinData) {
    const data = await supabaseFetch('checkins', {
      method: 'POST',
      body: JSON.stringify(checkinData)
    });
    return data[0];
  },

  async atualizar(id, checkinData) {
    const data = await supabaseFetch(`checkins?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(checkinData)
    });
    return data[0];
  },

  async excluir(id) {
    return await supabaseFetch(`checkins?id=eq.${id}`, {
      method: 'DELETE'
    });
  }
};