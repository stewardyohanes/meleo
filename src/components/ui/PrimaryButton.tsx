import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

export function PrimaryButton({
  label,
  onPress,
  icon,
  style,
  disabled,
}: {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="h-[54px] rounded-[27px] bg-green flex-row gap-[9px] items-center justify-center"
      style={[style, disabled && { opacity: 0.6 }]}
    >
      {icon}
      <Text className="text-white font-body-semibold text-[16px]">{label}</Text>
    </Pressable>
  );
}
