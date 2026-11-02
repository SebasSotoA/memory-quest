import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { styles } from '@/styles/components/SplashCheckerboard.styles';

/**
 * Componente que renderiza un fondo con patrón checkerboard para el splash
 * Colores: #62A97E (claro) y #14532D (oscuro)
 */
export function SplashCheckerboard() {
  // Para web, usar un fondo sólido más eficiente
  if (Platform.OS === 'web') {
    return <View style={styles.containerWeb} />;
  }

  // Para móvil, crear un patrón checkerboard
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
              backgroundColor: isEven ? '#14532D' : '#62A97E',
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