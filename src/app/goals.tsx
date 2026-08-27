import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
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
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <OnboardingHeader step={1} total={3} onBack={() => router.back()} />
      <Text style={styles.title}>What would you like to improve?</Text>
      <Text style={styles.subtitle}>We&apos;ll personalize your insights around what matters most to you.</Text>

      <View style={styles.list}>
        {GOALS.map((g) => {
          const active = g.key === selected;
          return (
            <Pressable key={g.key} onPress={() => setSelected(g.key)} style={[styles.option, active && styles.optionActive]}>
              <Text style={{ fontSize: 22 }}>{g.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>{g.title}</Text>
                <Text style={styles.optionDesc}>{g.desc}</Text>
              </View>
              {active && (
                <View style={styles.check}>
                  <Text style={styles.checkMark}>✓</Text>
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
    lineHeight: 21,
    color: colors.textMuted,
    marginBottom: 20,
  },
  list: { gap: 10 },
  option: {
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  optionActive: {
    borderWidth: 2,
    borderColor: colors.green,
    backgroundColor: colors.greenBg,
  },
  optionTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.text,
  },
  optionDesc: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 2,
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
