/*
 * Created on Sat Feb 04 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import cn from "classnames";
import { motion } from "framer-motion";

interface LoadingBlockProps {
  className?: string;
  width?: string;
  height?: string;
}

const LoadingBlock: React.FC<LoadingBlockProps> = ({ className, width, height }) => {
  const containerClasses = cn(
    "bg-gray-100 rounded-md",
    !width ? "w-full" : width,
    !height ? "h-12" : height,
    className
  );

  return (
    <motion.div
      className={containerClasses}
      animate={{ opacity: [1, 0.15, 1] }}
      transition={{
        ease: "easeInOut",
        repeat: Infinity,
        duration: 2,
      }}
    />
  );
};

export default LoadingBlock;
