import { forwardRef, type InputHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";

export interface PropsCampoTexto extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  etiqueta: string;
  error?: string;
  ayuda?: string;
  obligatorio?: boolean;
}

/**
 * Campo de texto reutilizable con accesibilidad integrada (WCAG AA),
 * asociación de etiquetas, texto de ayuda y mensajes de error por aria-describedby.
 */
export const CampoTexto = forwardRef<HTMLInputElement, PropsCampoTexto>(
  (
    { id, etiqueta, error, ayuda, obligatorio, className = "", ...props },
    ref,
  ) => {
    const idError = error ? `${id}-error` : undefined;
    const idAyuda = ayuda ? `${id}-ayuda` : undefined;
    const describedBy =
      [idError, idAyuda].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        <label
          htmlFor={id}
          className="text-sm font-bold text-ink flex items-center justify-between"
        >
          <span>
            {etiqueta}
            {obligatorio && (
              <span className="text-gold-600 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </span>
        </label>

        {ayuda && (
          <p id={idAyuda} className="text-xs text-ink/70 leading-relaxed">
            {ayuda}
          </p>
        )}

        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-required={obligatorio}
          className={`w-full min-h-12 px-3.5 py-2.5 text-base text-ink bg-white rounded-xl border transition-colors outline-none ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
              : "border-ink-line/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25"
          } ${className}`}
          {...props}
        />

        {error && (
          <p
            id={idError}
            role="alert"
            className="text-xs font-semibold text-red-600 flex items-center gap-1.5 mt-0.5"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  },
);

CampoTexto.displayName = "CampoTexto";
