import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { OnboardingHeader, PrimaryButton, TextButton } from '@/components/ui';
import { useUserPreferencesStore } from '@/stores/user-preferences-store';

const DIETS = ['No preference', 'Vegetarian', 'Vegan', 'Pescatarian', 'Halal'] as const;

export default function DietaryPreference() {
  const router = useRouter();
  const selected = useUserPreferencesStore((s) => s.diet);
  const setSelected = useUserPreferencesStore((s) => s.setDiet);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <OnboardingHeader step={2} total={3} onBack={() => router.back()} />
      <Text style={styles.title}>How do you usually eat?</Text>
      <Text style={styles.subtitle}>You can change this anytime.</Text>

      <View style={styles.list}>
        {DIETS.map((diet) => {
          const active = diet === selected;
          return (
            <Pressable key={diet} onPress={() => setSelected(diet)} style={[styles.option, active && styles.optionActive]}>
              <Text style={[styles.optionLabel, active && { fontFamily: fonts.bodySemiBold }]}>{diet}</Text>
              {active && (
                <View style={styles.check}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={{ marginTop: 'auto', gap: 14 }}>
        <PrimaryButton label="Continue" onPress={() => router.push('/how-it-works')} />
        <TextButton label="Skip" color={colors.textFaint} onPress={() => router.push('/how-it-works')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 24 },
  title: {
    fontFamily: fonts.headline,
    fontSize: 27,
    lineHeight: 31,
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
  },
  list: { gap: 10 },
  option: {
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionActive: {
    borderWidth: 2,
    borderColor: colors.green,
    backgroundColor: colors.greenBg,
  },
  optionLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.text,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: colors.white, fontSize: 12, fontFamily: fonts.bodySemiBold },
});
