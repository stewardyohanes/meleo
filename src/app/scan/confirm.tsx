import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { ImagePlaceholder, PrimaryButton, TextButton } from '@/components/ui';

type Portion = 'Small' | 'Medium' | 'Large';
type Food = { id: string; emoji: string; name: string; portion: Portion };

const PORTIONS: { key: Portion; grams: string }[] = [
  { key: 'Small', grams: '~100g' },
  { key: 'Medium', grams: '~150g' },
  { key: 'Large', grams: '~220g' },
];

const INITIAL_FOODS: Food[] = [
  { id: 'rice', emoji: '🍚', name: 'White Rice', portion: 'Medium' },
  { id: 'chicken', emoji: '🍗', name: 'Grilled Chicken', portion: 'Medium' },
  { id: 'veg', emoji: '🥦', name: 'Broccoli & Carrots', portion: 'Small' },
];

export default function Confirm() {
  const router = useRouter();
  const [foods, setFoods] = useState(INITIAL_FOODS);
  const [sauce, setSauce] = useState<'Savory' | 'Sweet' | 'Not sure'>('Savory');
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = foods.find((f) => f.id === editingId) ?? null;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <ImagePlaceholder emoji="🍽️" radius={18} style={{ width: 72, height: 72 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Here&apos;s what we found</Text>
          <Text style={styles.subtitle}>Give it a quick check before we calculate your balance.</Text>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        {foods.map((f) => (
          <Pressable key={f.id} style={styles.foodRow} onPress={() => setEditingId(f.id)}>
            <View style={styles.foodIcon}>
              <Text style={{ fontSize: 22 }}>{f.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.foodName}>{f.name}</Text>
              <Text style={styles.foodMeta}>{f.portion} · {PORTIONS.find((p) => p.key === f.portion)?.grams}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}

        <View style={styles.sauceCard}>
          <View style={styles.foodIcon}>
            <Text style={{ fontSize: 22 }}>🥣</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sauceQuestion}>Is this sauce sweetened?</Text>
            <View style={{ flexDirection: 'row', gap: 7, flexWrap: 'wrap' }}>
              {(['Savory', 'Sweet', 'Not sure'] as const).map((opt) => {
                const active = opt === sauce;
                return (
                  <Pressable key={opt} onPress={() => setSauce(opt)} style={[styles.saucePill, active && styles.saucePillActive]}>
                    <Text style={[styles.saucePillText, active && styles.saucePillTextActive]}>{opt}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 'auto', gap: 12 }}>
        <PrimaryButton label="Looks Good" onPress={() => router.push('/scan/result')} />
        <TextButton label="+ Add Food" onPress={() => {}} />
      </View>

      <Modal visible={!!editing} transparent animationType="slide" onRequestClose={() => setEditingId(null)}>
        <Pressable style={styles.sheetBackdrop} onPress={() => setEditingId(null)} />
        {editing && (
          <SafeAreaView edges={['bottom']} style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetTitleRow}>
              <Text style={{ fontSize: 26 }}>{editing.emoji}</Text>
              <Text style={styles.sheetTitle}>{editing.name}</Text>
            </View>
            <Text style={styles.sheetSubtitle}>How much did you eat?</Text>

            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
              {PORTIONS.map((p) => {
                const active = p.key === editing.portion;
                return (
                  <Pressable
                    key={p.key}
                    style={[styles.portionOption, active && styles.portionOptionActive]}
                    onPress={() =>
                      setFoods((prev) => prev.map((f) => (f.id === editing.id ? { ...f, portion: p.key } : f)))
                    }
                  >
                    <View
                      style={[
                        styles.portionDot,
                        p.key === 'Small' && { width: 26, height: 26 },
                        p.key === 'Medium' && { width: 36, height: 36 },
                        p.key === 'Large' && { width: 46, height: 46 },
                        active && { backgroundColor: '#CBDECB' },
                      ]}
                    />
                    <Text style={[styles.portionLabel, active && { color: colors.greenDark }]}>{p.key}</Text>
                    <Text style={styles.portionGrams}>{p.grams}</Text>
                  </Pressable>
                );
              })}
            </View>

            <TextButton label="Enter amount manually" onPress={() => {}} style={{ marginBottom: 18, alignSelf: 'center' }} />
            <PrimaryButton label="Update" onPress={() => setEditingId(null)} style={{ marginBottom: 12 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 26 }}>
              <TextButton label="Change Food" color={colors.textFaint} onPress={() => setEditingId(null)} />
              <TextButton
                label="Remove"
                color={colors.terracotta}
                onPress={() => {
                  setFoods((prev) => prev.filter((f) => f.id !== editing.id));
                  setEditingId(null);
                }}
              />
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 24 },
  header: { flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 22 },
  title: { fontFamily: fonts.headline, fontSize: 23, color: colors.text, marginBottom: 4 },
  subtitle: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textMuted },
  foodRow: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  foodIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodName: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.text },
  foodMeta: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted, marginTop: 2 },
  chevron: { color: colors.borderStrong, fontSize: 18 },
  sauceCard: {
    backgroundColor: colors.amberBg,
    borderWidth: 1,
    borderColor: colors.amberBorder,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  sauceQuestion: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.text, marginBottom: 7 },
  saucePill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0D6BE',
  },
  saucePillActive: { backgroundColor: colors.green, borderColor: colors.green },
  saucePillText: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },
  saucePillTextActive: { color: '#fff', fontFamily: fonts.bodySemiBold },
  sheetBackdrop: { flex: 1, backgroundColor: 'rgba(31,43,34,0.28)' },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#D9DFD5', alignSelf: 'center', marginBottom: 20 },
  sheetTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6 },
  sheetTitle: { fontFamily: fonts.headline, fontSize: 22, color: colors.text },
  sheetSubtitle: { fontFamily: fonts.body, fontSize: 14, color: colors.textMuted, marginBottom: 18 },
  portionOption: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 9,
  },
  portionOptionActive: { borderWidth: 2, borderColor: colors.green, backgroundColor: colors.greenBg },
  portionDot: { borderRadius: 999, backgroundColor: '#EDEAE0' },
  portionLabel: { fontFamily: fonts.bodySemiBold, fontSize: 13.5, color: colors.text },
  portionGrams: { fontFamily: fonts.body, fontSize: 11.5, color: colors.textFaint },
});
