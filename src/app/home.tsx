import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BalanceRing, BottomNav } from '@/components/ui';

const TODAY_STATS: { label: string; status: string; tone: 'green' | 'amber' }[] = [
  { label: 'Protein', status: 'Good', tone: 'green' },
  { label: 'Fiber', status: 'Moderate', tone: 'amber' },
  { label: 'Vegetables', status: 'Good', tone: 'green' },
  { label: 'Sugar', status: 'Low', tone: 'green' },
];

const MEALS = [
  { emoji: '🍳', name: 'Breakfast', time: '8:12 AM', score: 76 },
  { emoji: '🍗', name: 'Lunch', time: '12:48 PM', score: 84 },
  { emoji: '🍊', name: 'Snack', time: '4:03 PM', score: 71 },
];

export default function Home() {
  const router = useRouter();
  const score = 81;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="px-[24px] pb-[8px]" showsVerticalScrollIndicator={false}>
        <View className="mb-[16px]">
          <Text className="font-headline text-[22px] text-text">Good evening, Alex</Text>
          <Text className="font-body text-[13px] text-text-faint">Wednesday, Aug 26</Text>
        </View>

        <View className="bg-white border border-border rounded-[24px] p-[18px] mb-[12px]">
          <View className="flex-row items-center gap-[18px]">
            <BalanceRing size={110} strokeWidth={10} score={score}>
              <Text className="font-headline text-[34px] text-text leading-[34px]">{score}</Text>
              <Text className="font-body-semibold text-[10px]" style={{ color: '#5C8A6E' }}>
                Balanced
              </Text>
            </BalanceRing>
            <View className="flex-1 gap-[7px]">
              <Text className="font-body-semibold text-[12px] tracking-[1.1px] text-text-faint">TODAY&apos;S BALANCE</Text>
              {TODAY_STATS.map((s) => (
                <View key={s.label} className="flex-row justify-between">
                  <Text className="font-body-medium text-[12.5px] text-text-muted">{s.label}</Text>
                  <Text className={`font-body-semibold text-[12.5px] ${s.tone === 'green' ? 'text-green' : 'text-amber-text'}`}>
                    {s.status}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Text className="font-body text-[12px] text-text-faint mt-[12px]">3 meals logged — a good picture of your day.</Text>
        </View>

        <View className="bg-green-bg border border-green-border rounded-[18px] p-[14px] flex-row gap-[12px] items-center mb-[16px]">
          <Text style={{ fontSize: 21 }}>🥗</Text>
          <View className="flex-1">
            <Text className="font-body-semibold text-[10.5px] tracking-[1.3px] mb-[2px]" style={{ color: '#5C8A6E' }}>
              YOUR NEXT BEST MOVE
            </Text>
            <Text className="font-body-semibold text-[14px] text-text">Add some vegetables to dinner.</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-baseline mb-[10px]">
          <Text className="font-body-semibold text-[15px] text-text">Today&apos;s Meals</Text>
          <Pressable onPress={() => router.push('/history')}>
            <Text className="font-body-semibold text-[12px] text-green">See all</Text>
          </Pressable>
        </View>

        <View className="gap-[8px]">
          {MEALS.map((m) => (
            <View key={m.name} className="bg-white border border-border rounded-[16px] py-[12px] px-[14px] flex-row items-center gap-[12px]">
              <Text style={{ fontSize: 19 }}>{m.emoji}</Text>
              <View className="flex-1">
                <Text className="font-body-semibold text-[13.5px] text-text">{m.name}</Text>
                <Text className="font-body text-[11.5px] text-text-faint">{m.time}</Text>
              </View>
              <Text className={`font-headline-bold text-[15px] ${m.score >= 75 ? 'text-green' : 'text-amber'}`}>{m.score}</Text>
            </View>
          ))}
          <Pressable
            className="border-[1.5px] border-dashed-border rounded-[16px] py-[12px] px-[14px] flex-row items-center gap-[12px]"
            style={{ borderStyle: 'dashed' }}
            onPress={() => router.push('/scan/camera')}
          >
            <Text style={{ fontSize: 19 }}>🍽️</Text>
            <Text className="flex-1 font-body-semibold text-[13.5px] text-text-faint">Dinner</Text>
            <Text className="font-body-semibold text-[12.5px] text-green">+ Add</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomNav active="home" />
    </SafeAreaView>
  );
}
