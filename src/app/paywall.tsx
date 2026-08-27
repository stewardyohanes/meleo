import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/ui';

const FEATURES = [
  { title: 'Unlimited meal scans', desc: 'track without limits.' },
  { title: 'Personalized weekly insights', desc: 'discover patterns in how you eat.' },
  { title: 'Full history', desc: 'see how your habits change.' },
  { title: 'Advanced nutrition', desc: 'explore more detail when you want it.' },
];

export default function Paywall() {
  const router = useRouter();
  const [plan, setPlan] = useState<'annual' | 'monthly'>('annual');

  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px] pt-[6px]" edges={['top', 'bottom']}>
      <View className="items-end mb-[6px]">
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text className="text-[17px] text-text-faint">✕</Text>
        </Pressable>
      </View>

      <Text className="font-headline text-[28px] leading-[32px] text-text tracking-[-0.3px] mb-[6px]">
        Understand your eating patterns
      </Text>
      <Text className="font-body text-[14px] leading-[21px] text-text-muted mb-[18px]">
        Go beyond individual meals and see what your habits are telling you.
      </Text>

      <View className="gap-[11px] mb-[18px]">
        {FEATURES.map((f) => (
          <View key={f.title} className="flex-row gap-[11px] items-start">
            <View className="w-[21px] h-[21px] rounded-[11px] bg-green-bg items-center justify-center mt-[1px]">
              <Text className="text-green text-[11px]">✓</Text>
            </View>
            <Text className="flex-1 font-body text-[13.5px] text-text leading-[19px]">
              <Text className="font-body-semibold">{f.title}</Text>
              <Text className="text-text-faint"> — {f.desc}</Text>
            </Text>
          </View>
        ))}
      </View>

      <View className="gap-[10px] mb-[16px]">
        <Pressable
          className={`rounded-[20px] p-[15px] px-[16px] flex-row items-center gap-[13px] relative bg-white ${
            plan === 'annual' ? 'border-2 border-green' : 'border-[1.5px] border-border-strong'
          }`}
          onPress={() => setPlan('annual')}
        >
          <View className="absolute top-[-9px] right-[16px] bg-green rounded-[9px] py-[3px] px-[9px]">
            <Text className="font-body-bold text-[10px] tracking-[0.4px] text-white">BEST VALUE</Text>
          </View>
          <View
            className={`w-[21px] h-[21px] rounded-[11px] border-2 ${
              plan === 'annual' ? 'border-green bg-green items-center justify-center' : 'border-[#D9DFD5]'
            }`}
          >
            {plan === 'annual' && <View className="w-[7px] h-[7px] rounded-[3.5px] bg-white" />}
          </View>
          <View className="flex-1">
            <Text className="font-body-semibold text-[15px] text-text">Annual</Text>
            <Text className="font-body text-[12px] text-text-faint">$39.99/year</Text>
          </View>
          <Text className="font-headline text-[14px] text-green-dark">
            $3.33<Text className="font-body text-[11px] text-text-faint">/mo</Text>
          </Text>
        </Pressable>

        <Pressable
          className={`rounded-[20px] p-[15px] px-[16px] flex-row items-center gap-[13px] relative bg-white ${
            plan === 'monthly' ? 'border-2 border-green' : 'border-[1.5px] border-border-strong'
          }`}
          onPress={() => setPlan('monthly')}
        >
          <View
            className={`w-[21px] h-[21px] rounded-[11px] border-2 ${
              plan === 'monthly' ? 'border-green bg-green items-center justify-center' : 'border-[#D9DFD5]'
            }`}
          >
            {plan === 'monthly' && <View className="w-[7px] h-[7px] rounded-[3.5px] bg-white" />}
          </View>
          <Text className="flex-1 font-body-semibold text-[15px] text-text">Monthly</Text>
          <Text className="font-headline text-[14px] text-green-dark">
            $7.99<Text className="font-body text-[11px] text-text-faint">/mo</Text>
          </Text>
        </Pressable>
      </View>

      <View className="mt-auto gap-[10px]">
        <PrimaryButton label="Start 7-Day Free Trial" onPress={() => router.back()} />
        <Text className="text-center font-body text-[12px] text-text-faint">Cancel anytime.</Text>
        <View className="flex-row justify-center gap-[22px]">
          <Text className="font-body-semibold text-[12.5px] text-text-faint">Maybe Later</Text>
          <Text className="font-body-semibold text-[12.5px] text-text-faint">Restore Purchases</Text>
        </View>
        <View className="flex-row justify-center gap-[22px]">
          <Text className="font-body text-[10.5px] text-border-strong">Terms</Text>
          <Text className="font-body text-[10.5px] text-border-strong">·</Text>
          <Text className="font-body text-[10.5px] text-border-strong">Privacy</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
