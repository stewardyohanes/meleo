import { ImagePlaceholder, PrimaryButton, TextButton } from "@/components/ui";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

export default function Welcome() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-bg px-[24px]" edges={["top", "bottom"]}>
      <View className="flex-row items-center gap-[8px]">
        <View className="w-[26px] h-[26px] rounded-[9px] bg-green items-center justify-center">
          <Svg width={15} height={15} viewBox="0 0 15 15">
            <Circle cx={7.5} cy={7.5} r={7.5} fill="#fff" fillOpacity={0.55} />
          </Svg>
        </View>
        <Text className="font-headline text-[16px] text-text">Meleo</Text>
      </View>

      <View className="flex-1 justify-center gap-[26px]">
        <View className="w-full h-[290px] relative">
          <ImagePlaceholder
            emoji="📸"
            radius={28}
            style={StyleSheet.absoluteFill}
          />
          <View
            className="absolute right-[-6px] bottom-[-14px] bg-white rounded-[16px] py-[10px] px-[14px] flex-row items-center gap-[10px]"
            style={{
              shadowColor: "#1F2B22",
              shadowOpacity: 0.14,
              shadowRadius: 30,
              shadowOffset: { width: 0, height: 10 },
              elevation: 4,
            }}
          >
            <View className="w-[38px] h-[38px] rounded-[19px] bg-green-bg border-[4px] border-green items-center justify-center">
              <Text className="font-headline-bold text-[12px] text-text">
                78
              </Text>
            </View>
            <View>
              <Text className="font-body-bold text-[12px] text-text">
                Balanced
              </Text>
              <Text className="font-body text-[10.5px] text-text-muted">
                Great protein choice
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-[12px] mt-[8px]">
          <Text className="font-headline text-[34px] leading-[38px] text-text tracking-[-0.3px]">
            Eat better without counting everything
          </Text>
          <Text className="font-body text-[15.5px] leading-[23px] text-text-muted">
            Snap your meals and instantly see how balanced your eating is.
          </Text>
        </View>
      </View>

      <View className="gap-[14px] pb-[12px]">
        <PrimaryButton
          label="Get Started"
          onPress={() => router.push("/goals")}
        />
        <TextButton
          label="Sign In"
          onPress={() => router.push("/home")}
          style={{ paddingVertical: 4 }}
        />
      </View>
    </SafeAreaView>
  );
}
