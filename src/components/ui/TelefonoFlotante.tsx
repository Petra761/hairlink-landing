import React from "react";
import { PantallaPerfil } from "./pantallas/PantallaPerfil";
import { PantallaAgenda } from "./pantallas/PantallaAgenda";
import { PantallaReserva } from "./pantallas/PantallaReserva";

export type TipoPantallaTelefono = "perfil" | "agenda" | "reserva";

interface PropsInclinacion {
  rotX?: number;
  rotY?: number;
  rotZ?: number;
}

interface PropsTelefonoFlotante {
  pantalla: TipoPantallaTelefono;
  inclinacion?: PropsInclinacion;
  retraso?: number;
  tamano?: "normal" | "grande";
  className?: string;
}

/** Grosor físico del teléfono en px (eje Z). */
const PROFUNDIDAD = 14;
/** Radio de las esquinas del chasis. */
const RADIO = 40;

const titanio = (luz: number) =>
  `hsl(40 6% ${Math.max(2, Math.min(82, luz))}%)`;

/**
 * Cuerpo del teléfono: una pila de láminas redondeadas, una por cada px de
 * profundidad. Así el grosor es real en 3D (esquinas redondeadas incluidas) y
 * se ve bien con cualquier inclinación, sin depender de trucos de box-shadow.
 * La luz va de titanio claro (frente) a casi negro (fondo).
 */
const capasCuerpo = Array.from({ length: PROFUNDIDAD }, (_, i) => {
  const t = i / (PROFUNDIDAD - 1);
  const base = 58 - 48 * Math.pow(t, 0.75);
  return {
    z: -(i + 1),
    ultima: i === PROFUNDIDAD - 1,
    fondo: `linear-gradient(180deg, ${titanio(base + 14)} 0%, ${titanio(
      base,
    )} 16%, ${titanio(base - 8)} 50%, ${titanio(base)} 84%, ${titanio(
      base + 14,
    )} 100%)`,
  };
});

/** Botón físico que sobresale del canto, a media profundidad del cuerpo. */
const BotonFisico: React.FC<{
  lado: "izq" | "der";
  top: string;
  alto: number;
}> = ({ lado, top, alto }) => {
  const izq = lado === "izq";
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        top,
        height: alto,
        width: 5,
        ...(izq ? { left: -4 } : { right: -4 }),
        borderRadius: izq ? "3px 0 0 3px" : "0 3px 3px 0",
        background: `linear-gradient(to ${
          izq ? "left" : "right"
        }, #4a4a4a 0%, #dcdcdc 60%, #9a9a9a 100%)`,
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.55)",
          "inset 0 -1px 0 rgba(0,0,0,0.6)",
          "0 0 0 0.5px rgba(242,183,5,0.45)",
          `${izq ? "-" : ""}1px 1px 3px rgba(0,0,0,0.7)`,
        ].join(", "),
        transform: `translateZ(${-PROFUNDIDAD / 2}px)`,
      }}
    />
  );
};

/** Pared lateral plana (perpendicular a la pantalla) con las bandas de antena. */
const BandasAntena: React.FC<{ lado: "izq" | "der" }> = ({ lado }) => (
  <div
    aria-hidden="true"
    className="absolute pointer-events-none"
    style={{
      top: RADIO + 4,
      bottom: RADIO + 4,
      width: PROFUNDIDAD,
      // El centro de la pared queda exactamente sobre el borde del chasis
      ...(lado === "der"
        ? { right: -(PROFUNDIDAD / 2 + 0.5) }
        : { left: -(PROFUNDIDAD / 2 + 0.5) }),
      transform: `translateZ(${-PROFUNDIDAD / 2}px) rotateY(90deg)`,
    }}
  >
    {["12%", "88%"].map((pos) => (
      <div
        key={pos}
        className="absolute left-0 right-0"
        style={{
          top: pos,
          height: 3,
          background: "#0c0c0c",
          borderTop: "1px solid rgba(255,255,255,0.28)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      />
    ))}
  </div>
);

/**
 * Smartphone flotante en 3D.
 *
 * - Cuerpo con grosor real (pila de láminas) y canto de titanio.
 * - Botones físicos y bandas de antena colocados sobre los cantos.
 * - Frente con bisel metálico, isla dinámica y reflejo recortado a la pantalla.
 * - Todas las capas se dimensionan con el propio teléfono (no con el contenedor).
 */
export const TelefonoFlotante: React.FC<PropsTelefonoFlotante> = ({
  pantalla,
  inclinacion = { rotX: 12, rotY: -16, rotZ: 4 },
  retraso = 0,
  tamano = "normal",
  className = "",
}) => {
  const dimensiones =
    tamano === "grande"
      ? "w-[260px] h-[520px] sm:w-[290px] sm:h-[580px]"
      : "w-[210px] h-[420px] sm:w-[230px] sm:h-[460px]";

  const descripcionAccesible = {
    perfil: "Vista previa ilustrativa del perfil profesional del peluquero",
    agenda:
      "Vista previa ilustrativa de la agenda con horarios libres y ocupados",
    reserva: "Vista previa ilustrativa del selector de horarios para clientes",
  }[pantalla];

  return (
    <div
      role="img"
      aria-label={descripcionAccesible}
      className={`relative select-none ${dimensiones} ${className}`}
      style={{ perspective: "1400px" }}
    >
      {/* Sombra ambiental dorada (el wrapper centra; la animación va en el hijo) */}
      <div
        aria-hidden="true"
        className="absolute -bottom-10 left-0 right-0 flex justify-center pointer-events-none"
      >
        <div
          className="w-4/5 h-12 rounded-full bg-gold-500/20 blur-2xl anim-pulso-lento"
          style={{ animationDelay: `${retraso}s` }}
        />
      </div>

      {/* Capa 1: flotación vertical */}
      <div
        className="relative w-full h-full anim-flotar motion-reduce:[animation:none]"
        style={{
          animationDelay: `${retraso}s`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Capa 2: inclinación 3D del dispositivo */}
        <div
          className="relative w-full h-full transition-transform duration-700 ease-out"
          style={{
            transform: `rotateX(${inclinacion.rotX ?? 0}deg) rotateY(${
              inclinacion.rotY ?? 0
            }deg) rotateZ(${inclinacion.rotZ ?? 0}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cuerpo: láminas de titanio apiladas hacia el fondo */}
          {capasCuerpo.map((capa) => (
            <div
              key={capa.z}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: RADIO,
                background: capa.ultima ? "#0a0a0a" : capa.fondo,
                transform: `translateZ(${capa.z}px)`,
                boxShadow: capa.ultima
                  ? "0 30px 50px -10px rgba(0,0,0,0.85), 0 12px 40px rgba(242,183,5,0.16)"
                  : undefined,
              }}
            />
          ))}

          {/* Bandas de antena en los cantos */}
          <BandasAntena lado="der" />
          <BandasAntena lado="izq" />

          {/* Botones físicos (detrás del frente para que el bisel los "abrace") */}
          <BotonFisico lado="der" top="25%" alto={64} />
          <BotonFisico lado="izq" top="13%" alto={26} />
          <BotonFisico lado="izq" top="21%" alto={46} />
          <BotonFisico lado="izq" top="31%" alto={46} />

          {/* Frente: bisel de titanio + marco negro */}
          <div
            className="absolute inset-0 p-2.5"
            style={{
              borderRadius: RADIO,
              background:
                "linear-gradient(160deg, #3a3a3a 0%, #171717 45%, #0b0b0b 100%)",
              boxShadow: [
                "inset 0 0 0 1.5px rgba(214,214,214,0.55)", // arista de titanio
                "inset 0 0 0 3px rgba(20,20,20,0.95)",
                "inset 0 0 0 4px rgba(255,255,255,0.06)",
                "0 0 0 1px rgba(242,183,5,0.35)", // filo dorado
              ].join(", "),
              transform: "translateZ(0px)",
            }}
          >
            {/* Pantalla */}
            <div
              className="relative w-full h-full rounded-[30px] overflow-hidden bg-ink pt-6 border border-ink-line"
              style={{
                boxShadow: "inset 0 0 12px rgba(0,0,0,0.85), 0 0 0 2px #000",
              }}
            >
              <div key={pantalla} className="w-full h-full anim-entrada">
                {pantalla === "perfil" && <PantallaPerfil />}
                {pantalla === "agenda" && <PantallaAgenda />}
                {pantalla === "reserva" && <PantallaReserva />}
              </div>

              {/* Isla dinámica (centrada sin pelearse con transform inline) */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[6px] z-30 h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10 flex items-center justify-end px-2.5"
              >
                <div className="h-2 w-2 rounded-full bg-[#0d1b2a] ring-1 ring-[#1f3a5a]/60" />
              </div>

              {/* Reflejo de vidrio, recortado al contorno de la pantalla */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 rounded-[30px]"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 22%, transparent 40%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
