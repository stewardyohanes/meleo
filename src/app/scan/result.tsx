import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { ImagePlaceholder, BalanceRing, PrimaryButton, StatusPill, TextButton } from '@/components/ui';
import { useScanFlowStore } from '@/features/scan/store/scan-flow-store';
import type { ComponentScores, NutritionTotals } from '@/features/scan/types';

type Tone = 'green' | 'amber' | 'terracotta';

function toneForScore(score: number): { tone: Tone; status: string } {
  if (score >= 70) return { tone: 'green', status: 'Good' };
  if (score >= 50) return { tone: 'amber', status: 'Moderate' };
  return { tone: 'terracotta', status: 'Low' };
}

const DOT_CLASS: Record<Tone, string> = { green: 'bg-green', amber: 'bg-amber', terracotta: 'bg-terracotta' };
const TEXT_CLASS: Record<Tone, string> = { green: 'text-green', amber: 'text-amber-text', terracotta: 'text-terracotta-text' };

function breakdownTiles(components: ComponentScores) {
  const entries: { label: string; score: number }[] = [
    { label: 'Protein', score: components.protein ?? -1 },
    { label: 'Vegetables', score: components.fruitVeg ?? -1 },
    { label: 'Fiber', score: components.fiber ?? -1 },
    { label: 'Sodium', score: components.sodium ?? -1 },
  ];
  return entries.filter((e) => e.score >= 0).map((e) => ({ ...e, ...toneForScore(e.score) }));
}

function nutritionRows(nutrition: NutritionTotals) {
  const rows: { label: string; value: string }[] = [];
  if (nutrition.caloriesKcal != null) rows.push({ label: 'Calories', value: `~${Math.round(nutrition.caloriesKcal)} kcal` });
  if (nutrition.proteinG != null) rows.push({ label: 'Protein', value: `~${Math.round(nutrition.proteinG)}g` });
  if (nutrition.carbsG != null) rows.push({ label: 'Carbs', value: `~${Math.round(nutrition.carbsG)}g` });
  if (nutrition.totalFatG != null) rows.push({ label: 'Fat', value: `~${Math.round(nutrition.totalFatG)}g` });
  if (nutrition.fiberG != null) rows.push({ label: 'Fiber', value: `~${Math.round(nutrition.fiberG)}g` });
  if (nutrition.addedSugarG != null) rows.push({ label: 'Added Sugar', value: `~${Math.round(nutrition.addedSugarG)}g` });
  if (nutrition.sodiumMg != null) rows.push({ label: 'Sodium', value: `~${Math.round(nutrition.sodiumMg)}mg` });
  if (nutrition.saturatedFatG != null) rows.push({ label: 'Saturated Fat', value: `~${Math.round(nutrition.saturatedFatG)}g` });
  return rows;
}

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
  const tiles = breakdownTiles(meal.components);
  const nutrition = nutritionRows(meal.nutrition);

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

        {tiles.length > 0 && (
          <View className="flex-row flex-wrap gap-[8px] mb-[12px]">
            {tiles.map((t) => (
              <View key={t.label} className="w-[48%] bg-white border border-border rounded-[15px] p-[11px] flex-row items-center gap-[9px]">
                <View className={`w-[8px] h-[8px] rounded-[4px] ${DOT_CLASS[t.tone]}`} />
                <View>
                  <Text className="font-body-semibold text-[13px] text-text">{t.label}</Text>
                  <Text className={`font-body text-[11px] ${TEXT_CLASS[t.tone]}`}>{t.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {nutrition.length > 0 && (
          <Pressable className="bg-white border border-border rounded-[16px] p-[14px]" onPress={() => setExpanded((v) => !v)}>
            <View className="flex-row items-center justify-between">
              <Text className="font-body-semibold text-[13.5px] text-text-muted">Estimated Nutrition</Text>
              <Text className="text-border-strong text-[16px]">{expanded ? '⌃' : '⌄'}</Text>
            </View>
            {expanded && (
              <View className="mt-[12px] gap-[8px]">
                {nutrition.map((n) => (
                  <View key={n.label} className="flex-row justify-between">
                    <Text className="font-body text-[13px] text-[#3a4238]">{n.label}</Text>
                    <Text className="font-body-semibold text-[13px] text-[#3a4238]">{n.value}</Text>
                  </View>
                ))}
                <Text className="font-body text-[11px] text-text-faint mt-[2px]">
                  Estimates may vary based on ingredients and portion size.
                </Text>
              </View>
            )}
          </Pressable>
        )}

        <View className="mt-auto gap-[10px] pt-[16px]">
          <PrimaryButton label="Done" onPress={() => router.replace('/home')} style={{ height: 52, borderRadius: 26 }} />
          <TextButton label="Back" color={colors.textFaint} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
