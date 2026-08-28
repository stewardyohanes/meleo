import { PrimaryButton } from "@/components/ui";
import { useCreateScan } from "@/features/scan/hooks/use-scan";
import { useScanFlowStore } from "@/features/scan/store/scan-flow-store";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Camera() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const createScan = useCreateScan();
  const setScan = useScanFlowStore((s) => s.setScan);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  async function handleCapture() {
    if (!permission?.granted || !cameraRef.current || isCapturing) return;
    setIsCapturing(true);

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    if (!photo) {
      setIsCapturing(false);
      return;
    }

    router.push("/scan/processing");
    createScan.mutate(
      photo.uri,
      {
        onSuccess: (scan) => {
          setIsCapturing(false);
          if (scan.status === "failed") {
            router.back();
            Alert.alert("Couldn't analyze meal", scan.errorMessage || "Please try again.");
            return;
          }
          setScan(scan.id, scan.detectedItems ?? []);
          router.replace("/scan/confirm");
        },
        onError: (error) => {
          setIsCapturing(false);
          router.back();
          Alert.alert("Scan failed", error instanceof Error ? error.message : "Please try again.");
        },
      },
    );
  }

  return (
    <View className="flex-1 bg-black">
      {permission?.granted ? (
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          mode="picture"
        />
      ) : (
        <View className="bg-black" style={StyleSheet.absoluteFill} />
      )}

      <View className="absolute top-[66px] left-[20px] right-[20px] flex-row justify-between" pointerEvents="box-none">
        <Pressable
          className="w-[42px] h-[42px] rounded-[21px] bg-[rgba(20,24,20,0.5)] items-center justify-center"
          onPress={() => router.replace("/home")}
        >
          <Text className="text-white text-[16px]">✕</Text>
        </Pressable>
        <Pressable className="w-[42px] h-[42px] rounded-[21px] bg-[rgba(20,24,20,0.5)] items-center justify-center">
          <Text className="text-white text-[16px]">⚡</Text>
        </Pressable>
      </View>

      <View
        className="absolute top-[170px] left-[36px] right-[36px] bottom-[250px] border-[1.5px] border-[rgba(255,255,255,0.55)] rounded-[28px]"
        pointerEvents="none"
      />

      <View className="absolute left-0 right-0 bottom-[210px] items-center" pointerEvents="none">
        <View className="bg-[rgba(20,24,20,0.55)] rounded-[20px] py-[9px] px-[16px]">
          <Text className="text-[rgba(255,255,255,0.92)] font-body-medium text-[12.5px]">Keep your meal inside the frame</Text>
        </View>
      </View>

      {!permission?.granted && (
        <View className="absolute left-[28px] right-[28px] top-[38%] bg-[rgba(250,248,243,0.97)] rounded-[26px] p-[24px]">
          <Text className="font-headline text-[18px] text-text mb-[6px]">Camera access needed</Text>
          <Text className="font-body text-[13px] text-text-muted">
            Meleo needs your camera to scan meals.
          </Text>
          <PrimaryButton
            label="Enable Camera"
            onPress={requestPermission}
            style={{ marginTop: 16 }}
          />
        </View>
      )}

      <View className="absolute left-0 right-0 bottom-[52px] flex-row items-center justify-between px-[44px]" pointerEvents="box-none">
        <View className="w-[46px] h-[46px] rounded-[14px] border-[1.5px] border-[rgba(255,255,255,0.5)] bg-[rgba(20,24,20,0.4)] items-center justify-center">
          <Text className="text-white text-[16px]">🖼️</Text>
        </View>
        <Pressable
          className="w-[76px] h-[76px] rounded-[38px] border-[4px] border-white items-center justify-center"
          onPress={handleCapture}
          disabled={isCapturing}
        >
          <View className="w-[60px] h-[60px] rounded-[30px] bg-white" />
        </Pressable>
        <View style={{ width: 46, height: 46 }} />
      </View>
    </View>
  );
}
