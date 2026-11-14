export function validarNome(nome) {
  if (!nome) return 'O nome é obrigatório.';
  const limpo = nome.trim();
  if (limpo.length < 2 || limpo.length > 20) {
    return 'O nome deve ter entre 2 e 20 caracteres.';
  }
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  if (!regex.test(limpo)) {
    return 'O nome deve conter apenas letras e espaços.';
  }
  return null;
}

export function validarNota(nota) {
  const n = Number(nota);
  if (!n || n < 1 || n > 5) {
    return 'Selecione uma nota de humor entre 1 e 5.';
  }
  return null;
}

export function validarTextoDiario(texto) {
  if (!texto) return 'O texto do diário é obrigatório.';
  const limpo = texto.trim();
  if (limpo.length < 5 || limpo.length > 500) {
    return 'O texto deve ter entre 5 e 500 caracteres.';
  }
  return null;
}