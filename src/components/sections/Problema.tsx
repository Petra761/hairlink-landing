import React from "react";
import { TituloSeccion } from "../ui/TituloSeccion";
import { Aparicion } from "../ui/Aparicion";
import { MessageCircle, MapPin, Clock } from "lucide-react";

/**
 * Sección que describe los tres problemas críticos identificados
 * en la atención y gestión diaria de los barberos en Tarija.
 */
export const Problema: React.FC = () => {
  const situaciones = [
    {
      icono: Clock,
      titulo: "Llegan con prisa y se van con otro",
      descripcion:
        "Tus clientes pasan por el salón cuando tu silla está ocupada. Como no pueden esperar 40 minutos sin saber cuándo te desocupas, cruzan la calle o buscan otro lugar.",
    },
    {
      icono: MapPin,
      titulo: "Cambias de local y pierdes clientes fijos",
      descripcion:
        "Si te trasladas de salón o abres tu propio espacio, muchos clientes no se enteran a tiempo y se quedan con quien atienda en tu antiguo puesto de trabajo.",
    },
    {
      icono: MessageCircle,
      titulo: "Interrupciones constantes por WhatsApp",
      descripcion:
        "Tener que soltar la máquina o la tijera para responder mensajes y coordinar horarios desconcentra tu corte, quita tiempo y hace esperar a quien ya está en tu silla.",
    },
  ];

  return (
    <section
      id="problema"
      aria-label="Situaciones cotidianas del profesional independiente"
      className="py-20 sm:py-28 bg-ink relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <Aparicion>
          <TituloSeccion
            etiqueta="La realidad del salón"
            titulo="Tres obstáculos que frenan tus ingresos diarios"
            palabraDestacada="obstáculos"
            subtitulo="Gestionar citas con métodos informales te hace perder tiempo valioso y clientela que ya confía en tu trabajo."
            className="mb-14"
          />
        </Aparicion>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {situaciones.map((item, index) => {
            const Icono = item.icono;
            return (
              <Aparicion key={index} retrasoMs={index * 120}>
                <div className="h-full rounded-2xl bg-ink-soft p-7 border border-ink-line hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-lg">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-ink transition-all">
                      <Icono className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                      {item.titulo}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">
                      {item.descripcion}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ink-line/60 text-xs font-semibold text-gold-400/80">
                    Situación común en Tarija
                  </div>
                </div>
              </Aparicion>
            );
          })}
        </div>
      </div>
    </section>
  );
};
