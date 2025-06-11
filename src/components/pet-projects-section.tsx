"use client";
import { Container } from "./ui/container";
import FadeUpText from "./animated/fade-up-text";
import { useState } from "react";
import { Card } from "./animated/card";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  links?: {
    type: "github" | "website";
    url: string;
  }[];
  classNameGrid?: string; // Optional className for grid layout
  useColorBackgroundThumbnail?: boolean; // Optional prop to use color background
  bgColorThumbnail?: string; // Optional background color for thumbnail
  techStack: string[]; // Optional tech stack for the project
  isDarkColorThumbnail?: boolean; // Optional prop to indicate if the thumbnail is dark
}

const projects: Project[] = [
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
    useColorBackgroundThumbnail: true, // gradient color from #2379AA to #E8ACB3
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

export default function PetProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="pet-projects">
      <Container className="mx-auto" size="lg" padding="lg">
        <h2 className="text-5xl font-bold text-center mb-16">
          <FadeUpText>Pet Projects</FadeUpText>
        </h2>
        <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-5 gap-4 h-auto lg:h-screen lg:max-h-[800px]">
          {projects.map((project) => (
            <Card
              key={project.id}
              project={project}
              className={project.classNameGrid}
              isSelected={selectedId === project.id}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
