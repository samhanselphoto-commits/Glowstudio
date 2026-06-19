import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * §6.17 — Input Field.
 * 6px radius, 1px mist border, canvaSans 16px, focus aurora violet.
 * Focus ring: 3px aurora-violet @ 20% opacity.
 */
export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, id, ...props }, ref) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    return (
      <div>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-ash-text mb-2"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full",
            "rounded-md",
            "border border-mist",
            "bg-obsidian",
            "px-4 py-3",
            "text-base text-bone-white",
            "outline-none",
            "placeholder:text-charcoal-mute",
            "focus:border-aurora-violet",
            "focus:shadow-[0_0_0_3px_rgba(124,92,255,0.2)]",
            "transition",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
InputField.displayName = "InputField";
