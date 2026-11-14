import { supabaseFetch } from './api';

export const usuariosService = {
  async buscarPorNome(nome) {
    const data = await supabaseFetch(`usuarios?nome=eq.${encodeURIComponent(nome)}`, {
      method: 'GET'
    });
    return data && data.length > 0 ? data[0] : null;
  },

  async buscarPorId(id) {
    const data = await supabaseFetch(`usuarios?id=eq.${id}`, {
      method: 'GET'
    });
    return data && data.length > 0 ? data[0] : null;
  },

  async criar(nome) {
    const data = await supabaseFetch('usuarios', {
      method: 'POST',
      body: JSON.stringify({ nome, personalidade: 'acolhedor' })
    });
    return data[0];
  },

  async atualizarPersonalidade(id, personalidade) {
    const data = await supabaseFetch(`usuarios?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ personalidade })
    });
    return data[0];
  }
};