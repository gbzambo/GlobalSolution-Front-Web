import { useMemo } from 'react';
import { calcularPontos, calcularStreak, determinarNivel, verificarConquistas, calcularEstatisticas } from '../utils/recompensas';

export function useRecompensas(checkins = [], diario = []) {
  const pontos = useMemo(() => calcularPontos(checkins, diario), [checkins, diario]);
  const streak = useMemo(() => calcularStreak(checkins), [checkins]);
  const nivel = useMemo(() => determinarNivel(pontos), [pontos]);
  const conquistas = useMemo(() => verificarConquistas(checkins, diario), [checkins, diario]);
  const estatisticas = useMemo(() => calcularEstatisticas(checkins, diario), [checkins, diario]);

  return {
    pontos,
    streak,
    nivel,
    conquistas,
    estatisticas
  };
}