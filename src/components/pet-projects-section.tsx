"use client";
import Image from "next/image";
import { Container } from "./ui/container";
import UnderlineLink from "./UnderlineLink";
import { motion } from "motion/react";
import FadeUpText from "./animated/fade-up-text";

const projects = [
  {
    title: "Dịch Trung Việt - Vietphrase",
    description: "A platform for reading Vietnamese comics.",
    image: "/projects/doctruyen-thumbnail.webp",
    link: "https://doctruyen.space/dich-trung-viet",
  },
];

export default function PetProjectsSection() {
  return (
    <section id="pet-projects">
      <Container className="mx-auto" size="lg" padding="lg">
        <h2 className="text-5xl font-bold text-center mb-16">
          <FadeUpText>Pet Projects</FadeUpText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-md">
                <Image
                  src={project.image}
                  sizes="100vw"
                  alt="Wolvn Project Thumbnail"
                  width={900}
                  height={500}
                  className="w-full h-auto rounded-3xl object-cover border"
                />
              </div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.8, delay: 0.1 }}
                className="text-3xl font-semibold text-left mt-4"
              >
                <UnderlineLink
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </UnderlineLink>
              </motion.h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
