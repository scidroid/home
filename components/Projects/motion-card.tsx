"use client";

import React, {
  KeyboardEvent,
  ReactNode,
  RefAttributes,
  forwardRef
} from "react";

import { motion } from "framer-motion";

interface CardPrimitiveProps extends RefAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  tabIndex?: number;
}

const CardPrimitive = forwardRef<HTMLDivElement, CardPrimitiveProps>(
  ({ children, hover, className, ...props }: CardPrimitiveProps, ref) => (
    <div
      ref={ref}
      className={`w-full max-w-2xl bg-white rounded-md border-2 px-8 py-6 ${
        hover
          ? "shadow-inner hover:shadow-md hover:bg-neutral-50 transition-colors"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

CardPrimitive.displayName = "CardPrimitive";

export const MotionCard = motion(CardPrimitive);
