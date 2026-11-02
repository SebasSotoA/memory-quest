import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    minWidth: 200,
    minHeight: 120,
    position: 'relative',
    marginVertical: 16,
  },
  shadowLayer: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    borderRadius: 8,
    backgroundColor: GameColors.shadowDark,
    zIndex: 0,
  },
  gradient: {
    borderRadius: 8,
    padding: 3,
    zIndex: 1,
  },
  borderContainer: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GameColors.borderDark,
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: GameColors.borderLight,
    opacity: 0.6,
  },
  borderLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 2,
    backgroundColor: GameColors.borderLight,
    opacity: 0.6,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: GameColors.shadowDark,
    opacity: 0.8,
  },
  borderRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 2,
    backgroundColor: GameColors.shadowDark,
    opacity: 0.8,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  label: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    ...Platform.select({
      web: {
        textShadow: '2px 2px 0px ' + GameColors.textOutline,
      } as any,
      default: {
        textShadowColor: GameColors.textOutline,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0,
      },
    }),
  },
  value: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 32,
    color: '#FFD700',
    ...Platform.select({
      web: {
        textShadow: '3px 3px 0px ' + GameColors.textOutline,
      } as any,
      default: {
        textShadowColor: GameColors.textOutline,
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 0,
      },
    }),
  },
});