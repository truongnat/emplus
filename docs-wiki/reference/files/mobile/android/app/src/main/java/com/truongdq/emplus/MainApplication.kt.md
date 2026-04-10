---
title: "mobile/android/app/src/main/java/com/truongdq/emplus/MainApplication.kt"
description: "MainApplication class is the entry point of an Android application built with Expo"
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
  page: "reference/files/mobile/android/app/src/main/java/com/truongdq/emplus/MainApplication.kt.md"
  relativePath: "mobile/android/app/src/main/java/com/truongdq/emplus/MainApplication.kt"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/android/app/src/main/java/com/truongdq/emplus/MainApplication.kt"
  module: "mobile/android/app/src/main/java/com/truongdq/emplus"
  workspace: "mobile"
  language: "Kotlin"
  symbolCount: 1
---

# mobile/android/app/src/main/java/com/truongdq/emplus/MainApplication.kt

- Overview: [emplus Docs Wiki](../../../../../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../../../../../features/index.md)
- Module: [mobile/android/app/src/main/java/com/truongdq/emplus](../../../../../../../../../../modules/mobile/android/app/src/main/java/com/truongdq/emplus.md)
- Workspace: [@emplus/mobile](../../../../../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: Kotlin
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/android/app/src/main/java/com/truongdq/emplus/MainApplication.kt`
- Lines: 46
- Symbols: 1

## AI Summary

MainApplication class is the entry point of an Android application built with Expo

### Responsibilities

- Establishes the React app context

### Usage Notes

- Provides a default host for React Native packages to be loaded

## Public API

- `Plain-text index (46 lines)`

## Symbols

### source `(file)`

- Signature: `Plain-text index (46 lines)`
- Lines: 1-46
- Exported: yes

```kotlin
package com.truongdq.emplus

import android.app.Application
import android.content.res.Configuration

import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.common.ReleaseLevel
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint

import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ExpoReactHostFactory

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    ExpoReactHostFactory.getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        }
    )
  }

  override fun onCreate() {
    super.onCreate()
    DefaultNewArchitectureEntryPoint.releaseLevel = try {
      ReleaseLevel.valueOf(BuildConfig.REACT_NATIVE_RELEASE_LEVEL.uppercase())
    } catch (e: IllegalArgumentException) {
      ReleaseLevel.STABLE
    }
    loadReactNative(this)
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}

```
