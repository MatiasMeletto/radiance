"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import { memo } from "react";

interface CardProps {
  src: string;
  scrollYProgress: MotionValue<number>;
  className?: string;
}

function Card3DComponent({ src, scrollYProgress, className }: CardProps) {
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <motion.div
      style={{ 
        rotateX, 
        scale, 
        opacity,
        transformStyle: "preserve-3d" as const,
      }}
      className={`w-full rounded-3xl overflow-hidden border border-white/10 bg-[#1a1615] shadow-2xl will-change-transform ${className || 'aspect-video'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
      
      <div className="absolute top-6 left-6 z-20 bg-[var(--primary-color)] px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-white/10">
        <p className="text-white text-sm font-bold tracking-wide">Radiance Project</p>
      </div>

      <img 
        src={src} 
        alt="Project Preview" 
        className="w-full h-full object-cover transform-gpu"
        loading="lazy"
      />
    </motion.div>
  );
}

export const Card3D = memo(Card3DComponent);