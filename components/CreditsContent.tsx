import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameColors } from '@/constants/gameColors';
import { styles } from '@/styles/components/CreditsContent.styles';

/**
 * Componente de contenido de créditos
 * Usa el estilo de los badges del scoreboard
 */
export function CreditsContent() {
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
            <Text style={styles.title}>CREDITS</Text>
            
            <View style={styles.section}>
              <Text style={styles.text}>Forged in the halls of</Text>
              <Text style={styles.highlightText}>Fintu Technologies</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>By the hands of</Text>
              <Text style={styles.nameText}>Alfonso Jiménez</Text>
              <Text style={styles.nameText}>Sebastián Soto</Text>
              <Text style={styles.nameText}>Gregorio Carvajal</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.text}>May this work stand as proof</Text>
              <Text style={styles.text}>that even in lines of code,</Text>
              <Text style={styles.text}>there dwells a spark of magic.</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
