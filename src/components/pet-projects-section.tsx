"use client";
import { Container } from "./ui/container";
import FadeUpText from "./animated/fade-up-text";
import { useState } from "react";
import { Card } from "./animated/card";
import { Project } from "@/types/project";
import { projects } from "@/data/projects";

/**
 * Constants for the section UI
 */
const SECTION_UI = {
  title: {
    className: "text-5xl font-bold text-center mb-16",
    text: "Pet Projects"
  },
  grid: {
    className: "flex flex-col md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-5 gap-4 h-auto lg:h-screen lg:max-h-[800px]"
  }
};

/**
 * Component for rendering a single project card
 */
interface ProjectCardProps {
  project: Project;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

const ProjectCard = ({ project, selectedId, setSelectedId }: ProjectCardProps) => (
  <Card
    key={project.id}
    project={project}
    className={project.classNameGrid}
    isSelected={selectedId === project.id}
    setSelectedId={setSelectedId}
  />
);

/**
 * Main section component for displaying pet projects
 */
export default function PetProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="pet-projects">
      <Container className="mx-auto" size="lg" padding="lg">
        <h2 className={SECTION_UI.title.className}>
          <FadeUpText>{SECTION_UI.title.text}</FadeUpText>
        </h2>
        <div className={SECTION_UI.grid.className}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
