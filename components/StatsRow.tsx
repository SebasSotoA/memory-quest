import React from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StatsBadge } from './StatsBadge';
import { useScore } from '@/hooks/useScore';
import { styles } from '@/styles/components/StatsRow.styles';

/**
 * Formatea segundos a formato MM:SS
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formatea un número con separadores de miles
 */
function formatNumber(num: number): string {
  return num.toLocaleString('es-ES');
}

/**
 * Componente que renderiza la fila de estadísticas
 * Muestra los mejores récords del usuario: Time, Score, Attempts
 */
export function StatsRow() {
  const { bestRecord, isLoading, loadRecord } = useScore();

  // Recargar récords cuando la pantalla se enfoque
  useFocusEffect(
    React.useCallback(() => {
      void loadRecord();
    }, [loadRecord])
  );

  // Valores por defecto si no hay récord o está cargando
  const bestTime = bestRecord?.bestTime ?? 0;
  const bestScore = bestRecord?.bestScore ?? 0;
  const bestAttempts = bestRecord?.bestAttempts ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <StatsBadge 
          icon="⏱️" 
          value={isLoading ? '--:--' : (bestTime > 0 ? formatTime(bestTime) : '--:--')} 
        />
      </View>
      <View style={styles.badge}>
        <StatsBadge 
          icon="⭐" 
          value={isLoading ? '0' : formatNumber(bestScore)} 
        />
      </View>
      <View style={styles.badge}>
        <StatsBadge 
          icon="🏆" 
          value={isLoading ? '0' : (bestAttempts > 0 ? bestAttempts.toString() : '0')} 
        />
      </View>
    </View>
  );
}