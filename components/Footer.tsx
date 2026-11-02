import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '@/styles/components/Footer.styles';

type FooterProps = {
  onPress?: () => void;
};

/**
 * Componente del footer con copyright
 * "2025 © - Fintu Technologies"
 */
export function Footer({ onPress }: FooterProps) {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.text}>2025 © - Fintu Technologies</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>2025 © - Fintu Technologies</Text>
    </View>
  );
}

