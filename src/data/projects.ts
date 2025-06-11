import { Project } from "@/types/project";

/**
 * Mock projects data
 * In a real application, this could come from an API or CMS
 */
export const projects: Project[] = [
  {
    id: "doctruyen",
    title: "Dịch Trung Việt - Vietphrase",
    description:
      "A web platform that translates Chinese content into Vietnamese using the Vietphrase method directly on the client-side. It also supports full webpage translation by providing a URL.",
    image: "/projects/doctruyen-thumbnail.webp",
    links: [
      {
        type: "website",
        url: "https://doctruyen.space/dich-trung-viet",
      },
    ],
    classNameGrid: "col-span-1 lg:col-span-3 row-span-2",
    useColorBackgroundThumbnail: true,
    bgColorThumbnail: "#9F8F6A",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    isDarkColorThumbnail: false,
  },
  {
    id: "mytodolist",
    title: "To-Do List",
    description:
      "A simple to-do list web application built with React.js. Users can create new lists, add tasks, and mark them as complete.",
    image: "/projects/mytodolist-thumbnail.webp",
    links: [
      {
        type: "github",
        url: "https://github.com/LyMinh85/mytodolist-client",
      },
    ],
    classNameGrid: "col-span-1 lg:col-span-2 row-span-2",
    useColorBackgroundThumbnail: true,
    bgColorThumbnail: "linear-gradient(135deg, #2379AA, #E8ACB3)",
    techStack: ["React.js", "Javascript", "Bootstrap"],
    isDarkColorThumbnail: false,
  },
  {
    id: "nest-auth",
    title: "NestJS Authentication",
    description:
      "An application for practicing authentication skills. It supports various login methods such as Google, Facebook, GitHub, and traditional password-based login, demonstrating expertise in OAuth and JWT.",
    image: "/projects/nest-auth-thumbnail.webp",
    links: [{ type: "github", url: "https://github.com/LyMinh85/nest-auth" }],
    classNameGrid: "col-span-1 lg:col-span-2 row-span-2 lg:row-span-3",
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "Passport.js"],
    useColorBackgroundThumbnail: true,
    bgColorThumbnail: "#9A616D",
    isDarkColorThumbnail: false,
  },
  {
    id: "chillax",
    title: "Chillax",
    description:
      "A website introducing 'Chillax', a cross-platform desktop music application built with Tkinter (Python) for a course project. The site provides instructions for downloading the application.",
    image: "/projects/chillax-web-thumbnail.webp",
    links: [
      {
        type: "github",
        url: "https://github.com/LyMinh85/chillax-web",
      },
      {
        type: "website",
        url: "https://lyminh85.github.io/chillax-web/index.html",
      },
    ],
    classNameGrid: "col-span-1 lg:col-span-3 row-span-2 lg:row-span-3",
    techStack: ["HTML", "CSS", "JavaScript"],
    useColorBackgroundThumbnail: false,
    isDarkColorThumbnail: true,
  },
];
