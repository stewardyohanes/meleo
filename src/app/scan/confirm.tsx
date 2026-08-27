import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { ImagePlaceholder, PrimaryButton, TextButton } from '@/components/ui';

type Portion = 'Small' | 'Medium' | 'Large';
type Food = { id: string; emoji: string; name: string; portion: Portion };

const PORTIONS: { key: Portion; grams: string }[] = [
  { key: 'Small', grams: '~100g' },
  { key: 'Medium', grams: '~150g' },
  { key: 'Large', grams: '~220g' },
];

const PORTION_SIZE_CLASS: Record<Portion, string> = {
  Small: 'w-[26px] h-[26px]',
  Medium: 'w-[36px] h-[36px]',
  Large: 'w-[46px] h-[46px]',
};

const INITIAL_FOODS: Food[] = [
  { id: 'rice', emoji: '🍚', name: 'White Rice', portion: 'Medium' },
  { id: 'chicken', emoji: '🍗', name: 'Grilled Chicken', portion: 'Medium' },
  { id: 'veg', emoji: '🥦', name: 'Broccoli & Carrots', portion: 'Small' },
];

export default function Confirm() {
  const router = useRouter();
  const [foods, setFoods] = useState(INITIAL_FOODS);
  const [sauce, setSauce] = useState<'Savory' | 'Sweet' | 'Not sure'>('Savory');
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = foods.find((f) => f.id === editingId) ?? null;

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
              <Text style={{ fontSize: 22 }}>{f.emoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-body-semibold text-[15px] text-text">{f.name}</Text>
              <Text className="font-body text-[12.5px] text-text-muted mt-[2px]">
                {f.portion} · {PORTIONS.find((p) => p.key === f.portion)?.grams}
              </Text>
            </View>
            <Text className="text-border-strong text-[18px]">›</Text>
          </Pressable>
        ))}

        <View className="bg-amber-bg border border-amber-border rounded-[18px] p-[14px] flex-row items-center gap-[13px]">
          <View className="w-[44px] h-[44px] rounded-[14px] bg-cream items-center justify-center">
            <Text style={{ fontSize: 22 }}>🥣</Text>
          </View>
          <View className="flex-1">
            <Text className="font-body-semibold text-[14px] text-text mb-[7px]">Is this sauce sweetened?</Text>
            <View className="flex-row gap-[7px] flex-wrap">
              {(['Savory', 'Sweet', 'Not sure'] as const).map((opt) => {
                const active = opt === sauce;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => setSauce(opt)}
                    className={`py-[6px] px-[12px] rounded-[14px] border-[1.5px] ${
                      active ? 'bg-green border-green' : 'border-[#E0D6BE]'
                    }`}
                  >
                    <Text className={`text-[12px] ${active ? 'text-white font-body-semibold' : 'font-body-medium text-text-muted'}`}>
                      {opt}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </View>

      <View className="mt-auto gap-[12px]">
        <PrimaryButton label="Looks Good" onPress={() => router.push('/scan/result')} />
        <TextButton label="+ Add Food" onPress={() => {}} />
      </View>

      <Modal visible={!!editing} transparent animationType="slide" onRequestClose={() => setEditingId(null)}>
        <Pressable className="flex-1 bg-[rgba(31,43,34,0.28)]" onPress={() => setEditingId(null)} />
        {editing && (
          <SafeAreaView edges={['bottom']} className="bg-bg rounded-t-[30px] px-[24px] pt-[12px] pb-[8px]">
            <View className="w-[40px] h-[5px] rounded-[3px] bg-[#D9DFD5] self-center mb-[20px]" />
            <View className="flex-row items-center gap-[12px] mb-[6px]">
              <Text style={{ fontSize: 26 }}>{editing.emoji}</Text>
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
                    <Text className="font-body text-[11.5px] text-text-faint">{p.grams}</Text>
                  </Pressable>
                );
              })}
            </View>

            <TextButton label="Enter amount manually" onPress={() => {}} style={{ marginBottom: 18, alignSelf: 'center' }} />
            <PrimaryButton label="Update" onPress={() => setEditingId(null)} style={{ marginBottom: 12 }} />
            <View className="flex-row justify-center gap-[26px]">
              <TextButton label="Change Food" color={colors.textFaint} onPress={() => setEditingId(null)} />
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
