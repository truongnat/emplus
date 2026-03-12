import { formatDate, parseDate } from "../../shared/date.ts";
import { AppError } from "../../utils/http.ts";
import { z, ZodError, type ZodTypeAny } from "zod";

const DEFAULT_VALIDATION_CODE = "VALIDATION_ERROR";
const DEFAULT_VALIDATION_MESSAGE = "Dữ liệu đầu vào không hợp lệ.";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export interface ValidationOptions {
  code?: string;
  message?: string;
}

interface ValidationIssueDetail {
  path: string;
  code: string;
  message: string;
}

function formatIssuePath(path: PropertyKey[]): string {
  if (path.length === 0) {
    return "body";
  }

  return path
    .map((segment) => {
      if (typeof segment === "number") {
        return `[${segment}]`;
      }
      return String(segment);
    })
    .join(".");
}

function toIssueDetails(error: ZodError): ValidationIssueDetail[] {
  return error.issues.map((issue) => ({
    path: formatIssuePath(issue.path),
    code: issue.code,
    message: issue.message,
  }));
}

export function toValidationError(error: ZodError, options: ValidationOptions = {}): AppError {
  return new AppError(
    400,
    options.code ?? DEFAULT_VALIDATION_CODE,
    options.message ?? DEFAULT_VALIDATION_MESSAGE,
    toIssueDetails(error),
  );
}

export function parseWithSchema<TSchema extends ZodTypeAny>(
  schema: TSchema,
  input: unknown,
  options: ValidationOptions = {},
): z.infer<TSchema> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw toValidationError(parsed.error, options);
  }
  return parsed.data;
}

export function requiredTrimmedString(message: string) {
  return z.preprocess((value) => (typeof value === "string" ? value.trim() : value), z.string().min(1, message));
}

export function optionalTrimmedString() {
  return z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, z.string().optional());
}

function isValidIsoDateString(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  try {
    const parsed = parseDate(value);
    return formatDate(parsed) === value;
  } catch {
    return false;
  }
}

export function isoDateString(message: string) {
  return requiredTrimmedString(message).refine(isValidIsoDateString, message);
}
