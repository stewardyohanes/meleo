import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { PrimaryButton, TextButton } from '@/components/ui';

export default function WeeklyInsight() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.back}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Weekly Insight</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 34, marginBottom: 8 }}>✨</Text>
        <Text style={styles.title}>We found a pattern</Text>
        <Text style={styles.subtitle}>Based on 5 tracked days this week</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.excerpt}>Your weekday meals tend to be balanced, but your fiber tends to drop on weekends —</Text>
        <View style={styles.blurLines}>
          <View style={[styles.line, { width: '96%' }]} />
          <View style={[styles.line, { width: '88%' }]} />
          <View style={[styles.line, { width: '92%' }]} />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
            <View style={styles.blurBlock} />
            <View style={[styles.blurBlock, { backgroundColor: colors.amberBg }]} />
          </View>
          <View style={[styles.line, { width: '70%' }]} />
        </View>
        <View style={styles.fade}>
          <View style={styles.lockPill}>
            <Text style={styles.lockPillText}>🔒 Meleo+ insight</Text>
          </View>
        </View>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>Go beyond individual meals and see what your habits are telling you.</Text>
      </View>

      <View style={{ marginTop: 'auto', gap: 12 }}>
        <PrimaryButton label="See Full Insight" onPress={() => router.push('/paywall')} />
        <TextButton label="Maybe Later" color={colors.textFaint} onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 24, paddingTop: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  back: { fontSize: 20, color: colors.textMuted },
  headerTitle: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.text },
  title: { fontFamily: fonts.headline, fontSize: 26, color: colors.text, letterSpacing: -0.3, marginBottom: 6 },
  subtitle: { fontFamily: fonts.body, fontSize: 13.5, color: colors.textFaint },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  excerpt: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 23, color: colors.text, marginBottom: 14 },
  blurLines: { gap: 9, opacity: 0.5 },
  line: { height: 12, borderRadius: 6, backgroundColor: colors.track },
  blurBlock: { height: 56, flex: 1, borderRadius: 12, backgroundColor: colors.greenBg },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 110,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.001)',
  },
  lockPill: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.text, borderRadius: 18, paddingVertical: 9, paddingHorizontal: 16 },
  lockPillText: { fontFamily: fonts.bodySemiBold, fontSize: 12.5, color: '#fff' },
  note: {
    backgroundColor: colors.greenBg,
    borderWidth: 1,
    borderColor: colors.greenBorder,
    borderRadius: 18,
    padding: 14,
    marginBottom: 'auto',
  },
  noteText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: '#3a4238' },
});
