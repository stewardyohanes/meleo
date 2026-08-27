import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function StatusPill({ label, tone = 'green' }: { label: string; tone?: 'green' | 'amber' | 'terracotta' }) {
  const map = {
    green: { bg: colors.greenBg, fg: colors.greenDark },
    amber: { bg: colors.amberBg, fg: colors.amberText },
    terracotta: { bg: '#FBEDE7', fg: colors.terracottaText },
  } as const;
  const c = map[tone];
  return (
    <View style={[styles.pill, { backgroundColor: c.bg }]}>
      <Text style={[styles.pillText, { color: c.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontFamily: 'AlbertSans_600SemiBold',
    fontSize: 12.5,
  },
});
