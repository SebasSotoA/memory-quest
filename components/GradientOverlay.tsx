import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { GameColors } from '@/constants/gameColors';
import { styles } from '@/styles/components/GradientOverlay.styles';

/**
 * Componente que renderiza un overlay con gradiente vertical
 * Usa los color stops especificados en la especificación
 */
export function GradientOverlay() {
  return (
    // @ts-expect-error - expo-linear-gradient compatibility with React 19
    <LinearGradient
      colors={GameColors.gradient.colors}
      locations={GameColors.gradient.locations}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  );
}

