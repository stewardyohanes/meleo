import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { PrimaryButton, TextButton } from '@/components/ui';

export default function WeeklyInsight() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px] pt-[10px]" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between mb-[20px]">
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text className="text-[20px] text-text-muted">‹</Text>
        </Pressable>
        <Text className="font-body-semibold text-[15px] text-text">Weekly Insight</Text>
        <View className="w-[20px]" />
      </View>

      <View className="items-center mb-[20px]">
        <Text style={{ fontSize: 34, marginBottom: 8 }}>✨</Text>
        <Text className="font-headline text-[26px] text-text tracking-[-0.3px] mb-[6px]">We found a pattern</Text>
        <Text className="font-body text-[13.5px] text-text-faint">Based on 5 tracked days this week</Text>
      </View>

      <View className="bg-white border border-border rounded-[22px] p-[20px] mb-[16px] overflow-hidden">
        <Text className="font-body-medium text-[15px] leading-[23px] text-text mb-[14px]">
          Your weekday meals tend to be balanced, but your fiber tends to drop on weekends —
        </Text>
        <View className="gap-[9px] opacity-50">
          <View className="h-[12px] rounded-[6px] bg-track" style={{ width: '96%' }} />
          <View className="h-[12px] rounded-[6px] bg-track" style={{ width: '88%' }} />
          <View className="h-[12px] rounded-[6px] bg-track" style={{ width: '92%' }} />
          <View className="flex-row gap-[8px] mt-[6px]">
            <View className="h-[56px] flex-1 rounded-[12px] bg-green-bg" />
            <View className="h-[56px] flex-1 rounded-[12px] bg-amber-bg" />
          </View>
          <View className="h-[12px] rounded-[6px] bg-track" style={{ width: '70%' }} />
        </View>
        <View className="absolute left-0 right-0 bottom-0 h-[110px] items-center justify-end pb-[16px] bg-[rgba(255,255,255,0.001)]">
          <View className="flex-row items-center gap-[8px] bg-text rounded-[18px] py-[9px] px-[16px]">
            <Text className="font-body-semibold text-[12.5px] text-white">🔒 Meleo+ insight</Text>
          </View>
        </View>
      </View>

      <View className="bg-green-bg border border-green-border rounded-[18px] p-[14px] mb-auto">
        <Text className="font-body text-[13px] leading-[19px] text-[#3a4238]">
          Go beyond individual meals and see what your habits are telling you.
        </Text>
      </View>

      <View className="mt-auto gap-[12px]">
        <PrimaryButton label="See Full Insight" onPress={() => router.push('/paywall')} />
        <TextButton label="Maybe Later" color={colors.textFaint} onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}
