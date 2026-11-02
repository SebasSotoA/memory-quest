import React from 'react';
import { View } from 'react-native';
import { StatsBadge } from './StatsBadge';
import { styles } from '@/styles/components/GameStatsRow.styles';

type GameStatsRowProps = {
  time: number; // en segundos
  score: number;
  level: number;
  lives?: number; // vidas restantes
};

/**
 * Componente que renderiza la fila de estadísticas del juego
 * Time, Score, Level con valores dinámicos
 */
export function GameStatsRow({ time, score, level, lives }: GameStatsRowProps) {
  // Formatear tiempo como MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <StatsBadge icon="⏱️" value={formatTime(time)} />
      </View>
      <View style={styles.badge}>
        <StatsBadge icon="⭐" value={score.toString()} />
      </View>
      {lives !== undefined && (
        <View style={styles.badge}>
          <StatsBadge icon="❤️" value={`x${lives}`} />
        </View>
      )}
    </View>
  );
}