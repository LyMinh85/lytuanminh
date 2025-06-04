import { motion, useInView } from "motion/react";
import { Badge } from "../ui/badge";
import { useRef } from "react";

type AnimateTechStackProps = {
  techStack: string[];
};

const animateTechStackAnimation = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.4,
      delay: 0,
      ease: "easeIn",
    },
  },
};

export default function AnimateTechStack({ techStack }: AnimateTechStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-wrap items-center gap-x-4"
    >
      {techStack.map((tech, index) => (
        <motion.div key={index} variants={animateTechStackAnimation}>
          <Badge variant="outline" asChild>
            <span className="inline-block text-lg font-semibold text-gray-800 dark:text-gray-200">
              {tech}
            </span>
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
}
