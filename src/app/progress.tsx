import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { BottomNav } from '@/components/ui';

const BARS = [
  { label: 'Mon', pct: 66, color: '#8FBF9F' },
  { label: 'Tue', pct: 76, color: colors.green },
  { label: 'Wed', pct: 71, color: '#8FBF9F' },
  { label: 'Thu', pct: 10, color: colors.trackLight, muted: true },
  { label: 'Fri', pct: 82, color: colors.green },
  { label: 'Sat', pct: 48, color: '#D9C58F' },
  { label: 'Sun', pct: 10, color: colors.trackLight, muted: true },
];

export default function Progress() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="px-[24px] pb-[8px]" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-[16px]">
          <Text className="font-headline text-[22px] text-text">Your Progress</Text>
          <View className="flex-row bg-track-light rounded-[14px] p-[3px]">
            <View
              className="py-[6px] px-[13px] rounded-[11px] bg-white"
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 1 },
              }}
            >
              <Text className="font-body-semibold text-[12px] text-text">7 Days</Text>
            </View>
            <Pressable onPress={() => router.push('/paywall')}>
              <Text className="font-body-medium text-[12px] text-text-fainter py-[6px] px-[13px]">30 Days 🔒</Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-row gap-[10px] mb-[12px]">
          <View className="bg-white border border-border rounded-[20px] p-[16px]" style={{ flex: 1.4 }}>
            <Text className="font-body-semibold text-[10.5px] tracking-[1.1px] text-text-faint mb-[6px]">WEEKLY BALANCE</Text>
            <View className="flex-row items-baseline gap-[8px]">
              <Text className="font-headline text-[40px] text-text leading-[40px]">78</Text>
              <View className="bg-green-bg rounded-[10px] py-[3px] px-[8px]">
                <Text className="font-body-semibold text-[12px] text-green">+4 vs last week</Text>
              </View>
            </View>
          </View>
          <View className="flex-1 bg-white border border-border rounded-[20px] p-[16px]">
            <Text className="font-body-semibold text-[10.5px] tracking-[1.1px] text-text-faint mb-[6px]">TRACKED</Text>
            <Text className="font-headline text-[40px] text-text leading-[40px]">
              5<Text className="text-[19px] text-text-fainter">/7</Text>
            </Text>
          </View>
        </View>

        <View className="bg-white border border-border rounded-[20px] p-[16px] pt-[18px] pb-[14px] mb-[12px]">
          <View className="flex-row items-end justify-between gap-[8px] h-[96px]">
            {BARS.map((b) => (
              <View key={b.label} className="flex-1 items-center gap-[6px] h-full justify-end">
                <View className="w-full max-w-[26px] flex-1 justify-end">
                  <View className="w-full rounded-[8px] min-h-[6px]" style={{ height: `${b.pct}%`, backgroundColor: b.color }} />
                </View>
                <Text className={`font-body-medium text-[10px] ${b.muted ? 'text-[#C4CBBE]' : 'text-text-fainter'}`}>{b.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="flex-row gap-[10px] mb-[12px]">
          <View className="flex-1 bg-white border border-border rounded-[18px] p-[14px]">
            <Text style={{ fontSize: 19, marginBottom: 6 }}>💪</Text>
            <Text className="font-body-semibold text-[10.5px] tracking-[1.1px] text-text-faint mb-[6px]">STRONGEST AREA</Text>
            <Text className="font-body-semibold text-[14px] text-text mb-[2px]">Protein</Text>
            <Text className="font-body text-[11.5px] leading-[16px] text-text-faint">Consistent on 5 tracked days.</Text>
          </View>
          <View className="flex-1 bg-white border border-border rounded-[18px] p-[14px]">
            <Text style={{ fontSize: 19, marginBottom: 6 }}>🌾</Text>
            <Text className="font-body-semibold text-[10.5px] tracking-[1.1px] text-text-faint mb-[6px]">FOCUS AREA</Text>
            <Text className="font-body-semibold text-[14px] text-text mb-[2px]">Fiber</Text>
            <Text className="font-body text-[11.5px] leading-[16px] text-text-faint">Lower than ideal on 3 days.</Text>
          </View>
        </View>

        <Pressable
          className="bg-green-dark rounded-[18px] p-[15px] px-[16px] flex-row items-center gap-[12px]"
          onPress={() => router.push('/weekly-insight')}
        >
          <Text style={{ fontSize: 18 }}>✨</Text>
          <View className="flex-1">
            <Text className="font-body-semibold text-[13.5px] text-white">We found a pattern</Text>
            <Text className="font-body text-[12px] text-[rgba(255,255,255,0.75)]">Your weekday meals tend to be balanced…</Text>
          </View>
          <Text className="text-[14px] text-[rgba(255,255,255,0.9)]">›</Text>
        </Pressable>
      </ScrollView>

      <BottomNav active="progress" />
    </SafeAreaView>
  );
}
