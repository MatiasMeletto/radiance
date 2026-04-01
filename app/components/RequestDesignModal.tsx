"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface RequestDesignModalProps {
  isOpen: boolean;
  designTitle: string;
  onClose: () => void;
}

export function RequestDesignModal({ isOpen, designTitle, onClose }: RequestDesignModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: email,
          designTitle,
          type: "design-request",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
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
                      ¡Solicitud enviada!
                    </h3>
                    <p style={{ color: "var(--secondary-text-color)" }}>
                      Nos contactaremos pronto para tu diseño
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2
                      className="text-2xl font-bold mb-2"
                      style={{ color: "var(--primary-text-color)" }}
                    >
                      Quiero un diseño como este
                    </h2>
                    <p
                      className="mb-2 text-sm opacity-70"
                      style={{ color: "var(--secondary-text-color)" }}
                    >
                      <strong>{designTitle}</strong>
                    </p>
                    <p
                      className="mb-6 text-sm opacity-70"
                      style={{ color: "var(--secondary-text-color)" }}
                    >
                      Déjanos tu email para cotizarte
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--primary-text-color)" }}
                        >
                          Tu email
                        </label>
                        <input
                          type="email"
                          placeholder="tu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:border-opacity-100"
                          style={{
                            backgroundColor: "var(--glass-bg)",
                            borderColor: "var(--glass-border)",
                            color: "var(--primary-text-color)",
                          }}
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
