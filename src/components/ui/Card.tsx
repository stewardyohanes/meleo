import { View, type StyleProp, type ViewStyle } from 'react-native';

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View className="bg-white border border-border rounded-[20px]" style={style}>
      {children}
    </View>
  );
}
