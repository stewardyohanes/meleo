import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BottomNav } from '@/components/ui';

const DAYS = [
  { label: 'Thu', num: 20 },
  { label: 'Fri', num: 21 },
  { label: 'Sat', num: 22 },
  { label: 'Sun', num: 23 },
  { label: 'Mon', num: 24 },
  { label: 'Tue', num: 25 },
  { label: 'Wed', num: 26, active: true },
];

const MEALS = [
  { emoji: '🍳', name: 'Breakfast', time: '8:12 AM', detail: 'Oatmeal, banana, coffee', score: 76 },
  { emoji: '🍗', name: 'Lunch', time: '12:48 PM', detail: 'Grilled chicken rice bowl', score: 84 },
  { emoji: '🍊', name: 'Snack', time: '4:03 PM', detail: 'Orange, yogurt', score: 69 },
];

export default function History() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="px-[24px] pb-[8px]" showsVerticalScrollIndicator={false}>
        <Text className="font-headline text-[22px] text-text mb-[16px]">History</Text>

        <View className="flex-row gap-[7px] mb-[20px]">
          {DAYS.map((d) => (
            <View
              key={d.label}
              className={`flex-1 items-center gap-[4px] py-[9px] rounded-[14px] ${d.active ? 'bg-green' : ''}`}
            >
              <Text className={`font-body-medium text-[10px] ${d.active ? 'text-[rgba(255,255,255,0.75)]' : 'text-text-fainter'}`}>
                {d.label}
              </Text>
              <Text
                className={`font-body-semibold text-[14px] ${
                  d.active ? 'text-white' : d.num % 2 === 1 ? 'text-border-strong' : 'text-text-muted'
                }`}
              >
                {d.num}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center justify-between mb-[14px]">
          <View>
            <Text className="font-body-semibold text-[16px] text-text">Wednesday, Aug 26</Text>
            <Text className="font-body text-[12px] text-text-faint">3 meals logged</Text>
          </View>
          <View className="flex-row items-center gap-[8px] bg-white border border-border rounded-[16px] py-[8px] px-[13px]">
            <View className="w-[30px] h-[30px] rounded-[15px] border-[3px] border-green bg-green-bg items-center justify-center">
              <Text className="font-headline-bold text-[10.5px] text-text">81</Text>
            </View>
            <Text className="font-body-semibold text-[12px] text-green-dark">Balanced</Text>
          </View>
        </View>

        <View className="gap-[9px]">
          {MEALS.map((m) => (
            <View key={m.name} className="bg-white border border-border rounded-[18px] p-[13px] px-[15px] flex-row items-center gap-[13px]">
              <View className="w-[46px] h-[46px] rounded-[14px] bg-cream items-center justify-center">
                <Text style={{ fontSize: 22 }}>{m.emoji}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-body-semibold text-[14.5px] text-text">{m.name}</Text>
                <Text className="font-body text-[12px] text-text-faint mt-[1px]">
                  {m.time} · {m.detail}
                </Text>
              </View>
              <Text className={`font-headline-bold text-[17px] ${m.score >= 75 ? 'text-green' : 'text-amber'}`}>{m.score}</Text>
            </View>
          ))}
        </View>

        <Pressable
          className="mt-[14px] rounded-[18px] p-[15px] px-[16px] flex-row items-center gap-[12px] bg-green-dark"
          onPress={() => router.push('/paywall')}
        >
          <Text style={{ fontSize: 18 }}>🔒</Text>
          <Text className="flex-1 font-body-medium text-[13px] leading-[18px] text-white">
            Unlock your full history with <Text className="font-body-bold">Meleo+</Text>
          </Text>
          <View className="bg-[rgba(255,255,255,0.16)] rounded-[14px] py-[7px] px-[12px]">
            <Text className="font-body-semibold text-[12.5px] text-white">Upgrade</Text>
          </View>
        </Pressable>
      </ScrollView>

      <BottomNav active="history" />
    </SafeAreaView>
  );
}
