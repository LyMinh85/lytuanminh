import { Button } from "@/components/ui/button";
import { Project, ProjectLink } from "@/types/project";
import MotionImage from "./motion-image";
import { ANIMATION_SPRING } from "@/constants/animation";
import { getLinkIcon, getLinkText } from "../ui/icons";

interface CardContentProps {
  project: Project;
}

/**
 * Content component for the project card
 * Displays the project description and links
 */
export const CardContent = ({ project }: CardContentProps) => {
  return (
    <div className="content-container z-[-10]">
      <ProjectLinks links={project.links} />
      <ProjectDescription description={project.description} />
      {project.useColorBackgroundThumbnail && (
        <ProjectImage project={project} />
      )}
    </div>
  );
};

interface ProjectLinksProps {
  links?: ProjectLink[];
}

/**
 * Links component for the project card
 */
const ProjectLinks = ({ links }: ProjectLinksProps) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      {links.map((link, index) => (
        <ProjectLinkComponent key={index} link={link} />
      ))}
    </div>
  );
};

interface ProjectLinkProps {
  link: ProjectLink;
}

/**
 * Link component for a single project link
 */
const ProjectLinkComponent = ({ link }: ProjectLinkProps) => (
  <Button
    asChild
    variant="outline"
    className="bg-white flex items-center"
    size="sm"
  >
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      <span className="flex items-center gap-1">
        {getLinkIcon(link.type)} {getLinkText(link.type)}
      </span>
    </a>
  </Button>
);

interface ProjectDescriptionProps {
  description: string;
}

/**
 * Description component for the project card
 */
const ProjectDescription = ({ description }: ProjectDescriptionProps) => (
  <p className="text-xl text-black dark:text-white mb-4">{description}</p>
);

interface ProjectImageProps {
  project: Project;
}

/**
 * Image component for the project card content
 */
const ProjectImage = ({ project }: ProjectImageProps) => (
  <MotionImage
    src={project.image}
    alt={project.title}
    width={400}
    height={300}
    className="w-full h-full rounded-3xl object-cover object-top"
    initial={false}
    transition={ANIMATION_SPRING.close}
    draggable={false}
  />
);
