import React from 'react';
import { motion } from 'framer-motion';

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 36,
  duration = 0.85
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
