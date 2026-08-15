"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  /** Atraso em segundos — use com o índice do item para criar stagger. */
  delay?: number;
  /** Deslocamento vertical inicial, em pixels. */
  yOffset?: number;
  /** Anima ao entrar na viewport; desligue para animar na montagem. */
  animateOnScroll?: boolean;
};

export function BlurFade({
  children,
  className,
  delay = 0,
  yOffset = 16,
  animateOnScroll = true,
}: BlurFadeProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  const reduceMotion = useReducedMotion();

  const isVisible = animateOnScroll ? inView : true;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: "blur(8px)" }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: yOffset, filter: "blur(8px)" }
      }
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
