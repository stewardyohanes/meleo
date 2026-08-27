import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const STEPS = ['Identifying foods', 'Estimating portions', 'Checking nutrition', 'Building your Balance Score'];
const STEP_MS = 550;

export default function Processing() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) {
      router.replace('/scan/confirm');
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step, router]);

  return (
    <View className="flex-1 bg-black">
      <View className="absolute left-[28px] right-[28px] top-[50%] -translate-y-[120px] bg-[rgba(250,248,243,0.97)] rounded-[26px] p-[26px]">
        <View className="flex-row items-center gap-[14px] mb-[22px]">
          <View className="w-[34px] h-[34px] rounded-[17px] border-[3px] border-green-bg border-t-green" />
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
      </View>

      <Pressable className="absolute left-0 right-0 bottom-[60px] items-center" onPress={() => router.back()}>
        <Text className="font-body-semibold text-[14px] text-[rgba(255,255,255,0.85)]">Cancel</Text>
      </Pressable>
    </View>
  );
}
