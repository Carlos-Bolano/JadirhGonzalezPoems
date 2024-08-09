"use client";
import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkButtonVariants = cva(
  "relative inline-flex items-center font-cagliostro justify-center overflow-hidden group border border-Dark",
  {
    variants: {
      variant: {
        default: "bg-Dark text-white hover:text-Dark",
        secondary: "bg-white text-Dark hover:text-white",
      },
      size: {
        default: "px-10 py-2",
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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Link
      href={href}
      className={cn(linkButtonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    >
      <span
        className={cn(
          "absolute w-0 h-0 transition-all duration-500 ease-out rounded-full group-hover:w-56 group-hover:h-56",
          variant === "default" ? "group-hover:bg-white" : "group-hover:bg-Dark"
        )}
      ></span>
      <span
        className={cn("relative text-base", {
          "group-hover:text-Dark": variant === "default",
          "group-hover:text-white": variant === "secondary",
        })}
      >
        {children}
      </span>
    </Link>
  );
};

export { LinkButton, linkButtonVariants };
