---
title: "mobile/app/memory/[id].tsx"
description: "TypeScript source file with 1 symbol."
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/app/memory/param-id--bb6303db.tsx.md"
  relativePath: "mobile/app/memory/[id].tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/memory/[id].tsx"
  module: "mobile/app/memory"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/memory/[id].tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/memory](../../../../modules/mobile/app/memory.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/memory/[id].tsx`
- Lines: 235
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## Public API

- `function MemoryDetailScreen()`

## Symbols

### function `MemoryDetailScreen`

- Signature: `function MemoryDetailScreen()`
- Lines: 35-183
- Exported: yes

```tsx
function MemoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { withAccessToken } = useSession();
  const memoryId = typeof id === "string" ? id : id?.[0] ?? "";

  const [viewer, setViewer] = useState<{ urls: string[]; index: number } | null>(
    null,
  );

  useAuthGridChrome(isDark, colors.background.default, true);

  const { data: memory, isLoading, isError } = useQuery({
    queryKey: ["timelineMemory", memoryId],
    queryFn: () => withAccessToken((t) => getMemoryById(t, memoryId)),
    enabled: memoryId.length > 0,
  });

  const mediaUrls = useMemo(
    () => (memory ? parseMediaUrls(memory.mediaUrls) : []),
    [memory],
  );

  const openImage = useCallback((index: number) => {
    if (mediaUrls.length === 0) return;
    setViewer({ urls: mediaUrls, index });
  }, [mediaUrls]);

  const scrollPadBottom = scrollPadBottomWithTabBar(insets.bottom);

  if (!memoryId) {
    return null;
  }

  return (
    <AppScreen
      applyTopSafeAreaPadding={false}
      wrapWithKeyboardDismiss={false}
      style={{
        ...loginScreenStyles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={loginScreenStyles.appContent}
      animatedEntrance={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={homeScreenStyles.layerRoot}>
        <LoginGridAnimatedBackground isDark={isDark} />

        <View style={[styles.headerRow, { paddingTop: insets.top + 8 }]}>
          <PressableScale
            onPress={() => router.back()}
            style={[
              styles.iconBtn,
              isDark
                ? {
                    backgroundColor: homeDarkChromeButton.backgroundColor,
                    borderColor: homeDarkChromeButton.borderColor,
                  }
                : {
                    backgroundColor: colors.surface.default,
                    borderColor: colors.border.subtle,
                  },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Quay lại"
          >
            <Ionicons name="chevron-back" size={22} color={colors.text.primary} />
          </PressableScale>
          <AppText
            style={[
              typographyRoles.title,
              styles.headerTitle,
              { color: colors.text.primary },
            ]}
            numberOfLines={1}
            accessibilityRole="header"
          >
            Chi tiết
          </AppText>
          <View style={{ width: 44 }} />
        </View>

        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator color={colors.brand.default} size="large" />
          </View>
        ) : isError || !memory ? (
          <View style={styles.center}>
            <AppText style={{ color: colors.text.tertiary }}>
              Không tải được mục này.
            </AppText>
            <PressableScale onPress={() => router.back()} style={{ marginTop: 16 }}>
              <AppText style={{ color: colors.brand.default, fontWeight: "700" }}>
                Quay lại
              </AppText>
            </PressableScale>
          </View>
        ) : (
          <ScrollView
            style={homeScreenStyles.scrollView}
            contentContainerStyle={[
              styles.scrollInner,
              { paddingBottom: scrollPadBottom },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {mediaUrls.length > 0 ? (
              <MemoryDetailBentoGrid
                urls={mediaUrls}
                onCellPress={openImage}
              />
            ) : null}

            <AppText
              style={[styles.title, { color: colors.text.primary }]}
            >
              {memory.title}
            </AppText>
            <AppText style={[styles.meta, { color: colors.text.tertiary }]}>
              {getMemoryTime(memory.createdAt)}
              {memory.memoryDate ? ` · Ngày kỷ niệm ${memory.memoryDate}` : ""}
            </AppText>

            {memory.description?.trim() ? (
              <AppText
                style={[styles.body, { color: colors.text.primary }]}
              >
                {memory.description}
              </AppText>
            ) : null}
          </ScrollView>
        )}

        {viewer ? (
          <TimelineImageViewer
            key={viewer.urls.join("\x1e")}
            images={viewer.urls}
            initialIndex={viewer.index}
            onClose={() => setViewer(null)}
          />
        ) : null}
      </View>
    </AppScreen>
  );
}
```
