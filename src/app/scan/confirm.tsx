import { useEffect, useMemo, useState } from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { ImagePlaceholder, PrimaryButton, TextButton } from '@/components/ui';
import { useConfirmScan } from '@/features/scan/hooks/use-scan';
import { useScanFlowStore } from '@/features/scan/store/scan-flow-store';

type Portion = 'Small' | 'Medium' | 'Large';
type Food = { id: string; name: string; baseGrams: number; portion: Portion };

const PORTIONS: { key: Portion; factor: number }[] = [
  { key: 'Small', factor: 0.7 },
  { key: 'Medium', factor: 1 },
  { key: 'Large', factor: 1.4 },
];

const PORTION_SIZE_CLASS: Record<Portion, string> = {
  Small: 'w-[26px] h-[26px]',
  Medium: 'w-[36px] h-[36px]',
  Large: 'w-[46px] h-[46px]',
};

function gramsForPortion(baseGrams: number, portion: Portion): number {
  const factor = PORTIONS.find((p) => p.key === portion)?.factor ?? 1;
  return Math.round(baseGrams * factor);
}

export default function Confirm() {
  const router = useRouter();
  const scanId = useScanFlowStore((s) => s.scanId);
  const detectedItems = useScanFlowStore((s) => s.detectedItems);
  const setMealResult = useScanFlowStore((s) => s.setMealResult);
  const confirmScan = useConfirmScan();

  const [foods, setFoods] = useState<Food[]>(() =>
    detectedItems.map((item, i) => ({
      id: `${i}-${item.name}`,
      name: item.name,
      baseGrams: item.estimatedGrams,
      portion: 'Medium' as Portion,
    })),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = foods.find((f) => f.id === editingId) ?? null;

  useEffect(() => {
    if (!scanId) router.replace('/scan/camera');
  }, [scanId, router]);

  const grams = useMemo(
    () => Object.fromEntries(foods.map((f) => [f.id, gramsForPortion(f.baseGrams, f.portion)])),
    [foods],
  );

  async function handleConfirm() {
    if (!scanId || foods.length === 0) return;
    try {
      const meal = await confirmScan.mutateAsync({
        id: scanId,
        foods: foods.map((f) => ({
          name: f.name,
          estimatedGrams: grams[f.id],
          portionLabel: f.portion,
        })),
      });
      setMealResult(meal);
      router.push('/scan/result');
    } catch (error) {
      Alert.alert('Could not save meal', error instanceof Error ? error.message : 'Please try again.');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px]" edges={['top', 'bottom']}>
      <View className="flex-row gap-[16px] items-center mb-[22px]">
        <ImagePlaceholder emoji="🍽️" radius={18} style={{ width: 72, height: 72 }} />
        <View className="flex-1">
          <Text className="font-headline text-[23px] text-text mb-[4px]">Here&apos;s what we found</Text>
          <Text className="font-body text-[13px] leading-[19px] text-text-muted">
            Give it a quick check before we calculate your balance.
          </Text>
        </View>
      </View>

      <View className="gap-[10px]">
        {foods.map((f) => (
          <Pressable
            key={f.id}
            className="bg-white border border-border rounded-[18px] p-[15px] flex-row items-center gap-[13px]"
            onPress={() => setEditingId(f.id)}
          >
            <View className="w-[44px] h-[44px] rounded-[14px] bg-cream items-center justify-center">
              <Text style={{ fontSize: 22 }}>🍽️</Text>
            </View>
            <View className="flex-1">
              <Text className="font-body-semibold text-[15px] text-text">{f.name}</Text>
              <Text className="font-body text-[12.5px] text-text-muted mt-[2px]">
                {f.portion} · ~{grams[f.id]}g
              </Text>
            </View>
            <Text className="text-border-strong text-[18px]">›</Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-auto gap-[12px]">
        <PrimaryButton
          label={confirmScan.isPending ? 'Saving…' : 'Looks Good'}
          onPress={handleConfirm}
          disabled={confirmScan.isPending || foods.length === 0}
        />
      </View>

      <Modal visible={!!editing} transparent animationType="slide" onRequestClose={() => setEditingId(null)}>
        <Pressable className="flex-1 bg-[rgba(31,43,34,0.28)]" onPress={() => setEditingId(null)} />
        {editing && (
          <SafeAreaView edges={['bottom']} className="bg-bg rounded-t-[30px] px-[24px] pt-[12px] pb-[8px]">
            <View className="w-[40px] h-[5px] rounded-[3px] bg-[#D9DFD5] self-center mb-[20px]" />
            <View className="flex-row items-center gap-[12px] mb-[6px]">
              <Text style={{ fontSize: 26 }}>🍽️</Text>
              <Text className="font-headline text-[22px] text-text">{editing.name}</Text>
            </View>
            <Text className="font-body text-[14px] text-text-muted mb-[18px]">How much did you eat?</Text>

            <View className="flex-row gap-[10px] mb-[16px]">
              {PORTIONS.map((p) => {
                const active = p.key === editing.portion;
                return (
                  <Pressable
                    key={p.key}
                    className={`flex-1 rounded-[18px] py-[16px] px-[8px] items-center gap-[9px] ${
                      active ? 'border-2 border-green bg-green-bg' : 'border-[1.5px] border-border-strong bg-white'
                    }`}
                    onPress={() =>
                      setFoods((prev) => prev.map((f) => (f.id === editing.id ? { ...f, portion: p.key } : f)))
                    }
                  >
                    <View
                      className={`rounded-full ${PORTION_SIZE_CLASS[p.key]} ${active ? 'bg-[#CBDECB]' : 'bg-[#EDEAE0]'}`}
                    />
                    <Text className={`font-body-semibold text-[13.5px] ${active ? 'text-green-dark' : 'text-text'}`}>{p.key}</Text>
                    <Text className="font-body text-[11.5px] text-text-faint">~{gramsForPortion(editing.baseGrams, p.key)}g</Text>
                  </Pressable>
                );
              })}
            </View>

            <PrimaryButton label="Update" onPress={() => setEditingId(null)} style={{ marginBottom: 12 }} />
            <View className="flex-row justify-center gap-[26px]">
              <TextButton label="Close" color={colors.textFaint} onPress={() => setEditingId(null)} />
              <TextButton
                label="Remove"
                color={colors.terracotta}
                onPress={() => {
                  setFoods((prev) => prev.filter((f) => f.id !== editing.id));
                  setEditingId(null);
                }}
              />
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}
