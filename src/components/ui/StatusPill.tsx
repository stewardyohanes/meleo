import { Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function StatusPill({ label, tone = 'green' }: { label: string; tone?: 'green' | 'amber' | 'terracotta' }) {
  const map = {
    green: { bg: colors.greenBg, fg: colors.greenDark },
    amber: { bg: colors.amberBg, fg: colors.amberText },
    terracotta: { bg: '#FBEDE7', fg: colors.terracottaText },
  } as const;
  const c = map[tone];
  return (
    <View className="rounded-[13px] px-[12px] py-[4px] self-start" style={{ backgroundColor: c.bg }}>
      <Text className="font-body-semibold text-[12.5px]" style={{ color: c.fg }}>
        {label}
      </Text>
    </View>
  );
}
