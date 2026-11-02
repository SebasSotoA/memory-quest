import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { styles } from '@/styles/components/Card.styles';

// Importar la imagen de reverso de la carta
const CARD_BACK_IMAGE = require('@/assets/images/cardAssets/BackBlue1.png');

type CardProps = {
  id: string;
  imageSource: any;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large'; // Para grid responsivo
};

export function Card({ id, imageSource, isFlipped, isMatched, onPress, disabled, size = 'medium' }: CardProps) {
  const handlePress = () => {
    if (disabled || isFlipped || isMatched) return;
    onPress();
  };

  // Determinar si la carta está deshabilitada
  const isDisabled = disabled || isFlipped || isMatched;

  // Renderizar solo la cara visible - simplificado para que funcione primero
  const showFront = isFlipped || isMatched;

  return (
    <Pressable 
      onPress={handlePress} 
      disabled={isDisabled} 
      style={styles.pressable}
      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
    >
      <View style={styles.container}>
        {!showFront ? (
          // Mostrar reverso cuando la carta está boca abajo
          <View style={[styles.card, styles.cardBack]}>
            <Image
              source={CARD_BACK_IMAGE}
              style={styles.cardImage}
              contentFit="cover"
              priority="high"
            />
          </View>
        ) : (
          // Mostrar frente cuando la carta está volteada
          <View style={[styles.card, styles.cardFront]}>
            <Image
              source={imageSource}
              style={styles.cardImage}
              contentFit="cover"
              priority="high"
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}
