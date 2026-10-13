import React from "react";
import { TituloSeccion } from "../ui/TituloSeccion";
import { Aparicion } from "../ui/Aparicion";
import { Clock, ShieldCheck, MapPin, Calendar, Smartphone } from "lucide-react";

/**
 * Cuadrícula estilo Bento con tamaños diferenciados para resaltar
 * los 5 beneficios clave de HairLink.
 */
export const Beneficios: React.FC = () => {
  return (
    <section
      id="beneficios"
      aria-label="Beneficios principales"
      className="py-20 sm:py-28 bg-ink relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <Aparicion>
          <TituloSeccion
            etiqueta="Ventajas clave"
            titulo="Control total de tu tiempo y de tu negocio"
            palabraDestacada="Control"
            subtitulo="Cada herramienta está pensada para proteger tu trabajo artesanal y evitar que pierdas clientes por desorganización."
            className="mb-14"
          />
        </Aparicion>

        {/* Cuadrícula Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Tarjeta Bento 1 (Grande, 7 columnas) */}
          <div className="md:col-span-7">
            <Aparicion className="h-full">
              <div className="h-full rounded-3xl bg-ink-soft p-8 sm:p-10 border border-ink-line hover:border-gold-500/50 transition-all flex flex-col justify-between relative overflow-hidden group shadow-lg">
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -bottom-8 w-44 h-44 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"
                />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                    <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                    Tu clientela te pertenece a ti, no a un local
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed max-w-lg">
                    Si te mudas de salón, abres un espacio propio o cambias de
                    horario, tu enlace no cambia. Tus clientes mantienen el
                    mismo acceso directo sin perder el contacto nunca.
                  </p>
                </div>
                <div className="mt-8 text-xs font-bold text-gold-400">
                  Independencia profesional duradera
                </div>
              </div>
            </Aparicion>
          </div>

          {/* Tarjeta Bento 2 (5 columnas) */}
          <div className="md:col-span-5">
            <Aparicion retrasoMs={120} className="h-full">
              <div className="h-full rounded-3xl bg-ink-soft p-8 sm:p-10 border border-ink-line hover:border-gold-500/50 transition-all flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                    <Clock className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                    Ahorra horas en mensajes y llamadas
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Evita el constante "¿Tienes libre a las cuatro?". Tu enlace
                    muestra tu horario exacto para que reserven en silencio.
                  </p>
                </div>
                <div className="mt-6 text-xs font-bold text-gold-400">
                  Cero interrupciones al cortar
                </div>
              </div>
            </Aparicion>
          </div>

          {/* Tarjeta Bento 3 (4 columnas) */}
          <div className="md:col-span-4">
            <Aparicion retrasoMs={200} className="h-full">
              <div className="h-full rounded-3xl bg-ink-soft p-8 border border-ink-line hover:border-gold-500/50 transition-all flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Menos clientes perdidos
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Quien no puede esperar ve cuándo puedes atenderle y asegura
                    su turno en vez de irse a otra barbería.
                  </p>
                </div>
                <div className="mt-6 text-xs font-semibold text-gold-400/80">
                  Agenda sin huecos vacíos
                </div>
              </div>
            </Aparicion>
          </div>

          {/* Tarjeta Bento 4 (4 columnas) */}
          <div className="md:col-span-4">
            <Aparicion retrasoMs={280} className="h-full">
              <div className="h-full rounded-3xl bg-ink-soft p-8 border border-ink-line hover:border-gold-500/50 transition-all flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Ubicación por zona en Tarija
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Facilita que vecinos y clientes frecuentes ubiquen tu sillón
                    fácilmente según el barrio donde atiendes.
                  </p>
                </div>
                <div className="mt-6 text-xs font-semibold text-gold-400/80">
                  Geolocalización clara
                </div>
              </div>
            </Aparicion>
          </div>

          {/* Tarjeta Bento 5 (4 columnas) */}
          <div className="md:col-span-4">
            <Aparicion retrasoMs={360} className="h-full">
              <div className="h-full rounded-3xl bg-ink-soft p-8 border border-ink-line hover:border-gold-500/50 transition-all flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5">
                    <Smartphone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Agenda ligera y rápida
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Sin aplicaciones pesadas ni descargas obligatorias para tus
                    clientes: funciona directo en cualquier navegador web.
                  </p>
                </div>
                <div className="mt-6 text-xs font-semibold text-gold-400/80">
                  Acceso instantáneo
                </div>
              </div>
            </Aparicion>
          </div>
        </div>
      </div>
    </section>
  );
};
