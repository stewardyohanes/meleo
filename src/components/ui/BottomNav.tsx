import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { colors, fonts } from '@/constants/theme';

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
