import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.select({
      web: 120,
      default: 110,
    }),
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 500,
    pointerEvents: 'none',
  },
  messageContainer: {
    backgroundColor: GameColors.gradient.colors[4], // '#FFF2DB'
    paddingHorizontal: Platform.select({
      web: 12,
      default: 10,
    }),
    paddingVertical: Platform.select({
      web: 6,
      default: 5,
    }),
    borderRadius: 4,
    borderWidth: 2,
    borderColor: GameColors.borderDark,
    opacity: 0.95,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
      },
    }),
  },
  messageText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 10,
      default: 9,
    }),
    color: GameColors.textOutline,
    textAlign: 'center',
    ...Platform.select({
      web: {
        textShadow: '1px 1px 0px rgba(0, 0, 0, 0.6)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
      },
    }),
  },
});