import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { colors, fonts } from '@/constants/theme';
import { ImagePlaceholder, PrimaryButton, TextButton } from '@/components/ui';

export default function Welcome() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.brandRow}>
        <View style={styles.brandMark}>
          <Svg width={15} height={15} viewBox="0 0 15 15">
            <Circle cx={7.5} cy={7.5} r={7.5} fill="#fff" fillOpacity={0.55} />
          </Svg>
        </View>
        <Text style={styles.brandName}>Meleo</Text>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroImageWrap}>
          <ImagePlaceholder emoji="📸" radius={28} style={StyleSheet.absoluteFill} />
          <View style={styles.heroBadge}>
            <View style={styles.badgeRing}>
              <Text style={styles.badgeScore}>78</Text>
            </View>
            <View>
              <Text style={styles.badgeTitle}>Balanced</Text>
              <Text style={styles.badgeSub}>Great protein choice</Text>
            </View>
          </View>
        </View>

        <View style={styles.copy}>
          <Text style={styles.headline}>Eat better without counting everything.</Text>
          <Text style={styles.subhead}>Snap your meals and instantly see how balanced your eating is.</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Get Started" onPress={() => router.push('/goals')} />
        <TextButton label="Sign In" onPress={() => router.push('/home')} style={{ paddingVertical: 4 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandMark: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: fonts.headline,
    fontSize: 16,
    color: colors.text,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: 26,
  },
  heroImageWrap: {
    width: '100%',
    height: 290,
    position: 'relative',
  },
  heroBadge: {
    position: 'absolute',
    right: -6,
    bottom: -14,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#1F2B22',
    shadowOpacity: 0.14,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  badgeRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.greenBg,
    borderWidth: 4,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeScore: {
    fontFamily: fonts.headlineBold,
    fontSize: 12,
    color: colors.text,
  },
  badgeTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.text,
  },
  badgeSub: {
    fontFamily: fonts.body,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  copy: {
    gap: 12,
    marginTop: 8,
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 34,
    lineHeight: 38,
    color: colors.text,
    letterSpacing: -0.3,
  },
  subhead: {
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 23,
    color: colors.textMuted,
  },
  actions: {
    gap: 14,
    paddingBottom: 12,
  },
});
