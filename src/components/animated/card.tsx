import "./card.css";
import * as React from "react";
import { memo, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import { Project } from "../pet-projects-section";
import { cn } from "@/lib/utils";
import MotionImage from "./motion-image";
import { Badge } from "../ui/badge";
import { Globe, X } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  isSelected: boolean;
  project: Project;
  className?: string;
  selectedId?: string | null;
  setSelectedId: (id: string | null) => void;
}

export const openSpring = { type: "spring", stiffness: 200, damping: 30 };
export const closeSpring = { type: "spring", stiffness: 300, damping: 35 };

export const Card = memo(
  ({ isSelected, project, className, setSelectedId }: Props) => {
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    const cardRef = useRef(null);

    function checkZIndex(latest: any) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    return (
      <div
        className={cn(`rounded-3xl relative h-80 lg:h-full`, className)}
        style={{
          pointerEvents: isSelected ? "auto" : "none",
        }}
        onClick={() => {
          if (document) {
            document.body.style.overflow = "hidden"; // Prevent scrolling when a card is selected
          }
          setSelectedId(project.id);
        }}
      >
        <Overlay isSelected={isSelected} onClick={() => setSelectedId(null)} />

        <div
          className={cn(
            "card-content-container rounded-3xl",
            isSelected && "open",
            project.useColorBackgroundThumbnail && "color-background"
          )}
        >
          <motion.div
            ref={cardRef}
            className="card-content rounded-3xl bg-white dark:bg-[#1c1c1e]"
            layout
            transition={isSelected ? openSpring : closeSpring}
            onUpdate={checkZIndex}
          >
            <motion.div layout className="card-image-container">
              {project.useColorBackgroundThumbnail ? (
                <motion.div
                  className={cn(
                    "w-full h-full absolute top-0 left-0",
                    isSelected ? "rounded-t-3xl" : "rounded-3xl"
                  )}
                  style={{
                    background: project.bgColorThumbnail,
                  }}
                  layout
                ></motion.div>
              ) : (
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
                  transition={closeSpring}
                  draggable={false}
                />
              )}
              <Title project={project} isSelected={isSelected} />
              {/* Close button */}
              <motion.button
                className={cn(
                  "absolute top-4 right-4 rounded-full p-1 shadow-md z-10",
                  project.isDarkColorThumbnail
                    ? "bg-white text-black"
                    : "bg-black/50 text-white"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  if (document) {
                    document.body.style.overflow = "auto"; // Re-enable scrolling when the close button is clicked
                  }
                  setSelectedId(null);
                }}
                initial={false}
                animate={{ opacity: isSelected ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
            {/* The overlay is used to capture clicks when the card is selected */}
            <motion.div className="content-container z-[-10]">
              {/* 2 button link, one is github link, other is website link, include icon */}
              <div className="flex gap-2 mb-2">
                {project.links?.map((link, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="outline"
                    className="bg-white flex items-center"
                    size="sm"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.type === "github" ? (
                        <span className="flex items-center gap-1">
                          {GithubIcon} GitHub
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Globe /> Website
                        </span>
                      )}
                    </a>
                  </Button>
                ))}
              </div>
              <p className="text-xl text-black dark:text-white mb-4">
                {project.description}
              </p>
              {project.useColorBackgroundThumbnail && (
                <MotionImage
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full rounded-3xl object-cover object-top"
                  initial={false}
                  transition={closeSpring}
                  draggable={false}
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  },
  (prev, next) =>
    prev.isSelected === next.isSelected && prev.selectedId === next.selectedId
);

interface OverlayProps {
  isSelected: boolean;
  onClick: () => void;
}

const Overlay = ({ isSelected, onClick }: OverlayProps) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{
      pointerEvents: isSelected ? "auto" : "none",
    }}
    onClick={(e) => {
      e.stopPropagation();
      if (document) {
        document.body.style.overflow = "auto"; // Re-enable scrolling when the overlay is clicked
      }
      onClick();
    }}
    className="overlay"
  ></motion.div>
);

Card.displayName = "Card";

interface TitleProps {
  project: Project;
  isSelected: boolean;
}

export const Title = ({ project, isSelected }: TitleProps) => {
  const x = isSelected ? 30 : 15;
  const y = x;

  return (
    <motion.div
      className="title-container text-4xl font-bold absolute m-4"
      initial={false}
      animate={{ x, y }}
      transition={isSelected ? openSpring : closeSpring}
      transformTemplate={scaleTranslate}
      style={{ originX: 0, originY: 0 }}
    >
      <h2>{project.title}</h2>
      <div className="flex items-center gap-2">
        {project.techStack?.map((tech, index) => (
          <Badge key={index} variant="outline" className="bg-white text-black">
            {tech}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
};

const scaleTranslate = ({
  x,
  y,
  scaleX,
  scaleY,
}: {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}) => `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;

const GithubIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-github"
    viewBox="0 0 16 16"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </svg>
);
