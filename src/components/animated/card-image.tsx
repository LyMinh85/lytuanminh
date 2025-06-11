import { motion } from "motion/react";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import MotionImage from "./motion-image";
import { X } from "lucide-react";
import { ANIMATION_SPRING } from "@/constants/animation";
import { CARD_UI } from "@/constants/animation";
import { scrollManager } from "@/utils/animation-utils";

interface CloseButtonProps {
  isSelected: boolean;
  isDarkThumbnail: boolean;
  onClose: () => void;
}

/**
 * Close button component for the project card
 */
export const CloseButton = ({ 
  isSelected, 
  isDarkThumbnail, 
  onClose 
}: CloseButtonProps) => (
  <motion.button
    className={cn(
      "absolute rounded-full shadow-md z-10",
      CARD_UI.closeButton.position,
      CARD_UI.closeButton.padding,
      isDarkThumbnail
        ? CARD_UI.closeButton.light
        : CARD_UI.closeButton.dark
    )}
    onClick={(e) => {
      e.stopPropagation();
      scrollManager.enableScroll();
      onClose();
    }}
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
  >
    <X className="w-6 h-6" />
  </motion.button>
);

interface CardImageProps {
  project: Project;
  isSelected: boolean;
}

/**
 * Image component for the project card
 * Displays either a background color or an image
 */
export const CardImage = ({ project, isSelected }: CardImageProps) => {
  if (project.useColorBackgroundThumbnail) {
    return (
      <motion.div
        className={cn(
          "w-full h-full absolute top-0 left-0",
          isSelected ? "rounded-t-3xl" : "rounded-3xl"
        )}
        style={{
          background: project.bgColorThumbnail,
        }}
        layout
      />
    );
  }

  return (
    <MotionImage
      src={project.image}
      alt={project.title}
      width={400}
      height={300}
      className={cn(
        "w-full h-full object-cover object-center",
        isSelected ? "rounded-t-3xl" : "rounded-3xl"
      )}
      initial={false}
      transition={ANIMATION_SPRING.close}
      draggable={false}
    />
  );
};
