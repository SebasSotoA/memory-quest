import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Platform.select({
      web: 16,
      default: 12,
    }),
    paddingTop: Platform.select({
      web: 8,
      default: 4,
    }),
    paddingBottom: Platform.select({
      web: 8,
      default: 6,
    }),
    zIndex: 100,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  exitButtonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  levelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 14,
      default: 12,
    }),
    color: GameColors.textCream,
    textAlign: 'center',
    ...Platform.select({
      web: {
        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0,
      },
    }),
  },
  spacer: {
    width: 80,
  },
});