/**
 * Hook personalizado para manejar la lógica de puntuación
 */

import { useState, useEffect, useCallback } from 'react';
import { GameResult, BestRecord } from '@/types/game';
import { calculateScore, compareRecords, updateBestRecord } from '@/utils/score';
import { loadBestRecord, saveBestRecord } from '@/utils/storage';

export function useScore() {
  const [bestRecord, setBestRecord] = useState<BestRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar récord al iniciar
  const loadRecord = useCallback(async () => {
    setIsLoading(true);
    const record = await loadBestRecord();
    setBestRecord(record);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadRecord();
  }, [loadRecord]);

  /**
   * Calcula el puntaje y actualiza el récord si es mejor
   * Solo guarda récords cuando el jugador gana (won === true)
   */
  const calculateAndSaveScore = useCallback(
    async (
      timeUsed: number,
      attempts: number,
      level: number,
      won: boolean = true,
      lives: number = 0
    ): Promise<GameResult> => {
      const score = calculateScore(timeUsed, attempts, level as 1 | 2 | 3);
      const currentResult: GameResult = {
        score,
        timeUsed,
        attempts,
        level: level as 1 | 2 | 3,
        isNewRecord: false,
        won,
        lives,
      };

      // Solo guardar/actualizar récords si el jugador ganó
      if (won) {
        // Comparar con el mejor récord actual (cargar si no está cargado)
        let currentBestRecord = bestRecord;
        if (!currentBestRecord) {
          currentBestRecord = await loadBestRecord();
          if (currentBestRecord) {
            setBestRecord(currentBestRecord);
          }
        }

        const isNewRecord = compareRecords(currentResult, currentBestRecord);

        if (isNewRecord) {
          const updatedRecord = updateBestRecord(currentResult, currentBestRecord);
          await saveBestRecord(updatedRecord);
          setBestRecord(updatedRecord);
          currentResult.isNewRecord = true;
        }
      }

      return currentResult;
    },
    [bestRecord]
  );

  return {
    bestRecord,
    isLoading,
    calculateAndSaveScore,
    loadRecord,
  };
}

