import { useState, useEffect } from 'react';
import { usuariosService } from '../services/usuariosService';

export function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const usuarioSalvoId = localStorage.getItem('bimo_usuario_id');
    if (usuarioSalvoId) {
      usuariosService.buscarPorId(usuarioSalvoId)
        .then(user => {
          if (user) setUsuario(user);
          else localStorage.removeItem('bimo_usuario_id');
        })
        .catch(err => setErro(err.message))
        .finally(() => setCarregando(false));
    } else {
      setCarregando(false);
    }
  }, []);

  const entrarOuCadastrar = async (nomeLimpo) => {
    try {
      setErro(null);
      let user = await usuariosService.buscarPorNome(nomeLimpo);
      if (!user) {
        user = await usuariosService.criar(nomeLimpo);
      }
      localStorage.setItem('bimo_usuario_id', user.id);
      setUsuario(user);
      return user;
    } catch (err) {
      setErro(err.message);
      throw err;
    }
  };

  const atualizarPersonalidade = async (novaPers) => {
    if (!usuario) return;
    try {
      const atualizado = await usuariosService.atualizarPersonalidade(usuario.id, novaPers);
      setUsuario(atualizado);
    } catch (err) {
      setErro(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('bimo_usuario_id');
    setUsuario(null);
  };

  return {
    usuario,
    carregando,
    erro,
    entrarOuCadastrar,
    atualizarPersonalidade,
    logout
  };
}