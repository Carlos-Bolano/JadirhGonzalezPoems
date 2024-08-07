import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkButtonVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden group border border-black",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:text-black",
        secondary: "bg-white text-black hover:text-white",
      },
      size: {
        default: "px- 8 py-2.5",
        sm: "px-4 py-2",
        lg: "px-12 py-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkButtonVariants> {
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  className,
  variant = "default",
  size = "default",
  href,
  children,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn(linkButtonVariants({ variant, size, className }))}
      {...props}
    >
      <span
        className={cn(
          "absolute w-0 h-0 transition-all duration-500 ease-out rounded-full group-hover:w-56 group-hover:h-56",
          variant === "default"
            ? "group-hover:bg-white"
            : "group-hover:bg-black"
        )}
      ></span>
      <span
        className={cn("relative text-base font-semibold", {
          "group-hover:text-black": variant === "default",
          "group-hover:text-white": variant === "secondary",
        })}
      >
        {children}
      </span>
    </Link>
  );
};

export { LinkButton, linkButtonVariants };
