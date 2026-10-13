import React from "react";
import { Boton } from "../ui/Boton";
import { TelefonoFlotante } from "../ui/TelefonoFlotante";
import { Sparkles } from "lucide-react";

export const Inicio: React.FC = () => {
  return (
    <section
      id="inicio"
      aria-label="Presentación de HairLink"
      className="relative min-h-[calc(100vh-4.5rem)] flex items-center justify-center overflow-hidden bg-ink bg-cuadricula-dorada py-14 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/15 rounded-full blur-[110px] pointer-events-none anim-pulso-lento"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-0 w-[480px] h-[480px] bg-gold-500/10 rounded-full blur-[130px] pointer-events-none anim-pulso-lento"
        style={{ animationDelay: "2.5s" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-6">
              <Sparkles
                className="w-3.5 h-3.5 text-gold-400"
                aria-hidden="true"
              />
              <span>Beta en validación · Tarija, Bolivia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Tu agenda y tus clientes{" "}
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                te siguen
              </span>
              , aunque cambies de local.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Diseñado para peluqueros y barberos independientes en Tarija.
              Publica tu disponibilidad real para que tu clientela reserve de
              inmediato, sin interrumpir tus tijeras ni coordinar mensajes
              eternos.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Boton
                href="#inscripcion"
                variante="dorado"
                tamano="lg"
                conIcono
                conDestello
                className="w-full sm:w-auto"
              >
                Quiero participar en la beta
              </Boton>
              <Boton
                href="#prototipo"
                variante="secundario"
                tamano="lg"
                className="w-full sm:w-auto"
              >
                Ver cómo funciona
              </Boton>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[450px] sm:h-[500px] flex items-center justify-center">
              <div className="absolute -left-4 sm:-left-8 top-6 opacity-75 scale-90 sm:scale-95 z-10 hidden sm:block">
                <TelefonoFlotante
                  pantalla="reserva"
                  inclinacion={{ rotX: 14, rotY: 18, rotZ: -6 }}
                  retraso={1.8}
                />
              </div>

              <div className="relative z-20">
                <TelefonoFlotante
                  pantalla="perfil"
                  inclinacion={{ rotX: 10, rotY: -16, rotZ: 3 }}
                  retraso={0}
                  tamano="grande"
                />
              </div>

              <div className="absolute -right-4 sm:-right-8 bottom-2 z-30 opacity-90 scale-90 sm:scale-95 hidden sm:block">
                <TelefonoFlotante
                  pantalla="agenda"
                  inclinacion={{ rotX: 8, rotY: -22, rotZ: 5 }}
                  retraso={3.2}
                />
              </div>
            </div>

            <p className="text-[11px] text-white/40 mt-3 text-center">
              Vista ilustrativa: el diseño final puede cambiar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
