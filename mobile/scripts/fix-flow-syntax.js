/**
 * Fix Flow syntax compatibility for Metro bundler
 * Transforms Flow v0.233.0+ component syntax to Metro-compatible JavaScript
 *
 * Based on: https://github.com/react-native-tvos/react-native-tvos/pull/961
 */

const fs = require("fs");
const path = require("path");

// Bun stores packages in .bun directory
const REACT_NATIVE_PATH = path.join(
  __dirname,
  "../../node_modules/.bun/react-native@0.79.6+cffaed4c98b217e3/node_modules/react-native",
);

// Patterns to transform - MORE CONSERVATIVE
const TRANSFORMS = [
  // Remove @flow strict-local comments
  {
    pattern: /\/\*\s*@flow\s+strict-local\s*\*\//g,
    replacement: "",
  },
  // Remove import typeof * from '*.flow' statements
  {
    pattern: /import typeof \* from ['"]\.\/[^'"]+\.flow['"];?\n?/g,
    replacement: "",
  },
  // Remove Flow comments
  {
    pattern: /\/\*\s*@flow\s*\*\//g,
    replacement: "",
  },
  // Remove : $FlowFixMe
  {
    pattern: /:\s*\$FlowFixMe/g,
    replacement: ": any",
  },
  // Remove : $FlowExpectedError
  {
    pattern: /:\s*\$FlowExpectedError/g,
    replacement: ": any",
  },
  // Transform Flow variance in object types: {+[key]: type} -> {[key]: type}
  {
    pattern: /\{(\s*)\+(\s*)([a-zA-Z_$][\w$]*\s*:)/g,
    replacement: "{ $1$2$3",
  },
  // Transform $ReadOnly<...> to standard types
  {
    pattern: /\$ReadOnly<([^>]+)>/g,
    replacement: "Readonly<$1>",
  },
  // Transform $ReadOnlyArray<...>
  {
    pattern: /\$ReadOnlyArray<([^>]+)>/g,
    replacement: "ReadonlyArray<$1>",
  },
  // Transform $Keys<...>
  {
    pattern: /\$Keys<([^>]+)>/g,
    replacement: "keyof $1",
  },
  // Transform $Shape<...>
  {
    pattern: /\$Shape<([^>]+)>/g,
    replacement: "Partial<$1>",
  },
  // Transform $Diff<A, B>
  {
    pattern: /\$Diff<([^,]+),\s*([^>]+)>/g,
    replacement: "Omit<$1, $2>",
  },
  // Transform $Exact<...>
  {
    pattern: /\$Exact<([^>]+)>/g,
    replacement: "$1",
  },
  // Transform $Rest<A, B>
  {
    pattern: /\$Rest<([^,]+),\s*([^>]+)>/g,
    replacement: "Omit<$1, keyof $2> & $2",
  },
  // Transform $Values<...>
  {
    pattern: /\$Values<([^>]+)>/g,
    replacement: "$1[keyof $1]",
  },
  // Remove 'as Type' type assertions (CAREFUL - only in Flow contexts)
  {
    pattern: /:\s*\w+\s+as\s+\w+/g,
    replacement: (match) => match.replace(/\s+as\s+\w+/g, ""),
  },
];

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

main();
