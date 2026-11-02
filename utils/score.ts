/**
 * Utilidades para cálculo y comparación de puntuaciones
 */

import { GameResult, BestRecord, GameLevel } from '@/types/game';
import { GAME_LEVELS } from '@/constants/gameLevels';

/**
 * Calcula el puntaje basado en tiempo usado, intentos y multiplicador del nivel
 * @param timeUsed Tiempo en segundos
 * @param attempts Número de intentos
 * @param level Nivel del juego
 * @returns Puntaje calculado
 */
export function calculateScore(
  timeUsed: number,
  attempts: number,
  level: GameLevel
): number {
  const base = 10000;
  const penalty = timeUsed * 20 + attempts * 100;
  const levelMultiplier = GAME_LEVELS[level].multiplier;
  const score = Math.max(base - penalty, 0) * levelMultiplier;
  return Math.floor(score);
}

/**
 * Compara el resultado actual con el mejor récord
 * @param currentResult Resultado actual
 * @param bestRecord Mejor récord guardado
 * @returns true si hay nuevo récord en algún aspecto
 */
export function compareRecords(
  currentResult: GameResult,
  bestRecord: BestRecord | null
): boolean {
  if (!bestRecord) return true;

  // Nuevo récord si:
  // - Mayor puntaje, O
  // - Menor tiempo (con mismo puntaje), O
  // - Menos intentos (con mismo puntaje y tiempo)
  // Según el requerimiento: "mejor puntaje o menor tiempo o menos intentos"
  return (
    currentResult.score > bestRecord.bestScore ||
    (currentResult.score === bestRecord.bestScore &&
      currentResult.timeUsed < bestRecord.bestTime) ||
    (currentResult.score === bestRecord.bestScore &&
      currentResult.timeUsed === bestRecord.bestTime &&
      currentResult.attempts < bestRecord.bestAttempts)
  );
}

/**
 * Actualiza el mejor récord con el resultado actual si es mejor
 * @param currentResult Resultado actual
 * @param bestRecord Mejor récord actual (puede ser null)
 * @returns Nuevo mejor récord
 */
export function updateBestRecord(
  currentResult: GameResult,
  bestRecord: BestRecord | null
): BestRecord {
  if (!bestRecord) {
    return {
      bestScore: currentResult.score,
      bestTime: currentResult.timeUsed,
      bestAttempts: currentResult.attempts,
    };
  }

  // Si el puntaje es mayor, usar los valores actuales
  if (currentResult.score > bestRecord.bestScore) {
    return {
      bestScore: currentResult.score,
      bestTime: currentResult.timeUsed,
      bestAttempts: currentResult.attempts,
    };
  }

  // Si el puntaje es igual, actualizar tiempo e intentos si son mejores
  if (currentResult.score === bestRecord.bestScore) {
    const newTime = Math.min(bestRecord.bestTime, currentResult.timeUsed);
    const newAttempts =
      currentResult.timeUsed < bestRecord.bestTime
        ? currentResult.attempts
        : Math.min(bestRecord.bestAttempts, currentResult.attempts);

    return {
      bestScore: bestRecord.bestScore,
      bestTime: newTime,
      bestAttempts: newAttempts,
    };
  }

  // Si el puntaje es menor, mantener el récord anterior
  return bestRecord;
}
