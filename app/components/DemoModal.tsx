"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", contact: "", message: "" });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-[24px] border shadow-2xl pointer-events-auto overflow-hidden"
              style={{
                backgroundColor: "var(--bg-color)",
                borderColor: "var(--glass-border)",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full border transition-colors hover:bg-opacity-80"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  borderColor: "var(--glass-border)",
                  color: "var(--primary-text-color)",
                }}
              >
                <X size={20} />
              </button>

              <div className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--primary-text-color)" }}>
                      ¡Enviado!
                    </h3>
                    <p style={{ color: "var(--secondary-text-color)" }}>
                      Te contactaremos pronto
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2
                      className="text-2xl font-bold mb-2"
                      style={{ color: "var(--primary-text-color)" }}
                    >
                      Solicita tu demo
                    </h2>
                    <p
                      className="mb-6 text-sm opacity-70"
                      style={{ color: "var(--secondary-text-color)" }}
                    >
                      Cuéntanos qué necesitas y nos contactaremos pronto
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--primary-text-color)" }}
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          placeholder="Tu nombre"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:border-opacity-100"
                          style={{
                            backgroundColor: "var(--glass-bg)",
                            borderColor: "var(--glass-border)",
                            color: "var(--primary-text-color)",
                          }}
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--primary-text-color)" }}
                        >
                          Email o Teléfono
                        </label>
                        <input
                          type="text"
                          placeholder="tu@email.com o +1 234 567 8900"
                          value={formData.contact}
                          onChange={(e) =>
                            setFormData({ ...formData, contact: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:border-opacity-100"
                          style={{
                            backgroundColor: "var(--glass-bg)",
                            borderColor: "var(--glass-border)",
                            color: "var(--primary-text-color)",
                          }}
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--primary-text-color)" }}
                        >
                          ¿Qué te interesa?
                        </label>
                        <textarea
                          placeholder="Cuéntanos brevemente qué te gustaría..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:border-opacity-100 resize-none"
                          style={{
                            backgroundColor: "var(--glass-bg)",
                            borderColor: "var(--glass-border)",
                            color: "var(--primary-text-color)",
                          }}
                          rows={4}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 rounded-full font-bold text-white transition-opacity disabled:opacity-50"
                        style={{ backgroundColor: "var(--primary-color)" }}
                      >
                        {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}