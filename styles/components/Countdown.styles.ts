import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
      overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: GameColors.backgroundDark,
    borderWidth: 4,
    borderColor: GameColors.textCream,
    ...Platform.select({
      web: {
        boxShadow: '0 0 20px rgba(255, 242, 219, 0.5)',
      } as any,
      default: {
        shadowColor: GameColors.textCream,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
      },
    }),
  },
  countText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 64,
    color: GameColors.textCream,
    textAlign: 'center',
    ...Platform.select({
      web: {
        textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8), -1px -1px 0px rgba(255, 242, 219, 0.3)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 0,
      },
    }),
  },
});