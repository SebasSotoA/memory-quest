/**
 * Utilidades para generación y manejo de cartas
 */

import { Card, GameLevel } from '@/types/game';
import { GAME_LEVELS } from '@/constants/gameLevels';

// Lista de todas las cartas disponibles (20 imágenes)
const ALL_CARDS = [
  require('@/assets/images/cardAssets/android.png'),
  require('@/assets/images/cardAssets/androidStudio.png'),
  require('@/assets/images/cardAssets/appStore.png'),
  require('@/assets/images/cardAssets/chatGpt.png'),
  require('@/assets/images/cardAssets/copilot.png'),
  require('@/assets/images/cardAssets/css.png'),
  require('@/assets/images/cardAssets/cursor.png'),
  require('@/assets/images/cardAssets/firebase.png'),
  require('@/assets/images/cardAssets/git.png'),
  require('@/assets/images/cardAssets/github.png'),
  require('@/assets/images/cardAssets/html.png'),
  require('@/assets/images/cardAssets/java.png'),
  require('@/assets/images/cardAssets/kotlin.png'),
  require('@/assets/images/cardAssets/playStore.png'),
  require('@/assets/images/cardAssets/react.png'),
  require('@/assets/images/cardAssets/scss.png'),
  require('@/assets/images/cardAssets/stack.png'),
  require('@/assets/images/cardAssets/supabase.png'),
  require('@/assets/images/cardAssets/UPB.png'),
  require('@/assets/images/cardAssets/xaca.png'),
];

/**
 * Mezcla un array usando el algoritmo Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Genera un mazo de cartas para el nivel especificado
 * @param level Nivel del juego
 * @returns Array de cartas mezcladas
 */
export function generateDeck(level: GameLevel): Card[] {
  const config = GAME_LEVELS[level];
  const pairsNeeded = config.pairs;

  // Seleccionar cartas aleatorias para el nivel
  const selectedCards = shuffleArray(ALL_CARDS).slice(0, pairsNeeded);

  // Crear pares de cartas
  const cards: Card[] = [];
  selectedCards.forEach((imageSource, index) => {
    const pairId = `pair-${index}`;
    // Crear dos cartas con el mismo pairId
    cards.push({
      id: `${pairId}-1`,
      imageSource,
      pairId,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: `${pairId}-2`,
      imageSource,
      pairId,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Mezclar todas las cartas
  return shuffleArray(cards);
}

