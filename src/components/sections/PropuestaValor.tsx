import React from "react";
import { TituloSeccion } from "../ui/TituloSeccion";
import { Aparicion } from "../ui/Aparicion";
import { UserRound, CalendarCheck, Check } from "lucide-react";

/**
 * Propuesta de valor en 3 pasos secuenciales conectados por una línea de progresión.
 */
export const PropuestaValor: React.FC = () => {
  const pasos = [
    {
      numero: "01",
      icono: UserRound,
      titulo: "Tu perfil profesional único",
      descripcion:
        "Un enlace propio con tu nombre, foto, especialidades, ubicación actual en Tarija y precios de referencia.",
    },
    {
      numero: "02",
      icono: CalendarCheck,
      titulo: "Agenda con horarios visibles",
      descripcion:
        "Tus espacios libres se actualizan al instante. Quien quiera atenderse sabe exactamente cuándo tienes un lugar libre.",
    },
    {
      numero: "03",
      icono: Check,
      titulo: "El cliente reserva solo",
      descripcion:
        "Selecciona el servicio, elige la hora disponible y la cita queda agendada sin requerir cruces de mensajes.",
    },
  ];

  return (
    <section
      id="como-funciona"
      aria-label="Cómo funciona HairLink"
      className="py-20 sm:py-28 bg-ink-soft relative border-y border-ink-line"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <Aparicion>
          <TituloSeccion
            etiqueta="Flujo simplificado"
            titulo="Tres pasos para que tu agenda trabaje por ti"
            palabraDestacada="agenda"
            subtitulo="Sin complicaciones técnicas ni configuraciones interminables. Directo a reservar."
            className="mb-16"
          />
        </Aparicion>

        {/* Pasos conectados por una línea horizontal en pantallas de escritorio */}
        <div className="relative">
          {/* Línea conectora horizontal (escritorio) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-gold-500/20 via-gold-400 to-gold-500/20 -translate-y-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 relative z-10">
            {pasos.map((paso, idx) => {
              const Icono = paso.icono;
              return (
                <Aparicion key={idx} retrasoMs={idx * 150}>
                  <div className="bg-ink rounded-2xl p-7 border border-ink-line hover:border-gold-500/50 transition-all flex flex-col items-start relative h-full">
                    {/* Número grande superior */}
                    <div className="flex items-center justify-between w-full mb-6">
                      <span className="text-3xl font-black text-gold-400 font-mono">
                        {paso.numero}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                        <Icono className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {paso.titulo}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">
                      {paso.descripcion}
                    </p>
                  </div>
                </Aparicion>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
