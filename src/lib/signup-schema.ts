import { z } from "zod";

export const EMAIL_PATTERN =
  /^(?:[A-Za-z0-9_'+-]+\.)*[A-Za-z0-9_'+-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;

const PASSWORD_SYMBOL_PATTERN = /[!-/:-@[-`{-~]/;
const PASSWORD_ALLOWED_CHARACTERS_PATTERN = /^[\x21-\x7e]+$/;

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "メールアドレスを入力してください")
      .refine(
        (value) => EMAIL_PATTERN.test(normalizeEmail(value)),
        "メールアドレスの形式が正しくありません",
      ),
    username: z
      .string()
      .min(2, "ユーザー名は2文字以上で入力してください")
      .max(100, "ユーザー名は100文字以下で入力してください")
      .refine((value) => !/\s/.test(value), "空白は使用できません"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .max(100, "パスワードは100文字以下で入力してください")
      .regex(/[A-Z]/, "英大文字を1文字以上含めてください")
      .regex(/[a-z]/, "英小文字を1文字以上含めてください")
      .regex(/[0-9]/, "数字を1文字以上含めてください")
      .regex(PASSWORD_SYMBOL_PATTERN, "記号を1文字以上含めてください")
      .regex(
        PASSWORD_ALLOWED_CHARACTERS_PATTERN,
        "半角英数字と半角記号のみ使用できます",
      ),
    passwordConfirmation: z
      .string()
      .min(1, "確認用パスワードを入力してください"),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
