"use client";
import { useEffect, useState, useCallback } from "react";

interface TypeWriterOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterTyping?: number;
  startDelay?: number; // Optional delay before starting the typing effect
}

export const useTypeWriter = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterTyping = 2000,
  startDelay = 0, // Default to 0 if not provided
}: TypeWriterOptions): {
  displayedText: string;
} => {
  const [displayedText, setDisplayedText] = useState("");

  const runTypewriter = useCallback(() => {
    let currentLine = 0;
    let isDeleting = false;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentText = texts[currentLine];

      if (!isDeleting && charIndex < currentText.length) {
        // Typing text
        setDisplayedText(currentText.substring(0, charIndex + 1));
        charIndex++;
        timeoutId = setTimeout(type, typingSpeed);
      } else if (!isDeleting && charIndex === currentText.length) {
        // Finished typing, pause before deleting
        isDeleting = true;
        timeoutId = setTimeout(type, delayAfterTyping);
      } else if (isDeleting && charIndex > 0) {
        // Deleting text
        setDisplayedText(currentText.substring(0, charIndex - 1));
        charIndex--;
        timeoutId = setTimeout(type, deletingSpeed);
      } else if (isDeleting && charIndex === 0) {
        // Move to next text
        isDeleting = false;
        currentLine = (currentLine + 1) % texts.length;
        timeoutId = setTimeout(type, typingSpeed);
      }
    };

    if (startDelay > 0) {
      // Start with a delay if specified
      timeoutId = setTimeout(() => {
        type();
      }, startDelay);
    } else {
      // Start immediately
      type();
    }

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [texts, typingSpeed, deletingSpeed, delayAfterTyping, startDelay]);

  useEffect(() => {
    const cleanup = runTypewriter();
    return cleanup;
  }, [runTypewriter]);

  return { displayedText };
};
