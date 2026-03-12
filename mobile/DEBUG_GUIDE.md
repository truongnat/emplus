# Mobile Debugging Guide

## 🔴 Current Issue

```
TypeError: Cannot read property 'displayName' of undefined
at useSession() in LoginScreen
```

## 🔍 Root Cause Analysis

### Circular Dependency Chain:

```
toast-context.tsx
  ↓ imports
ui-kit.tsx (AppText)
  ↓ imports
framework/design/index.ts
  ↓ imports
components/*.tsx
  ↓ imports
hooks (useTheme, useToast, etc.)
  ↓
CONTEXT NOT READY → CRASH
```

## ✅ Solution Steps

### 1. Clear All Caches

```bash
cd mobile

# Clear Expo cache
rm -rf .expo
rm -rf node_modules/.cache

# Clear Metro bundler cache
rm -rf $TMPDIR/metro-cache-*

# Clear watchman
watchman watch-del-all

# Reinstall
rm -rf node_modules
cd ..
bun install
```

### 2. Fix ToastProvider (Remove AppText dependency)

**File:** `mobile/src/framework/ctx/toast-context.tsx`

```typescript
// BEFORE (CIRCULAR DEPENDENCY)
import { AppText } from "../../ui-kit";

// AFTER (USE NATIVE TEXT)
import { Text } from "react-native";
```

### 3. Fix Provider Order

**File:** `mobile/app/_layout.tsx`

```typescript
// CORRECT ORDER
<DesignProvider>      // 1. Theme
  <ToastProvider>     // 2. Toast (no dependencies on other contexts)
    <SessionProvider> // 3. Auth
      <ApiProvider>   // 4. Query (uses useToast)
        <Stack>
```

### 4. Add Fallbacks to All Hooks

All hooks now return safe defaults during hydration:

- ✅ `useSession()` → Returns dummy object
- ✅ `useTheme()` → Returns default theme
- ✅ `useToast()` → Returns dummy function
- ✅ `useQueryClient()` → Wrapped in try-catch

## 🚀 Quick Fix Commands

```bash
# From project root
cd mobile

# Nuclear clear
rm -rf .expo node_modules
cd ..
bun install

# Restart Expo
cd mobile
bun run dev --clear
```

## 📝 Alternative: Simplify ToastProvider

If issue persists, simplify ToastProvider to remove ALL dependencies:

```typescript
// mobile/src/framework/ctx/toast-context.tsx
import { Text } from "react-native";  // NOT from ui-kit

// Replace AppText with native Text
<Text style={styles.text}>{toast.message}</Text>
```

## 🎯 Debug Checklist

- [ ] Clear all caches
- [ ] Check circular dependencies
- [ ] Verify provider order
- [ ] Ensure all hooks have fallbacks
- [ ] Restart with --clear flag
- [ ] Check Metro bundler logs

## 📊 Expected Provider Chain

```
DesignProvider (no deps)
  ↓
ToastProvider (no deps on contexts)
  ↓
SessionProvider (no deps on QueryClient)
  ↓
ApiProvider (uses useToast - OK, ToastProvider is above)
  ↓
Stack
```

## 🔧 If Still Failing

1. **Check imports in toast-context.tsx:**
   - Should NOT import from ui-kit
   - Should NOT import from framework/design
   - Use React Native primitives only

2. **Check session-context.tsx:**
   - Should NOT use useQueryClient
   - Keep session logic pure

3. **Check api-context.tsx:**
   - CAN use useToast (ToastProvider is above)
   - CAN use QueryClient

## ✅ Final Test

```bash
# Clear everything
cd mobile && rm -rf .expo node_modules
cd .. && bun install

# Start with clear
cd mobile && bun run dev --clear

# Open app
# Should see login screen without errors
```

---

**Last Updated:** 2026-03-12
**Status:** Debugging in progress
