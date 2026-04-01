"use client";
import { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { designCategories } from "../constants/designCategories";
import { DesignModal } from "./DesignModal";

const DesignCard = memo(function DesignCard({ 
  item, 
  isHovered, 
  onHover, 
  onClick 
}: {
  item: { id: string; title: string; desc: string; fi: string | { src: string }; img: string | { src: string } };
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative flex flex-col cursor-pointer rounded-[32px] overflow-hidden border transition-shadow duration-300 hover:shadow-2xl"
      style={{
        backgroundColor: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)'
      }}
    >
      <div className="relative aspect-video overflow-hidden z-0 bg-gray-800">
        <img
          src={(() => {
            const img = isHovered ? item.img : item.fi;
            return typeof img === 'string' ? img : img.src;
          })()}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
      </div>

      <div className="p-6 relative z-10">
        <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--primary-text-color)' }}>
          {item.title}
        </h4>
        <p className="text-sm opacity-70" style={{ color: 'var(--secondary-text-color)' }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
});

const DesignSection = memo(function DesignSection({
  section,
  hoveredId,
  onHover,
  onSelectItem
}: {
  section: { category: string; items: { id: string; title: string; desc: string; fi: string | { src: string }; img: string | { src: string } }[] };
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelectItem: (id: string) => void;
}) {
  return (
    <div key={section.category}>
      <h3
        className="text-2xl font-bold mb-8 pb-2 border-b"
        style={{ color: 'var(--primary-text-color)', borderColor: 'var(--glass-border)' }}
      >
        {section.category}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {section.items.map((item) => (
          <DesignCard
            key={item.id}
            item={item}
            isHovered={hoveredId === item.id}
            onHover={onHover}
            onClick={() => onSelectItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
});

export function DesignIdeas() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleHover = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  const handleSelectItem = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: 'var(--primary-text-color)' }}
        >
          Inspírate con nuestras <span style={{ color: 'var(--primary-color)' }}>Ideas</span>
        </h2>
        <p
          className="text-lg opacity-70 max-w-2xl mx-auto"
          style={{ color: 'var(--secondary-text-color)' }}
        >
          Explora diferentes enfoques y arquitecturas visuales adaptadas a las necesidades de tu modelo de negocio.
        </p>
      </div>

      <div className="space-y-20">
        {designCategories.map((section) => (
          <DesignSection
            key={section.category}
            section={section}
            hoveredId={hoveredId}
            onHover={handleHover}
            onSelectItem={handleSelectItem}
          />
        ))}
      </div>

      <DesignModal selectedId={selectedId} onClose={handleCloseModal} />
    </section>
  );
}