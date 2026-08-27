import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { OnboardingHeader, PrimaryButton } from '@/components/ui';
import { useUserPreferencesStore } from '@/stores/user-preferences-store';

const GOALS = [
  { key: 'balanced', emoji: '🥗', title: 'Eat More Balanced', desc: 'Build healthier everyday habits.' },
  { key: 'protein', emoji: '🍗', title: 'Get More Protein', desc: 'Stay more consistent with protein.' },
  { key: 'fiber', emoji: '🌾', title: 'Eat More Fiber', desc: 'Support a more balanced diet.' },
  { key: 'veggies', emoji: '🥦', title: 'Eat More Vegetables', desc: 'Add more variety to your meals.' },
  { key: 'sugar', emoji: '🍬', title: 'Reduce Added Sugar', desc: 'Become more aware of hidden sugar.' },
] as const;

export default function GoalSelection() {
  const router = useRouter();
  const selected = useUserPreferencesStore((s) => s.goal);
  const setSelected = useUserPreferencesStore((s) => s.setGoal);

  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px]" edges={['top', 'bottom']}>
      <OnboardingHeader step={1} total={3} onBack={() => router.back()} />
      <Text className="font-headline text-[27px] leading-[31px] text-text tracking-[-0.3px] mb-[8px]">
        What would you like to improve?
      </Text>
      <Text className="font-body text-[14px] leading-[21px] text-text-muted mb-[20px]">
        We&apos;ll personalize your insights around what matters most to you.
      </Text>

      <View className="gap-[10px]">
        {GOALS.map((g) => {
          const active = g.key === selected;
          return (
            <Pressable
              key={g.key}
              onPress={() => setSelected(g.key)}
              className={`rounded-[18px] p-[15px] flex-row items-center gap-[13px] ${
                active ? 'border-2 border-green bg-green-bg' : 'border-[1.5px] border-border-strong bg-white'
              }`}
            >
              <Text style={{ fontSize: 22 }}>{g.emoji}</Text>
              <View className="flex-1">
                <Text className="font-body-semibold text-[15px] text-text">{g.title}</Text>
                <Text className="font-body text-[12.5px] text-text-muted mt-[2px]">{g.desc}</Text>
              </View>
              {active && (
                <View className="w-[22px] h-[22px] rounded-[11px] bg-green items-center justify-center">
                  <Text className="text-white text-[12px] font-body-semibold">✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <PrimaryButton label="Continue" onPress={() => router.push('/diet')} style={{ marginTop: 'auto' }} />
    </SafeAreaView>
  );
}
