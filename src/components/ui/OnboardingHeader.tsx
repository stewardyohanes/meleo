import { Pressable, Text, View } from 'react-native';
import { OnboardingProgress } from './OnboardingProgress';

export function OnboardingHeader({ step, total, onBack }: { step: number; total: number; onBack?: () => void }) {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Pressable onPress={onBack} hitSlop={12}>
          <Text className="text-[22px] text-text-muted">‹</Text>
        </Pressable>
        <Text className="font-body-semibold text-[11px] tracking-[1.1px] text-text-faint">
          {step} OF {total}
        </Text>
      </View>
      <OnboardingProgress step={step} total={total} />
    </View>
  );
}
