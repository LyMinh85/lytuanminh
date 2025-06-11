import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { ANIMATION_SPRING } from "@/constants/animation";
import { Project } from "@/types/project";
import { scaleTranslate } from "@/utils/animation-utils";

interface TitleProps {
  project: Project;
  isSelected: boolean;
}

/**
 * Title component for the project card
 */
export const CardTitle = ({ project, isSelected }: TitleProps) => {
  const x = isSelected ? 30 : 15;
  const y = x;

  return (
    <motion.div
      className="title-container text-4xl font-bold absolute m-4"
      initial={false}
      animate={{ x, y }}
      transition={isSelected ? ANIMATION_SPRING.open : ANIMATION_SPRING.close}
      transformTemplate={scaleTranslate}
      style={{ originX: 0, originY: 0 }}
    >
      <h2>{project.title}</h2>
      <TechStackBadges techStack={project.techStack} />
    </motion.div>
  );
};

interface TechStackBadgesProps {
  techStack: string[];
}

/**
 * Displays the tech stack as badges
 */
const TechStackBadges = ({ techStack }: TechStackBadgesProps) => (
  <div className="flex items-center gap-2 flex-wrap">
    {techStack?.map((tech, index) => (
      <Badge key={index} variant="outline" className="bg-white text-black">
        {tech}
      </Badge>
    ))}
  </div>
);
