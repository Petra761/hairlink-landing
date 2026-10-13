import React from "react";
import { TituloSeccion } from "../ui/TituloSeccion";
import { Aparicion } from "../ui/Aparicion";
import { Boton } from "../ui/Boton";
import { ClipboardList } from "lucide-react";

/**
 * Sección propia del cuestionario ubicada después de la inscripción a la beta.
 * Muestra el botón secundario (con borde, sin relleno) y enfatiza que es anónimo
 * y que no inscribe a la beta.
 */
export const SeccionCuestionario: React.FC = () => {
  return (
    <section
      id="cuestionario-seccion"
      aria-labelledby="titulo-seccion-cuestionario"
      className="py-18 sm:py-24 bg-ink text-white relative border-t border-ink-line overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <Aparicion>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-4">
            <ClipboardList
              className="w-3.5 h-3.5 text-gold-400"
              aria-hidden="true"
            />
            <span>Investigación en Tarija</span>
          </div>

          <TituloSeccion
            titulo="Cuestionario de información"
            palabraDestacada="información"
            subtitulo="Nos ayudaría mucho que respondas este cuestionario. Es anónimo y aparte de la inscripción: responderlo no te inscribe en la beta."
            className="mb-8 mx-auto"
          />

          <div className="flex justify-center">
            <Boton
              href="/cuestionario"
              variante="secundario"
              tamano="lg"
              className="border-gold-500/50 hover:border-gold-400 text-gold-300 hover:text-white"
            >
              Responder el cuestionario
            </Boton>
          </div>
        </Aparicion>
      </div>
    </section>
  );
};
