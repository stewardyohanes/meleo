import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';
import { BottomNav } from '@/components/ui';

function Row({ label, value, last, danger }: { label: string; value?: string; last?: boolean; danger?: boolean }) {
  return (
    <View style={[styles.row, !last && styles.rowBorder]}>
      <Text style={[styles.rowLabel, danger && { color: colors.terracotta }]}>{label}</Text>
      {value && <Text style={styles.rowValue}>{value}</Text>}
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View>
            <Text style={styles.name}>Alex</Text>
            <Text style={styles.email}>alex@example.com</Text>
          </View>
        </View>

        <Text style={styles.section}>MY GOALS</Text>
        <View style={styles.card}>
          <Row label="Primary goal" value="Eat more balanced ›" />
          <Row label="Diet preference" value="No preference ›" last />
        </View>

        <Text style={styles.section}>MELEO+</Text>
        <Pressable style={styles.plusCard} onPress={() => router.push('/paywall')}>
          <Text style={{ fontSize: 18 }}>✨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.plusTitle}>Free plan</Text>
            <Text style={styles.plusSub}>3 scans left today</Text>
          </View>
          <View style={styles.plusBadge}>
            <Text style={styles.plusBadgeText}>Upgrade</Text>
          </View>
        </Pressable>

        <Text style={styles.section}>PREFERENCES</Text>
        <View style={styles.card}>
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.rowLabel}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: colors.green, false: '#D9DFD5' }}
            />
          </View>
          <Row label="Units" value="Metric ›" last />
        </View>

        <Text style={styles.section}>PRIVACY</Text>
        <View style={styles.card}>
          <Row label="Privacy Policy" />
          <Row label="Terms" />
          <Row label="Delete account" danger last />
        </View>
      </ScrollView>

      <BottomNav active="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 24, paddingBottom: 8 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: fonts.headline, fontSize: 22, color: '#fff' },
  name: { fontFamily: fonts.headline, fontSize: 19, color: colors.text },
  email: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textFaint },
  section: { fontFamily: fonts.bodySemiBold, fontSize: 11, letterSpacing: 1.3, color: colors.textFaint, marginBottom: 8, marginLeft: 4, marginTop: 4 },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 18, marginBottom: 16, overflow: 'hidden' },
  row: { paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#F0EDE4' },
  rowLabel: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.text },
  rowValue: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textFaint },
  plusCard: {
    backgroundColor: colors.greenDark,
    borderRadius: 18,
    padding: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  plusTitle: { fontFamily: fonts.bodySemiBold, fontSize: 13.5, color: '#fff' },
  plusSub: { fontFamily: fonts.body, fontSize: 11.5, color: 'rgba(255,255,255,0.72)' },
  plusBadge: { backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 14, paddingVertical: 7, paddingHorizontal: 13 },
  plusBadgeText: { fontFamily: fonts.bodySemiBold, fontSize: 12.5, color: '#fff' },
});
