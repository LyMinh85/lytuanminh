/**
 * Represents a project in the portfolio
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  links?: ProjectLink[];
  classNameGrid?: string;
  useColorBackgroundThumbnail?: boolean;
  bgColorThumbnail?: string;
  techStack: string[];
  isDarkColorThumbnail?: boolean;
}

/**
 * Represents a link to a project resource
 */
export interface ProjectLink {
  type: "github" | "website";
  url: string;
}
