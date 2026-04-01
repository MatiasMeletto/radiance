"use client";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

//recordar agregar de nuevo "Productos"
const menuItems = [ "Opciones", "Contacto", "Ideas de diseño"];
const EXTERNAL_PAGES = ["ideas-de-diseno"];

export function useMenuNavigation(setActiveTab: (tab: string) => void) {
  const router = useRouter();
  const pathname = usePathname();

  const formatSlug = useCallback((item: string) => {
    return item.toLowerCase()
      .replace(/ñ/g, 'n')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }, []);

  const handleNavigation = useCallback((item: string) => {
    const targetId = formatSlug(item);
    const isPage = EXTERNAL_PAGES.includes(targetId);

    if (isPage) {
      if (pathname === `/${targetId}`) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push(`/${targetId}`);
      }
      setActiveTab(item);
    } else {
      if (pathname === "/") {
        const sectionElement = document.getElementById(targetId);
        if (sectionElement) {
          const yOffset = -100;
          const yPosition = sectionElement.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: yPosition, behavior: 'smooth' });
        }
      } else {
        router.push(`/#${targetId}`);
      }
      setActiveTab(item);
    }
  }, [pathname, router, formatSlug, setActiveTab]);

  return { handleNavigation, menuItems, formatSlug };
}
