import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameColors } from '@/constants/gameColors';
import { styles } from '@/styles/components/CreditsContent.styles';

/**
 * Componente de contenido de información técnica
 * Muestra información sobre las tecnologías usadas
 */
export function MoreContent() {
  return (
    <View style={styles.container}>
      {/* Sombra para efecto 3D */}
      <View style={styles.shadowLayer} />
      {/* Capa principal con gradiente */}
      {/* @ts-expect-error - expo-linear-gradient compatibility with React 19 */}
      <LinearGradient
        colors={GameColors.gradient.colors}
        locations={GameColors.gradient.locations}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.borderContainer}>
          {/* Borde superior e izquierdo claro para efecto embossed */}
          <View style={styles.borderTop} />
          <View style={styles.borderLeft} />
          {/* Borde inferior y derecho oscuro para efecto embossed */}
          <View style={styles.borderBottom} />
          <View style={styles.borderRight} />
          
          <View style={styles.content}>
            <Text style={styles.title}>TECHNOLOGY</Text>
            
            <View style={styles.section}>
              <Text style={styles.text}>Built with</Text>
              <Text style={styles.highlightText}>Expo</Text>
              <Text style={styles.text}>and</Text>
              <Text style={styles.highlightText}>React Native</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>Powered by modern</Text>
              <Text style={styles.text}>cross-platform</Text>
              <Text style={styles.text}>development tools</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>Crafted with care</Text>
              <Text style={styles.text}>for all platforms</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

