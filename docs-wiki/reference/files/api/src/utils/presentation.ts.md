---
title: "api/src/utils/presentation.ts"
description: "A function that maps a Gender to a corresponding GioiTinhHienThi, according to the given rules."
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
  page: "reference/files/api/src/utils/presentation.ts.md"
  relativePath: "api/src/utils/presentation.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/utils/presentation.ts"
  module: "api/src/utils"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 7
---

# api/src/utils/presentation.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/utils](../../../../modules/api/src/utils.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/utils/presentation.ts`
- Lines: 58
- Symbols: 7

## AI Summary

A function that maps a Gender to a corresponding GioiTinhHienThi, according to the given rules.

### Responsibilities

- A string representing the possible Gender values

### Usage Notes

- Examples: Gender values can be either 'NAM', 'NU' or 'KHAC'
- 'KHONG_TIET_LO' means it's preference not to say anything

## Public API

- `type GioiTinhHienThi = "NAM" | "NU" | "KHAC" | "KHONG_TIET_LO";`
- `type TrangThaiCapDoiHienThi = "CHO_GHEP_DOI" | "DANG_YEU" | "DA_CUOI" | "DA_CHIA_TAY";`
- `type TrangThaiPhuThuocHienThi = "HOAT_DONG" | "SU_CO" | "BO_QUA";`
- `function chuanHoaGioiTinhDauVao(value: string | undefined): Gender`
- `function hienThiGioiTinh(gender: Gender): GioiTinhHienThi`
- `function hienThiTrangThaiCapDoi(status: CoupleStatus): TrangThaiCapDoiHienThi`
- `function hienThiTrangThaiPhuThuoc(status: "up" | "down" | "skipped"): TrangThaiPhuThuocHienThi`

## Symbols

### type `GioiTinhHienThi`

- Signature: `type GioiTinhHienThi = "NAM" | "NU" | "KHAC" | "KHONG_TIET_LO";`
- Lines: 3-3
- Exported: yes

```ts
type GioiTinhHienThi = "NAM" | "NU" | "KHAC" | "KHONG_TIET_LO";
```

### type `TrangThaiCapDoiHienThi`

- Signature: `type TrangThaiCapDoiHienThi = "CHO_GHEP_DOI" | "DANG_YEU" | "DA_CUOI" | "DA_CHIA_TAY";`
- Lines: 4-4
- Exported: yes

```ts
type TrangThaiCapDoiHienThi = "CHO_GHEP_DOI" | "DANG_YEU" | "DA_CUOI" | "DA_CHIA_TAY";
```

### type `TrangThaiPhuThuocHienThi`

- Signature: `type TrangThaiPhuThuocHienThi = "HOAT_DONG" | "SU_CO" | "BO_QUA";`
- Lines: 5-5
- Exported: yes

```ts
type TrangThaiPhuThuocHienThi = "HOAT_DONG" | "SU_CO" | "BO_QUA";
```

### function `chuanHoaGioiTinhDauVao`

- Signature: `function chuanHoaGioiTinhDauVao(value: string | undefined): Gender`
- Lines: 10-31
- Exported: yes

```ts
function chuanHoaGioiTinhDauVao(value: string | undefined): Gender {
  const normalized = (value ?? "").trim().toUpperCase();

  // Accept both old and new formats
  if (normalized === "NAM" || normalized === "MALE") {
    return "NAM";
  }

  if (normalized === "NU" || normalized === "NỮ" || normalized === "FEMALE") {
    return "NU";
  }

  if (normalized === "KHAC" || normalized === "OTHER") {
    return "KHAC";
  }

  if (normalized === "KHONG_TIET_LO" || normalized === "KHÔNG_TIẾT_LỘ" || normalized === "PREFER_NOT_TO_SAY") {
    return "KHONG_TIET_LO";
  }

  return "KHAC";
}
```

### function `hienThiGioiTinh`

- Signature: `function hienThiGioiTinh(gender: Gender): GioiTinhHienThi`
- Lines: 36-38
- Exported: yes

```ts
function hienThiGioiTinh(gender: Gender): GioiTinhHienThi {
  return gender;
}
```

### function `hienThiTrangThaiCapDoi`

- Signature: `function hienThiTrangThaiCapDoi(status: CoupleStatus): TrangThaiCapDoiHienThi`
- Lines: 43-45
- Exported: yes

```ts
function hienThiTrangThaiCapDoi(status: CoupleStatus): TrangThaiCapDoiHienThi {
  return status;
}
```

### function `hienThiTrangThaiPhuThuoc`

- Signature: `function hienThiTrangThaiPhuThuoc(status: "up" | "down" | "skipped"): TrangThaiPhuThuocHienThi`
- Lines: 47-57
- Exported: yes

```ts
function hienThiTrangThaiPhuThuoc(status: "up" | "down" | "skipped"): TrangThaiPhuThuocHienThi {
  if (status === "up") {
    return "HOAT_DONG";
  }

  if (status === "down") {
    return "SU_CO";
  }

  return "BO_QUA";
}
```
