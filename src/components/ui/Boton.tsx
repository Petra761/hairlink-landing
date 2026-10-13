import React, {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from "react";
import { ArrowRight } from "lucide-react";

type VarianteBoton = "dorado" | "secundario" | "fantasma";

interface PropsComunes {
  variante?: VarianteBoton;
  conIcono?: boolean;
  conDestello?: boolean;
  tamano?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

type PropsBoton =
  | (PropsComunes & {
      href?: undefined;
    } & ButtonHTMLAttributes<HTMLButtonElement>)
  | (PropsComunes & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>);

/**
 * Botón accesible con estados visuales claros, contraste WCAG AA
 * y efecto opcional de destello dorado que cruza la superficie.
 */
export const Boton: React.FC<PropsBoton> = ({
  variante = "dorado",
  conIcono = false,
  conDestello = false,
  tamano = "md",
  children,
  className = "",
  ...props
}) => {
  const estilosBase =
    "relative inline-flex items-center justify-center font-bold tracking-tight rounded-xl overflow-hidden transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 active:scale-[0.98]";

  const estilosTamano = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3.5 text-base gap-2.5 min-h-[48px]",
    lg: "px-8 py-4 text-lg gap-3 min-h-[54px]",
  }[tamano];

  const estilosVariante = {
    dorado:
      "bg-gold-500 hover:bg-gold-400 text-ink shadow-[0_4px_20px_rgba(242,183,5,0.3)] hover:shadow-[0_6px_28px_rgba(242,183,5,0.45)] border border-gold-400",
    secundario:
      "bg-ink-soft hover:bg-ink-line text-white border border-ink-line hover:border-gold-500/40",
    fantasma:
      "bg-transparent hover:bg-white/5 text-white/90 hover:text-white border border-transparent",
  }[variante];

  const contenido = (
    <>
      {conDestello && (
        <span
          aria-hidden="true"
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent anim-destello pointer-events-none"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {conIcono && (
          <ArrowRight
            aria-hidden="true"
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  );

  const clasesCombinadas = `${estilosBase} ${estilosTamano} ${estilosVariante} ${className}`;

  if ("href" in props && typeof props.href === "string") {
    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={clasesCombinadas}
      >
        {contenido}
      </a>
    );
  }

  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={clasesCombinadas}
    >
      {contenido}
    </button>
  );
};
