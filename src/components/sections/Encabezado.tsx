import React, { useState } from "react";
import { Scissors, Menu, X } from "lucide-react";
import { Boton } from "../ui/Boton";

const ENLACES_NAVEGACION = [
  { etiqueta: "Cómo funciona", href: "#como-funciona" },
  { etiqueta: "Prototipo", href: "#prototipo" },
  { etiqueta: "Para quién", href: "#para-quien" },
  { etiqueta: "Beneficios", href: "#beneficios" },
];

export const Encabezado: React.FC = () => {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const alternarMenuMovil = () => setMenuMovilAbierto((prev) => !prev);
  const cerrarMenuMovil = () => setMenuMovilAbierto(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-ink/90 border-b border-ink-line/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        <a
          href="#inicio"
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-gold-400 rounded-lg p-1 shrink-0"
          aria-label="HairLink - Ir al inicio"
          onClick={cerrarMenuMovil}
        >
          <div className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center text-ink shadow-[0_2px_12px_rgba(242,183,5,0.35)] transition-transform group-hover:scale-105">
            <Scissors className="w-5 h-5 stroke-[2.4]" aria-hidden="true" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Hair<span className="text-gold-400">Link</span>
          </span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-2"
        >
          {ENLACES_NAVEGACION.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="px-3 py-2 text-sm font-semibold text-white/75 hover:text-gold-400 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-gold-400"
            >
              {enlace.etiqueta}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Boton
            href="#inscripcion"
            variante="dorado"
            tamano="sm"
            conDestello
            className="hidden sm:inline-flex"
          >
            Quiero participar en la beta
          </Boton>

          <button
            type="button"
            onClick={alternarMenuMovil}
            aria-expanded={menuMovilAbierto}
            aria-controls="menu-navegacion-movil"
            aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden p-2 text-white/80 hover:text-gold-400 bg-ink-soft border border-ink-line rounded-xl focus-visible:outline-2 focus-visible:outline-gold-400 transition-colors"
          >
            {menuMovilAbierto ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuMovilAbierto && (
        <div
          id="menu-navegacion-movil"
          className="md:hidden border-t border-ink-line bg-ink-soft/95 backdrop-blur-md px-4 pt-3 pb-6"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            {ENLACES_NAVEGACION.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={cerrarMenuMovil}
                className="px-3.5 py-2.5 text-base font-semibold text-white/85 hover:text-gold-400 hover:bg-white/5 rounded-xl transition-colors"
              >
                {enlace.etiqueta}
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-ink-line/60 sm:hidden">
              <a
                href="#inscripcion"
                onClick={cerrarMenuMovil}
                className="w-full flex items-center justify-center font-bold text-sm bg-gold-500 text-ink py-3 px-4 rounded-xl shadow-md active:bg-gold-600 transition-colors"
              >
                Quiero participar en la beta
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
