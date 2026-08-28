import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BalanceRing, BottomNav } from '@/components/ui';
import { useDailyBalance, useWeeklyProgress } from '@/features/daily-balance/hooks/use-daily-balance';
import { useMeals } from '@/features/meals/hooks/use-meals';

function todayISODate(): string {
  return new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, matches backend's date format
}

export default function Home() {
  const router = useRouter();
  const today = todayISODate();
  const { data: dailyBalance } = useDailyBalance(today);
  useWeeklyProgress();
  const { data: meals } = useMeals(5, 0);

  const score = dailyBalance?.overallScore ?? 0;
  const classification = dailyBalance?.classification ?? 'No meals yet';
  const mealCount = dailyBalance?.mealCount ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="px-[24px] pb-[8px]" showsVerticalScrollIndicator={false}>
        <View className="mb-[16px]">
          <Text className="font-headline text-[22px] text-text">Good to see you</Text>
          <Text className="font-body text-[13px] text-text-faint">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
          </Text>
        </View>

        <View className="bg-white border border-border rounded-[24px] p-[18px] mb-[12px]">
          <View className="flex-row items-center gap-[18px]">
            <BalanceRing size={110} strokeWidth={10} score={score}>
              <Text className="font-headline text-[34px] text-text leading-[34px]">{score}</Text>
              <Text className="font-body-semibold text-[10px]" style={{ color: '#5C8A6E' }}>
                {classification}
              </Text>
            </BalanceRing>
            <View className="flex-1 gap-[7px]">
              <Text className="font-body-semibold text-[12px] tracking-[1.1px] text-text-faint">TODAY&apos;S BALANCE</Text>
              {/* Per-nutrient breakdown (protein/fiber/vegetables/sugar) has no
                  backing endpoint — /daily-balance only returns an overall score. */}
            </View>
          </View>
          <Text className="font-body text-[12px] text-text-faint mt-[12px]">
            {mealCount} meal{mealCount === 1 ? '' : 's'} logged today.
          </Text>
        </View>

        {dailyBalance?.recommendation && (
          <View className="bg-green-bg border border-green-border rounded-[18px] p-[14px] flex-row gap-[12px] items-center mb-[16px]">
            <Text style={{ fontSize: 21 }}>🥗</Text>
            <View className="flex-1">
              <Text className="font-body-semibold text-[10.5px] tracking-[1.3px] mb-[2px]" style={{ color: '#5C8A6E' }}>
                YOUR NEXT BEST MOVE
              </Text>
              <Text className="font-body-semibold text-[14px] text-text">{dailyBalance.recommendation.component}</Text>
            </View>
          </View>
        )}

        <View className="flex-row justify-between items-baseline mb-[10px]">
          <Text className="font-body-semibold text-[15px] text-text">Recent Meals</Text>
          <Pressable onPress={() => router.push('/history')}>
            <Text className="font-body-semibold text-[12px] text-green">See all</Text>
          </Pressable>
        </View>

        <View className="gap-[8px]">
          {meals?.map((m) => (
            <View key={m.id} className="bg-white border border-border rounded-[16px] py-[12px] px-[14px] flex-row items-center gap-[12px]">
              <Text style={{ fontSize: 19 }}>🍽️</Text>
              <View className="flex-1">
                <Text className="font-body-semibold text-[13.5px] text-text">Meal</Text>
                <Text className="font-body text-[11.5px] text-text-faint">
                  {new Date(m.eatenAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          ))}
          <Pressable
            className="border-[1.5px] border-dashed-border rounded-[16px] py-[12px] px-[14px] flex-row items-center gap-[12px]"
            style={{ borderStyle: 'dashed' }}
            onPress={() => router.push('/scan/camera')}
          >
            <Text style={{ fontSize: 19 }}>🍽️</Text>
            <Text className="flex-1 font-body-semibold text-[13.5px] text-text-faint">Log a meal</Text>
            <Text className="font-body-semibold text-[12.5px] text-green">+ Add</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomNav active="home" />
    </SafeAreaView>
  );
}
