import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { BottomNav } from '@/components/ui';

const BARS = [
  { label: 'Mon', pct: 66, color: '#8FBF9F' },
  { label: 'Tue', pct: 76, color: colors.green },
  { label: 'Wed', pct: 71, color: '#8FBF9F' },
  { label: 'Thu', pct: 10, color: colors.trackLight, muted: true },
  { label: 'Fri', pct: 82, color: colors.green },
  { label: 'Sat', pct: 48, color: '#D9C58F' },
  { label: 'Sun', pct: 10, color: colors.trackLight, muted: true },
];

export default function Progress() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Your Progress</Text>
          <View style={styles.toggle}>
            <View style={styles.toggleActive}>
              <Text style={styles.toggleActiveText}>7 Days</Text>
            </View>
            <Pressable onPress={() => router.push('/paywall')}>
              <Text style={styles.toggleLocked}>30 Days 🔒</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { flex: 1.4 }]}>
            <Text style={styles.statEyebrow}>WEEKLY BALANCE</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
              <Text style={styles.statBig}>78</Text>
              <View style={styles.statBadge}>
                <Text style={styles.statBadgeText}>+4 vs last week</Text>
              </View>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEyebrow}>TRACKED</Text>
            <Text style={styles.statBig}>
              5<Text style={{ fontSize: 19, color: colors.textFainter }}>/7</Text>
            </Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartRow}>
            {BARS.map((b) => (
              <View key={b.label} style={styles.chartCol}>
                <View style={styles.chartTrack}>
                  <View style={[styles.chartBar, { height: `${b.pct}%`, backgroundColor: b.color }]} />
                </View>
                <Text style={[styles.chartLabel, b.muted && { color: '#C4CBBE' }]}>{b.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.areaCard}>
            <Text style={{ fontSize: 19, marginBottom: 6 }}>💪</Text>
            <Text style={styles.statEyebrow}>STRONGEST AREA</Text>
            <Text style={styles.areaTitle}>Protein</Text>
            <Text style={styles.areaDesc}>Consistent on 5 tracked days.</Text>
          </View>
          <View style={styles.areaCard}>
            <Text style={{ fontSize: 19, marginBottom: 6 }}>🌾</Text>
            <Text style={styles.statEyebrow}>FOCUS AREA</Text>
            <Text style={styles.areaTitle}>Fiber</Text>
            <Text style={styles.areaDesc}>Lower than ideal on 3 days.</Text>
          </View>
        </View>

        <Pressable style={styles.pattern} onPress={() => router.push('/weekly-insight')}>
          <Text style={{ fontSize: 18 }}>✨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.patternTitle}>We found a pattern</Text>
            <Text style={styles.patternDesc}>Your weekday meals tend to be balanced…</Text>
          </View>
          <Text style={styles.patternChevron}>›</Text>
        </Pressable>
      </ScrollView>

      <BottomNav active="progress" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 24, paddingBottom: 8 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  title: { fontFamily: fonts.headline, fontSize: 22, color: colors.text },
  toggle: { flexDirection: 'row', backgroundColor: colors.trackLight, borderRadius: 14, padding: 3 },
  toggleActive: {
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 11,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  toggleActiveText: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.text },
  toggleLocked: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textFainter, paddingVertical: 6, paddingHorizontal: 13 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 20, padding: 16 },
  statEyebrow: { fontFamily: fonts.bodySemiBold, fontSize: 10.5, letterSpacing: 1.1, color: colors.textFaint, marginBottom: 6 },
  statBig: { fontFamily: fonts.headline, fontSize: 40, color: colors.text, lineHeight: 40 },
  statBadge: { backgroundColor: colors.greenBg, borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8 },
  statBadgeText: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.green },
  chartCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 16,
    paddingTop: 18,
    paddingBottom: 14,
    marginBottom: 12,
  },
  chartRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, height: 96 },
  chartCol: { flex: 1, alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' },
  chartTrack: { width: '100%', maxWidth: 26, flex: 1, justifyContent: 'flex-end' },
  chartBar: { width: '100%', borderRadius: 8, minHeight: 6 },
  chartLabel: { fontFamily: fonts.bodyMedium, fontSize: 10, color: colors.textFainter },
  areaCard: { flex: 1, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 14 },
  areaTitle: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.text, marginBottom: 2 },
  areaDesc: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 16, color: colors.textFaint },
  pattern: {
    backgroundColor: colors.greenDark,
    borderRadius: 18,
    padding: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  patternTitle: { fontFamily: fonts.bodySemiBold, fontSize: 13.5, color: '#fff' },
  patternDesc: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  patternChevron: { fontSize: 14, color: 'rgba(255,255,255,0.9)' },
});
