/**
 * Configuración de niveles del juego
 */

import { GameLevel } from '@/types/game';

export interface LevelConfig {
  level: GameLevel;
  totalCards: number;
  pairs: number;
  multiplier: number;
  columns: number;
  rows: number;
  initialLives: number;
}

export const GAME_LEVELS: Record<GameLevel, LevelConfig> = {
  1: {
    level: 1,
    totalCards: 12,
    pairs: 6,
    multiplier: 1,
    columns: 3,
    rows: 4,
    initialLives: 5,
  },
  2: {
    level: 2,
    totalCards: 24,
    pairs: 12,
    multiplier: 2,
    columns: 4,
    rows: 6,
    initialLives: 7,
  },
  3: {
    level: 3,
    totalCards: 40,
    pairs: 20,
    multiplier: 3,
    columns: 5,
    rows: 8,
    initialLives: 9,
  },
};

export const LEVEL_LABELS: Record<GameLevel, string> = {
  1: 'NIVEL 1',
  2: 'NIVEL 2',
  3: 'NIVEL 3',
};

export const LEVEL_DESCRIPTIONS: Record<GameLevel, string> = {
  1: '12 cartas',
  2: '24 cartas',
  3: '40 cartas',
};

