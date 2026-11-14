const FRASES_BIMO = {
  acolhedor: {
    baixo: [
      'Estou aqui com você. Sinta-se abraçado e lembre-se que dias difíceis passam.',
      'Respire fundo. Não precisa carregar tudo sozinho hoje.',
      'Tudo bem não estar bem o tempo todo. Que tal descansarmos um pouco?'
    ],
    medio: [
      'O dia está equilibrado. Como posso tornar sua jornada mais leve?',
      'Vamos caminhar passo a passo hoje. Estou ao seu lado.',
      'Sua presença é muito importante. Vamos fazer o nosso melhor com calma.'
    ],
    alto: [
      'Que alegria ver você radiante! Vamos aproveitar essa energia boa?',
      'Seu brilho está inspirador hoje! Continue cultivando esse bem-estar.',
      'Maravilhoso ver você assim! Vamos celebrar essa paz.'
    ]
  },
  divertido: {
    baixo: [
      'Eita, o clima pesou por aí? Respira fundo que o Bimo tá na área pra te dar um abraço virtual!',
      'Dias cinzentos existem para valorizarmos o sol. Quer um café ou uma piada ruim?',
      'Relaxa, campeão! Amanhã é um novo round e eu tô no seu time.'
    ],
    medio: [
      'Tudo tranquilo na nave! O que vamos conquistar de legal hoje?',
      'Passando para lembrar que você é incrível (e o Bimo também, claro)!',
      'Ritmo constante! Vamos animar esse dia com boas energias?'
    ],
    alto: [
      'Uhuul! Desliguem os alarmes porque a alegria tá ativada no talo! 🚀',
      'Desse jeito você vai quebrar o termômetro da felicidade! Parabéns!',
      'Festa na floresta CitizenTech! Que pique sensacional!'
    ]
  },
  calmo: {
    baixo: [
      'Feche os olhos por um instante. Inspire paz, expire a tensão.',
      'Silencie o barulho ao redor. Você está seguro neste espaço.',
      'Acalme seu coração. Cada momento tem seu próprio tempo de cura.'
    ],
    medio: [
      'Equilíbrio e serenidade. Vamos seguir em frente com tranquilidade.',
      'Observe o momento presente sem pressa.',
      'A harmonia está nos pequenos detalhes do dia.'
    ],
    alto: [
      'Sua mente transborda serenidade. Desfrute dessa calmaria.',
      'Paz interior cultivada com sucesso. Excelente.',
      'Que tranquilidade boa. Mantenha essa brisa leve no dia.'
    ]
  }
};

export function obterRespostaBimo(personalidade = 'acolhedor', ultimaNota = 3, mensagemUsuario = '') {
  const pers = FRASES_BIMO[personalidade] ? personalidade : 'acolhedor';
  let faixa = 'medio';
  if (ultimaNota <= 2) faixa = 'baixo';
  else if (ultimaNota >= 4) faixa = 'alto';

  const msgLower = mensagemUsuario.toLowerCase();
  if (msgLower.includes('obrigado') || msgLower.includes('valeu')) {
    return 'Por nada! Estou sempre aqui para apoiar você na sua jornada CitizenTech. 💚';
  }
  if (msgLower.includes('ajuda') || msgLower.includes('socorro')) {
    return 'Se precisar de apoio profissional, lembre-se que o CVV atende pelo 188 e estou sempre por perto para conversarmos.';
  }

  const opcoes = FRASES_BIMO[pers][faixa];
  const indice = Math.floor(Math.random() * opcoes.length);
  return opcoes[indice];
}