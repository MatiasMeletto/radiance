import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radiance",
  description: "Agencia freelance de desarrollo web y aplicaciones. Soluciones personalizadas para llevar tu negocio al siguiente nivel.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning data-theme="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                const theme = localStorage.getItem('radiance-theme');
                if (theme === 'dark' || !theme) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            })();
            `
          }}
        />
      </head>
      <body
        style={{ fontFamily: "Ubuntu, system-ui, -apple-system, sans-serif" }}
        className="antialiased"
        suppressHydrationWarning
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