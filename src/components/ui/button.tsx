import * as React from "react";

import { cn } from "@/lib/utils";

function Button({
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-indigo-600/20 outline-none transition-[background-color,box-shadow,transform] hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-60 active:translate-y-px",
        className,
      )}
      {...props}
    />
  );
}

export { Button };
