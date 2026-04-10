---
title: "mobile/app/policy.tsx"
description: "Section props interface in mobile/app/policy.tsx"
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
  page: "reference/files/mobile/app/policy.tsx.md"
  relativePath: "mobile/app/policy.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/policy.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/app/policy.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/policy.tsx`
- Lines: 248
- Symbols: 3

## AI Summary

Section props interface in mobile/app/policy.tsx

### Usage Notes

- See app/policy.tsx for details on use of SectionProps
- 13

## Public API

- `function PolicyScreen()`

## Symbols

### function `PolicyScreen`

- Signature: `function PolicyScreen()`
- Lines: 113-247
- Exported: yes

```tsx
function PolicyScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const [openSection, setOpenSection] = useState<string | null>("collect");

  const toggleSection = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  const sections = useMemo(
    () => [
      {
        key: "collect",
        icon: "datacontainers-outline",
        title: "Thu thập dữ liệu",
        color: colors.brand.default,
        content:
          "Chúng tôi chỉ thu thập những thông tin cần thiết để cung cấp dịch vụ Em+, bao gồm: email, mật khẩu (mã hóa), giới tính, và ID người dùng. Không thu thập dữ liệu cá nhân nhạy cảm khác.",
      },
      {
        key: "use",
        icon: "settings-outline",
        title: "Sử dụng thông tin",
        color: colors.brand.strong,
        content:
          "Thông tin được sử dụng để: (1) Xác thực tài khoản, (2) Ghép đôi giữa hai người dùng, (3) Cá nhân hóa trải nghiệm, (4) Sao lưu dữ liệu đám mây (tùy chọn).",
      },
      {
        key: "share",
        icon: "share-outline",
        title: "Chia sẻ dữ liệu",
        color: colors.brand.text,
        content:
          "Chúng tôi KHÔNG bán hoặc chia sẻ dữ liệu của bạn cho bên thứ ba. Dữ liệu chỉ được chia sẻ giữa hai tài khoản đã ghép đôi và với nhà cung cấp dịch vụ đám mây (Firebase) để sao lưu.",
      },
      {
        key: "security",
        icon: "shield-checkmark-outline",
        title: "Bảo mật",
        color: colors.status.success.icon,
        content:
          "Mật khẩu được mã hóa bcrypt. Dữ liệu truyền qua HTTPS. Bạn có thể xóa toàn bộ dữ liệu bất cứ lúc nào bằng cách hủy tài khoản trong phần Cài đặt.",
      },
      {
        key: "rights",
        icon: "person-outline",
        title: "Quyền của bạn",
        color: colors.status.info.icon,
        content:
          "Bạn có quyền: (1) Truy cập dữ liệu cá nhân, (2) Sửa thông tin, (3) Xóa tài khoản và dữ liệu, (4) Ngừng sử dụng dịch vụ bất cứ lúc nào.",
      },
    ],
    [colors],
  );

  return (
    <AppScreen>
      <View style={styles.navHeader}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={palette.zinc900} />
        </Pressable>
        <AppText style={styles.navTitle}>Chính sách bảo mật</AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={colors.brand.default}
          />
          <AppText style={styles.headerText}>Chính sách Em+</AppText>
        </View>


        <GlassCard style={styles.card}>
          <AppText
            style={{
              fontSize: 15,
              color: palette.zinc700,
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            Em+ cam kết bảo vệ quyền riêng tư của bạn. Ứng dụng được thiết
            kế với nguyên tắc "quyền riêng tư từ đầu" (privacy by design), chỉ
            thu thập dữ liệu tối thiểu cần thiết.
          </AppText>
        </GlassCard>

        {sections.map((section) => (
          <PolicySection
            key={section.key}
            icon={section.icon}
            title={section.title}
            content={section.content}
            isOpen={openSection === section.key}
            onToggle={() => toggleSection(section.key)}
            color={section.color}
          />
        ))}

        <GlassCard style={{ marginTop: 24 }}>
          <View style={styles.headerRow}>
            <Ionicons name="mail-outline" size={20} color={palette.zinc600} />
            <AppText
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: palette.zinc800,
              }}
            >
              Liên hệ
            </AppText>
          </View>
          <AppText
            style={{
              fontSize: 15,
              color: palette.zinc600,
              lineHeight: 22,
              marginTop: 8,
            }}
          >
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên
            hệ: support@emplus.app
          </AppText>
        </GlassCard>
      </ScrollView>
    </AppScreen>
  );
}
```

### interface `SectionProps`

- Signature: `interface SectionProps`
- Lines: 74-81
- Exported: no

```tsx
interface SectionProps {
  icon: string;
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  color: string;
}
```

### function `PolicySection`

- Signature: `function PolicySection({ icon, title, content, isOpen, onToggle, color, }: SectionProps)`
- Lines: 83-111
- Exported: no

```tsx
function PolicySection({
  icon,
  title,
  content,
  isOpen,
  onToggle,
  color,
}: SectionProps) {
  return (
    <View style={styles.sectionWrap}>
      <Pressable onPress={onToggle} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name={icon as any} size={22} color={color} />
          <AppText style={styles.sectionTitle}>{title}</AppText>
        </View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={palette.zinc400}
        />
      </Pressable>
      {isOpen && (
        <View style={styles.sectionContent}>
          <AppText style={styles.contentText}>{content}</AppText>
        </View>
      )}
    </View>
  );
}
```
