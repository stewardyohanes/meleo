import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

export function PrimaryButton({
  label,
  onPress,
  icon,
  style,
}: {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[54px] rounded-[27px] bg-green flex-row gap-[9px] items-center justify-center"
      style={style}
    >
      {icon}
      <Text className="text-white font-body-semibold text-[16px]">{label}</Text>
    </Pressable>
  );
}
