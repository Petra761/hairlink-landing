import React from "react";
import { AlertCircle } from "lucide-react";

export interface PropsEscalaInteres {
  idBase: string;
  pregunta: string;
  valorSeleccionado?: number;
  error?: string;
  obligatorio?: boolean;
  alSeleccionar: (valor: number) => void;
}

/**
 * Escala lineal del 1 al 5 en fila para medir intención de uso.
 * Permite selección rápida y actualiza directamente el valor numérico en el formulario.
 */
export const EscalaInteres: React.FC<PropsEscalaInteres> = ({
  idBase,
  pregunta,
  valorSeleccionado,
  error,
  obligatorio,
  alSeleccionar,
}) => {
  const idError = error ? `${idBase}-error` : undefined;

  return (
    <fieldset
      aria-describedby={idError}
      className="flex flex-col gap-2 w-full text-left"
    >
      <legend className="text-sm font-bold text-ink mb-1">
        {pregunta}
        {obligatorio && (
          <span className="text-gold-600 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </legend>

      <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full">
        {[1, 2, 3, 4, 5].map((numero) => {
          const inputId = `${idBase}-${numero}`;
          const estaSeleccionado = Number(valorSeleccionado) === numero;

          return (
            <label
              key={numero}
              htmlFor={inputId}
              onClick={() => alSeleccionar(numero)}
              className={`flex items-center justify-center p-3 rounded-xl border text-lg font-black min-h-[48px] cursor-pointer transition-all select-none focus-within:ring-2 focus-within:ring-gold-500 focus-within:ring-offset-2 ${
                estaSeleccionado
                  ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                  : "bg-white text-ink border-ink-line/30 hover:border-gold-500/60 hover:bg-gold-500/5"
              }`}
            >
              <span>{numero}</span>

              <input
                type="radio"
                id={inputId}
                name={`${idBase}-interes-radio`}
                value={numero}
                checked={estaSeleccionado}
                onChange={() => alSeleccionar(numero)}
                aria-label={
                  numero === 1
                    ? "1 - Nada probable"
                    : numero === 5
                      ? "5 - Muy probable"
                      : `Nivel ${numero}`
                }
                aria-invalid={Boolean(error)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="flex justify-between items-center text-xs text-ink/75 font-semibold px-1 mt-0.5"
      >
        <span>1 = Nada probable</span>
        <span>5 = Muy probable</span>
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
