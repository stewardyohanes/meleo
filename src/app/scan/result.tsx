import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { BalanceRing, ImagePlaceholder, PrimaryButton, StatusPill, TextButton } from '@/components/ui';

type Tone = 'green' | 'amber' | 'terracotta';

const BREAKDOWN: { label: string; status: string; tone: Tone }[] = [
  { label: 'Protein', status: 'Good', tone: 'green' },
  { label: 'Vegetables', status: 'Good', tone: 'green' },
  { label: 'Fiber', status: 'Could use more', tone: 'amber' },
  { label: 'Sodium', status: 'High', tone: 'terracotta' },
];

const DOT_CLASS: Record<Tone, string> = { green: 'bg-green', amber: 'bg-amber', terracotta: 'bg-terracotta' };
const TEXT_CLASS: Record<Tone, string> = { green: 'text-green', amber: 'text-amber-text', terracotta: 'text-terracotta-text' };

const NUTRITION = [
  { label: 'Calories', value: '~520–620 kcal' },
  { label: 'Protein', value: '~34g' },
  { label: 'Carbs', value: '~72g' },
  { label: 'Fat', value: '~18g' },
  { label: 'Fiber', value: '~7g' },
];

export default function Result() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px] pt-[10px]" edges={['top', 'bottom']}>
      <ScrollView contentContainerClassName="flex-grow" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-[12px] mb-[14px]">
          <ImagePlaceholder emoji="🍗" radius={14} style={{ width: 44, height: 44 }} />
          <View className="flex-1">
            <Text className="font-body-semibold text-[15px] text-text">Lunch</Text>
            <Text className="font-body text-[12px] text-text-faint">Today · 12:48 PM</Text>
          </View>
          <Pressable onPress={() => router.replace('/home')} hitSlop={12}>
            <Text className="text-[17px] text-text-faint">✕</Text>
          </Pressable>
        </View>

        <View className="items-center mb-[14px]">
          <Text className="font-body-semibold text-[10.5px] tracking-[1.6px] text-text-faint mb-[10px]">YOUR MEAL BALANCE</Text>
          <BalanceRing size={172} strokeWidth={13} score={78}>
            <Text className="font-headline text-[58px] text-text tracking-[-1px]">78</Text>
            <StatusPill label="Balanced" />
          </BalanceRing>
        </View>

        <View className="flex-row flex-wrap gap-[8px] mb-[12px]">
          {BREAKDOWN.map((b) => (
            <View key={b.label} className="w-[48%] bg-white border border-border rounded-[15px] p-[11px] flex-row items-center gap-[9px]">
              <View className={`w-[8px] h-[8px] rounded-[4px] ${DOT_CLASS[b.tone]}`} />
              <View>
                <Text className="font-body-semibold text-[13px] text-text">{b.label}</Text>
                <Text className={`font-body text-[11px] ${TEXT_CLASS[b.tone]}`}>{b.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="bg-green-bg border border-green-border rounded-[18px] p-[15px] flex-row gap-[13px] items-start mb-[10px]">
          <Text style={{ fontSize: 22 }}>🍎</Text>
          <View className="flex-1">
            <Text className="font-body-semibold text-[10.5px] tracking-[1.3px] text-[#5C8A6E] mb-[3px]">ONE EASY IMPROVEMENT</Text>
            <Text className="font-body-semibold text-[14.5px] text-text mb-[2px]">Add some fruit later today.</Text>
            <Text className="font-body text-[12.5px] leading-[18px] text-text-muted">
              It&apos;ll help bring your fiber intake closer to your daily target.
            </Text>
          </View>
        </View>

        <Pressable className="bg-white border border-border rounded-[16px] p-[14px]" onPress={() => setExpanded((v) => !v)}>
          <View className="flex-row items-center justify-between">
            <Text className="font-body-semibold text-[13.5px] text-text-muted">Estimated Nutrition</Text>
            <Text className="text-border-strong text-[16px]">{expanded ? '⌃' : '⌄'}</Text>
          </View>
          {expanded && (
            <View className="mt-[12px] gap-[8px]">
              {NUTRITION.map((n) => (
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

        <View className="mt-auto gap-[10px] pt-[16px]">
          <PrimaryButton label="Done" onPress={() => router.replace('/home')} style={{ height: 52, borderRadius: 26 }} />
          <TextButton label="Edit Meal" color={colors.textFaint} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
