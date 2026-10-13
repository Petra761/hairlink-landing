import React, { useState, useEffect, useRef } from "react";
import { TituloSeccion } from "../ui/TituloSeccion";
import { TelefonoFlotante, type TipoPantallaTelefono } from "../ui/TelefonoFlotante";
import { Aparicion } from "../ui/Aparicion";
import { Pause, Play, UserRound, CalendarCheck, Check } from "lucide-react";

interface InfoPantalla {
  id: TipoPantallaTelefono;
  etiqueta: string;
  icono: React.ElementType;
  titulo: string;
  descripcion: string;
}

const PANTALLAS: InfoPantalla[] = [
  {
    id: "perfil",
    etiqueta: "Perfil",
    icono: UserRound,
    titulo: "Tu vitrina profesional personalizada",
    descripcion:
      "Muestra tus servicios, especialidad y zona en Tarija. Tu enlace personal acompaña tu marca aunque te traslades a otro salón.",
  },
  {
    id: "agenda",
    etiqueta: "Agenda",
    icono: CalendarCheck,
    titulo: "Disponibilidad transparente y organizada",
    descripcion:
      "Tus clientes ven qué momentos están libres y cuáles ocupados, evitando filas desordenadas en tu local.",
  },
  {
    id: "reserva",
    etiqueta: "Reserva",
    icono: Check,
    titulo: "Cita confirmada en dos toques",
    descripcion:
      "El cliente elige el servicio, selecciona el horario exacto y confirma su turno sin llamadas ni esperas.",
  },
];

/**
 * Sección interactiva con el modelo 3D del celular a gran escala.
 * Incluye pestañas accesibles (WAI-ARIA), control para pausar/reanudar
 * el cambio automático y soporte de teclado.
 */
export const Prototipo: React.FC = () => {
  const [pantallaActiva, setPantallaActiva] = useState<TipoPantallaTelefono>("perfil");

  // El estado inicial evalúa prefers-reduced-motion sin necesidad de llamar a setState en el cuerpo del efecto
  const [estaPausado, setEstaPausado] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Suscripción al cambio dinámico de preferencia de movimiento mediante listener externo
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const alCambiarPreferencia = (evento: MediaQueryListEvent) => {
      if (evento.matches) {
        setEstaPausado(true);
      }
    };

    mediaQuery.addEventListener("change", alCambiarPreferencia);
    return () => mediaQuery.removeEventListener("change", alCambiarPreferencia);
  }, []);

  // Temporizador para cambio automático cada 4 segundos
  useEffect(() => {
    if (estaPausado) return;

    const intervalo = setInterval(() => {
      setPantallaActiva((actual) => {
        const indice = PANTALLAS.findIndex((p) => p.id === actual);
        const siguiente = (indice + 1) % PANTALLAS.length;
        return PANTALLAS[siguiente].id;
      });
    }, 4000);

    return () => clearInterval(intervalo);
  }, [estaPausado]);

  const seleccionarPantallaManualmente = (id: TipoPantallaTelefono) => {
    setPantallaActiva(id);
    setEstaPausado(true); // Se detiene al interactuar directamente
  };

  const alternarPausa = () => {
    setEstaPausado((prev) => !prev);
  };

  // Navegación accesible por teclado entre tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const siguiente = (index + 1) % PANTALLAS.length;
      seleccionarPantallaManualmente(PANTALLAS[siguiente].id);
      tabRefs.current[siguiente]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const anterior = (index - 1 + PANTALLAS.length) % PANTALLAS.length;
      seleccionarPantallaManualmente(PANTALLAS[anterior].id);
      tabRefs.current[anterior]?.focus();
    }
  };

  const pantallaActualData = PANTALLAS.find((p) => p.id === pantallaActiva) || PANTALLAS[0];

  return (
    <section
      id="prototipo"
      aria-label="Demostración interactiva de la aplicación"
      className="py-20 sm:py-28 bg-ink relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <Aparicion>
          <TituloSeccion
            etiqueta="Vista previa"
            titulo="Explora la experiencia que tendrán tus clientes"
            palabraDestacada="experiencia"
            subtitulo="Interactúa con cada una de las pantallas principales diseñadas para resolver tu día a día."
            className="mb-14"
          />
        </Aparicion>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Columna de controles y pestañas accesibles */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            {/* Lista de pestañas ARIA */}
            <div
              role="tablist"
              aria-label="Pantallas de la aplicación HairLink"
              className="flex items-center gap-2 p-1.5 bg-ink-soft rounded-2xl border border-ink-line mb-6 max-w-md"
            >
              {PANTALLAS.map((pantalla, index) => {
                const Icono = pantalla.icono;
                const estaSeleccionada = pantallaActiva === pantalla.id;
                return (
                  <button
                    key={pantalla.id}
                    ref={(el) => { tabRefs.current[index] = el; }}
                    role="tab"
                    id={`tab-${pantalla.id}`}
                    aria-selected={estaSeleccionada}
                    aria-controls={`tabpanel-${pantalla.id}`}
                    tabIndex={estaSeleccionada ? 0 : -1}
                    onClick={() => seleccionarPantallaManualmente(pantalla.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-2 focus-visible:outline-gold-400 ${
                      estaSeleccionada
                        ? "bg-gold-500 text-ink shadow-md"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icono className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{pantalla.etiqueta}</span>
                  </button>
                );
              })}
            </div>

            {/* Panel de contenido descriptivo */}
            <div
              id={`tabpanel-${pantallaActualData.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${pantallaActualData.id}`}
              className="p-6 sm:p-8 rounded-2xl bg-ink-soft border border-ink-line min-h-[170px]"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {pantallaActualData.titulo}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                {pantallaActualData.descripcion}
              </p>
            </div>

            {/* Botón de pausa / reproducción del cambio automático */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={alternarPausa}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-ink-soft hover:bg-ink-line border border-ink-line text-xs font-semibold text-white/80 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-gold-400"
                aria-label={
                  estaPausado
                    ? "Reanudar rotación automática de pantallas"
                    : "Pausar rotación automática de pantallas"
                }
              >
                {estaPausado ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                    <span>Reanudar rotación</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                    <span>Pausar rotación</span>
                  </>
                )}
              </button>

              <span className="text-xs text-white/40">
                Cambio automático cada 4 segundos
              </span>
            </div>
          </div>

          {/* Columna con teléfono flotante grande centrado, ángulo de -18deg para exponer el lateral derecho y su botón */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center">
            <div className="relative py-4">
              <TelefonoFlotante
                pantalla={pantallaActiva}
                inclinacion={{ rotX: 10, rotY: -18, rotZ: 3 }}
                retraso={0}
                tamano="grande"
              />
            </div>
            <p className="text-xs text-white/40 mt-6 text-center">
              Vista ilustrativa: el diseño final puede cambiar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};