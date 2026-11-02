import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    minWidth: 85,
    position: 'relative',
  },
  shadowLayer: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: -2,
    bottom: -2,
    borderRadius: 6,
    backgroundColor: GameColors.shadowDark,
    zIndex: 0,
  },
  gradient: {
    borderRadius: 6,
    padding: 2,
    zIndex: 1,
  },
  borderContainer: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: GameColors.borderDark,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: GameColors.borderLight,
    opacity: 0.6,
  },
  borderLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 1,
    backgroundColor: GameColors.borderLight,
    opacity: 0.6,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: GameColors.shadowDark,
    opacity: 0.8,
  },
  borderRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 1,
    backgroundColor: GameColors.shadowDark,
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconText: {
    marginRight: 4,
  },
  icon: {
    fontSize: 16,
  },
  value: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 11,
    color: '#FFFFFF',
    ...Platform.select({
      web: {
        textShadow: '1px 1px 0px ' + GameColors.textOutline,
      } as any,
      default: {
        textShadowColor: GameColors.textOutline,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
      },
    }),
  },
});