"use client";
import { Linkedin, Twitter, Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "@/app/hooks/useTheme";

export function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="w-full px-4 pb-10 pt-20" style={{ backgroundColor: 'var(--bg-color)' }}>
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl transition-all shadow-2xl active:scale-95 flex items-center justify-center border border-white/10"
        style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
      >
        {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
      </button>
      <div 
        className="max-w-7xl mx-auto rounded-[40px] p-10 md:p-20 border"
        style={{ 
          backgroundColor: 'var(--glass-bg)', 
          borderColor: 'var(--glass-border)' 
        }}
      >
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
          
          {/* -------------------------------------------COLUMNA MARCA---------------------------------------------------- */}
          <div className="max-w-sm">
            <Logo />

            <p className="text-lg leading-relaxed mb-8 opacity-80" style={{ color: 'var(--secondary-text-color)' }}>
              Soluciones de software personalizadas para llevar tu negocio al siguiente nivel.
            </p>

            <div className="flex gap-4">
              <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com/company/radiance-devs" />
              <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com/radiancedevs" />
            </div>
          </div>

          {/* -------------------------------------------COLUMNAS DE LINKS----------------------------------------------- */}
          <div className="flex gap-16 md:gap-32 flex-wrap">
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--primary-text-color)' }}>Páginas</h4>
              <div className="flex flex-col gap-4">
                {["Productos", "Opciones", "Contacto", "Ideas de diseño"].map(link => (
                  <FooterLink key={link}>{link}</FooterLink>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-sm tracking-widest uppercase" style={{ color: 'var(--primary-text-color)' }}>Información</h4>
              <div className="flex flex-col gap-4">
                {["Privacidad", "Términos de uso", "Soporte"].map(link => (
                  <FooterLink key={link}>{link}</FooterLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------BARRA INFERIOR--------------------------------------------- */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <p className="text-sm font-medium opacity-60" style={{ color: 'var(--secondary-text-color)' }}>
            © 2026 Radiance Devs. Desarrollado por <i>Matías Meletto</i> y <i>Celeste Magalí</i>.
          </p>
          <p className="text-sm font-bold opacity-80" style={{ color: 'var(--primary-text-color)' }}>
            Hecho con Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 dark:bg-white dark:text-black"
    >
      {icon}
    </a>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <a 
      href="#" 
      className="text-base font-medium opacity-60 hover:opacity-100 transition-opacity"
      style={{ color: 'var(--secondary-text-color)' }}
    >
      {children}
    </a>
  );
}