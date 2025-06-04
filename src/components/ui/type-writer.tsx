"use client";
import { useTypeWriter } from "@/hooks/use-type-writer";
import "./type-writer.css";
import { cn } from "@/lib/utils";

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterTyping?: number;
  startDelay?: number; // Optional delay before starting the typing effect
  className?: string;
  cursor?: string; // Optional cursor style
  active?: boolean; // Optional prop to control the active state
}

export default function TypeWriter({
  texts,
  typingSpeed = 80,
  deletingSpeed = 120,
  delayAfterTyping = 1000,
  startDelay = 0, // Default to 0 if not provided
  className,
  cursor = "|",
  active = true, // Default to true if not provided
}: TypeWriterProps) {
  const { displayedText } = useTypeWriter({
    texts,
    typingSpeed,
    deletingSpeed,
    delayAfterTyping,
    startDelay,
  });
  return (
    <span
      className={cn("typewriter", className)}
      style={{ ["--cursor" as string]: `"${cursor}"` }}
    >
      {active ? displayedText : texts[0]}
    </span>
  );
}
