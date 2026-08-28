import { useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { BottomNav } from '@/components/ui';
import { GOAL_LABELS, useUserPreferencesStore } from '@/stores/user-preferences-store';
import { useAuthStore } from '@/stores/auth-store';
import { useDeleteAccount } from '@/features/me/hooks/use-me';
import { signOut } from '@/features/auth/services/auth.service';

function Row({ label, value, last, danger, onPress }: { label: string; value?: string; last?: boolean; danger?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className={`py-[14px] px-[16px] flex-row justify-between items-center ${!last ? 'border-b border-b-[#F0EDE4]' : ''}`}
    >
      <Text className={`font-body-medium text-[14px] ${danger ? 'text-terracotta' : 'text-text'}`}>{label}</Text>
      {value && <Text className="font-body-medium text-[13.5px] text-text-faint">{value}</Text>}
    </Pressable>
  );
}

export default function Profile() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const goal = useUserPreferencesStore((s) => s.goal);
  const diet = useUserPreferencesStore((s) => s.diet);
  const session = useAuthStore((s) => s.session);
  const deleteAccount = useDeleteAccount();

  const email = session?.user?.email;
  const initial = (email ?? 'M').charAt(0).toUpperCase();

  function handleDeleteAccount() {
    Alert.alert('Delete account', 'This permanently deletes your account and data. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteAccount.mutateAsync();
          await signOut();
          router.replace('/');
        },
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="px-[24px] pb-[8px]" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-[14px] mb-[20px]">
          <View className="w-[58px] h-[58px] rounded-[29px] bg-green items-center justify-center">
            <Text className="font-headline text-[22px] text-white">{initial}</Text>
          </View>
          <View>
            <Text className="font-headline text-[19px] text-text">
              {email ?? 'Guest'}
            </Text>
            {email && <Text className="font-body text-[12.5px] text-text-faint">{email}</Text>}
          </View>
        </View>

        <Text className="font-body-semibold text-[11px] tracking-[1.3px] text-text-faint mb-[8px] ml-[4px] mt-[4px]">MY GOALS</Text>
        <View className="bg-white border border-border rounded-[18px] mb-[16px] overflow-hidden">
          <Row label="Primary goal" value={`${GOAL_LABELS[goal]} ›`} />
          <Row label="Diet preference" value={`${diet} ›`} last />
        </View>

        <Text className="font-body-semibold text-[11px] tracking-[1.3px] text-text-faint mb-[8px] ml-[4px] mt-[4px]">MELEO+</Text>
        <Pressable
          className="bg-green-dark rounded-[18px] p-[15px] px-[16px] flex-row items-center gap-[12px] mb-[16px]"
          onPress={() => router.push('/paywall')}
        >
          <Text style={{ fontSize: 18 }}>✨</Text>
          <View className="flex-1">
            <Text className="font-body-semibold text-[13.5px] text-white">Free plan</Text>
            <Text className="font-body text-[11.5px] text-[rgba(255,255,255,0.72)]">3 scans left today</Text>
          </View>
          <View className="bg-[rgba(255,255,255,0.16)] rounded-[14px] py-[7px] px-[13px]">
            <Text className="font-body-semibold text-[12.5px] text-white">Upgrade</Text>
          </View>
        </Pressable>

        <Text className="font-body-semibold text-[11px] tracking-[1.3px] text-text-faint mb-[8px] ml-[4px] mt-[4px]">PREFERENCES</Text>
        <View className="bg-white border border-border rounded-[18px] mb-[16px] overflow-hidden">
          <View className="py-[14px] px-[16px] flex-row justify-between items-center border-b border-b-[#F0EDE4]">
            <Text className="font-body-medium text-[14px] text-text">Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: colors.green, false: '#D9DFD5' }}
            />
          </View>
          <Row label="Units" value="Metric ›" last />
        </View>

        <Text className="font-body-semibold text-[11px] tracking-[1.3px] text-text-faint mb-[8px] ml-[4px] mt-[4px]">PRIVACY</Text>
        <View className="bg-white border border-border rounded-[18px] mb-[16px] overflow-hidden">
          <Row label="Privacy Policy" />
          <Row label="Terms" />
          <Row label="Delete account" danger last onPress={handleDeleteAccount} />
        </View>
      </ScrollView>

      <BottomNav active="profile" />
    </SafeAreaView>
  );
}
