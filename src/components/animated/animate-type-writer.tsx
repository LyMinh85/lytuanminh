import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const animation = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

type AnimateTypeWriterProps = {
  text: string[];
  initialDelay?: number;
};

export default function AnimateTypeWriter({
  text,
  initialDelay = 600,
}: AnimateTypeWriterProps) {
  const [currentLine, setCurrentLine] = useState<string>(text[0]);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [isChangingText, setIsChangingText] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    let delayTimeout: NodeJS.Timeout;

    if (isInView) {
      delayTimeout = setTimeout(() => {
        setStartAnimation(true);
      }, initialDelay);
    }

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [isInView, initialDelay]);

  useEffect(() => {
    const nextLine = () => {
      setCurrentLine((prev) => {
        const currentIndex = text.indexOf(prev);
        const nextIndex = (currentIndex + 1) % text.length;
        return text[nextIndex];
      });
    };

    let timeout: NodeJS.Timeout;
    const show = async () => {
      setIsChangingText(false);
      await controls.start("visible");

      // Show text for a readable duration based on text length
      timeout = setTimeout(
        async () => {
          setIsChangingText(true);
          await controls.start("hidden");
          nextLine();
          // Only change the text once it's fully hidden
          setTimeout(() => {
            show();
          }, 300); // Small delay to ensure transition is complete
        },
        currentLine.length * 100 // Minimum 2 seconds or longer for longer texts
      );
    };

    if (isInView && startAnimation && !isChangingText) {
      show();
    } else if (!isInView) {
      controls.start("hidden");
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isInView, controls, text, currentLine, startAnimation, isChangingText]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            duration: 0.1,
          },
        },
        hidden: {
          transition: {
            duration: 0.1,
          },
        },
      }}
    >
      {currentLine.split("").map((char, index) => (
        <motion.span
          variants={animation}
          key={`${char}-${index}-${currentLine}`}
          className="typewriter-char inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
