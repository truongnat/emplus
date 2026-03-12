import { buildOpenApiSpec } from "../src/docs/openapi.ts";
import { write } from "bun";
import { join } from "node:path";

const spec = buildOpenApiSpec("http://localhost:3000", "/v1/docs");
const outputPath = join(import.meta.dir, "../openapi.json");

write(outputPath, JSON.stringify(spec, null, 2));
console.log(`OpenAPI spec exported to ${outputPath}`);
