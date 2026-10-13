import React, { type ReactNode } from "react";
import { useAparicion } from "../../hooks/useAparicion";

interface PropsAparicion {
  children: ReactNode;
  retrasoMs?: number;
  className?: string;
}

/**
 * Envoltorio que aplica una animación de aparición y elevación suave
 * al entrar en pantalla mediante IntersectionObserver.
 */
export const Aparicion: React.FC<PropsAparicion> = ({
  children,
  retrasoMs = 0,
  className = "",
}) => {
  const { ref, estaVisible } = useAparicion<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${retrasoMs}ms`,
      }}
      className={`transition-all duration-700 ease-out ${
        estaVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-7 pointer-events-none"
      } ${className}`}
    >
      {children}
    </div>
  );
};
