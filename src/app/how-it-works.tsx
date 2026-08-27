import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle, Rect } from 'react-native-svg';
import { OnboardingHeader, PrimaryButton } from '@/components/ui';

const STEPS = [
  { n: '01', emoji: '📷', title: 'Snap your meal', desc: 'Take a quick photo.' },
  { n: '02', emoji: '✨', title: 'See the balance', desc: "We'll identify your food and estimate its nutritional balance." },
  { n: '03', emoji: '💡', title: 'Know what to improve', desc: 'Get one simple suggestion.' },
];

export default function HowItWorks() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px]" edges={['top', 'bottom']}>
      <OnboardingHeader step={3} total={3} onBack={() => router.back()} />
      <Text className="font-headline text-[27px] leading-[31px] text-text tracking-[-0.3px] mb-[30px]">
        Three steps to a balanced day
      </Text>

      <View className="gap-[14px]">
        {STEPS.map((s) => (
          <View
            key={s.n}
            className="bg-white border border-border rounded-[20px] p-[20px] flex-row gap-[16px] items-start"
          >
            <View className="w-[46px] h-[46px] rounded-[16px] bg-green-bg items-center justify-center">
              <Text style={{ fontSize: 21 }}>{s.emoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-body-semibold text-[10.5px] tracking-[1.3px] text-text-faint mb-[3px]">{s.n}</Text>
              <Text className="font-body-semibold text-[16px] text-text mb-[3px]">{s.title}</Text>
              <Text className="font-body text-[13px] leading-[19px] text-text-muted">{s.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-auto gap-[12px]">
        <PrimaryButton
          label="Scan My First Meal"
          onPress={() => router.push('/scan/camera')}
          icon={
            <Svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
              <Rect x={3} y={7} width={18} height={13} rx={3} />
              <Circle cx={12} cy={13} r={4} />
              <Rect x={9} y={3.5} width={6} height={3.5} rx={1.5} />
            </Svg>
          }
        />
        <Text className="text-center font-body text-[11.5px] text-text-faint">
          We&apos;ll ask for camera access when you&apos;re ready.
        </Text>
      </View>
    </SafeAreaView>
  );
}
