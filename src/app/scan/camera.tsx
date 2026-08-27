import { PrimaryButton } from "@/components/ui";
import { colors, fonts } from "@/constants/theme";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Camera() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  return (
    <View style={styles.screen}>
      {permission?.granted ? (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          mode="picture"
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.permissionFallback]} />
      )}

      <View style={styles.topOverlay} pointerEvents="box-none">
        <Pressable
          style={styles.roundBtn}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.roundBtnText}>✕</Text>
        </Pressable>
        <Pressable style={styles.roundBtn}>
          <Text style={styles.roundBtnText}>⚡</Text>
        </Pressable>
      </View>

      <View style={styles.frame} pointerEvents="none" />

      <View style={styles.hintWrap} pointerEvents="none">
        <View style={styles.hint}>
          <Text style={styles.hintText}>Keep your meal inside the frame</Text>
        </View>
      </View>

      {!permission?.granted && (
        <View style={styles.permissionPrompt}>
          <Text style={styles.permissionTitle}>Camera access needed</Text>
          <Text style={styles.permissionBody}>
            Meleo needs your camera to scan meals.
          </Text>
          <PrimaryButton
            label="Enable Camera"
            onPress={requestPermission}
            style={{ marginTop: 16 }}
          />
        </View>
      )}

      <View style={styles.bottomBar} pointerEvents="box-none">
        <View style={styles.smallBtn}>
          <Text style={styles.roundBtnText}>🖼️</Text>
        </View>
        <Pressable
          style={styles.shutterOuter}
          onPress={() => permission?.granted && router.push("/scan/processing")}
        >
          <View style={styles.shutterInner} />
        </Pressable>
        <View style={{ width: 46, height: 46 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.black },
  permissionFallback: { backgroundColor: colors.black },
  topOverlay: {
    position: "absolute",
    top: 66,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roundBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(20,24,20,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  roundBtnText: { color: "#fff", fontSize: 16 },
  frame: {
    position: "absolute",
    top: 170,
    left: 36,
    right: 36,
    bottom: 250,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.55)",
    borderRadius: 28,
  },
  hintWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 210,
    alignItems: "center",
  },
  hint: {
    backgroundColor: "rgba(20,24,20,0.55)",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  hintText: {
    color: "rgba(255,255,255,0.92)",
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 44,
  },
  smallBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(20,24,20,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  permissionPrompt: {
    position: "absolute",
    left: 28,
    right: 28,
    top: "38%",
    backgroundColor: "rgba(250,248,243,0.97)",
    borderRadius: 26,
    padding: 24,
  },
  permissionTitle: {
    fontFamily: fonts.headline,
    fontSize: 18,
    color: colors.text,
    marginBottom: 6,
  },
  permissionBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
});
