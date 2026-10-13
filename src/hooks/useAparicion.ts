import { useEffect, useRef, useState } from "react";

interface OpcionesAparicion {
  umbral?: number;
  margenRaiz?: string;
}

/**
 * Hook que utiliza IntersectionObserver para activar la visibilidad de un elemento
 * una sola vez cuando entra en el viewport del usuario.
 * Si el usuario tiene activo 'prefers-reduced-motion', se inicializa directamente
 * visible en el estado para evitar re-renderizados en cascada dentro del efecto.
 */
export function useAparicion<T extends HTMLElement = HTMLDivElement>({
  umbral = 0.15,
  margenRaiz = "0px 0px -40px 0px",
}: OpcionesAparicion = {}) {
  const ref = useRef<T | null>(null);

  // Inicialización directa: si el usuario prefiere sin movimiento, nace visible
  const [estaVisible, setEstaVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    // Si ya está visible (por ejemplo por preferencia de accesibilidad), no hace falta observar
    if (estaVisible) return;

    const elemento = ref.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setEstaVisible(true);
          observador.unobserve(entrada.target);
        }
      },
      {
        threshold: umbral,
        rootMargin: margenRaiz,
      },
    );

    observador.observe(elemento);

    return () => {
      observador.disconnect();
    };
  }, [umbral, margenRaiz, estaVisible]);

  return { ref, estaVisible };
}
