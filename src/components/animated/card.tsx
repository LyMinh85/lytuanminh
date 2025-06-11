import "./card.css";
import * as React from "react";
import { memo, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project";
import { ANIMATION_SPRING, CARD_UI } from "@/constants/animation";
import { CardTitle } from "./card-title";
import { CardOverlay } from "./card-overlay";
import { CardImage, CloseButton } from "./card-image";
import { CardContent } from "./card-content";
import { scrollManager } from "@/utils/animation-utils";

interface Props {
  isSelected: boolean;
  project: Project;
  className?: string;
  selectedId?: string | null;
  setSelectedId: (id: string | null) => void;
}

export const Card = memo(
  ({ isSelected, project, className, setSelectedId }: Props) => {
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    const cardRef = useRef(null);

    /**
     * Updates the z-index based on the card's scale
     */
    function checkZIndex(latest: any) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    /**
     * Handles opening the card
     */
    const handleOpenCard = () => {
      scrollManager.preventScroll();
      setSelectedId(project.id);
    };

    /**
     * Handles closing the card
     */
    const handleCloseCard = () => {
      setSelectedId(null);
    };

    return (
      <div
        className={cn(`rounded-3xl relative h-80 lg:h-full`, className)}
        style={{
          pointerEvents: isSelected ? "auto" : "none",
        }}
        onClick={handleOpenCard}
      >
        <CardOverlay isSelected={isSelected} onClick={handleCloseCard} />

        <div
          className={cn(
            "card-content-container rounded-3xl",
            isSelected && "open",
            project.useColorBackgroundThumbnail && "color-background"
          )}
        >
          <motion.div
            ref={cardRef}
            className={cn(
              "card-content rounded-3xl",
              CARD_UI.backgroundColor.light, 
              CARD_UI.backgroundColor.dark
            )}
            layout
            transition={isSelected ? ANIMATION_SPRING.open : ANIMATION_SPRING.close}
            onUpdate={checkZIndex}
          >
            <motion.div layout className="card-image-container">
              <CardImage project={project} isSelected={isSelected} />
              <CardTitle project={project} isSelected={isSelected} />
              
              <CloseButton 
                isSelected={isSelected} 
                isDarkThumbnail={!!project.isDarkColorThumbnail} 
                onClose={handleCloseCard}
              />
            </motion.div>
            
            <CardContent project={project} />
          </motion.div>
        </div>
      </div>
    );  },
  (prev, next) =>
    prev.isSelected === next.isSelected && 
    prev.project.id === next.project.id
);

Card.displayName = "Card";
