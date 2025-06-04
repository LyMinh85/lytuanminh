import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";

type ScrollShrinkImageProps = {
  image: {
    src: string;
    alt: string;
  };
};

export default function ScrollShrinkImage({ image }: ScrollShrinkImageProps) {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Scroll position:", latest);
  });

  const scale = useTransform(scrollY, [270, 600], [1, 0.7]);

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      style={{ scale }}
      className="bg-white dark:bg-gray-700 rounded-3xl shadow-md"
    >
      <Image
        src={image.src}
        sizes="100vw"
        alt={image.alt}
        width={900}
        height={500}
        className="w-full h-auto rounded-3xl object-cover relative"
      />
    </motion.div>
  );
}
