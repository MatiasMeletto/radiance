"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { STICKY_SCROLL_IMAGES } from "../constants/images";

export function StickyScroll() {
  return (
    <section className="relative w-full mx-auto py-16 md:py-32" id="opciones">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Columna izquierda - Sticky */}
          <div className="h-full">
            <div className="sticky top-32">
              <span 
                className="text-sm font-bold tracking-widest uppercase mb-4 block"
                style={{ color: 'var(--primary-color)' }}
              >
                ¿Por qué Radiance?
              </span>
              
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Escalabilidad <br/> sin complicaciones.
              </h2>
              
              <p 
                className="text-lg opacity-70 mb-8 max-w-md"
              >
                Te proporcionamos las herramientas necesarias para gestionar tus proyectos de software sin dolores de cabeza.
              </p>

              <ul className="space-y-4">
                {["Automatización Inteligente", "Portales para Clientes", "Seguimiento en Vivo"].map((item) => (
                  <li 
                    key={item}
                    className="flex items-center gap-3 font-medium opacity-80"
                  >
                    <CheckCircle size={20} style={{ color: 'var(--primary-color)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna derecha - Scrollable */}
          <div className="flex flex-col gap-8 md:gap-12">
            {STICKY_SCROLL_IMAGES.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border shadow-xl"
                style={{ 
                  borderColor: 'var(--glass-border)',
                  backgroundColor: 'var(--glass-bg)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60" />
                
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{image.title}</h3>
                  <p className="text-white/70 text-sm md:text-base">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}