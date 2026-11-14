export function calcularPontos(checkins = [], diario = []) {
  const ptsCheckins = checkins.length * 10;
  const ptsDiario = diario.length * 15;
  return ptsCheckins + ptsDiario;
}

export function calcularStreak(checkins = []) {
  if (!checkins || checkins.length === 0) return 0;

  // Ordenar check-ins por data decrescente
  const datasUnicas = [...new Set(checkins.map(c => c.data))].sort((a, b) => new Date(b) - new Date(a));
  
  let streak = 0;
  let hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // Verificar se o primeiro check-in é de hoje ou ontem para iniciar o streak
  const primeiroData = new Date(datasUnicas[0] + 'T00:00:00');
  const diffDiasPrimeiro = Math.floor((hoje - primeiroData) / (1000 * 60 * 60 * 24));

  if (diffDiasPrimeiro > 1) return 0;

  let dataEsperada = primeiroData;
  for (let i = 0; i < datasUnicas.length; i++) {
    const dataAtual = new Date(datasUnicas[i] + 'T00:00:00');
    const diff = Math.floor((dataEsperada - dataAtual) / (1000 * 60 * 60 * 24));
    
    if (diff === 0 || diff === 1) {
      streak++;
      dataEsperada = dataAtual;
    } else {
      break;
    }
  }

  return streak;
}

export function determinarNivel(pontos) {
  if (pontos >= 500) return { nome: 'Floresta', icone: '🌲', proximo: null, progresso: 100 };
  if (pontos >= 250) return { nome: 'Árvore', icone: '🌳', proximo: 'Floresta', progresso: Math.floor(((pontos - 250) / 250) * 100) };
  if (pontos >= 120) return { nome: 'Muda', icone: '🪴', proximo: 'Árvore', progresso: Math.floor(((pontos - 120) / 130) * 100) };
  if (pontos >= 50) return { nome: 'Broto', icone: '🌿', proximo: 'Muda', progresso: Math.floor(((pontos - 50) / 70) * 100) };
  return { nome: 'Semente', icone: '🌱', proximo: 'Broto', progresso: Math.floor((pontos / 50) * 100) };
}

export function verificarConquistas(checkins = [], diario = []) {
  const streak = calcularStreak(checkins);
  return {
    primeiro_passo: checkins.length >= 1,
    constancia: streak >= 3,
    semana_cuidado: streak >= 7,
    escritor: diario.length >= 5
  };
}

export function calcularEstatisticas(checkins = [], diario = []) {
  if (!checkins.length) return { mediaHumor: 0, emocaoFrequente: 'Nenhuma', totalCheckins: 0, totalDiario: diario.length };

  const somaNotas = checkins.reduce((acc, c) => acc + c.nota, 0);
  const mediaHumor = (somaNotas / checkins.length).toFixed(1);

  const contagemEmocoes = {};
  checkins.forEach(c => {
    contagemEmocoes[c.emocao] = (contagemEmocoes[c.emocao] || 0) + 1;
  });

  let emocaoFrequente = 'Nenhuma';
  let maxCount = 0;
  for (const [emocao, count] of Object.entries(contagemEmocoes)) {
    if (count > maxCount) {
      maxCount = count;
      emocaoFrequente = emocao;
    }
  }

  return {
    mediaHumor,
    emocaoFrequente: emocaoFrequente.charAt(0).toUpperCase() + emocaoFrequente.slice(1),
    totalCheckins: checkins.length,
    totalDiario: diario.length
  };
}