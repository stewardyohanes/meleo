import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { BottomNav } from '@/components/ui';

const DAYS = [
  { label: 'Thu', num: 20 },
  { label: 'Fri', num: 21 },
  { label: 'Sat', num: 22 },
  { label: 'Sun', num: 23 },
  { label: 'Mon', num: 24 },
  { label: 'Tue', num: 25 },
  { label: 'Wed', num: 26, active: true },
];

const MEALS = [
  { emoji: '🍳', name: 'Breakfast', time: '8:12 AM', detail: 'Oatmeal, banana, coffee', score: 76 },
  { emoji: '🍗', name: 'Lunch', time: '12:48 PM', detail: 'Grilled chicken rice bowl', score: 84 },
  { emoji: '🍊', name: 'Snack', time: '4:03 PM', detail: 'Orange, yogurt', score: 69 },
];

export default function History() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>History</Text>

        <View style={styles.dayStrip}>
          {DAYS.map((d) => (
            <View key={d.label} style={[styles.dayCell, d.active && styles.dayCellActive]}>
              <Text style={[styles.dayLabel, d.active && styles.dayLabelActive]}>{d.label}</Text>
              <Text style={[styles.dayNum, d.active && styles.dayNumActive, !d.active && d.num % 2 === 1 && { color: colors.borderStrong }]}>
                {d.num}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.dateRow}>
          <View>
            <Text style={styles.dateTitle}>Wednesday, Aug 26</Text>
            <Text style={styles.dateSub}>3 meals logged</Text>
          </View>
          <View style={styles.scorePill}>
            <View style={styles.scoreRing}>
              <Text style={styles.scoreRingText}>81</Text>
            </View>
            <Text style={styles.scorePillText}>Balanced</Text>
          </View>
        </View>

        <View style={{ gap: 9 }}>
          {MEALS.map((m) => (
            <View key={m.name} style={styles.mealRow}>
              <View style={styles.mealIcon}>
                <Text style={{ fontSize: 22 }}>{m.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.mealName}>{m.name}</Text>
                <Text style={styles.mealDetail}>{m.time} · {m.detail}</Text>
              </View>
              <Text style={[styles.mealScore, { color: m.score >= 75 ? colors.green : colors.amber }]}>{m.score}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.upgrade} onPress={() => router.push('/paywall')}>
          <Text style={{ fontSize: 18 }}>🔒</Text>
          <Text style={styles.upgradeText}>
            Unlock your full history with <Text style={{ fontFamily: fonts.bodyBold }}>Meleo+</Text>
          </Text>
          <View style={styles.upgradeBadge}>
            <Text style={styles.upgradeBadgeText}>Upgrade</Text>
          </View>
        </Pressable>
      </ScrollView>

      <BottomNav active="history" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 24, paddingBottom: 8 },
  title: { fontFamily: fonts.headline, fontSize: 22, color: colors.text, marginBottom: 16 },
  dayStrip: { flexDirection: 'row', gap: 7, marginBottom: 20 },
  dayCell: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 9, borderRadius: 14 },
  dayCellActive: { backgroundColor: colors.green },
  dayLabel: { fontFamily: fonts.bodyMedium, fontSize: 10, color: colors.textFainter },
  dayLabelActive: { color: 'rgba(255,255,255,0.75)' },
  dayNum: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.textMuted },
  dayNumActive: { color: '#fff' },
  dateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  dateTitle: { fontFamily: fonts.bodySemiBold, fontSize: 16, color: colors.text },
  dateSub: { fontFamily: fonts.body, fontSize: 12, color: colors.textFaint },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  scoreRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: colors.green,
    backgroundColor: colors.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreRingText: { fontFamily: fonts.headlineBold, fontSize: 10.5, color: colors.text },
  scorePillText: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.greenDark },
  mealRow: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  mealIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealName: { fontFamily: fonts.bodySemiBold, fontSize: 14.5, color: colors.text },
  mealDetail: { fontFamily: fonts.body, fontSize: 12, color: colors.textFaint, marginTop: 1 },
  mealScore: { fontFamily: fonts.headlineBold, fontSize: 17 },
  upgrade: {
    marginTop: 14,
    borderRadius: 18,
    padding: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.greenDark,
  },
  upgradeText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: '#fff' },
  upgradeBadge: { backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 14, paddingVertical: 7, paddingHorizontal: 12 },
  upgradeBadgeText: { fontFamily: fonts.bodySemiBold, fontSize: 12.5, color: '#fff' },
});
