'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ProjectCarousel = dynamic(() => import("./components/ProjectCarousel").then(mod => ({ default: mod.ProjectCarousel })), {
  loading: () => <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
});

const StickyScroll = dynamic(() => import("./components/StickyScroll").then(mod => ({ default: mod.StickyScroll })), {
  loading: () => <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
});

const Community = dynamic(() => import('./components/Community').then(mod => ({ default: mod.Community })), {
  loading: () => <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
});

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--primary-text-color)' }} className="min-h-screen flex flex-col transition-colors duration-300 overflow-x-clip">

      {/* --------------------------------------------HERO SECTION---------------------------------------------------- */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center z-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-black mb-4 tracking-tighter"
          style={{
            background: 'linear-gradient(to bottom, var(--primary-lightest), var(--primary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          RADIANCE
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-2xl md:text-4xl font-medium italic opacity-80"
        >
          Soluciones de software para TODOS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-lg text-[var(--secondary-text-color)] max-w-xl"
        >
          Soluciones de software de todo tipo, desde aplicaciones web hasta móviles.
        </motion.p>

      </section>

      {/* -------------------------------------------------COMPONENTES------------------------------------------------------ */}
      {/* <ProjectCarousel /> */}

      <StickyScroll />

      <Community />
    </div>
  );
}