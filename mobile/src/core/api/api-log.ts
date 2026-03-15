export function startLog(
  url: string,
  method: string,
  path: string,
  init?: RequestInit,
) {
  console.log(`\n╭────────────────────────────────────────────────────────`);
  console.log(`│ 🌐 API REQUEST: [${method}] ${path}`);
  console.log(`├────────────────────────────────────────────────────────`);
  console.log(`│ URL:     ${url}`);
  if (init?.headers) {
    console.log(`│ HEADERS: ${JSON.stringify(init.headers)}`);
  }
  if (init?.body) {
    try {
      const parsedBody =
        typeof init.body === "string" ? JSON.parse(init.body) : init.body;
      console.log(
        `│ BODY:    ${JSON.stringify(parsedBody, null, 2).replace(/\n/g, "\n│          ")}`,
      );
    } catch {
      console.log(`│ BODY:    ${init.body}`);
    }
  }
  console.log(`╰────────────────────────────────────────────────────────\n`);
}

export function endLog(
  method: string,
  path: string,
  response: Response,
  payload: unknown,
  duration: number,
) {
  const statusColor = response.ok ? "✅" : "❌";
  console.log(`\n╭────────────────────────────────────────────────────────`);
  console.log(`│ ${statusColor} API RESPONSE: [${method}] ${path}`);
  console.log(`├────────────────────────────────────────────────────────`);
  console.log(`│ STATUS:   ${response.status} (${duration}ms)`);
  console.log(
    `│ PAYLOAD:  ${JSON.stringify(payload, null, 2).replace(/\n/g, "\n│           ")}`,
  );
  console.log(`╰────────────────────────────────────────────────────────\n`);
}
