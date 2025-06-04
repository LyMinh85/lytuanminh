"use client";
import { Container } from "./ui/container";
import UnderlineLink from "./UnderlineLink";
import { motion } from "motion/react";
import FadeUpText from "./animated/fade-up-text";
import Image from "next/image";
import VisitSiteButton from "./animated/visit-site-button";
import AnimateTechStack from "./animated/animate-tech-stack";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "Rawhand - E-commerce for Handmade Goods",
    description:
      "An online platform for ordering handcrafted or homemade products. Dynamic menu, smooth UX, real-time payment.",
    image: "/projects/rawhand-thumbnail.webp",
    link: "https://rawhand.vercel.app",
    techStack: ["Next.js", "Tailwind CSS", "Strapi", "Shadcn"],
    status: "In Progress",
  },
  {
    title: "Word of Life Vietnam",
    description:
      "A bilingual website that supports Christian youth ministries in Vietnam. It provides key information about events, donation opportunities, and ministry updates.",
    image: "/projects/wolvn-thumbnail.webp",
    link: "https://wolvn.org",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Firebase"],
    status: "Completed",
  },
  {
    title: "Vietnam Dried Fruit",
    description:
      "Promotional website with custom CMS for managing dried fruit product listings and content.",
    image: "/projects/belvietech-thumbnail.webp",
    link: "https://belvietech.com",
    techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Shadcn"],
    status: "Completed",
  },
];

export default function FreelanceWorkSection() {
  return (
    <section id="freelance-work" className="">
      <Container className="mx-auto" size="lg" padding="lg">
        <h2 className="text-5xl font-bold text-center mb-16">
          <FadeUpText>Freelance Work</FadeUpText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 gap-y-16">
          {projects.map((project, index) => (
            <div className="grid md:grid-cols-2 gap-8 items-center" key={index}>
              <div className="flex flex-col justify-center space-y-4 order-2 md:order-1">
                <FadeUpText>
                  <h3 className="text-4xl font-semibold text-left mb-0">
                    <UnderlineLink
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </UnderlineLink>
                  </h3>
                </FadeUpText>

                <AnimateTechStack techStack={project.techStack} />

                <FadeUpText>
                  <Badge
                    variant={
                      project.status === "Completed" ? "success" : "inProgress"
                    }
                  >
                    {project.status}
                  </Badge>
                </FadeUpText>

                <FadeUpText>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {project.description}
                  </p>
                </FadeUpText>

                <FadeUpText>
                  <VisitSiteButton href={project.link}>
                    Visit site
                  </VisitSiteButton>
                </FadeUpText>
              </div>

              <motion.div className="bg-white dark:bg-gray-700 rounded-3xl shadow-md order-1 md:order-2">
                <Image
                  src={project.image}
                  sizes="100vw"
                  alt={project.title}
                  width={900}
                  height={500}
                  className="w-full h-auto rounded-3xl object-cover relative border"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
