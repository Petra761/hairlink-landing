import React from "react";
import { UserRound, MapPin, Scissors, Clock } from "lucide-react";

/**
 * Pantalla ilustrativa del perfil profesional del peluquero/barbero.
 * Contenido genérico que respeta las normas de validación sin inventar datos reales.
 */
export const PantallaPerfil: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full bg-ink text-white p-3.5 flex flex-col justify-between select-none text-left"
    >
      <div>
        {/* Cabecera del perfil */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-ink-line">
          <div className="w-11 h-11 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400 shrink-0">
            <UserRound className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">
              Nombre del peluquero
            </div>
            <div className="text-[10px] text-gold-400 font-medium">
              Barbería y Estilo
            </div>
            <div className="flex items-center gap-1 text-[9px] text-white/60">
              <MapPin className="w-2.5 h-2.5 text-gold-400" />
              <span>Zona Central · Tarija</span>
            </div>
          </div>
        </div>

        {/* Sección de servicios */}
        <div className="mt-3">
          <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase">
            Servicios frecuentes
          </span>
          <div className="mt-1.5 space-y-1.5">
            {[
              { nombre: "Corte clásico", duracion: "30 min" },
              { nombre: "Perfilado de barba", duracion: "20 min" },
              { nombre: "Corte y barba completo", duracion: "45 min" },
            ].map((serv, i) => (
              <div
                key={i}
                className="p-2 rounded-lg bg-ink-soft border border-ink-line/80 flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Scissors className="w-3 h-3 text-gold-400 shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold text-white">
                      {serv.nombre}
                    </div>
                    <div className="flex items-center gap-1 text-[8px] text-white/60">
                      <Clock className="w-2 h-2 text-gold-400" />
                      <span>{serv.duracion}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gold-400">
                  Bs --
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón de acción */}
      <div className="pt-2">
        <div className="w-full py-2 bg-gold-500 text-ink rounded-lg text-center font-bold text-[11px] shadow-sm">
          Reservar cita directa
        </div>
      </div>
    </div>
  );
};
