"use client";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type VisitSiteButtonProps = {
  href: string;
  children: React.ReactNode;
};

const iconVariants = {
  initial: { x: 0, y: 0 },
  hover: { x: 4, y: -2 },
};

export default function VisitSiteButton({
  children,
  href,
}: VisitSiteButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant="default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      asChild
    >
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        className="hover:underline underline-offset-4 dark:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </Button>
  );
}
