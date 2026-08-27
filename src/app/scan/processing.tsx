import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';

const STEPS = ['Identifying foods', 'Estimating portions', 'Checking nutrition', 'Building your Balance Score'];
const STEP_MS = 550;

export default function Processing() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) {
      router.replace('/scan/confirm');
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step, router]);

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.spinner} />
          <Text style={styles.headline}>Looking at your meal…</Text>
        </View>

        <View style={{ gap: 13 }}>
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <View key={label} style={styles.row}>
                {done ? (
                  <View style={styles.doneDot}>
                    <Text style={styles.doneCheck}>✓</Text>
                  </View>
                ) : active ? (
                  <View style={styles.activeDot}>
                    <View style={styles.activeInner} />
                  </View>
                ) : (
                  <View style={styles.pendingDot} />
                )}
                <Text style={[styles.rowLabel, done && styles.rowLabelDone, active && styles.rowLabelActive]}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <Pressable style={styles.cancel} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.black },
  card: {
    position: 'absolute',
    left: 28,
    right: 28,
    top: '50%',
    transform: [{ translateY: -120 }],
    backgroundColor: 'rgba(250,248,243,0.97)',
    borderRadius: 26,
    padding: 26,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 22 },
  spinner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: colors.greenBg,
    borderTopColor: colors.green,
  },
  headline: { fontFamily: fonts.headline, fontSize: 18, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  doneDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneCheck: { color: '#fff', fontSize: 11 },
  activeDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeInner: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.green },
  pendingDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D9DFD5',
  },
  rowLabel: { fontFamily: fonts.body, fontSize: 14, color: '#9AA496' },
  rowLabelDone: { fontFamily: fonts.bodyMedium, color: colors.green },
  rowLabelActive: { fontFamily: fonts.bodySemiBold, color: colors.text },
  cancel: { position: 'absolute', left: 0, right: 0, bottom: 60, alignItems: 'center' },
  cancelText: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: 'rgba(255,255,255,0.85)' },
});
