import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '@/constants/theme';

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
      <Text className="text-center font-body-semibold text-[14px]" style={{ color }}>
        {label}
      </Text>
    </Pressable>
  );
}
