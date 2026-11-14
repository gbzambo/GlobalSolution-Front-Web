export const EMOCOES = [
  { id: 'feliz', label: 'Feliz', emoji: '😊' },
  { id: 'calmo', label: 'Calmo', emoji: '😌' },
  { id: 'grato', label: 'Grato', emoji: '🙏' },
  { id: 'ansioso', label: 'Ansioso', emoji: '😰' },
  { id: 'triste', label: 'Triste', emoji: '😢' },
  { id: 'irritado', label: 'Irritado', emoji: '😠' },
  { id: 'cansado', label: 'Cansado', emoji: '🥱' },
  { id: 'sozinho', label: 'Sozinho', emoji: '🫂' }
];

export const NIVEIS = [
  { nome: 'Semente', minPontos: 0, icone: '🌱' },
  { nome: 'Broto', minPontos: 50, icone: '🌿' },
  { nome: 'Muda', minPontos: 120, icone: '🪴' },
  { nome: 'Árvore', minPontos: 250, icone: '🌳' },
  { nome: 'Floresta', minPontos: 500, icone: '🌲' }
];

export const CONQUISTAS_DEF = [
  { id: 'primeiro_passo', titulo: 'Primeiro Passo', descricao: 'Realize seu primeiro check-in de humor.', icone: '🎯' },
  { id: 'constancia', titulo: 'Constância', descricao: 'Mantenha um streak de 3 dias de check-in.', icone: '🔥' },
  { id: 'semana_cuidado', titulo: 'Semana de Cuidado', descricao: 'Mantenha um streak de 7 dias de check-in.', icone: '⭐' },
  { id: 'escritor', titulo: 'Escritor', descricao: 'Crie 5 entradas no seu diário de bem-estar.', icone: '📖' }
];

export const CONTATOS_APOIO = {
  cvv: { nome: 'CVV (Centro de Valorização da Vida)', numero: '188', info: 'Disponível 24h por dia, ligação gratuita.', site: 'https://www.cvv.org.br' },
  samu: { nome: 'SAMU', numero: '192', info: 'Para emergências médicas imediatas.', site: '#' }
};