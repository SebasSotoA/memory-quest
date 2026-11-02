import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';
import { GameFonts } from '@/constants/gameFonts';
import { styles } from '@/styles/components/Title.styles';

export function Title() {
  // Dimensiones para los SVG - anchos aumentados para evitar recorte
  const subtitleWidth = 300;
  const subtitleHeight = 36;
  const titleWidth = 340;
  const titleHeight = 40;

  return (
    <View style={styles.container}>
      <View style={styles.subtitleContainer}>
        <Svg width={subtitleWidth} height={subtitleHeight} viewBox={`0 0 ${subtitleWidth} ${subtitleHeight}`} preserveAspectRatio="xMidYMid meet">
          {/* Sombra para efecto 3D */}
          <SvgText
            x="50%"
            y={subtitleHeight / 2 + 8}
            fontSize="2"
            fontFamily={GameFonts.pixelFont}
            fontWeight="normal"
            fill="#9D6631"
            textAnchor="middle"
            opacity="0.3"
          >
            <TSpan x="50%" dy="1">Mobile dev&apos;s</TSpan>
          </SvgText>
          {/* Texto principal */}
          <SvgText
            x="50%"
            y={subtitleHeight / 2 + 7}
            fontSize="24"
            fontFamily={GameFonts.pixelFont}
            fontWeight="normal"
            fill="#FFFFFF"
            textAnchor="middle"
            stroke="#9D6631"
            strokeWidth="1"
          >
            <TSpan x="50%" dy="0">Mobile dev&apos;s</TSpan>
          </SvgText>
        </Svg>
      </View>
      <View style={styles.titleContainer}>
        <Svg width={titleWidth} height={titleHeight} viewBox={`0 0 ${titleWidth} ${titleHeight}`} preserveAspectRatio="xMidYMid meet">
          <Defs>
            <LinearGradient id="titleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#BD9A4B" stopOpacity="1" />
              <Stop offset="0%" stopColor="#ECD8A3" stopOpacity="1" />
              <Stop offset="3%" stopColor="#FBF5D1" stopOpacity="1" />
              <Stop offset="6%" stopColor="#EAC885" stopOpacity="1" />
              <Stop offset="17%" stopColor="#FFF2DB" stopOpacity="1" />
              <Stop offset="96%" stopColor="#94641E" stopOpacity="1" />
              <Stop offset="99%" stopColor="#FFF0DA" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          {/* Sombra oscura para efecto 3D (abajo y derecha) */}
          <SvgText
            x="51%"
            y={titleHeight / 2 + 10}
            fontSize="24"
            fontFamily={GameFonts.pixelFont}
            fontWeight="normal"
            fill="#522B04"
            textAnchor="middle"
            opacity="0.6"
          >
            <TSpan x="51%" dy="1">MEMORY QUEST</TSpan>
          </SvgText>
          {/* Texto principal con gradiente */}
          <SvgText
            x="50%"
            y={titleHeight / 2 + 9}
            fontSize="24"
            fontFamily={GameFonts.pixelFont}
            fontWeight="normal"
            fill="url(#titleGradient)"
            textAnchor="middle"
            stroke="#522B04"
            strokeWidth="1"
          >
            <TSpan x="50%" dy="0">MEMORY QUEST</TSpan>
          </SvgText>
        </Svg>
      </View>
      <View style={styles.underline} />
    </View>
  );
}