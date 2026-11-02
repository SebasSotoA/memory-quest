import React from 'react';
import { View, Platform } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { styles } from '@/styles/components/BackgroundCheckerboard.styles';

/**
 * Componente que renderiza un fondo con patrón checkerboard
 * Colores: #0B3C1D (base) y variante más clara
 * Optimizado para web y móvil usando un enfoque eficiente
 */
export function BackgroundCheckerboard() {
  // Para web, usar un fondo sólido más eficiente
  // Para móvil, usar patrón sutil
  if (Platform.OS === 'web') {
    return <View style={styles.containerWeb} />;
  }

  // Para móvil, crear un patrón sutil con menos tiles
  const tileSize = 64;
  const tiles: React.ReactNode[] = [];
  const cols = 8;
  const rows = 12;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isEven = (row + col) % 2 === 0;
      tiles.push(
        <View
          key={`${row}-${col}`}
          style={[
            styles.tile,
            {
              width: tileSize,
              height: tileSize,
              backgroundColor: isEven ? GameColors.backgroundDark : GameColors.backgroundLight,
              left: col * tileSize,
              top: row * tileSize,
            },
          ]}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      {tiles}
    </View>
  );
}
