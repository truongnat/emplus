import { isRecord } from "../common/is-record";
import { MESSAGES_ERRORS } from "../common/messages";
import { ApiFailure } from "./api-types";

export default function toMessageFromResponse(
  status: number,
  payload: unknown,
  fallback: string,
): { message: string; code?: string; details?: unknown[]; requestId?: string } {
  if (!isRecord(payload)) {
    return { message: fallback };
  }

  const maybeFailure = payload as unknown as ApiFailure;
  const code = maybeFailure.error?.code;
  const message = maybeFailure.error?.message ?? fallback;
  const details = maybeFailure.error?.details;
  const requestId = maybeFailure.meta?.requestId;

  if (status >= 500 && message === fallback) {
    return { message: MESSAGES_ERRORS.SERVER_ERROR, code, details, requestId };
  }

  return { message, code, details, requestId };
}
