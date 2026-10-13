import React from "react";
import { TituloSeccion } from "../ui/TituloSeccion";
import { Aparicion } from "../ui/Aparicion";
import { Scissors, MapPin, Check } from "lucide-react";

/**
 * Sección de público objetivo: perfil específico de peluqueros y barberos
 * en Tarija con clientes habituales y cortes prácticos.
 */
export const ParaQuien: React.FC = () => {
  const perfiles = [
    {
      titulo: "Barberos y peluqueros independientes",
      descripcion:
        "Profesionales que arriendan un sillón o atienden de forma autónoma y necesitan que su clientela dependa de ellos y no del local.",
    },
    {
      titulo: "Especialistas en cortes frecuentes",
      descripcion:
        "Cortes masculinos, perfilados y estilos regulares donde los clientes regresan cada 15 a 30 días y valoran la puntualidad.",
    },
    {
      titulo: "Profesionales ubicados en Tarija",
      descripcion:
        "El programa piloto está enfocado exclusivamente en profesionales que trabajen en la ciudad de Tarija para validar la cercanía y el uso real.",
    },
  ];

  return (
    <section
      id="para-quien"
      aria-label="Para quién es HairLink"
      className="py-20 sm:py-28 bg-cream text-ink relative border-y border-gold-500/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <Aparicion>
          <TituloSeccion
            etiqueta="Perfil del participante"
            titulo="Diseñado para profesionales que valoran a su clientela"
            palabraDestacada="profesionales"
            subtitulo="HairLink está pensado para quienes buscan construir una base sólida e independiente en Tarija."
            esClaro
            className="mb-14"
          />
        </Aparicion>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {perfiles.map((item, index) => (
            <Aparicion key={index} retrasoMs={index * 120}>
              <div className="h-full bg-white rounded-2xl p-7 border-2 border-gold-400/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-ink mb-5">
                    {index === 0 && (
                      <Scissors
                        className="w-5 h-5 text-gold-600"
                        aria-hidden="true"
                      />
                    )}
                    {index === 1 && (
                      <Check
                        className="w-5 h-5 text-gold-600"
                        aria-hidden="true"
                      />
                    )}
                    {index === 2 && (
                      <MapPin
                        className="w-5 h-5 text-gold-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-3 tracking-tight">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-ink-soft/80 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gold-500/20 text-xs font-bold text-gold-600">
                  Enfoque Tarija
                </div>
              </div>
            </Aparicion>
          ))}
        </div>
      </div>
    </section>
  );
};
