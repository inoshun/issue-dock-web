import type { Metadata } from "next";
import { CheckCircle2, Layers3 } from "lucide-react";

import { Card } from "@/components/ui/card";

import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "アカウント登録",
  description: "IssueDock のアカウントを作成します。",
};

export default function SignupPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_36%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-28 right-[8%] size-72 rounded-full border border-indigo-200/60 bg-white/40 blur-2xl"
      />

      <Card className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border-white/70 shadow-[0_32px_100px_-40px_rgba(30,41,59,0.45)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-slate-950 px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-24 size-80 rounded-full bg-indigo-500/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-24 size-72 rounded-full bg-sky-500/15 blur-3xl"
          />

          <div className="relative flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-950/40">
              <Layers3 aria-hidden="true" className="size-6" strokeWidth={2} />
            </span>
            <span className="text-xl font-semibold tracking-tight">
              IssueDock
            </span>
          </div>

          <div className="relative my-16">
            <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-indigo-300 uppercase">
              Start organizing
            </p>
            <h2 className="max-w-sm text-4xl leading-[1.25] font-semibold tracking-tight">
              課題を整理して、
              <br />
              チームを前へ。
            </h2>
            <p className="mt-6 max-w-sm leading-7 text-slate-300">
              IssueDockなら、日々の課題とコミュニケーションをシンプルに管理できます。
            </p>
          </div>

          <ul className="relative space-y-4 text-sm text-slate-200">
            {[
              "チームの課題をひとつの場所に集約",
              "状況と優先度をわかりやすく共有",
              "コメントで判断の経緯を残せる",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-5 shrink-0 text-indigo-300"
                />
                {benefit}
              </li>
            ))}
          </ul>
        </aside>

        <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <Layers3 aria-hidden="true" className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              IssueDock
            </span>
          </div>

          <header className="mb-8">
            <p className="mb-2 text-sm font-semibold text-indigo-600">
              IssueDockをはじめる
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              アカウント登録
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              必要な情報を入力して、アカウントを作成してください。
            </p>
          </header>

          <SignupForm />
        </section>
      </Card>
    </main>
  );
}
