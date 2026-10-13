import React from "react";

interface PropsTituloSeccion {
  etiqueta?: string;
  titulo: string;
  palabraDestacada?: string;
  subtitulo?: string;
  alineacion?: "centro" | "izquierda";
  esClaro?: boolean;
  className?: string;
}

/**
 * Título de sección de gran escala, tipografía pesada e interlineado ajustado.
 * Permite destacar fragmentos con degradado dorado manteniendo alto contraste.
 */
export const TituloSeccion: React.FC<PropsTituloSeccion> = ({
  etiqueta,
  titulo,
  palabraDestacada,
  subtitulo,
  alineacion = "centro",
  esClaro = false,
  className = "",
}) => {
  const alinearClases =
    alineacion === "centro"
      ? "text-center items-center mx-auto"
      : "text-left items-start";

  // Divide el título para insertar la palabra con degradado dorado si coincide
  const renderTituloConDestacado = () => {
    if (!palabraDestacada) return titulo;

    const indice = titulo.toLowerCase().indexOf(palabraDestacada.toLowerCase());
    if (indice === -1) return titulo;

    const antes = titulo.substring(0, indice);
    const coincidencia = titulo.substring(
      indice,
      indice + palabraDestacada.length,
    );
    const despues = titulo.substring(indice + palabraDestacada.length);

    return (
      <>
        {antes}
        <span
          className={
            esClaro
              ? "text-gold-600 font-black underline decoration-gold-500/40 decoration-wavy decoration-2"
              : "bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent font-black"
          }
        >
          {coincidencia}
        </span>
        {despues}
      </>
    );
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alinearClases} ${className}`}>
      {etiqueta && (
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
            esClaro
              ? "bg-gold-500/15 text-ink border border-gold-500/30"
              : "bg-gold-500/10 text-gold-300 border border-gold-500/25"
          }`}
        >
          {etiqueta}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.08] ${
          esClaro ? "text-ink" : "text-white"
        }`}
      >
        {renderTituloConDestacado()}
      </h2>
      {subtitulo && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${
            esClaro ? "text-ink-soft/80" : "text-white/70"
          }`}
        >
          {subtitulo}
        </p>
      )}
    </div>
  );
};
