import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
}

export function Callout({
  children,
  icon,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "my-4 flex min-w-0 items-start gap-3 overflow-hidden rounded-md border border-l-4 p-3 break-words sm:my-6 sm:p-4",
        {
          "border-red-900 bg-red-50 dark:bg-red-950/30": type === "danger",
          "border-yellow-900 bg-yellow-50 dark:bg-yellow-950/30": type === "warning",
        }
      )}
      {...props}
    >
      {icon && <span className="shrink-0 text-xl sm:text-2xl">{icon}</span>}
      <div className="min-w-0 flex-1 overflow-hidden break-words">{children}</div>
    </div>
  );
}
