import React from "react";
import { CalendarCheck } from "lucide-react";

/**
 * Pantalla ilustrativa de la agenda visible con franjas horarias y disponibilidad.
 */
export const PantallaAgenda: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full bg-ink text-white p-3.5 flex flex-col justify-between select-none text-left"
    >
      <div>
        {/* Encabezado del día */}
        <div className="flex items-center justify-between pb-2.5 border-b border-ink-line">
          <div>
            <div className="text-[10px] font-semibold text-gold-400 uppercase tracking-wider">
              Agenda diaria
            </div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              <CalendarCheck className="w-3 h-3 text-gold-400" />
              <span>Hoy · Horarios activos</span>
            </div>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30">
            Tarija
          </span>
        </div>

        {/* Bloques de horario */}
        <div className="mt-2.5 space-y-1.5">
          {[
            { hora: "09:00", estado: "Cita programada", tipo: "ocupado" },
            { hora: "09:40", estado: "Libre para reserva", tipo: "libre" },
            { hora: "10:20", estado: "Cita programada", tipo: "ocupado" },
            { hora: "11:00", estado: "Libre para reserva", tipo: "libre" },
            { hora: "11:40", estado: "Libre para reserva", tipo: "libre" },
          ].map((bloque, i) => (
            <div
              key={i}
              className={`px-2.5 py-1.5 rounded-lg border text-[10px] flex items-center justify-between ${
                bloque.tipo === "libre"
                  ? "bg-gold-500/10 border-gold-500/40 text-gold-300"
                  : "bg-ink-soft border-ink-line text-white/50"
              }`}
            >
              <span className="font-bold font-mono">{bloque.hora}</span>
              <span
                className={`font-medium ${
                  bloque.tipo === "libre" ? "text-gold-400" : "text-white/60"
                }`}
              >
                {bloque.estado}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Botón para abrir nuevo cupo */}
      <div className="pt-2">
        <div className="w-full py-2 bg-ink-soft border border-gold-500/40 text-gold-300 rounded-lg text-center font-bold text-[11px]">
          + Nueva cita manual
        </div>
      </div>
    </div>
  );
};
