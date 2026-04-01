"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";

export function Logo() {
  const pathname = usePathname();
  const uniqueId = useId();
  const gradientId = `${uniqueId}-gradient`;
  const maskId = `${uniqueId}-mask`;

  const isActive = pathname === "/"; 

  const handleScrollTop = () => {
    if (isActive) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link 
      href="/" 
      onClick={handleScrollTop} 
      className="flex items-center gap-2 select-none group transition-opacity duration-300 opacity-80 hover:opacity-100"
    >
      <div className="relative w-8 h-8 flex items-center justify-center overflow-visible">
        
        <div
          className={`absolute inset-0 blur-md transition-opacity duration-500 rounded-full ${
            isActive ? "opacity-50" : "opacity-0 group-hover:opacity-50"
          }`}
          style={{ backgroundColor: 'var(--primary-color)' }}
        />

        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full drop-shadow-sm overflow-visible"
        >
          <defs>
            <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary-color)" />
              <stop offset="50%" stopColor="var(--primary-light-color, var(--primary-color))" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <mask id={maskId}>
              <path
                className="transition-transform duration-700 ease-in-out rotate-45 group-hover:rotate-[225deg] origin-center"
                fill="white"
                d="M50,0 Q60,40 100,50 Q60,60 50,100 Q40,60 0,50 Q40,40 50,0 Z"
              />
            </mask>
          </defs>

          <rect 
            width="100%" 
            height="100%" 
            fill={`url(#${gradientId})`} 
            mask={`url(#${maskId})`} 
          />
        </svg>
      </div>

      <span
        className="font-bold text-xl tracking-tighter text-[var(--primary-text-color)]"
      >
        Radiance
      </span>
    </Link>
  );
}