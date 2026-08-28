import { createScanMutationKey } from '@/features/scan/hooks/use-scan';
import { useIsMutating } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const STEPS = ['Identifying foods', 'Estimating portions', 'Checking nutrition', 'Building your Balance Score'];
const STEP_MS = 900;
const STILL_WORKING_MS = 6000;

function Spinner() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 900, easing: Easing.linear }), -1);
  }, [rotation]);

  const style = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));

  return <Animated.View className="w-[34px] h-[34px] rounded-[17px] border-[3px] border-green-bg border-t-green" style={style} />;
}

export default function Processing() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [stillWorking, setStillWorking] = useState(false);
  // camera.tsx kicks off the real upload+analyze mutation and navigates away
  // (to confirm on success, or back on failure) once it resolves — this
  // screen just reflects whether that mutation is still in flight.
  const isAnalyzing = useIsMutating({ mutationKey: createScanMutationKey }) > 0;

  useEffect(() => {
    // Last step holds until the real mutation resolves, instead of
    // finishing early and looking frozen while the network call continues.
    const lastStep = STEPS.length - 1;
    if (step >= lastStep) return;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (!isAnalyzing) return;
    const t = setTimeout(() => setStillWorking(true), STILL_WORKING_MS);
    return () => clearTimeout(t);
  }, [isAnalyzing]);

  return (
    <View className="flex-1 bg-black">
      <View className="absolute left-[28px] right-[28px] top-[50%] -translate-y-[120px] bg-[rgba(250,248,243,0.97)] rounded-[26px] p-[26px]">
        <View className="flex-row items-center gap-[14px] mb-[22px]">
          <Spinner />
          <Text className="font-headline text-[18px] text-text">Looking at your meal…</Text>
        </View>

        <View className="gap-[13px]">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <View key={label} className="flex-row items-center gap-[11px]">
                {done ? (
                  <View className="w-[20px] h-[20px] rounded-[10px] bg-green items-center justify-center">
                    <Text className="text-white text-[11px]">✓</Text>
                  </View>
                ) : active ? (
                  <View className="w-[20px] h-[20px] rounded-[10px] border-[2.5px] border-green items-center justify-center">
                    <View className="w-[7px] h-[7px] rounded-[3.5px] bg-green" />
                  </View>
                ) : (
                  <View className="w-[20px] h-[20px] rounded-[10px] border-2 border-[#D9DFD5]" />
                )}
                <Text
                  className={`text-[14px] ${
                    done ? 'font-body-medium text-green' : active ? 'font-body-semibold text-text' : 'font-body text-[#9AA496]'
                  }`}
                >
                  {label}
                </Text>
              </View>
            );
          })}
        </View>

        {stillWorking && (
          <Text className="font-body text-[12px] text-text-faint mt-[16px]">
            Still working on it — great meals take a moment to analyze.
          </Text>
        )}
      </View>

      <Pressable className="absolute left-0 right-0 bottom-[60px] items-center" onPress={() => router.back()}>
        <Text className="font-body-semibold text-[14px] text-[rgba(255,255,255,0.85)]">Cancel</Text>
      </Pressable>
    </View>
  );
}
