"use client";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Header from "@/components/ui/header";
import { motion } from "motion/react";
import Link from "next/link";
import AnimateTypeWriter from "./animated/animate-type-writer";

const animation = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Introduction() {
  const texts = [
    "turns ideas into beautiful websites.",
    "turns caffeine into code.",
    "loves solving problems.",
    "enjoys building web applications.",
  ];

  return (
    <section id="introduction" className="h-screen relative">
      <Header />
      <Container size="md" padding="lg" className="h-full">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              staggerChildren: 0.1,
            }}
            className="text-2xl md:text-6xl font-black text-center"
          >
            <motion.span
              variants={animation}
              className="inline-block"
            >
              {`Hello, I'm Minh `}
            </motion.span>
            <br />
            <motion.span
              variants={animation}
              className="inline-block"
            >
              {`I'm a `}
            </motion.span>{" "}
            <motion.span
              variants={animation}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            >
              web developer
            </motion.span>{" "}
            <motion.span
              variants={animation}
              className="inline-block"
            >
              {` who`}
            </motion.span>
            <br />
            <span className="inline-block text-black dark:text-white">
              {/* <TypeWriter
                texts={texts}
                typingSpeed={80}
                deletingSpeed={40}
                delayAfterTyping={1200}
                startDelay={700}
                cursor="|"
                active={true}
              /> */}
              <AnimateTypeWriter
                text={
                  // duplicate the array to make it longer
                  texts.concat(texts)
                }
              />
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.5 }}
          >
            <Button
              variant="default"
              size="heading"
              className="dark:text-white transition-colors bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
              asChild
            >
              <Link href="#freelance-work" scroll={true}>
                View Projects
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
