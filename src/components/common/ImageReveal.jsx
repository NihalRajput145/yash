import React from 'react';
import { motion } from 'framer-motion';

export default function ImageReveal({
  src,
  alt = "",
  className = "",
  aspectRatio = "aspect-[3/4]",
  priority = false,
  overlay = false,
  zoomOnHover = true,
  children
}) {
  return (
    <div className={`relative overflow-hidden bg-[#eeea e0] ${aspectRatio} ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(12% 0 0 0)', opacity: 0, scale: 1.08 }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{
          duration: 1.1,
          ease: [0.19, 1, 0.22, 1]
        }}
        className="w-full h-full relative"
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${
            zoomOnHover ? 'hover:scale-105' : ''
          }`}
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/20 to-transparent pointer-events-none" />
        )}
        {children}
      </motion.div>
    </div>
  );
}
