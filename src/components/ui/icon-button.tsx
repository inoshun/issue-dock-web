import * as React from "react";

import { cn } from "@/lib/utils";

type IconButtonProps = React.ComponentProps<"button"> & {
  "aria-label": string;
};

function IconButton({ className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex size-10 cursor-pointer items-center justify-center rounded-xl text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { IconButton };
