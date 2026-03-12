import { z } from "zod";
import { parseWithSchema, requiredTrimmedString } from "../shared/validators/zod.ts";

const websocketAuthQuerySchema = z.object({
  token: requiredTrimmedString("token là bắt buộc."),
  coupleId: requiredTrimmedString("coupleId là bắt buộc."),
});

export type WebsocketAuthQueryDto = z.infer<typeof websocketAuthQuerySchema>;

export function validateWebsocketAuthQuery(input: unknown): WebsocketAuthQueryDto {
  return parseWithSchema(websocketAuthQuerySchema, input, {
    message: "Query xác thực websocket không hợp lệ.",
  });
}
