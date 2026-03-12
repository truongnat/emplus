import ApiError from "./api-error";
import { MESSAGES_ERRORS } from "../common/messages";

export function toDisplayError(error: unknown): string {
    if (error instanceof ApiError) {
        return error.message;
    }

    if (error instanceof Error) {
        if (/fetch failed|failed to fetch|network request failed|network error|load failed/i.test(error.message)) {
            return MESSAGES_ERRORS.NETWORK_ERROR;
        }

        return error.message;
    }

    return MESSAGES_ERRORS.UNKNOWN_ERROR;
}