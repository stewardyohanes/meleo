import { StyleSheet, View } from 'react-native';
import { colors } from '@/constants/theme';

export function OnboardingProgress({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.progressRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.progressBar, { backgroundColor: i < step ? colors.green : colors.borderStrong }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
