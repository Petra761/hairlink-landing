import React from "react";
import { AlertCircle } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface PropsGrupoOpciones {
  idBase: string;
  titulo: string;
  descripcion?: string;
  opciones: readonly string[];
  valorSeleccionado?: string;
  error?: string;
  obligatorio?: boolean;
  registro: UseFormRegisterReturn;
}

/**
 * Grupo de selección única estructurado semánticamente mediante fieldset y legend.
 * Los inputs de tipo radio permanecen accesibles por teclado pero estilizados como tarjetas táctiles.
 */
export const GrupoOpciones: React.FC<PropsGrupoOpciones> = ({
  idBase,
  titulo,
  descripcion,
  opciones,
  valorSeleccionado,
  error,
  obligatorio,
  registro,
}) => {
  const idError = error ? `${idBase}-error` : undefined;
  const idAyuda = descripcion ? `${idBase}-ayuda` : undefined;
  const describedBy = [idError, idAyuda].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      aria-describedby={describedBy}
      className="flex flex-col gap-2 w-full text-left"
    >
      <legend className="text-sm font-bold text-ink mb-1">
        {titulo}
        {obligatorio && (
          <span className="text-gold-600 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </legend>

      {descripcion && (
        <p id={idAyuda} className="text-xs text-ink/70 mb-1.5 leading-relaxed">
          {descripcion}
        </p>
      )}

      <div className="flex flex-col gap-2.5">
        {opciones.map((opcion, index) => {
          const inputId = `${idBase}-${index}`;
          const estaSeleccionado = valorSeleccionado === opcion;

          return (
            <label
              key={opcion}
              htmlFor={inputId}
              className={`relative flex items-center justify-between p-3.5 rounded-xl border text-base cursor-pointer transition-all select-none min-h-[48px] focus-within:ring-2 focus-within:ring-gold-500 focus-within:ring-offset-2 ${
                estaSeleccionado
                  ? "bg-gold-500 text-ink font-bold border-gold-600 shadow-sm"
                  : "bg-white text-ink border-ink-line/30 hover:border-gold-500/60 hover:bg-gold-500/5 font-medium"
              }`}
            >
              <span className="flex-1 pr-3 leading-snug">{opcion}</span>

              <input
                type="radio"
                id={inputId}
                value={opcion}
                aria-invalid={Boolean(error)}
                className="sr-only"
                {...registro}
              />

              <span
                aria-hidden="true"
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  estaSeleccionado
                    ? "border-ink bg-ink"
                    : "border-ink-line/40 bg-white"
                }`}
              >
                {estaSeleccionado && (
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                )}
              </span>
            </label>
          );
        })}
      </div>

      {error && (
        <p
          id={idError}
          role="alert"
          className="text-xs font-semibold text-red-600 flex items-center gap-1.5 mt-1"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </fieldset>
  );
};
