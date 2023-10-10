import React, { useState } from "react";
import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: JSX.Element;
}

const IconInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const [focus, setFocus] = useState<boolean>(false);

    return (
      <div
        className={`focus: flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors ${
          focus && "ring-2"
        }`}
      >
        {icon}
        <input
          type={type}
          className={cn(
            "w-full border-none px-3 py-1 text-base outline-none",
            className,
          )}
          ref={ref}
          {...props}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
    );
  },
);

IconInput.displayName = "IconInput";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, IconInput };
