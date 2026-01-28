import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline";
}

const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  ({ text, size = "medium", variant = "primary", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
          // Size variants
          size === "small" && "px-4 py-2 text-sm",
          size === "medium" && "px-6 py-2.5 text-base",
          size === "large" && "px-8 py-3 text-lg",
          // Color variants
          variant === "primary" &&
            "bg-[#276df0] text-white hover:bg-[#1e5bc7] shadow-md hover:shadow-lg",
          variant === "secondary" &&
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "outline" &&
            "border-2 border-[#276df0] text-[#276df0] hover:bg-[#276df0] hover:text-white",
          className
        )}
        {...props}
      >
        {text}
      </button>
    );
  }
);

MainButton.displayName = "MainButton";

export default MainButton;
