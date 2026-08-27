import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { OnboardingHeader, PrimaryButton, TextButton } from '@/components/ui';
import { useUserPreferencesStore } from '@/stores/user-preferences-store';

const DIETS = ['No preference', 'Vegetarian', 'Vegan', 'Pescatarian', 'Halal'] as const;

export default function DietaryPreference() {
  const router = useRouter();
  const selected = useUserPreferencesStore((s) => s.diet);
  const setSelected = useUserPreferencesStore((s) => s.setDiet);

  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px]" edges={['top', 'bottom']}>
      <OnboardingHeader step={2} total={3} onBack={() => router.back()} />
      <Text className="font-headline text-[27px] leading-[31px] text-text tracking-[-0.3px] mb-[8px]">
        How do you usually eat?
      </Text>
      <Text className="font-body text-[14px] text-text-muted mb-[20px]">You can change this anytime.</Text>

      <View className="gap-[10px]">
        {DIETS.map((diet) => {
          const active = diet === selected;
          return (
            <Pressable
              key={diet}
              onPress={() => setSelected(diet)}
              className={`rounded-[18px] p-[16px] flex-row items-center justify-between ${
                active ? 'border-2 border-green bg-green-bg' : 'border-[1.5px] border-border-strong bg-white'
              }`}
            >
              <Text className={`text-[15px] text-text ${active ? 'font-body-semibold' : 'font-body-medium'}`}>{diet}</Text>
              {active && (
                <View className="w-[22px] h-[22px] rounded-[11px] bg-green items-center justify-center">
                  <Text className="text-white text-[12px] font-body-semibold">✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <View className="mt-auto gap-[14px]">
        <PrimaryButton label="Continue" onPress={() => router.push('/how-it-works')} />
        <TextButton label="Skip" color={colors.textFaint} onPress={() => router.push('/how-it-works')} />
      </View>
    </SafeAreaView>
  );
}
