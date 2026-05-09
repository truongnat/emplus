import { z } from "zod";
import { parseWithSchema, requiredTrimmedString } from "../shared/validators/zod.ts";

const joinCoupleSchema = z.object({
  inviteCode: requiredTrimmedString("Mã mời (inviteCode) là bắt buộc").transform((value) => value.toUpperCase()),
});

const createCoupleSchema = z.object({
  loveStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày yêu phải ở định dạng YYYY-MM-DD"),
  coupleNickname: z.string().max(100).optional(),
});

const updateCoupleSchema = z.object({
  loveStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày yêu phải ở định dạng YYYY-MM-DD").optional(),
  coupleNickname: z.string().max(100).optional(),
});

export type JoinCoupleDto = z.infer<typeof joinCoupleSchema>;
export type CreateCoupleDto = z.infer<typeof createCoupleSchema>;
export type UpdateCoupleDto = z.infer<typeof updateCoupleSchema>;

export function validateJoinCoupleInput(input: unknown): JoinCoupleDto {
  return parseWithSchema(joinCoupleSchema, input, {
    message: "Dữ liệu ghép đôi không hợp lệ.",
  });
}

export function validateCreateCoupleInput(input: unknown): CreateCoupleDto {
  return parseWithSchema(createCoupleSchema, input, {
    message: "Dữ liệu tạo cặp đôi không hợp lệ.",
  });
}

export function validateUpdateCoupleInput(input: unknown): UpdateCoupleDto {
  return parseWithSchema(updateCoupleSchema, input, {
    message: "Dữ liệu cập nhật cặp đôi không hợp lệ.",
  });
}
