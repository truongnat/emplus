import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pressable, View, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AppScreen, Reveal, SuccessBanner, ErrorBanner, AppText, GlassCard } from "@/src/ui-kit";
import { getMaleSuggestions, toDisplayError, MaleSuggestionsPayload } from "@/src/api";
import { useSession } from "@/src/session-context";
import { palette } from "@/src/theme";
import { MoodVibeCheck } from "@/src/components/MoodVibeCheck";
import { tws } from "@/src/utils/tws";

// Extend the payload locally until api.ts is fully updated
interface ExtendedMaleSuggestions {
  emotionalStatusContext?: string;
  suggestions?: any[];
  badge?: string;
}

export default function CareScreen() {
  const { session, withAccessToken } = useSession();
  const [notice, setNotice] = useState<string | null>(null);
  const user = session?.user;
  const isMale = user?.gender === "NAM";

  const { data, error } = useQuery({
    queryKey: ["maleSuggestions"],
    queryFn: () => withAccessToken(getMaleSuggestions) as Promise<ExtendedMaleSuggestions>,
    enabled: isMale, // Only fetch if male
    retry: false,
  });

  const emotionalContext = data?.emotionalStatusContext ?? "";
  const suggestions = data?.suggestions ?? [];
  const badge = data?.badge ?? "Tâm trạng ổn định";

  const contextLabel = (context?: string) => {
    if (!context || context === "" || context === "bình tĩnh") return "BÌNH TĨNH";
    if (context === "KY_KINH") return "NHẠY CẢM";
    if (context === "GIAI_DOAN_NANG_LUONG") return "NĂNG LƯỢNG";
    if (context === "RUNG_TRUNG") return "KẾT NỐI";
    return context.toUpperCase();
  };

  const statusColor = useMemo(() => {
    if (emotionalContext === "KY_KINH") return palette.danger;
    if (emotionalContext === "GIAI_DOAN_NANG_LUONG") return palette.success;
    if (emotionalContext === "RUNG_TRUNG") return palette.secondary;
    return (palette as any).primary;
  }, [emotionalContext]);

  return (
    <AppScreen scroll={false}>
      <ScrollView contentContainerStyle={tws("pb-40") as any} showsVerticalScrollIndicator={false}>
        <View style={tws("flex-1 px-5 pt-4")}>
          {/* Header Status */}
          <Reveal>
            <View style={tws("flex-row items-center justify-between mb-8")}>
              <View style={tws("flex-1")}>
                <AppText variant="h2" color="slate-900" style={tws("tracking-tighter")}>
                  {isMale ? "Chăm sóc cô ấy" : "Góc của em"}
                </AppText>
                <AppText variant="caption" color="slate-500">
                  {isMale ? "Thấu hiểu để yêu thương hơn" : "Lắng nghe cảm xúc cơ thể"}
                </AppText>
              </View>

              <View style={tws("flex-row items-center bg-white/45 pl-1 pr-4 py-1.5 rounded-full border border-white/60 shadow-glass")}>
                <View style={tws("relative")}>
                  <View style={tws("w-9 h-9 rounded-full bg-slate-100 items-center justify-center overflow-hidden border-2 border-white shadow-sm")}>
                    <Ionicons name="person-circle-outline" size={28} color="#94a3b8" />
                  </View>
                  <View style={tws("absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border border-white")} />
                </View>
                <View style={tws("ml-3")}>
                  <AppText variant="captionBold" color="slate-400" style={tws("text-[8px] tracking-widest uppercase")}>
                    {isMale ? "CÔ ẤY ĐANG" : "BẢN THÂN"}
                  </AppText>
                  <AppText variant="bodyBold" color="slate-800" style={tws("text-xs -mt-1")}>
                    {isMale ? contextLabel(emotionalContext) : "TUYỆT VỜI"}
                  </AppText>
                </View>
              </View>
            </View>
          </Reveal>

          {isMale ? (
            <View style={tws("gap-6")}>
              {/* Badge for Male View */}
              <Reveal delay={100}>
                <GlassCard>
                  <View style={tws("flex-row items-center gap-3")}>
                    <View style={[tws("w-10 h-10 rounded-2xl items-center justify-center bg-white/60 shadow-sm"), { backgroundColor: `${statusColor}15` }]}>
                      <MaterialCommunityIcons name="heart-pulse" size={24} color={statusColor} />
                    </View>
                    <View style={tws("flex-1")}>
                      <AppText variant="bodyBold" color="slate-900">{badge}</AppText>
                      <AppText variant="caption" color="slate-500">Dựa trên chu kỳ cảm xúc</AppText>
                    </View>
                  </View>
                </GlassCard>
              </Reveal>

              {/* Suggestions */}
              <Reveal delay={200}>
                <View style={tws("gap-4")}>
                  <View style={tws("flex-row items-center justify-between")}>
                    <AppText variant="bodyBold" color="slate-800">Lời khuyên chăm sóc</AppText>
                    <Ionicons name="sparkles" size={16} color="#ec1334" opacity={0.6} />
                  </View>

                  {suggestions.length > 0 ? (
                    suggestions.map((s: any, idx: number) => (
                      <GlassCard key={idx}>
                        <View style={tws("gap-3")}>
                          <AppText variant="body" color="slate-700" style={tws("leading-6")}>
                            {s.text}
                          </AppText>
                          {s.callToAction?.label && (
                            <Pressable
                              style={tws("flex-row items-center gap-2 self-start py-2 px-4 bg-primary/5 rounded-xl border border-primary/10") as any}
                              onPress={() => setNotice(`Gợi ý: ${s.callToAction?.label}`)}
                            >
                              <Ionicons name="arrow-forward-circle-outline" size={18} color="#ec1334" />
                              <AppText variant="captionBold" color="primary">{s.callToAction.label}</AppText>
                            </Pressable>
                          )}
                        </View>
                      </GlassCard>
                    ))
                  ) : (
                    <View style={tws("py-10 items-center opacity-50")}>
                      <Ionicons name="cafe-outline" size={48} color="#94a3b8" />
                      <AppText variant="body" color="slate-400" style={tws("mt-2")}>Chưa có gợi ý nào cho hôm nay</AppText>
                    </View>
                  )}
                </View>
              </Reveal>
            </View>
          ) : (
            /* Female View: Mood Tracking */
            <View style={tws("items-center")}>
              <Reveal delay={150}>
                <MoodVibeCheck
                  partnerName={isMale ? "người ấy" : "leo"}
                  onMoodChange={(val) => {
                    setNotice("Đã cập nhật tâm trạng của bạn!");
                  }}
                />
              </Reveal>
            </View>
          )}

        </View>
      </ScrollView>

      {notice ? (
        <View style={tws("absolute bottom-24 left-5 right-5 z-[2000]") as any}>
          <SuccessBanner message={notice} />
        </View>
      ) : null}

      {error && isMale && (
        <View style={tws("absolute bottom-24 left-5 right-5 z-[2000]") as any}>
          <ErrorBanner message={toDisplayError(error)} />
        </View>
      )}
    </AppScreen>
  );
}
