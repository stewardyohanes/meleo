import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({
  label,
  onPress,
  icon,
  style,
}: {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.primaryButton, style]}>
      {icon}
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function TextButton({
  label,
  onPress,
  color = colors.green,
  style,
}: {
  label: string;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text style={[styles.textButton, { color }]}>{label}</Text>
    </Pressable>
  );
}

export function OnboardingProgress({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.progressRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.progressBar, { backgroundColor: i < step ? colors.green : colors.borderStrong }]} />
      ))}
    </View>
  );
}

export function OnboardingHeader({ step, total, onBack }: { step: number; total: number; onBack?: () => void }) {
  return (
    <View>
      <View style={styles.headerRow}>
        <Pressable onPress={onBack} hitSlop={12}>
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <Text style={styles.stepLabel}>
          {step} OF {total}
        </Text>
      </View>
      <OnboardingProgress step={step} total={total} />
    </View>
  );
}

export function BalanceRing({
  size,
  strokeWidth,
  score,
  color = colors.green,
  trackColor = colors.track,
  children,
}: {
  size: number;
  strokeWidth: number;
  score: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.max(0, Math.min(100, score)) / 100) * circumference;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
      </Svg>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.ringCenter}>{children}</View>
      </View>
    </View>
  );
}

export function ImagePlaceholder({
  emoji = '🍽️',
  radius = 16,
  style,
}: {
  emoji?: string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.imagePlaceholder, { borderRadius: radius }, style]}>
      <Text style={{ fontSize: 32 }}>{emoji}</Text>
    </View>
  );
}

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

const NAV_ICONS = {
  home: (active: boolean) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={active ? colors.green : colors.textFainter} strokeWidth={2}>
      <Path d="M4 11 L12 4 L20 11 V20 H4 Z" />
    </Svg>
  ),
  history: (active: boolean) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={active ? colors.green : colors.textFainter} strokeWidth={2}>
      <Circle cx={12} cy={12} r={8.5} />
      <Path d="M12 7.5 V12 L15 14" />
    </Svg>
  ),
  progress: (active: boolean) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill={active ? colors.green : colors.textFainter}>
      <Rect x={4} y={13} width={4} height={7} rx={1.5} />
      <Rect x={10} y={8} width={4} height={12} rx={1.5} />
      <Rect x={16} y={4} width={4} height={16} rx={1.5} />
    </Svg>
  ),
  profile: (active: boolean) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={active ? colors.green : colors.textFainter} strokeWidth={2}>
      <Circle cx={12} cy={8} r={3.6} />
      <Rect x={5} y={14.5} width={14} height={6.5} rx={3.25} />
    </Svg>
  ),
};

export function BottomNav({ active }: { active: 'home' | 'history' | 'progress' | 'profile' }) {
  const router = useRouter();
  const items: { key: keyof typeof NAV_ICONS; label: string; href: '/home' | '/history' | '/progress' | '/profile' }[] = [
    { key: 'home', label: 'Home', href: '/home' },
    { key: 'history', label: 'History', href: '/history' },
    { key: 'progress', label: 'Progress', href: '/progress' },
    { key: 'profile', label: 'Profile', href: '/profile' },
  ];
  const [first, second] = items;
  const rest = items.slice(2);
  return (
    <View style={styles.navBar}>
      {[first, second].map((item) => (
        <Pressable key={item.key} style={styles.navItem} onPress={() => router.push(item.href)}>
          {NAV_ICONS[item.key](active === item.key)}
          <Text style={[styles.navLabel, active === item.key && { color: colors.green, fontFamily: fonts.bodySemiBold }]}>{item.label}</Text>
        </Pressable>
      ))}
      <Pressable style={styles.navCameraWrap} onPress={() => router.push('/scan/camera')}>
        <View style={styles.navCamera}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
            <Rect x={3} y={7} width={18} height={13} rx={3} />
            <Circle cx={12} cy={13} r={4} />
            <Rect x={9} y={3.5} width={6} height={3.5} rx={1.5} />
          </Svg>
        </View>
      </Pressable>
      {rest.map((item) => (
        <Pressable key={item.key} style={styles.navItem} onPress={() => router.push(item.href)}>
          {NAV_ICONS[item.key](active === item.key)}
          <Text style={[styles.navLabel, active === item.key && { color: colors.green, fontFamily: fonts.bodySemiBold }]}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
  },
  primaryButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.green,
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
  },
  textButton: {
    textAlign: 'center',
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 14,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backChevron: {
    fontSize: 22,
    color: colors.textMuted,
  },
  stepLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.1,
    color: colors.textFaint,
  },
  ringCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12.5,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(31,43,34,0.08)',
  },
  navItem: {
    width: 58,
    alignItems: 'center',
    gap: 3,
  },
  navLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.textFainter,
  },
  navCameraWrap: {
    width: 58,
    alignItems: 'center',
  },
  imagePlaceholder: {
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  navCamera: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.green,
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.green,
    shadowOpacity: 0.38,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
});
