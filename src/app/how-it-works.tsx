import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle, Rect } from 'react-native-svg';
import { colors, fonts } from '@/constants/theme';
import { OnboardingHeader, PrimaryButton } from '@/components/ui';

const STEPS = [
  { n: '01', emoji: '📷', title: 'Snap your meal', desc: 'Take a quick photo.' },
  { n: '02', emoji: '✨', title: 'See the balance', desc: "We'll identify your food and estimate its nutritional balance." },
  { n: '03', emoji: '💡', title: 'Know what to improve', desc: 'Get one simple suggestion.' },
];

export default function HowItWorks() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <OnboardingHeader step={3} total={3} onBack={() => router.back()} />
      <Text style={styles.title}>Three steps to a balanced day</Text>

      <View style={styles.list}>
        {STEPS.map((s) => (
          <View key={s.n} style={styles.step}>
            <View style={styles.stepIcon}>
              <Text style={{ fontSize: 21 }}>{s.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepNum}>{s.n}</Text>
              <Text style={styles.stepTitle}>{s.title}</Text>
              <Text style={styles.stepDesc}>{s.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 'auto', gap: 12 }}>
        <PrimaryButton
          label="Scan My First Meal"
          onPress={() => router.push('/scan/camera')}
          icon={
            <Svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
              <Rect x={3} y={7} width={18} height={13} rx={3} />
              <Circle cx={12} cy={13} r={4} />
              <Rect x={9} y={3.5} width={6} height={3.5} rx={1.5} />
            </Svg>
          }
        />
        <Text style={styles.footnote}>We&apos;ll ask for camera access when you&apos;re ready.</Text>
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
    marginBottom: 30,
  },
  list: { gap: 14 },
  step: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  stepIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    color: colors.textFaint,
    marginBottom: 3,
  },
  stepTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.text,
    marginBottom: 3,
  },
  stepDesc: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted,
  },
  footnote: {
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: 11.5,
    color: colors.textFaint,
  },
});
