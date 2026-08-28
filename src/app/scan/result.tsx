import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { ImagePlaceholder, BalanceRing, PrimaryButton, StatusPill, TextButton } from '@/components/ui';
import { useScanFlowStore } from '@/features/scan/store/scan-flow-store';

export default function Result() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const meal = useScanFlowStore((s) => s.mealResult);

  useEffect(() => {
    if (!meal) router.replace('/home');
  }, [meal, router]);

  if (!meal) return null;

  const eatenAt = new Date(meal.eatenAt);
  const time = eatenAt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px] pt-[10px]" edges={['top', 'bottom']}>
      <ScrollView contentContainerClassName="flex-grow" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-[12px] mb-[14px]">
          <ImagePlaceholder emoji="🍽️" radius={14} style={{ width: 44, height: 44 }} />
          <View className="flex-1">
            <Text className="font-body-semibold text-[15px] text-text">Meal saved</Text>
            <Text className="font-body text-[12px] text-text-faint">Today · {time}</Text>
          </View>
          <Pressable onPress={() => router.replace('/home')} hitSlop={12}>
            <Text className="text-[17px] text-text-faint">✕</Text>
          </Pressable>
        </View>

        <View className="items-center mb-[14px]">
          <Text className="font-body-semibold text-[10.5px] tracking-[1.6px] text-text-faint mb-[10px]">YOUR MEAL BALANCE</Text>
          <BalanceRing size={172} strokeWidth={13} score={meal.overallScore}>
            <Text className="font-headline text-[58px] text-text tracking-[-1px]">{meal.overallScore}</Text>
            <StatusPill label={meal.classification} />
          </BalanceRing>
        </View>

        {/* Per-nutrient breakdown (protein/fiber/sodium) has no backing endpoint —
            meleo-api only returns overallScore + classification for a meal. */}

        <Pressable className="bg-white border border-border rounded-[16px] p-[14px]" onPress={() => setExpanded((v) => !v)}>
          <View className="flex-row items-center justify-between">
            <Text className="font-body-semibold text-[13.5px] text-text-muted">Foods logged</Text>
            <Text className="text-border-strong text-[16px]">{expanded ? '⌃' : '⌄'}</Text>
          </View>
        </Pressable>

        <View className="mt-auto gap-[10px] pt-[16px]">
          <PrimaryButton label="Done" onPress={() => router.replace('/home')} style={{ height: 52, borderRadius: 26 }} />
          <TextButton label="Back" color={colors.textFaint} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
