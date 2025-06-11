import { motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { forwardRef } from "react";

const ExoticImage = forwardRef<HTMLImageElement, ImageProps>(
  function ExoticImageWrapper(props, ref) {
    return <Image {...props} alt={props.alt || ""} ref={ref as any} />;
  }
);

const MotionImage = motion(ExoticImage)
export default MotionImage;