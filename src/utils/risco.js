export function detectarRisco(texto) {
  if (!texto || typeof texto !== 'string') return false;

  const termosRisco = [
    'me machucar', 'me matar', 'suicidio', 'suicídio',
    'nao quero viver', 'não quero viver', 'desistir de tudo',
    'acabar com tudo', 'sumir', 'morrer', 'dar fim à vida',
    'dar fim a vida', 'acabar com a minha vida'
  ];

  // Normalização: remover acentos e converter para minúsculas
  const textoNormalizado = texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return termosRisco.some(termo => {
    const termoNormalizado = termo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return textoNormalizado.includes(termoNormalizado);
  });
}