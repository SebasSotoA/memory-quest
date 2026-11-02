/**
 * Colores del juego Memory Quest
 * Basados en la especificación de desc_mainUI.md
 */

export const GameColors = {
  // Background checkerboard
  backgroundDark: '#0B3C1D',
  backgroundLight: '#0F5529', // ~15% más brillante que backgroundDark
  
  // Gradiente dorado (para overlay y badges)
  gradient: {
    stops: [
      { offset: '0%', color: '#BD9A4B', opacity: 1 },
      { offset: '0%', color: '#ECD8A3', opacity: 1 },
      { offset: '3%', color: '#FBF5D1', opacity: 1 },
      { offset: '6%', color: '#EAC885', opacity: 1 },
      { offset: '17%', color: '#FFF2DB', opacity: 1 },
      { offset: '96%', color: '#94641E', opacity: 1 },
      { offset: '99%', color: '#FFF0DA', opacity: 1 },
    ],
    // Colores individuales para uso en badges
    colors: ['#BD9A4B', '#ECD8A3', '#FBF5D1', '#EAC885', '#FFF2DB', '#94641E', '#FFF0DA'],
    locations: [0, 0, 0.03, 0.06, 0.17, 0.96, 0.99],
  },
  
  // Bordes
  borderDark: '#5C3A0E',
  borderLight: '#8B6B2E', // Borde claro para efecto 3D
  
  // Texto
  textCream: '#FFF2DB',
  textBeige: '#FBF5D1',
  textGold: '#FFD700', // Dorado vibrante para título principal
  textGoldDark: '#D4AF37', // Dorado oscuro para sombra
  textBrown: '#8B6914', // Marrón/dorado para subtítulo
  textOutline: '#2C1A0A', // Outline oscuro para texto
  
  // Footer
  footerText: '#FFF2DB',
  
  // Efectos 3D
  shadowDark: '#3A2510', // Sombra oscura para efecto embossed
  highlightLight: '#FFF8E7', // Highlight claro para efecto embossed
};

