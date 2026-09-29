"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  normalizeEmail,
  signupSchema,
  type SignupFormValues,
} from "@/lib/signup-schema";
import { cn } from "@/lib/utils";
import {
  registerUser,
  type RegisterUserRequest,
} from "@/utils/apis/registerUser";
import { ApiError } from "@/utils/post";

function FieldMessage({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const {
    mutate,
    isError: isMutationError,
    isIdle: isMutationIdle,
    isPending: isMutationPending,
    isSuccess: isMutationSuccess,
    reset: resetMutation,
  } = useMutation<void, Error, RegisterUserRequest>({
    mutationKey: ["users", "register"],
    mutationFn: registerUser,
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 409) {
        setError("email", {
          message: "このメールアドレスはすでに登録されています",
        });
        setFocus("email");
      }
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    clearErrors("email");
    mutate({
      email: normalizeEmail(values.email),
      name: values.username,
      password: values.password,
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        if (!isMutationIdle) resetMutation();
      }}
      className="space-y-5"
    >
      <fieldset disabled={isMutationPending} className="space-y-5">
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-2"
            {...register("email")}
          />
          <FieldMessage id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="例：issue_taro"
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? "username-error" : undefined}
            className="mt-2"
            {...register("username")}
          />
          <FieldMessage
            id="username-error"
            message={errors.username?.message}
          />
        </div>

        <div>
          <Label htmlFor="password">パスワード</Label>
          <div className="relative mt-2">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="8文字以上"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "password-help password-error"
                  : "password-help"
              }
              className="pr-12"
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 text-slate-500"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={
                showPassword ? "パスワードを隠す" : "パスワードを表示"
              }
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" className="size-4.5" />
              ) : (
                <Eye aria-hidden="true" className="size-4.5" />
              )}
            </Button>
          </div>
          <p
            id="password-help"
            className="mt-1.5 text-xs text-muted-foreground"
          >
            8〜100文字で、英大文字・英小文字・数字・記号を含めてください
          </p>
          <FieldMessage
            id="password-error"
            message={errors.password?.message}
          />
        </div>

        <div>
          <Label htmlFor="passwordConfirmation">パスワード確認</Label>
          <div className="relative mt-2">
            <Input
              id="passwordConfirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              autoComplete="new-password"
              placeholder="パスワードをもう一度入力"
              aria-invalid={Boolean(errors.passwordConfirmation)}
              aria-describedby={
                errors.passwordConfirmation
                  ? "password-confirmation-error"
                  : undefined
              }
              className="pr-12"
              {...register("passwordConfirmation")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 text-slate-500"
              onClick={() => setShowPasswordConfirmation((visible) => !visible)}
              aria-label={
                showPasswordConfirmation
                  ? "確認用パスワードを隠す"
                  : "確認用パスワードを表示"
              }
              aria-pressed={showPasswordConfirmation}
            >
              {showPasswordConfirmation ? (
                <EyeOff aria-hidden="true" className="size-4.5" />
              ) : (
                <Eye aria-hidden="true" className="size-4.5" />
              )}
            </Button>
          </div>
          <FieldMessage
            id="password-confirmation-error"
            message={errors.passwordConfirmation?.message}
          />
        </div>

        {(isMutationSuccess || isMutationError) && (
          <div
            role={isMutationError ? "alert" : "status"}
            aria-live="polite"
            className={cn(
              "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm leading-5",
              isMutationError
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-800",
            )}
          >
            {isMutationError ? (
              <AlertCircle
                aria-hidden="true"
                className="mt-0.5 size-4.5 shrink-0"
              />
            ) : (
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-4.5 shrink-0"
              />
            )}
            <span>
              {isMutationSuccess
                ? "登録が完了しました。IssueDockへようこそ！"
                : "登録できませんでした。もう一度お試しください。"}
            </span>
          </div>
        )}

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isMutationPending}
        >
          {isMutationPending && (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          )}
          {isMutationPending ? "登録しています…" : "登録する"}
        </Button>
      </fieldset>

      <p className="text-center text-xs leading-5 text-muted-foreground">
        登録することで、IssueDockの利用を開始します。
      </p>
    </form>
  );
}
