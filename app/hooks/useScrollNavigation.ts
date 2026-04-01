"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const menuItems = ["Productos", "Opciones", "Contacto", "Ideas de diseño"];
const EXTERNAL_PAGES = ["ideas-de-diseno"];

export function useScrollNavigation() {
  const [activeTab, setActiveTab] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const formatSlug = useCallback((item: string) => {
    return item.toLowerCase()
      .replace(/ñ/g, 'n')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }, []);

  useEffect(() => {
    let throttleTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
        setIsScrolled(window.scrollY > 20);

        if (pathname === "/") {
          if (window.scrollY < 300) {
            setActiveTab("");
            return;
          }

          let currentActive = "";
          for (const item of menuItems) {
            const slug = formatSlug(item);
            if (EXTERNAL_PAGES.includes(slug)) continue;

            const section = document.getElementById(slug);
            if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
                currentActive = item;
              }
            }
          }

          if (currentActive) {
            setActiveTab(currentActive);
          }
        }
      }, 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [pathname, formatSlug]);

  useEffect(() => {
    if (pathname !== "/") {
      const currentItem = menuItems.find(item => {
        const slug = formatSlug(item);
        return pathname === `/${slug}`;
      });
      if (currentItem) {
        setActiveTab(currentItem);
      } else {
        setActiveTab("");
      }
    }
  }, [pathname, formatSlug]);

  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const id = window.location.hash.substring(1);
      const section = document.getElementById(id);
      if (section) {
        setTimeout(() => {
          const yOffset = -100;
          const yPosition = section.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: yPosition, behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);

  return { activeTab, setActiveTab, isScrolled, formatSlug };
}
