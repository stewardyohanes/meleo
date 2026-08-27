import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';
import { OnboardingProgress } from './OnboardingProgress';

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

const styles = StyleSheet.create({
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
});
