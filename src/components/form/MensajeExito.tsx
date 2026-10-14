import React, { useEffect, useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

/**
 * Pantalla que sustituye al Formulario A tras inscribirse a la beta.
 * Guía de forma transparente y sin presión hacia el cuestionario anónimo.
 */
export const MensajeExito: React.FC = () => {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contenedorRef.current?.focus();
  }, []);

  return (
    <div
      ref={contenedorRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="outline-none flex flex-col items-center text-center py-8 px-4 sm:px-6 bg-white rounded-2xl border border-ink-line/20 shadow-sm"
    >
      <div className="w-14 h-14 rounded-full bg-gold-500/20 text-gold-600 border border-gold-400/50 flex items-center justify-center mb-5">
        <Check className="w-7 h-7 stroke-[2.5]" aria-hidden="true" />
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight mb-3">
        Listo, quedaste inscrito en la beta de HairLink
      </h3>

      <p className="text-base text-ink-soft/80 max-w-md leading-relaxed mb-6">
        Te contactaremos pronto. Nos ayudaría mucho que además respondas el
        cuestionario (es aparte, anónimo y toma unos 4 minutos).
      </p>

      <a
        href="/cuestionario"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-12 rounded-xl bg-gold-500 hover:bg-gold-400 active:bg-gold-600 text-ink font-bold text-base shadow-[0_4px_16px_rgba(242,183,5,0.3)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      >
        <span>Responder el cuestionario</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  );
};
