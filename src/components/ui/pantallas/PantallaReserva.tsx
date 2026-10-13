import React from "react";
import { Scissors, Check } from "lucide-react";

/**
 * Pantalla ilustrativa del flujo de confirmación de cita por parte del cliente.
 */
export const PantallaReserva: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full bg-ink text-white p-3.5 flex flex-col justify-between select-none text-left"
    >
      <div>
        {/* Resumen del servicio seleccionado */}
        <div className="pb-2.5 border-b border-ink-line">
          <div className="text-[10px] text-white/50 uppercase tracking-wider">
            Confirmación
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
            <Scissors className="w-3 h-3 text-gold-400" />
            <span>Corte clásico de cabello</span>
          </div>
          <div className="text-[10px] text-gold-400 font-semibold mt-0.5">
            Duración estimada: 30 min
          </div>
        </div>

        {/* Chips de selección de horario */}
        <div className="mt-2.5">
          <span className="text-[10px] font-bold text-white/60">
            Horarios libres hoy
          </span>
          <div className="grid grid-cols-3 gap-1.5 mt-1.5">
            {["09:40", "11:00", "11:40", "15:00", "16:20", "17:00"].map(
              (hora, idx) => (
                <div
                  key={hora}
                  className={`py-1.5 rounded-md text-[10px] text-center font-mono font-bold border transition-colors ${
                    idx === 1
                      ? "bg-gold-500 text-ink border-gold-400 shadow-sm"
                      : "bg-ink-soft text-white/70 border-ink-line"
                  }`}
                >
                  {hora}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Recordatorio de aviso directo */}
        <div className="mt-3 p-2 rounded-lg bg-ink-soft/80 border border-ink-line text-[9px] text-white/60 flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>La cita se agenda directamente sin consultas previas.</span>
        </div>
      </div>

      {/* Botón de confirmar cita */}
      <div className="pt-2">
        <div className="w-full py-2 bg-gold-500 text-ink rounded-lg text-center font-bold text-[11px] shadow-sm">
          Confirmar cita (11:00)
        </div>
      </div>
    </div>
  );
};
