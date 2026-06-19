import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "@/components/icons";

/**
 * §6.18 — Toast Notification.
 * Obsidian surface, 8.4px radius, 1px mist border.
 * Tự ẩn 4s, có progress bar aurora violet (shrink keyframe).
 */
export interface ToastNotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  variant?: "success" | "info";
  duration?: number;
  onClose?: () => void;
}

export function ToastNotification({
  className,
  title,
  description,
  variant = "success",
  duration = 4000,
  onClose,
  ...props
}: ToastNotificationProps) {
  React.useEffect(() => {
    if (!duration) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-[360px]",
        "rounded-[8.4px]",
        "bg-obsidian",
        "border border-mist/20",
        "shadow-[0_0_0_1px_rgba(229,229,229,0.1),0_40px_80px_rgba(0,0,0,0.7)]",
        "p-4",
        "overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <CheckCircleIcon
          className={cn(
            "w-5 h-5 flex-shrink-0 mt-0.5",
            variant === "success" ? "text-toxic-lime" : "text-arc-blue",
          )}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-bone-white">{title}</p>
          {description && (
            <p className="text-xs text-ash-text mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="mt-3 h-0.5 bg-mist/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-aurora-violet"
          style={{ animation: `shrink ${duration}ms linear forwards` }}
        />
      </div>
    </div>
  );
}
