import React, { useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Card } from '@/types/game';
import { styles } from '@/styles/components/DiscoveredDeck.styles';

type DiscoveredDeckProps = {
  cards: Card[];
};

export function DiscoveredDeck({ cards }: DiscoveredDeckProps) {
  // Filtrar solo las cartas que están descubiertas (isMatched: true)
  // Y obtener solo una carta por par para evitar duplicados
  const discoveredCards = useMemo(() => {
    const matchedCards = cards.filter((card) => card.isMatched);
    // Agrupar por pairId y tomar solo la primera de cada par
    const uniquePairs = new Map<string, Card>();
    matchedCards.forEach((card) => {
      if (!uniquePairs.has(card.pairId)) {
        uniquePairs.set(card.pairId, card);
      }
    });
    return Array.from(uniquePairs.values());
  }, [cards]);

  if (discoveredCards.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>MAZO DESCUBIERTO</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>MAZO DESCUBIERTO</Text>
        <Text style={styles.countText}>({discoveredCards.length})</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {discoveredCards.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={card.imageSource}
                style={styles.cardImage}
                contentFit="cover"
                priority="normal"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}