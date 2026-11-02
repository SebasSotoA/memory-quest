import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameColors } from '@/constants/gameColors';
import { styles } from '@/styles/components/StatsBadge.styles';

type StatsBadgeProps = {
  icon: string;
  value: string;
};

/**
 * Componente reutilizable para badges de estadísticas
 * Time, Score, Level
 * Con efecto 3D embossed
 */
export function StatsBadge({ icon, value }: StatsBadgeProps) {
  return (
    <View style={styles.container}>
      {/* Sombra para efecto 3D */}
      <View style={styles.shadowLayer} />
      {/* Capa principal con gradiente */}
      {/* @ts-expect-error - expo-linear-gradient compatibility with React 19 */}
      <LinearGradient
        colors={GameColors.gradient.colors}
        locations={GameColors.gradient.locations}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.borderContainer}>
          {/* Borde superior e izquierdo claro para efecto embossed */}
          <View style={styles.borderTop} />
          <View style={styles.borderLeft} />
          {/* Borde inferior y derecho oscuro para efecto embossed */}
          <View style={styles.borderBottom} />
          <View style={styles.borderRight} />
          
          <View style={styles.content}>
            <Text style={[styles.icon, styles.iconText]}>{icon}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}