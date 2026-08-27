import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { BalanceRing, ImagePlaceholder, PrimaryButton, StatusPill, TextButton } from '@/components/ui';

const BREAKDOWN: { label: string; status: string; tone: 'green' | 'amber' | 'terracotta' }[] = [
  { label: 'Protein', status: 'Good', tone: 'green' },
  { label: 'Vegetables', status: 'Good', tone: 'green' },
  { label: 'Fiber', status: 'Could use more', tone: 'amber' },
  { label: 'Sodium', status: 'High', tone: 'terracotta' },
];

const DOT_COLOR = { green: colors.green, amber: colors.amber, terracotta: colors.terracotta } as const;
const TEXT_COLOR = { green: colors.green, amber: colors.amberText, terracotta: colors.terracottaText } as const;

const NUTRITION = [
  { label: 'Calories', value: '~520–620 kcal' },
  { label: 'Protein', value: '~34g' },
  { label: 'Carbs', value: '~72g' },
  { label: 'Fat', value: '~18g' },
  { label: 'Fiber', value: '~7g' },
];

export default function Result() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ImagePlaceholder emoji="🍗" radius={14} style={{ width: 44, height: 44 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.mealName}>Lunch</Text>
            <Text style={styles.mealTime}>Today · 12:48 PM</Text>
          </View>
          <Pressable onPress={() => router.replace('/home')} hitSlop={12}>
            <Text style={styles.close}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.ringSection}>
          <Text style={styles.ringLabel}>YOUR MEAL BALANCE</Text>
          <BalanceRing size={172} strokeWidth={13} score={78}>
            <Text style={styles.score}>78</Text>
            <StatusPill label="Balanced" />
          </BalanceRing>
        </View>

        <View style={styles.grid}>
          {BREAKDOWN.map((b) => (
            <View key={b.label} style={styles.gridItem}>
              <View style={[styles.dot, { backgroundColor: DOT_COLOR[b.tone] }]} />
              <View>
                <Text style={styles.gridLabel}>{b.label}</Text>
                <Text style={[styles.gridStatus, { color: TEXT_COLOR[b.tone] }]}>{b.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tip}>
          <Text style={{ fontSize: 22 }}>🍎</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipEyebrow}>ONE EASY IMPROVEMENT</Text>
            <Text style={styles.tipTitle}>Add some fruit later today.</Text>
            <Text style={styles.tipBody}>It&apos;ll help bring your fiber intake closer to your daily target.</Text>
          </View>
        </View>

        <Pressable style={styles.nutritionCard} onPress={() => setExpanded((v) => !v)}>
          <View style={styles.nutritionHeaderRow}>
            <Text style={styles.nutritionHeader}>Estimated Nutrition</Text>
            <Text style={styles.chevron}>{expanded ? '⌃' : '⌄'}</Text>
          </View>
          {expanded && (
            <View style={{ marginTop: 12, gap: 8 }}>
              {NUTRITION.map((n) => (
                <View key={n.label} style={styles.nutritionRow}>
                  <Text style={styles.nutritionLabel}>{n.label}</Text>
                  <Text style={styles.nutritionValue}>{n.value}</Text>
                </View>
              ))}
              <Text style={styles.nutritionFootnote}>Estimates may vary based on ingredients and portion size.</Text>
            </View>
          )}
        </Pressable>

        <View style={{ marginTop: 'auto', gap: 10, paddingTop: 16 }}>
          <PrimaryButton label="Done" onPress={() => router.replace('/home')} style={{ height: 52, borderRadius: 26 }} />
          <TextButton label="Edit Meal" color={colors.textFaint} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 24, paddingTop: 10 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  mealName: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.text },
  mealTime: { fontFamily: fonts.body, fontSize: 12, color: colors.textFaint },
  close: { fontSize: 17, color: colors.textFaint },
  ringSection: { alignItems: 'center', marginBottom: 14 },
  ringLabel: { fontFamily: fonts.bodySemiBold, fontSize: 10.5, letterSpacing: 1.6, color: colors.textFaint, marginBottom: 10 },
  score: { fontFamily: fonts.headline, fontSize: 58, color: colors.text, letterSpacing: -1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  gridItem: {
    width: '48%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  gridLabel: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.text },
  gridStatus: { fontFamily: fonts.body, fontSize: 11 },
  tip: {
    backgroundColor: colors.greenBg,
    borderWidth: 1,
    borderColor: colors.greenBorder,
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    gap: 13,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipEyebrow: { fontFamily: fonts.bodySemiBold, fontSize: 10.5, letterSpacing: 1.3, color: '#5C8A6E', marginBottom: 3 },
  tipTitle: { fontFamily: fonts.bodySemiBold, fontSize: 14.5, color: colors.text, marginBottom: 2 },
  tipBody: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textMuted },
  nutritionCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
  },
  nutritionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nutritionHeader: { fontFamily: fonts.bodySemiBold, fontSize: 13.5, color: colors.textMuted },
  chevron: { color: colors.borderStrong, fontSize: 16 },
  nutritionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  nutritionLabel: { fontFamily: fonts.body, fontSize: 13, color: '#3a4238' },
  nutritionValue: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: '#3a4238' },
  nutritionFootnote: { fontFamily: fonts.body, fontSize: 11, color: colors.textFaint, marginTop: 2 },
});
