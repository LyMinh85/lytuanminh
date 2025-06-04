import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
type FadeUpTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export const fadeUpTextAnimation = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0,
      ease: "easeIn",
    }
  },
};

export default function FadeUpText({
  children,
  className = "",
  delay = 0,
}: FadeUpTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0  });

  return (
    <motion.span
      ref={ref}
      variants={fadeUpTextAnimation}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ ease: "easeIn", delay }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
