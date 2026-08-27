import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fonts } from '@/constants/theme';

export function TextButton({
  label,
  onPress,
  color = colors.green,
  style,
}: {
  label: string;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text style={[styles.textButton, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textButton: {
    textAlign: 'center',
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
  },
});
