import { motion } from "motion/react";
import { scrollManager } from "@/utils/animation-utils";

interface OverlayProps {
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Overlay component for the project card
 * Captures clicks when the card is selected
 */
export const CardOverlay = ({ isSelected, onClick }: OverlayProps) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{
      pointerEvents: isSelected ? "auto" : "none",
    }}
    onClick={(e) => {
      e.stopPropagation();
      scrollManager.enableScroll();
      onClick();
    }}
    className="overlay"
  ></motion.div>
);
