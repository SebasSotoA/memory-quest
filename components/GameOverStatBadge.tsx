import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameColors } from '@/constants/gameColors';
import { styles } from '@/styles/components/GameOverStatBadge.styles';

type GameOverStatBadgeProps = {
  icon: string;
  label: string;
  value: string;
};

/**
 * Componente de badge horizontal para estadísticas en Game Over
 * Similar a StatsBadge pero con layout horizontal y label
 */
export function GameOverStatBadge({ icon, label, value }: GameOverStatBadgeProps) {
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
            <View style={styles.leftSection}>
              <Text style={styles.icon}>{icon}</Text>
              <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.value}>{value}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

