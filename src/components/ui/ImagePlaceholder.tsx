import { Text, View, type StyleProp, type ViewStyle } from 'react-native';

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
    <View className="bg-cream items-center justify-center overflow-hidden" style={[{ borderRadius: radius }, style]}>
      <Text style={{ fontSize: 32 }}>{emoji}</Text>
    </View>
  );
}
