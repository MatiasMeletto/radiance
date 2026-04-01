"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { designCategories } from "../constants/designCategories";
import { DesignModal } from "./DesignModal";

export function DesignIdeas() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: 'var(--primary-text-color)' }}
        >
          Inspírate con nuestras <span style={{ color: 'var(--primary-color)' }}>Ideas</span>
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-70 max-w-2xl mx-auto"
          style={{ color: 'var(--secondary-text-color)' }}
        >
          Explora diferentes enfoques y arquitecturas visuales adaptadas a las necesidades de tu modelo de negocio.
        </motion.p>
      </div>

      <div className="space-y-20">
        {designCategories.map((section) => (
          <div key={section.category}>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 pb-2 border-b"
              style={{ color: 'var(--primary-text-color)', borderColor: 'var(--glass-border)' }}
            >
              {section.category}
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`card-container-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative flex flex-col cursor-pointer rounded-[32px] overflow-hidden border transition-all duration-300 hover:shadow-2xl"
                  style={{
                    backgroundColor: 'var(--glass-bg)',
                    borderColor: 'var(--glass-border)'
                  }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div layoutId={`image-container-${item.id}`} className="relative aspect-video overflow-hidden z-0 bg-gray-800">
                    <img
                      src={typeof item.fi === 'string' ? item.fi : item.fi.src}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      style={{
                        opacity: (hoveredId === item.id || selectedId === item.id) ? 0 : 1,
                        visibility: (hoveredId === item.id || selectedId === item.id) ? 'hidden' : 'visible' 
                      }}
                    />
                    <img
                      src={typeof item.img === 'string' ? item.img : item.img.src}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      style={{
                        opacity: (hoveredId === item.id || selectedId === item.id) ? 1 : 0,
                        visibility: (hoveredId === item.id || selectedId === item.id) ? 'visible' : 'hidden'
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                  </motion.div>

                  <motion.div layoutId={`text-container-${item.id}`} className="p-6 relative z-10">
                    <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--primary-text-color)' }}>{item.title}</h4>
                    <p className="text-sm opacity-70" style={{ color: 'var(--secondary-text-color)' }}>{item.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <DesignModal selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </section>
  );
}