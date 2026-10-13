import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Botón flotante para dispositivos móviles.
 * Lleva a la sección de la beta (#inscripcion) y se oculta cuando
 * el Hero o la sección de la beta ya están visibles en pantalla.
 */
export const BotonFijo: React.FC = () => {
  const [esVisible, setEsVisible] = useState(false);

  useEffect(() => {
    const seccionInicio = document.getElementById("inicio");
    const seccionInscripcion = document.getElementById("inscripcion");

    const elementosAObservar = [seccionInicio, seccionInscripcion].filter(
      Boolean,
    ) as HTMLElement[];

    if (elementosAObservar.length === 0) return;

    const estados = new Map<HTMLElement, boolean>();

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          estados.set(entrada.target as HTMLElement, entrada.isIntersecting);
        });

        const algunaVisible = Array.from(estados.values()).some((v) => v);
        setEsVisible(!algunaVisible);
      },
      { threshold: 0.15 },
    );

    elementosAObservar.forEach((el) => {
      estados.set(el, false);
      observador.observe(el);
    });

    return () => observador.disconnect();
  }, []);

  return (
    <aside
      aria-label="Acceso rápido para unirse a la beta"
      className={`fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden bg-gradient-to-t from-ink via-ink/95 to-transparent backdrop-blur-md transition-all duration-300 ${
        esVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="#inscripcion"
        className="w-full flex items-center justify-center gap-2 bg-gold-500 active:bg-gold-600 text-ink font-bold py-3.5 px-6 rounded-xl shadow-[0_4px_20px_rgba(242,183,5,0.4)] border border-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 text-base"
      >
        <span>Quiero participar en la beta</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </a>
    </aside>
  );
};
