import { z } from "zod";
import { parseWithSchema, requiredTrimmedString } from "../shared/validators/zod.ts";

const joinCoupleSchema = z.object({
  inviteCode: requiredTrimmedString("Mã mời (inviteCode) là bắt buộc").transform((value) => value.toUpperCase()),
});

export type JoinCoupleDto = z.infer<typeof joinCoupleSchema>;

export function validateJoinCoupleInput(input: unknown): JoinCoupleDto {
  return parseWithSchema(joinCoupleSchema, input, {
    message: "Dữ liệu ghép đôi không hợp lệ.",
  });
}
