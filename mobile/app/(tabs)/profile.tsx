import { useState, memo, useCallback } from "react";
import { View, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  AppScreen,
  Reveal,
  AppText,
  PressableScale,
  ScreenTitle
} from "@/src/ui-kit";
import { useSession } from "@/src/session-context";
import { palette } from "@/src/theme";
import { tws } from "@/src/utils/tws";

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  sublabel?: string;
  isLogout?: boolean;
}

const SettingItem = memo(({ icon, label, rightElement, onPress, sublabel, isLogout }: SettingItemProps) => (
  <PressableScale
    style={tws(
      "flex-row items-center justify-between py-4 px-5",
      isLogout ? "bg-white/45 rounded-3xl mx-1 my-2 border border-white/60 shadow-glass" : ""
    )}
    onPress={onPress}
    disabled={!!rightElement && !onPress}
    scaleTo={0.97}
  >
    <View style={tws("flex-row items-center flex-1")}>
      <View
        style={tws(
          "w-10 h-10 rounded-full items-center justify-center mr-4",
          isLogout ? "bg-primary/10" : "bg-white/60 shadow-sm"
        )}
      >
        <Ionicons
          name={icon}
          size={20}
          color={isLogout ? palette.primary : (palette as any)['slate-600']}
        />
      </View>
      <View style={tws("flex-1")}>
        <AppText
          variant="bodyBold"
          style={tws("text-base", isLogout ? "text-primary" : "text-slate-700")}
        >
          {label}
        </AppText>
        {sublabel && (
          <AppText variant="captionBold" color="slate-400" style={tws("mt-0.5 opacity-70")}>
            {sublabel}
          </AppText>
        )}
      </View>
    </View>
    {rightElement ? (
      rightElement
    ) : (
      <Ionicons name="chevron-forward" size={18} color={(palette as any)['slate-300']} />
    )}
  </PressableScale>
));

export default function ProfileScreen() {
  const router = useRouter();
  const { session, clearSession, isAuthenticated } = useSession();
  const [syncEnabled, setSyncEnabled] = useState(true);

  const handleLogout = useCallback(() => {
    clearSession();
    router.replace("/login");
  }, [clearSession, router]);

  if (!isAuthenticated) {
    return (
      <AppScreen>
        <Reveal>
          <View style={tws("p-10 items-center justify-center min-h-[500px]")}>
            <View style={tws("w-20 h-20 rounded-full bg-rose-50 items-center justify-center mb-6 border border-rose-100 shadow-sm")}>
              <Ionicons name="lock-closed" size={40} color={palette.primary} />
            </View>
            <AppText variant="h2" style={tws("text-center mb-2 tracking-tighter")}>Chưa đăng nhập</AppText>
            <AppText variant="body" color="slate-500" style={tws("text-center mb-10 px-6 leading-6")}>
              Vui lòng đăng nhập để truy cập không gian riêng tư và cài đặt của bạn.
            </AppText>
            <PressableScale
              onPress={() => router.push("/login")}
              style={tws("bg-primary px-12 py-4 rounded-full shadow-lg shadow-primary/25")}
            >
              <AppText variant="bodyBold" color="white">Đăng nhập ngay</AppText>
            </PressableScale>
          </View>
        </Reveal>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={tws("px-5 pt-4 pb-40")}>
        {/* Header */}
        <Reveal>
          <View style={tws("items-center mb-10")}>
            <ScreenTitle title="Cài đặt" />
          </View>
        </Reveal>

        {/* Profile Card */}
        <Reveal delay={100}>
          <PressableScale
            style={tws("flex-row items-center bg-white/45 rounded-[32px] p-6 mb-10 border border-white/60 shadow-glass")}
            onPress={() => router.push("/profile-details/personal-info")}
            scaleTo={0.97}
          >
            <View style={tws("relative")}>
              <View style={tws("w-16 h-16 rounded-full bg-white/60 items-center justify-center border border-white overflow-hidden shadow-sm")}>
                {session?.user.avatarUrl ? (
                  <View style={tws("w-full h-full bg-slate-200")} />
                ) : (
                  <Ionicons name="person" size={32} color={(palette as any)['slate-300']} />
                )}
              </View>
              <View style={tws("absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary border-2 border-white items-center justify-center shadow-md")}>
                <Ionicons name="pencil" size={14} color="white" />
              </View>
            </View>
            <View style={tws("ml-4 flex-1")}>
              <AppText variant="h3" color="slate-900" numberOfLines={1}>
                {session?.user.fullName || "Người dùng"}
              </AppText>
              <AppText variant="captionBold" color="slate-400" style={tws("mt-1 tracking-widest uppercase opacity-80")}>
                Bạn đồng hành & Leo
              </AppText>
            </View>
            <View style={tws("w-8 h-8 rounded-full bg-white/40 items-center justify-center border border-white/60")}>
              <Ionicons name="chevron-forward" size={18} color={(palette as any)['slate-400']} />
            </View>
          </PressableScale>
        </Reveal>

        {/* Account Section */}
        <Reveal delay={200}>
          <View style={tws("mb-2 px-2")}>
            <AppText variant="captionBold" color="slate-400" style={tws("tracking-widest uppercase opacity-60 text-[10px]")}>
              Tài khoản & Kết nối
            </AppText>
          </View>
          <View style={tws("bg-white/45 rounded-[32px] py-1 mb-8 border border-white/60 overflow-hidden shadow-glass")}>
            <SettingItem
              icon="person-outline"
              label="Thông tin cá nhân"
              onPress={() => router.push("/profile-details/personal-info")}
            />
            <View style={tws("h-[1px] bg-slate-100/40 mx-6")} />
            <SettingItem
              icon="sync-outline"
              label="Đồng bộ thời gian thực"
              sublabel="Cập nhật trạng thái tức thì"
              rightElement={
                <Switch
                  value={syncEnabled}
                  onValueChange={setSyncEnabled}
                  trackColor={{ false: (palette as any)['slate-200'], true: (palette as any)['primary-soft'] }}
                  thumbColor={syncEnabled ? palette.primary : (palette as any).white}
                />
              }
            />
          </View>
        </Reveal>

        {/* App Section */}
        <Reveal delay={300}>
          <View style={tws("mb-2 px-2")}>
            <AppText variant="captionBold" color="slate-400" style={tws("tracking-widest uppercase opacity-60 text-[10px]")}>
              Ứng dụng & Giao diện
            </AppText>
          </View>
          <View style={tws("bg-white/45 rounded-[32px] py-1 mb-8 border border-white/60 overflow-hidden shadow-glass")}>
            <SettingItem
              icon="notifications-outline"
              label="Thông báo đẩy"
              onPress={() => router.push("/profile-details/notifications")}
            />
            <View style={tws("h-[1px] bg-slate-100/40 mx-6")} />
            <SettingItem
              icon="color-palette-outline"
              label="Giao diện hiển thị"
              sublabel="Chế độ Pure Glass"
              onPress={() => router.push("/profile-details/appearance")}
            />
            <View style={tws("h-[1px] bg-slate-100/40 mx-6")} />
            <SettingItem
              icon="lock-closed-outline"
              label="Bảo mật & Riêng tư"
              onPress={() => router.push("/profile-details/privacy")}
            />
          </View>
        </Reveal>

        {/* Support Section */}
        <Reveal delay={400}>
          <View style={tws("mb-2 px-2")}>
            <AppText variant="captionBold" color="slate-400" style={tws("tracking-widest uppercase opacity-60 text-[10px]")}>
              Khác
            </AppText>
          </View>
          <View style={tws("bg-white/45 rounded-[32px] py-1 mb-8 border border-white/60 overflow-hidden shadow-glass")}>
            <SettingItem
              icon="help-circle-outline"
              label="Trợ giúp & Phản hồi"
              onPress={() => router.push("/profile-details/help")}
            />
          </View>
        </Reveal>

        {/* Logout */}
        <Reveal delay={500}>
          <SettingItem
            icon="log-out-outline"
            label="Đăng xuất tài khoản"
            isLogout
            onPress={handleLogout}
          />
        </Reveal>

        {/* Version info */}
        <View style={tws("items-center mt-10 mb-6")}>
          <View style={tws("bg-slate-100/50 px-3 py-1.5 rounded-full border border-white/40")}>
            <AppText variant="captionBold" color="slate-400" style={tws("text-[10px] tracking-widest uppercase")}>Em Plus v1.2.0-Alpha</AppText>
          </View>
          <AppText variant="caption" color="slate-400" style={tws("mt-3 text-center opacity-60")}>
            Kiến tạo để yêu thương và bền vững
          </AppText>
        </View>
      </View>
    </AppScreen>
  );
}
