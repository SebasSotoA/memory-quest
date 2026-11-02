/**
 * Utilidades para persistencia con AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BestRecord } from '@/types/game';

const BEST_RECORD_KEY = 'bestGame';

/**
 * Carga el mejor récord guardado
 * @returns Mejor récord o null si no existe
 */
export async function loadBestRecord(): Promise<BestRecord | null> {
  try {
    const data = await AsyncStorage.getItem(BEST_RECORD_KEY);
    if (data) {
      return JSON.parse(data) as BestRecord;
    }
    return null;
  } catch (error) {
    console.error('Error loading best record:', error);
    return null;
  }
}

/**
 * Guarda el mejor récord
 * @param record Mejor récord a guardar
 */
export async function saveBestRecord(record: BestRecord): Promise<void> {
  try {
    await AsyncStorage.setItem(BEST_RECORD_KEY, JSON.stringify(record));
  } catch (error) {
    console.error('Error saving best record:', error);
  }
}

/**
 * Limpia el mejor récord guardado
 */
export async function clearBestRecord(): Promise<void> {
  try {
    await AsyncStorage.removeItem(BEST_RECORD_KEY);
  } catch (error) {
    console.error('Error clearing best record:', error);
  }
}

