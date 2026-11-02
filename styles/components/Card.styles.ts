import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.4)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 6,
      },
    }),
    borderWidth: 2,
    borderColor: '#fff',
  },
  cardBack: {
    backgroundColor: '#1a4d7a',
  },
  cardFront: {
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  }
});