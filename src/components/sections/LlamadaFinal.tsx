import React from "react";
import { BetaForm } from "../form/BetaForm";
import { TituloSeccion } from "../ui/TituloSeccion";
import { Aparicion } from "../ui/Aparicion";
import { Sparkles } from "lucide-react";

/**
 * Cierre de la página con llamada a la acción en fondo oscuro y segunda instancia
 * del formulario BetaForm con id="inscripcion-final" (evitando duplicar id en el DOM).
 */
export const LlamadaFinal: React.FC = () => {
  return (
    <section
      id="inscripcion-final"
      aria-labelledby="titulo-llamada-final"
      className="py-20 sm:py-28 bg-ink bg-cuadricula-dorada relative overflow-hidden border-t border-ink-line"
    >
      {/* Resplandor central dorado */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gold-500/15 rounded-full blur-[140px] pointer-events-none anim-pulso-lento"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <Aparicion>
          <div className="rounded-3xl bg-ink-soft/90 backdrop-blur-md p-6 sm:p-10 md:p-12 border border-gold-400/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-4">
                <Sparkles
                  className="w-3.5 h-3.5 text-gold-400"
                  aria-hidden="true"
                />
                <span>Prueba piloto exclusiva · Tarija</span>
              </div>
              <TituloSeccion
                titulo="Sé de los primeros en probar HairLink"
                palabraDestacada="primeros"
                subtitulo="Inscríbete hoy mismo. Tu opinión definirá las funciones finales para los barberos y estilistas de Tarija."
                className="mx-auto"
              />
            </div>

            {/* Segunda instancia del formulario */}
            <div className="relative">
              <BetaForm />
            </div>
          </div>
        </Aparicion>
      </div>
    </section>
  );
};
