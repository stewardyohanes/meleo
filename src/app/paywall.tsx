import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { PrimaryButton } from '@/components/ui';

const FEATURES = [
  { title: 'Unlimited meal scans', desc: 'track without limits.' },
  { title: 'Personalized weekly insights', desc: 'discover patterns in how you eat.' },
  { title: 'Full history', desc: 'see how your habits change.' },
  { title: 'Advanced nutrition', desc: 'explore more detail when you want it.' },
];

export default function Paywall() {
  const router = useRouter();
  const [plan, setPlan] = useState<'annual' | 'monthly'>('annual');

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.closeRow}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>Understand your eating patterns</Text>
      <Text style={styles.subtitle}>Go beyond individual meals and see what your habits are telling you.</Text>

      <View style={{ gap: 11, marginBottom: 18 }}>
        {FEATURES.map((f) => (
          <View key={f.title} style={styles.featureRow}>
            <View style={styles.checkDot}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.featureText}>
              <Text style={{ fontFamily: fonts.bodySemiBold }}>{f.title}</Text>
              <Text style={{ color: colors.textFaint }}> — {f.desc}</Text>
            </Text>
          </View>
        ))}
      </View>

      <View style={{ gap: 10, marginBottom: 16 }}>
        <Pressable style={[styles.planCard, plan === 'annual' && styles.planCardActive]} onPress={() => setPlan('annual')}>
          <View style={styles.bestValue}>
            <Text style={styles.bestValueText}>BEST VALUE</Text>
          </View>
          <View style={[styles.radio, plan === 'annual' && styles.radioActive]}>{plan === 'annual' && <View style={styles.radioDot} />}</View>
          <View style={{ flex: 1 }}>
            <Text style={styles.planName}>Annual</Text>
            <Text style={styles.planPrice}>$39.99/year</Text>
          </View>
          <Text style={styles.planPerMo}>
            $3.33<Text style={styles.planPerMoUnit}>/mo</Text>
          </Text>
        </Pressable>

        <Pressable style={[styles.planCard, plan === 'monthly' && styles.planCardActive]} onPress={() => setPlan('monthly')}>
          <View style={[styles.radio, plan === 'monthly' && styles.radioActive]}>{plan === 'monthly' && <View style={styles.radioDot} />}</View>
          <Text style={[styles.planName, { flex: 1 }]}>Monthly</Text>
          <Text style={styles.planPerMo}>
            $7.99<Text style={styles.planPerMoUnit}>/mo</Text>
          </Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 'auto', gap: 10 }}>
        <PrimaryButton label="Start 7-Day Free Trial" onPress={() => router.back()} />
        <Text style={styles.cancelNote}>Cancel anytime.</Text>
        <View style={styles.linkRow}>
          <Text style={styles.link}>Maybe Later</Text>
          <Text style={styles.link}>Restore Purchases</Text>
        </View>
        <View style={styles.linkRow}>
          <Text style={styles.legalLink}>Terms</Text>
          <Text style={styles.legalLink}>·</Text>
          <Text style={styles.legalLink}>Privacy</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 24, paddingTop: 6 },
  closeRow: { alignItems: 'flex-end', marginBottom: 6 },
  close: { fontSize: 17, color: colors.textFaint },
  title: { fontFamily: fonts.headline, fontSize: 28, lineHeight: 32, color: colors.text, letterSpacing: -0.3, marginBottom: 6 },
  subtitle: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textMuted, marginBottom: 18 },
  featureRow: { flexDirection: 'row', gap: 11, alignItems: 'flex-start' },
  checkDot: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: colors.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkMark: { color: colors.green, fontSize: 11 },
  featureText: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: colors.text, lineHeight: 19 },
  planCard: {
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    position: 'relative',
  },
  planCardActive: { borderWidth: 2, borderColor: colors.green },
  bestValue: {
    position: 'absolute',
    top: -9,
    right: 16,
    backgroundColor: colors.green,
    borderRadius: 9,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  bestValueText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.4, color: '#fff' },
  radio: { width: 21, height: 21, borderRadius: 11, borderWidth: 2, borderColor: '#D9DFD5' },
  radioActive: { borderColor: colors.green, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#fff' },
  planName: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.text },
  planPrice: { fontFamily: fonts.body, fontSize: 12, color: colors.textFaint },
  planPerMo: { fontFamily: fonts.headline, fontSize: 14, color: colors.greenDark },
  planPerMoUnit: { fontFamily: fonts.body, fontSize: 11, color: colors.textFaint },
  cancelNote: { textAlign: 'center', fontFamily: fonts.body, fontSize: 12, color: colors.textFaint },
  linkRow: { flexDirection: 'row', justifyContent: 'center', gap: 22 },
  link: { fontFamily: fonts.bodySemiBold, fontSize: 12.5, color: colors.textFaint },
  legalLink: { fontFamily: fonts.body, fontSize: 10.5, color: colors.borderStrong },
});
