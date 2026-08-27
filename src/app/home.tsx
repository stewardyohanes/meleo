import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { BalanceRing, BottomNav } from '@/components/ui';

const TODAY_STATS: { label: string; status: string; tone: 'green' | 'amber' }[] = [
  { label: 'Protein', status: 'Good', tone: 'green' },
  { label: 'Fiber', status: 'Moderate', tone: 'amber' },
  { label: 'Vegetables', status: 'Good', tone: 'green' },
  { label: 'Sugar', status: 'Low', tone: 'green' },
];

const MEALS = [
  { emoji: '🍳', name: 'Breakfast', time: '8:12 AM', score: 76 },
  { emoji: '🍗', name: 'Lunch', time: '12:48 PM', score: 84 },
  { emoji: '🍊', name: 'Snack', time: '4:03 PM', score: 71 },
];

export default function Home() {
  const router = useRouter();
  const score = 81;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Text style={styles.greeting}>Good evening, Alex</Text>
          <Text style={styles.date}>Wednesday, Aug 26</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <BalanceRing size={110} strokeWidth={10} score={score}>
              <Text style={styles.summaryScore}>{score}</Text>
              <Text style={styles.summaryLabel}>Balanced</Text>
            </BalanceRing>
            <View style={{ flex: 1, gap: 7 }}>
              <Text style={styles.eyebrow}>TODAY&apos;S BALANCE</Text>
              {TODAY_STATS.map((s) => (
                <View key={s.label} style={styles.statRow}>
                  <Text style={styles.statLabel}>{s.label}</Text>
                  <Text style={[styles.statValue, { color: s.tone === 'green' ? colors.green : colors.amberText }]}>{s.status}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.summarySub}>3 meals logged — a good picture of your day.</Text>
        </View>

        <View style={styles.nextMove}>
          <Text style={{ fontSize: 21 }}>🥗</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextMoveEyebrow}>YOUR NEXT BEST MOVE</Text>
            <Text style={styles.nextMoveTitle}>Add some vegetables to dinner.</Text>
          </View>
        </View>

        <View style={styles.mealsHeaderRow}>
          <Text style={styles.mealsHeader}>Today&apos;s Meals</Text>
          <Pressable onPress={() => router.push('/history')}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <View style={{ gap: 8 }}>
          {MEALS.map((m) => (
            <View key={m.name} style={styles.mealRow}>
              <Text style={{ fontSize: 19 }}>{m.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.mealName}>{m.name}</Text>
                <Text style={styles.mealTime}>{m.time}</Text>
              </View>
              <Text style={[styles.mealScore, { color: m.score >= 75 ? colors.green : colors.amber }]}>{m.score}</Text>
            </View>
          ))}
          <Pressable style={styles.addDinner} onPress={() => router.push('/scan/camera')}>
            <Text style={{ fontSize: 19 }}>🍽️</Text>
            <Text style={styles.addDinnerLabel}>Dinner</Text>
            <Text style={styles.addDinnerAction}>+ Add</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomNav active="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 24, paddingBottom: 8 },
  headerBlock: { marginBottom: 16 },
  greeting: { fontFamily: fonts.headline, fontSize: 22, color: colors.text },
  date: { fontFamily: fonts.body, fontSize: 13, color: colors.textFaint },
  summaryCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  summaryScore: { fontFamily: fonts.headline, fontSize: 34, color: colors.text, lineHeight: 34 },
  summaryLabel: { fontFamily: fonts.bodySemiBold, fontSize: 10, color: '#5C8A6E' },
  eyebrow: { fontFamily: fonts.bodySemiBold, fontSize: 12, letterSpacing: 1.1, color: colors.textFaint },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted },
  statValue: { fontFamily: fonts.bodySemiBold, fontSize: 12.5 },
  summarySub: { fontFamily: fonts.body, fontSize: 12, color: colors.textFaint, marginTop: 12 },
  nextMove: {
    backgroundColor: colors.greenBg,
    borderWidth: 1,
    borderColor: colors.greenBorder,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  nextMoveEyebrow: { fontFamily: fonts.bodySemiBold, fontSize: 10.5, letterSpacing: 1.3, color: '#5C8A6E', marginBottom: 2 },
  nextMoveTitle: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.text },
  mealsHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  mealsHeader: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.text },
  seeAll: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.green },
  mealRow: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mealName: { fontFamily: fonts.bodySemiBold, fontSize: 13.5, color: colors.text },
  mealTime: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textFaint },
  mealScore: { fontFamily: fonts.headlineBold, fontSize: 15 },
  addDinner: {
    borderWidth: 1.5,
    borderColor: colors.dashedBorder,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addDinnerLabel: { flex: 1, fontFamily: fonts.bodySemiBold, fontSize: 13.5, color: colors.textFaint },
  addDinnerAction: { fontFamily: fonts.bodySemiBold, fontSize: 12.5, color: colors.green },
});
