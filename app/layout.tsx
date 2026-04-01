import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";

const principalFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radiance Devs - Software que ilumina tu negocio",
  description: "Agencia freelance de desarrollo web y aplicaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                const theme = localStorage.getItem('radiance-theme');
                if (theme === 'dark' || !theme) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            })();
            `
          }}
        />
      </head>
      <body
        className={`${principalFont.className} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}