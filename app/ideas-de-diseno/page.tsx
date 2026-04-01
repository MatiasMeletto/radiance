import { DesignIdeas } from "../components/DesingIdeas"; 

export const metadata = {
  title: "Design Ideas - Radiance Devs",
  description: "Explora nuestras arquitecturas visuales y ejemplos de diseño para tu próximo proyecto web.",
};

export default function DesignIdeasPage() {
  return (
    <main className="min-h-screen pt-32 pb-12">
      <DesignIdeas />
    </main>
  );
}