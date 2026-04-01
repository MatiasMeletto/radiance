"use client";
import { memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { designCategories } from "../constants/designCategories";

interface DesignModalProps {
  selectedId: string | null;
  onClose: () => void;
}

// Pre-compute flat list of items once
const allItems = designCategories.flatMap(c => 
  c.items.map(item => ({ ...item, category: c.category }))
);

export const DesignModal = memo(function DesignModal({ selectedId, onClose }: DesignModalProps) {
  // Use useMemo to avoid repeated searches
  const selectedItem = useMemo(
    () => selectedId ? allItems.find(item => item.id === selectedId) : null,
    [selectedId]
  );

  return (
    <AnimatePresence mode="wait">
      {selectedId && selectedItem && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col rounded-[32px] border shadow-2xl pointer-events-auto scrollbar-hide"
              style={{ 
                backgroundColor: 'var(--bg-color)', 
                borderColor: 'var(--glass-border)' 
              }}
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[120] p-3 md:p-4 rounded-full border backdrop-blur-md transition-transform hover:brightness-110 active:scale-95 shadow-lg"
                style={{ 
                  backgroundColor: 'var(--glass-bg)', 
                  borderColor: 'var(--glass-border)',
                  color: 'var(--primary-text-color)'
                }}
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>

              <div className="relative w-full aspect-[4/3] md:aspect-video shrink-0 overflow-hidden">
                <img 
                  src={typeof selectedItem.img === 'string' ? selectedItem.img : selectedItem.img.src} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="p-8 md:p-12">
                <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                  {selectedItem.category}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--primary-text-color)' }}>
                  {selectedItem.title}
                </h3>
                <p className="text-lg leading-relaxed opacity-80 mb-8" style={{ color: 'var(--secondary-text-color)' }}>
                  {selectedItem.desc} 
                </p>

                <button 
                  className="w-full md:w-auto px-8 py-4 rounded-full font-bold text-white shadow-xl transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  Solicitar un diseño similar
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
});

