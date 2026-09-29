import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] text-foreground shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-slate-400 focus:border-ring focus:ring-4 focus:ring-ring/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
