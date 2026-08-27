import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '@/constants/theme';

export function ImagePlaceholder({
  emoji = '🍽️',
  radius = 16,
  style,
}: {
  emoji?: string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.imagePlaceholder, { borderRadius: radius }, style]}>
      <Text style={{ fontSize: 32 }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePlaceholder: {
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
