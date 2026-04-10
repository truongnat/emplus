---
title: "mobile/scripts/fix-flow-syntax.js"
description: "File that checks and transforms React Native project files with flow syntax."
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
  page: "reference/files/mobile/scripts/fix-flow-syntax.js.md"
  relativePath: "mobile/scripts/fix-flow-syntax.js"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/scripts/fix-flow-syntax.js"
  module: "mobile/scripts"
  workspace: "mobile"
  language: "JavaScript"
  symbolCount: 3
---

# mobile/scripts/fix-flow-syntax.js

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/scripts](../../../modules/mobile/scripts.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: JavaScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/scripts/fix-flow-syntax.js`
- Lines: 191
- Symbols: 3

## Related Features

- [Authentication Read / List](../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Storage Read / List](../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.

## AI Summary

File that checks and transforms React Native project files with flow syntax.

## Symbols

### function `transformFile`

- Signature: `function transformFile(filePath)`
- Lines: 96-123
- Exported: no
- Summary: transformation function. Reads file, applies transformations, writes output back to the file.

```js
function transformFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let transformed = content;
    let changed = false;

    for (const transform of TRANSFORMS) {
      const newContent = transformed.replace(
        transform.pattern,
        transform.replacement,
      );
      if (newContent !== transformed) {
        changed = true;
        transformed = newContent;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, transformed, "utf8");
      console.log(`  ✓ Fixed: ${path.relative(REACT_NATIVE_PATH, filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}
```

### function `findFlowFiles`

- Signature: `function findFlowFiles(dir, fileList = [])`
- Lines: 125-166
- Exported: no
- Summary: file that finds and transforms files with flow syntax in given directory

```js
function findFlowFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    try {
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (file !== "node_modules" && !file.startsWith(".")) {
          findFlowFiles(filePath, fileList);
        }
      } else if (file.endsWith(".js") || file.endsWith(".js.flow")) {
        // SKIP: TurboModule specs and codegen files - these break if modified
        if (
          filePath.includes("/specs/") ||
          filePath.includes("/codegen/") ||
          filePath.includes("NativeComponent") ||
          filePath.includes("TurboModule")
        ) {
          continue;
        }

        // Check if file contains Flow syntax
        const content = fs.readFileSync(filePath, "utf8");
        if (
          content.includes("@flow") ||
          content.includes("$ReadOnly") ||
          content.includes("$Keys") ||
          content.includes("+[name:")
        ) {
          fileList.push(filePath);
        }
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }

  return fileList;
}
```

### function `main`

- Signature: `function main()`
- Lines: 168-188
- Exported: no

```js
function main() {
  console.log("Fixing Flow syntax in react-native...\n");

  if (!fs.existsSync(REACT_NATIVE_PATH)) {
    console.error("Error: react-native not found at", REACT_NATIVE_PATH);
    process.exit(1);
  }

  const flowFiles = findFlowFiles(REACT_NATIVE_PATH);
  console.log(`Found ${flowFiles.length} files with Flow syntax\n`);

  let fixedCount = 0;
  for (const filePath of flowFiles) {
    if (transformFile(filePath)) {
      fixedCount++;
    }
  }

  console.log(`\n✓ Fixed ${fixedCount} of ${flowFiles.length} files`);
  console.log("Flow syntax transformation complete!\n");
}
```
