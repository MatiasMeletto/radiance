import imagenUm from "../resources/umBlackboard-demo.gif";
import imagenWebcampus from "../resources/webcampus-demo.gif";
import fiWebcampus from "../resources/webcampus-FI.jpeg";
import fiUm from "../resources/umBlackboard-Fi.jpeg";

export const designCategories = [
  {
    category: "E-commerce",
    items: [
      { id: "e1", title: "Minimalist Store", desc: "Diseño limpio enfocado en el producto con carrito deslizante.", fi: fiUm, img: imagenUm },
      { id: "e2", title: "Streetwear Brand", desc: "Estilo audaz, tipografía grande y modo oscuro por defecto.", fi: fiUm, img: imagenUm },
    ]
  },
  {
    category: "Páginas de Reservas",
    items: [
      { id: "r1", title: "Clínica Médica", desc: "Flujo de reserva de turnos paso a paso con alta accesibilidad.", fi: fiUm, img: imagenUm },
      { id: "r2", title: "Restaurante Boutique", desc: "Integración de menú interactivo y reserva de mesas en tiempo real.", fi: fiUm, img: imagenUm },
    ]
  },
  {
    category: "Plataformas institucionales",
    items: [
      { id: "s1", title: "Webcampus", desc: "Plataforma de aprendizaje en línea con contenido multimedia y evaluaciones interactivas.", fi: fiWebcampus, img: imagenWebcampus },
      { id: "s2", title: "Blackboard", desc: "Plataforma de gestión académica con herramientas de colaboración y evaluación.", fi: fiUm, img: imagenUm },
    ]
  }
];
