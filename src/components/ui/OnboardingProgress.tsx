import { View } from 'react-native';

export function OnboardingProgress({ step, total }: { step: number; total: number }) {
  return (
    <View className="flex-row gap-[6px] mt-[14px] mb-[24px]">
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} className={`h-[4px] flex-1 rounded-[2px] ${i < step ? 'bg-green' : 'bg-border-strong'}`} />
      ))}
    </View>
  );
}
