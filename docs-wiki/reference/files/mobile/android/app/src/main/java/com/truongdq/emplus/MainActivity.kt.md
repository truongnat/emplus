---
title: "mobile/android/app/src/main/java/com/truongdq/emplus/MainActivity.kt"
description: "The MainActivity is the entry point of an Android app built using React Native."
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
  page: "reference/files/mobile/android/app/src/main/java/com/truongdq/emplus/MainActivity.kt.md"
  relativePath: "mobile/android/app/src/main/java/com/truongdq/emplus/MainActivity.kt"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/android/app/src/main/java/com/truongdq/emplus/MainActivity.kt"
  module: "mobile/android/app/src/main/java/com/truongdq/emplus"
  workspace: "mobile"
  language: "Kotlin"
  symbolCount: 1
---

# mobile/android/app/src/main/java/com/truongdq/emplus/MainActivity.kt

- Overview: [emplus Docs Wiki](../../../../../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../../../../../features/index.md)
- Module: [mobile/android/app/src/main/java/com/truongdq/emplus](../../../../../../../../../../modules/mobile/android/app/src/main/java/com/truongdq/emplus.md)
- Workspace: [@emplus/mobile](../../../../../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: Kotlin
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/android/app/src/main/java/com/truongdq/emplus/MainActivity.kt`
- Lines: 66
- Symbols: 1

## AI Summary

The MainActivity is the entry point of an Android app built using React Native.

## Public API

- `Plain-text index (66 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (66 lines)`
- Lines: 1-66
- Exported: yes

```kotlin
package com.truongdq.emplus
import expo.modules.splashscreen.SplashScreenManager

import android.os.Build
import android.os.Bundle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    // setTheme(R.style.AppTheme);
    // @generated begin expo-splashscreen - expo prebuild (DO NOT MODIFY) sync-f3ff59a738c56c9a6119210cb55f0b613eb8b6af
    SplashScreenManager.registerOnActivity(this)
    // @generated end expo-splashscreen
    super.onCreate(null)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Align the back button behavior with Android S
    * where moving root activities to background instead of finishing activities.
    * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}

```
