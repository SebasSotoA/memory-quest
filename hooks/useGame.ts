/**
 * Hook personalizado para manejar la lógica del juego
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, GameLevel, GameState } from '@/types/game';
import { generateDeck } from '@/utils/cards';
import { GAME_LEVELS } from '@/constants/gameLevels';

export function useGame(level: GameLevel, onPairFound?: () => void, onWrongPair?: () => void) {
  const levelConfig = GAME_LEVELS[level];
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    attempts: 0,
    timeUsed: 0,
    isGameComplete: false,
    isGameStarted: false,
    countdownActive: true,
    lives: levelConfig.initialLives,
    isGameLost: false,
  });

  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onPairFoundRef = useRef(onPairFound);
  const onWrongPairRef = useRef(onWrongPair);
  
  // Actualizar las refs cuando cambien los callbacks
  useEffect(() => {
    onPairFoundRef.current = onPairFound;
  }, [onPairFound]);

  useEffect(() => {
    onWrongPairRef.current = onWrongPair;
  }, [onWrongPair]);

  // Función para inicializar el juego
  const initializeGame = useCallback(() => {
    try {
      const cards = generateDeck(level);
      const initialLives = GAME_LEVELS[level].initialLives;
      console.log(`[useGame] Inicializando juego nivel ${level}, cartas generadas:`, cards.length, `vidas: ${initialLives}`);
      setGameState({
        cards,
        flippedCards: [],
        attempts: 0,
        timeUsed: 0,
        isGameComplete: false,
        isGameStarted: false,
        countdownActive: true, // Iniciar con countdown activo
        lives: initialLives,
        isGameLost: false,
      });
    } catch (error) {
      console.error('[useGame] Error al inicializar el juego:', error);
    }
  }, [level]);

  // Inicializar juego cuando cambia el nivel
  useEffect(() => {
    initializeGame();
    return () => {
      // Limpiar timers al desmontar
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, [initializeGame]);

  // Timer
  useEffect(() => {
    if (gameState.isGameStarted && !gameState.isGameComplete && !gameState.isGameLost) {
      timerIntervalRef.current = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeUsed: prev.timeUsed + 1,
        }));
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [gameState.isGameStarted, gameState.isGameComplete, gameState.isGameLost]);


  // Función para completar el countdown
  const completeCountdown = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      countdownActive: false,
      isGameStarted: true, // Iniciar el juego después del countdown
    }));
  }, []);

  const handleCardPress = useCallback((cardId: string) => {
    setGameState((prev) => {
      // Bloquear interacción durante el countdown
      if (prev.countdownActive) {
        return prev;
      }

      // No permitir click si ya hay 2 cartas volteadas
      if (prev.flippedCards.length >= 2) {
        return prev;
      }

      const card = prev.cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched || prev.flippedCards.includes(cardId)) {
        return prev;
      }

      // Ya no necesitamos iniciar el juego al primer click, se inicia después del countdown
      const shouldStartGame = false;

      // Voltear la carta
      const newFlippedCards = [...prev.flippedCards, cardId];
      const updatedCards = prev.cards.map((c) =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      );

      // Si hay 2 cartas volteadas, verificar si son pareja
      if (newFlippedCards.length === 2) {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = updatedCards.find((c) => c.id === firstId);
        const secondCard = updatedCards.find((c) => c.id === secondId);

        if (firstCard && secondCard) {
          if (firstCard.pairId === secondCard.pairId) {
            // Es una pareja - marcarlas como matched
            // Llamar al callback si existe
            if (onPairFoundRef.current) {
              onPairFoundRef.current();
            }
            return {
              ...prev,
              cards: updatedCards.map((c) =>
                c.pairId === firstCard.pairId
                  ? { ...c, isMatched: true, isFlipped: true }
                  : c
              ),
              flippedCards: [],
              attempts: prev.attempts + 1,
            };
          } else {
            // No es una pareja - restar una vida y voltearlas después de un delay
            // Llamar al callback si existe
            if (onWrongPairRef.current) {
              onWrongPairRef.current();
            }
            
            const newLives = prev.lives - 1;
            const isGameLost = newLives <= 0;
            
            // Limpiar timeout anterior si existe
            if (flipTimeoutRef.current) {
              clearTimeout(flipTimeoutRef.current);
            }
            flipTimeoutRef.current = setTimeout(() => {
              setGameState((current) => ({
                ...current,
                cards: current.cards.map((c) =>
                  newFlippedCards.includes(c.id)
                    ? { ...c, isFlipped: false }
                    : c
                ),
                flippedCards: [],
              }));
            }, 1000);

            return {
              ...prev,
              cards: updatedCards,
              flippedCards: newFlippedCards,
              attempts: prev.attempts + 1,
              lives: newLives,
              isGameLost: isGameLost,
            };
          }
        }
      }

      return {
        ...prev,
        cards: updatedCards,
        flippedCards: newFlippedCards,
      };
    });
  }, []);

  // El juego solo puede completarse si ya comenzó (después del countdown)
  useEffect(() => {
    const allMatched = gameState.cards.every((card) => card.isMatched);
    if (allMatched && gameState.cards.length > 0 && gameState.isGameStarted && !gameState.countdownActive) {
      setGameState((prev) => ({
        ...prev,
        isGameComplete: true,
      }));
    }
  }, [gameState.cards, gameState.isGameStarted, gameState.countdownActive]);

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    cards: gameState.cards,
    attempts: gameState.attempts,
    timeUsed: gameState.timeUsed,
    isGameComplete: gameState.isGameComplete,
    isGameStarted: gameState.isGameStarted,
    countdownActive: gameState.countdownActive,
    flippedCardsCount: gameState.flippedCards.length,
    lives: gameState.lives,
    isGameLost: gameState.isGameLost,
    handleCardPress,
    completeCountdown,
    resetGame,
  };
}
