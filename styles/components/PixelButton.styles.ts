import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'relative',
    marginVertical: 8,
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
  shadowLayerLarge: {
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    borderRadius: 10,
  },
  largeButton: {
    minWidth: 220,
    minHeight: 65,
    zIndex: 1,
  },
  smallButton: {
    minWidth: 120,
    minHeight: 50,
    zIndex: 1,
  },
  gradient: {
    flex: 1,
    borderRadius: 8,
    padding: 2,
  },
  borderContainer: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GameColors.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  borderContainerSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: GameColors.borderLight,
    opacity: 0.7,
  },
  borderLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 2,
    backgroundColor: GameColors.borderLight,
    opacity: 0.7,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: GameColors.shadowDark,
    opacity: 0.9,
  },
  borderRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 2,
    backgroundColor: GameColors.shadowDark,
    opacity: 0.9,
  },
  pressedBorder: {
    transform: [{ translateY: 2 }],
  },
  pressedBorderBottom: {
    opacity: 1,
    height: 3,
  },
  pressedBorderRight: {
    opacity: 1,
    width: 3,
  },
  largeText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 16,
    color: '#FFFFFF',
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
    letterSpacing: 1,
    zIndex: 2,
  },
  smallText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: GameFonts.sizes.badge,
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
    zIndex: 2,
  },
  pressedText: {
    opacity: 0.95,
  },
  pressedContainer: {
    opacity: 0.95,
  },
  pressedButton: {
    opacity: 0.98,
  },
  imageButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButtonContainerSmall: {
    marginHorizontal: 6,
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    // Estilos aplicados dinámicamente
  },
  imageBase: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  imagePressedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  largeImageButton: {
    width: 240,
    height: 70,
  },
  smallImageButton: {
    width: 140,
    height: 50,
  },
});