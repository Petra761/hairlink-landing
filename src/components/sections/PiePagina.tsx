import React from "react";
import { Scissors } from "lucide-react";

export const PiePagina: React.FC = () => {
  return (
    <footer className="bg-ink border-t border-ink-line py-12 text-white/60 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-ink-line/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-500 flex items-center justify-center text-ink">
              <Scissors className="w-4 h-4 stroke-[2.4]" aria-hidden="true" />
            </div>
            <span className="text-base font-black text-white">
              Hair<span className="text-gold-400">Link</span>
            </span>
          </div>

          <nav aria-label="Enlaces complementarios">
            <a
              href="/cuestionario"
              className="text-gold-400 hover:text-gold-300 underline font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold-400 rounded p-1"
            >
              Responder el cuestionario
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-white/50">
          <p>
            HairLink se encuentra en etapa de validación de mercado en Tarija,
            Bolivia. Tus datos de inscripción solo se utilizarán para coordinar
            la prueba piloto.
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} HairLink. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
