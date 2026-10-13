import React from "react";
import { Scissors, ArrowLeft, Clock } from "lucide-react";
import { CuestionarioForm } from "./CuestionarioForm";

/**
 * Vista completa de la ruta /cuestionario.
 * Totalmente enfocada en la recolección sincera de datos sin distraer con la suscripción a la beta.
 */
export const PaginaCuestionario: React.FC = () => {
  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-gold-500 selection:text-ink">
      {/* Barra superior simplificada */}
      <header className="border-b border-ink-line bg-ink/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-white hover:text-gold-400 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gold-500 flex items-center justify-center text-ink">
              <Scissors className="w-4 h-4 stroke-[2.4]" aria-hidden="true" />
            </div>
            <span className="text-base font-black">
              Hair<span className="text-gold-400">Link</span>
            </span>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver al inicio</span>
          </a>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-4">
            <Clock className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
            <span>Toma unos 4 minutos · Totalmente anónimo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Cuestionario de investigación
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
            Nos ayudaría mucho que nos ayudes con este cuestionario. No
            recopilamos tu nombre ni contacto, y responderlo no te inscribe en
            la beta. Tus respuestas se usarán exclusivamente para fines
            académicos y de validación en Tarija.
          </p>
        </div>

        <CuestionarioForm />
      </main>

      {/* Pie sencillo */}
      <footer className="border-t border-ink-line py-8 text-center text-xs text-white/50">
        HairLink · Investigación y validación académica en Tarija, Bolivia.
      </footer>
    </div>
  );
};
