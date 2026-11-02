import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { styles } from '@/styles/components/CardGrid.styles';

/**
 * Componente que renderiza un grid 2x2 de cartas
 * Usa Back Blue 1.png como card back
 * Cards estáticas (no interactivas en esta pantalla)
 */
export function CardGrid() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cardContainer}>
          <Image
            source={require('@/assets/images/cardAssets/BackBlue1.png')}
            style={styles.card}
            contentFit="contain"
          />
        </View>
        <View style={styles.cardContainer}>
          <Image
            source={require('@/assets/images/cardAssets/BackBlue1.png')}
            style={styles.card}
            contentFit="contain"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cardContainer}>
          <Image
            source={require('@/assets/images/cardAssets/BackBlue1.png')}
            style={styles.card}
            contentFit="contain"
          />
        </View>
        <View style={styles.cardContainer}>
          <Image
            source={require('@/assets/images/cardAssets/BackBlue1.png')}
            style={styles.card}
            contentFit="contain"
          />
        </View>
      </View>
    </View>
  );
}

