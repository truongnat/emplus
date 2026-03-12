const LOKI_URL = process.env.LOKI_URL || 'http://localhost:3100';

interface LogEntry {
  timestamp: string;
  line: string;
  labels: Record<string, string>;
}

function formatLabels(labels: Record<string, string>): string {
  return Object.entries(labels)
    .map(([k, v]) => `${k}="${v}"`)
    .join(',');
}

async function sendToLoki(logs: LogEntry[]) {
  const streams = new Map<string, LogEntry[]>();

  for (const entry of logs) {
    const key = formatLabels(entry.labels);
    if (!streams.has(key)) {
      streams.set(key, []);
    }
    streams.get(key)!.push(entry);
  }

  const payload = {
    streams: Array.from(streams.entries()).map(([labels, entries]) => ({
      stream: entries[0].labels,
      values: entries.map((e) => [e.timestamp, e.line]),
    })),
  };

  try {
    await fetch(`${LOKI_URL}/loki/api/v1/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Failed to send logs to Loki:', err);
  }
}

const BATCH: LogEntry[] = [];
let flushTimeout: ReturnType<typeof setTimeout> | null = null;

function scheduleFlush() {
  if (flushTimeout) return;
  flushTimeout = setTimeout(async () => {
    flushTimeout = null;
    if (BATCH.length > 0) {
      await sendToLoki([...BATCH]);
      BATCH.length = 0;
    }
  }, 1000);
}

export function log(level: string, message: string, meta?: Record<string, unknown>) {
  const timestamp = Date.now() * 1_000_000; // nanoseconds
  const line = meta
    ? JSON.stringify({ level, message, ...meta })
    : JSON.stringify({ level, message });

  BATCH.push({
    timestamp: timestamp.toString(),
    line,
    labels: {
      app: 'emplus-api',
      env: process.env.NODE_ENV || 'development',
      level,
    },
  });

  scheduleFlush();
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => log('debug', message, meta),
  info: (message: string, meta?: Record<string, unknown>) => log('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log('error', message, meta),
};

export async function flushLogs() {
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
  if (BATCH.length > 0) {
    await sendToLoki([...BATCH]);
    BATCH.length = 0;
  }
}
