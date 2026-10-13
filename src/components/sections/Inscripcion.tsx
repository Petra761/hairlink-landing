import React from "react";
import { BetaForm } from "../form/BetaForm";
import { TituloSeccion } from "../ui/TituloSeccion";
import { Aparicion } from "../ui/Aparicion";

/**
 * Sección única del Formulario A (inscripción a la beta).
 * Se ubica hacia el final de la página (después de Beneficios) con id="inscripcion".
 * Eliminadas todas las promesas de premios o beneficios específicos.
 */
export const Inscripcion: React.FC = () => {
  return (
    <section
      id="inscripcion"
      aria-labelledby="titulo-inscripcion"
      className="py-20 sm:py-28 bg-cream text-ink relative border-t border-gold-500/20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <Aparicion>
          <TituloSeccion
            etiqueta="Prueba piloto"
            titulo="Inscríbete en la beta"
            palabraDestacada="beta"
            subtitulo="Déjanos tus datos y te avisamos cuando puedas probar HairLink."
            esClaro
            className="mb-10"
          />

          <BetaForm />
        </Aparicion>
      </div>
    </section>
  );
};
