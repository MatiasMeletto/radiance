"use client";
import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";
import { useState, memo } from "react";

export function Community() {
  return (
    <section className="py-24 px-6 max-w-7xl -mt-12 mx-auto z-20" id="contacto">
      <div className="text-center mb-16 space-y-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: 'var(--secondary-text-color)' }}
        >
          CONTACTO
        </motion.span>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold tracking-tight"
          style={{ color: 'var(--primary-text-color)' }}
        >
          ¿Cómo llegar a nosotros?
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <SocialCardMemo
          icon={<Instagram size={48} className="text-white" />}
          iconBg="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"
          title="Instagram"
          stat="Síguenos"
          description="Mirá nuestro proceso diario, proyectos en vivo, inspiración de diseño y novedades de la agencia."
          buttonText="Seguir"
          buttonLink="https://instagram.com/radiancedevs"
          bgColorVar="var(--card-ig-bg)"
          borderColorVar="var(--card-ig-border)"
        />

        <SocialCardMemo
          icon={<MessageCircle size={48} className="text-white" />}
          iconBg="bg-[#25D366]"
          title="WhatsApp"
          stat="Conecta ahora"
          description="¿Tenés un proyecto en mente? Chateá directamente con nuestro equipo para una consulta rápida o presupuesto personalizado."
          buttonText="Contactar"
          buttonLink="https://wa.me/5492346418797"
          bgColorVar="var(--card-wa-bg)"
          borderColorVar="var(--card-wa-border)"
        />

      </div>
    </section>
  );
}

interface SocialCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  stat: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColorVar: string;
  borderColorVar: string;
}

function SocialCard({ 
  icon, 
  iconBg, 
  title, 
  stat, 
  description, 
  buttonText, 
  buttonLink, 
  bgColorVar, 
  borderColorVar 
}: SocialCardProps) {
  const [borderColor, setBorderColor] = useState('transparent');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.1 }}
      whileHover={{ y: -8 }}
      className="p-10 rounded-[32px] border transition-all duration-300 shadow-sm"
      style={{ 
        backgroundColor: bgColorVar, 
        borderColor: borderColor,   
      }}
      onMouseEnter={() => setBorderColor(borderColorVar)}
      onMouseLeave={() => setBorderColor('transparent')}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${iconBg}`}>
          {icon}
        </div>
        <span className="font-bold text-sm tracking-widest uppercase opacity-60 mt-2" style={{ color: 'var(--primary-text-color)' }}>
          {stat}
        </span>
      </div>

      <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary-text-color)' }}>
        {title}
      </h3>
      
      <p className="text-lg mb-10 leading-relaxed opacity-70 h-24" style={{ color: 'var(--secondary-text-color)' }}>
        {description}
      </p>

      <motion.a
        href={buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-sm transition-colors border shadow-sm"
        style={{ 
          backgroundColor: 'var(--bg-color)', 
          color: 'var(--primary-text-color)',
          borderColor: borderColorVar 
        }}
      >
        {buttonText}
      </motion.a>
    </motion.div>
  );
}

export const SocialCardMemo = memo(SocialCard);