import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { z } from "zod";

export function applyZodErrors<TValues extends FieldValues>(
  error: z.ZodError<TValues>,
  setError: UseFormSetError<TValues>,
) {
  error.issues.forEach((issue) => {
    const field = issue.path[0];
    if (typeof field === "string") {
      setError(field as Path<TValues>, { message: issue.message });
    }
  });
}
