"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card3D } from "./card3D";
import Image from "next/image";

const projects = [
  "https://framerusercontent.com/images/JeI7uULY0av9DxD7q7NVLTuoNc.png",
  "https://framerusercontent.com/images/pfcMvn2yqXD2Cl6VWthMkHlhaKQ.png",
  "https://framerusercontent.com/images/W508S15xkXJdvalNWW9jYJSIKg.png",
];

export function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section
      id="productos"
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto md:px-4 -mt-8 md:-mt-16 pb-12 md:pb-40 z-20 md:[perspective:1500px]"
    >
      {/* --------------------------------VERSIÓN MOVIL: Card3D pero Vertical (aspect-[3/4])---------------------------------------- */}
      <div className="md:hidden flex justify-center items-center w-full px-0">
        <div className="w-full px-4">
          <Card3D 
            src={projects[0]} 
            scrollYProgress={scrollYProgress} 
            className="aspect-[3/4]" 
          />
        </div>
      </div>

      {/* ----------------------------------------VERSION DESKTOP: Carrusel Horizontal---------------------------------------- */}
      <div className="hidden md:block relative px-4">
        <button onClick={() => scroll("left")} className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full border backdrop-blur-md bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--primary-text-color)] hover:brightness-110 active:scale-95 shadow-lg transition-transform">
          <ChevronLeft />
        </button>
        <button onClick={() => scroll("right")} className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full border backdrop-blur-md bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--primary-text-color)] hover:brightness-110 active:scale-95 shadow-lg transition-transform">
          <ChevronRight />
        </button>

        <div ref={carouselRef} className="flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide gap-8 py-10">
          {projects.map((path, index) => (
            <div key={index} className="min-w-full snap-center px-4">
              <Card3D src={path} scrollYProgress={scrollYProgress} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}