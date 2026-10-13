import React, { useState, useId, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
} from "lucide-react";
import type { DatosInscripcion } from "../../types/inscripcion";
import {
  esquemaInscripcion,
  OPCIONES_PERFIL,
  OPCIONES_NECESIDAD,
  normalizarWhatsapp,
  limpiarParametroOrigen,
  type ValoresFormularioInscripcion,
} from "../../lib/validacionInscripcion";
import { enviarInscripcion } from "../../lib/enviarInscripcion";
import { CampoTexto } from "./CampoTexto";
import { GrupoOpciones } from "./GrupoOpciones";
import { EscalaInteres } from "./EscalaInteres";
import { MensajeExito } from "./MensajeExito";

export interface PropsBetaForm {
  className?: string;
}

/**
 * Formulario de inscripción estructurado en bloques de acordeón progresivos.
 */
export const BetaForm: React.FC<PropsBetaForm> = ({ className = "" }) => {
  const idBase = useId();
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const [bloquesAbiertos, setBloquesAbiertos] = useState<
    Record<number, boolean>
  >({
    1: true,
    2: false,
    3: false,
  });

  const [mostrarOpcionalesExtra, setMostrarOpcionalesExtra] = useState(false);

  const [parametroOrigen] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const params = new URLSearchParams(window.location.search);
      return limpiarParametroOrigen(params.get("ref"));
    } catch {
      return "";
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    setFocus,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaInscripcion),
    mode: "onTouched",
    defaultValues: {
      nombre: "",
      correo: "",
      whatsapp: "",
      empresa: "",
      consentimiento: false,
      origen: parametroOrigen,
      sitio_web: "",
    },
  });

  // Registro del campo numérico 'interes'
  useEffect(() => {
    register("interes");
  }, [register]);

  const nombreValor = watch("nombre");
  const correoValor = watch("correo");
  const perfilSeleccionado = watch("perfil");
  const necesidadSeleccionada = watch("necesidad");
  const interesSeleccionado = watch("interes");
  const consentimientoSeleccionado = watch("consentimiento");

  // Si ocurren errores al enviar, se abren automáticamente las secciones involucradas
  useEffect(() => {
    if (errors.nombre || errors.correo) {
      setBloquesAbiertos((prev) => ({ ...prev, 1: true }));
    }
    if (errors.perfil || errors.necesidad || errors.interes) {
      setBloquesAbiertos((prev) => ({ ...prev, 2: true }));
    }
    if (errors.consentimiento || errors.whatsapp || errors.empresa) {
      setBloquesAbiertos((prev) => ({ ...prev, 3: true }));
      if (errors.whatsapp || errors.empresa) {
        setMostrarOpcionalesExtra(true);
      }
    }
  }, [errors]);

  const alternarBloque = (paso: number) => {
    setBloquesAbiertos((prev) => ({
      ...prev,
      [paso]: !prev[paso],
    }));
  };

  const avanzarABloque = async (
    siguientePaso: number,
    camposAValidar?: (
      | "nombre"
      | "correo"
      | "perfil"
      | "necesidad"
      | "interes"
    )[],
  ) => {
    if (camposAValidar) {
      const esValido = await trigger(camposAValidar);
      if (!esValido) return;
    }
    setBloquesAbiertos({
      1: siguientePaso === 1,
      2: siguientePaso === 2,
      3: siguientePaso === 3,
    });
  };

  const onSubmit = async (valores: ValoresFormularioInscripcion) => {
    setErrorEnvio(null);

    if (valores.sitio_web && valores.sitio_web.trim().length > 0) {
      setEnvioExitoso(true);
      return;
    }

    const datosDepurados: DatosInscripcion = {
      nombre: valores.nombre.trim(),
      correo: valores.correo.trim().toLowerCase(),
      perfil: valores.perfil,
      necesidad: valores.necesidad,
      interes: valores.interes,
      whatsapp: valores.whatsapp?.trim()
        ? normalizarWhatsapp(valores.whatsapp)
        : undefined,
      empresa: valores.empresa?.trim() || undefined,
      consentimiento: valores.consentimiento,
      origen: valores.origen || "",
    };

    try {
      const resultado = await enviarInscripcion(datosDepurados);

      if (resultado.ok) {
        setEnvioExitoso(true);
        return;
      }

      if (resultado.motivo === "duplicado") {
        setBloquesAbiertos((prev) => ({ ...prev, 1: true }));
        setError("correo", {
          type: "manual",
          message: "Este correo ya está inscrito.",
        });
        setFocus("correo");
        return;
      }

      setErrorEnvio(
        "No pudimos enviar tus respuestas. Revisa tu conexión e inténtalo de nuevo.",
      );
    } catch {
      setErrorEnvio(
        "No pudimos enviar tus respuestas. Revisa tu conexión e inténtalo de nuevo.",
      );
    }
  };

  if (envioExitoso) {
    return <MensajeExito />;
  }

  const paso1Completo = Boolean(
    nombreValor &&
    nombreValor.trim().length >= 2 &&
    correoValor &&
    !errors.nombre &&
    !errors.correo,
  );
  const paso2Completo = Boolean(
    perfilSeleccionado &&
    necesidadSeleccionada &&
    interesSeleccionado &&
    !errors.perfil &&
    !errors.necesidad &&
    !errors.interes,
  );
  const paso3Completo = Boolean(
    consentimientoSeleccionado && !errors.consentimiento,
  );

  return (
    <div
      className={`w-full bg-white text-ink rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-ink-line/20 shadow-md ${className}`}
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3.5"
      >
        {/* BLOQUE 1: DATOS BÁSICOS */}
        <div className="rounded-2xl border border-ink-line/20 bg-white overflow-hidden transition-all shadow-sm">
          <button
            type="button"
            onClick={() => alternarBloque(1)}
            aria-expanded={bloquesAbiertos[1]}
            aria-controls={`${idBase}-panel-1`}
            id={`${idBase}-cabecera-1`}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors focus-visible:outline-2 focus-visible:outline-gold-500 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  paso1Completo
                    ? "bg-gold-500 text-ink"
                    : "bg-ink-soft/10 text-ink"
                }`}
              >
                {paso1Completo ? (
                  <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                ) : (
                  "1"
                )}
              </span>
              <div>
                <h3 className="text-base font-bold text-ink leading-tight">
                  Tus datos de contacto
                </h3>
                <p className="text-xs text-ink/60">Nombre y correo principal</p>
              </div>
            </div>
            {bloquesAbiertos[1] ? (
              <ChevronUp className="w-5 h-5 text-ink/60" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5 text-ink/60" aria-hidden="true" />
            )}
          </button>

          <div
            id={`${idBase}-panel-1`}
            role="region"
            aria-labelledby={`${idBase}-cabecera-1`}
            className={`grid transition-all duration-300 ease-in-out ${
              bloquesAbiertos[1]
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-5 pt-1 border-t border-ink-line/10 flex flex-col gap-4">
                <CampoTexto
                  id={`${idBase}-nombre`}
                  etiqueta="Nombre completo"
                  placeholder="Ej. Carlos Mendoza"
                  obligatorio
                  autoComplete="name"
                  error={errors.nombre?.message}
                  {...register("nombre")}
                />

                <CampoTexto
                  id={`${idBase}-correo`}
                  type="email"
                  etiqueta="Correo electrónico"
                  placeholder="tu@correo.com"
                  obligatorio
                  autoComplete="email"
                  inputMode="email"
                  error={errors.correo?.message}
                  {...register("correo")}
                />

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => avanzarABloque(2, ["nombre", "correo"])}
                    className="inline-flex items-center gap-2 text-xs font-bold text-ink bg-gold-500/25 hover:bg-gold-500/40 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Continuar a tu perfil</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 2: MODALIDAD Y EXPERIENCIA */}
        <div className="rounded-2xl border border-ink-line/20 bg-white overflow-hidden transition-all shadow-sm">
          <button
            type="button"
            onClick={() => alternarBloque(2)}
            aria-expanded={bloquesAbiertos[2]}
            aria-controls={`${idBase}-panel-2`}
            id={`${idBase}-cabecera-2`}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors focus-visible:outline-2 focus-visible:outline-gold-500 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  paso2Completo
                    ? "bg-gold-500 text-ink"
                    : "bg-ink-soft/10 text-ink"
                }`}
              >
                {paso2Completo ? (
                  <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                ) : (
                  "2"
                )}
              </span>
              <div>
                <h3 className="text-base font-bold text-ink leading-tight">
                  Tu experiencia y necesidades
                </h3>
                <p className="text-xs text-ink/60">
                  Modalidad, mayor obstáculo y probabilidad de uso
                </p>
              </div>
            </div>
            {bloquesAbiertos[2] ? (
              <ChevronUp className="w-5 h-5 text-ink/60" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5 text-ink/60" aria-hidden="true" />
            )}
          </button>

          <div
            id={`${idBase}-panel-2`}
            role="region"
            aria-labelledby={`${idBase}-cabecera-2`}
            className={`grid transition-all duration-300 ease-in-out ${
              bloquesAbiertos[2]
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-5 pt-1 border-t border-ink-line/10 flex flex-col gap-5">
                <GrupoOpciones
                  idBase={`${idBase}-perfil`}
                  titulo="¿Cómo trabajas actualmente?"
                  opciones={OPCIONES_PERFIL}
                  valorSeleccionado={perfilSeleccionado}
                  error={errors.perfil?.message}
                  obligatorio
                  registro={register("perfil")}
                />

                <GrupoOpciones
                  idBase={`${idBase}-necesidad`}
                  titulo="¿Cuál es tu mayor dificultad hoy?"
                  opciones={OPCIONES_NECESIDAD}
                  valorSeleccionado={necesidadSeleccionada}
                  error={errors.necesidad?.message}
                  obligatorio
                  registro={register("necesidad")}
                />

                <EscalaInteres
                  idBase={`${idBase}-interes`}
                  pregunta="¿Qué tan probable es que uses HairLink?"
                  valorSeleccionado={interesSeleccionado}
                  error={errors.interes?.message}
                  obligatorio
                  alSeleccionar={(valor) =>
                    setValue("interes", valor, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }
                />

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      avanzarABloque(3, ["perfil", "necesidad", "interes"])
                    }
                    className="inline-flex items-center gap-2 text-xs font-bold text-ink bg-gold-500/25 hover:bg-gold-500/40 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Continuar a confirmación</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 3: CONFIRMACIÓN Y OPCIONALES */}
        <div className="rounded-2xl border border-ink-line/20 bg-white overflow-hidden transition-all shadow-sm">
          <button
            type="button"
            onClick={() => alternarBloque(3)}
            aria-expanded={bloquesAbiertos[3]}
            aria-controls={`${idBase}-panel-3`}
            id={`${idBase}-cabecera-3`}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gold-500/5 transition-colors focus-visible:outline-2 focus-visible:outline-gold-500 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  paso3Completo
                    ? "bg-gold-500 text-ink"
                    : "bg-ink-soft/10 text-ink"
                }`}
              >
                {paso3Completo ? (
                  <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                ) : (
                  "3"
                )}
              </span>
              <div>
                <h3 className="text-base font-bold text-ink leading-tight">
                  Confirmación y datos opcionales
                </h3>
                <p className="text-xs text-ink/60">
                  WhatsApp, peluquería y consentimiento
                </p>
              </div>
            </div>
            {bloquesAbiertos[3] ? (
              <ChevronUp className="w-5 h-5 text-ink/60" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5 text-ink/60" aria-hidden="true" />
            )}
          </button>

          <div
            id={`${idBase}-panel-3`}
            role="region"
            aria-labelledby={`${idBase}-cabecera-3`}
            className={`grid transition-all duration-300 ease-in-out ${
              bloquesAbiertos[3]
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-5 pt-1 border-t border-ink-line/10 flex flex-col gap-5">
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setMostrarOpcionalesExtra((prev) => !prev)}
                    aria-expanded={mostrarOpcionalesExtra}
                    aria-controls={`${idBase}-opcionales`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-ink hover:text-gold-600 transition-colors py-1 focus-visible:outline-2 focus-visible:outline-gold-500 rounded-lg cursor-pointer"
                  >
                    <span>
                      {mostrarOpcionalesExtra
                        ? "Ocultar WhatsApp y nombre de peluquería"
                        : "Agregar WhatsApp y nombre de mi peluquería (opcional)"}
                    </span>
                    {mostrarOpcionalesExtra ? (
                      <ChevronUp
                        className="w-4 h-4 text-gold-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronDown
                        className="w-4 h-4 text-gold-600"
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {mostrarOpcionalesExtra && (
                    <div
                      id={`${idBase}-opcionales`}
                      className="mt-3 pt-3 border-t border-ink-line/15 flex flex-col gap-4 animate-fadeIn"
                    >
                      <CampoTexto
                        id={`${idBase}-whatsapp`}
                        type="tel"
                        etiqueta="Número de WhatsApp (opcional)"
                        ayuda="8 dígitos de Bolivia que empiecen con 6 o 7 (puedes incluir +591)"
                        placeholder="Ej. 71234567"
                        autoComplete="tel"
                        inputMode="tel"
                        error={errors.whatsapp?.message}
                        {...register("whatsapp")}
                      />

                      <CampoTexto
                        id={`${idBase}-empresa`}
                        etiqueta="Nombre de tu peluquería, si tienes"
                        placeholder="Ej. Barbería Central"
                        autoComplete="organization"
                        error={errors.empresa?.message}
                        {...register("empresa")}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 pt-1 text-left">
                  <label
                    htmlFor={`${idBase}-consentimiento`}
                    className="flex items-start gap-3 cursor-pointer select-none group"
                  >
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        id={`${idBase}-consentimiento`}
                        aria-invalid={Boolean(errors.consentimiento)}
                        aria-describedby={
                          errors.consentimiento
                            ? `${idBase}-consentimiento-error`
                            : `${idBase}-consentimiento-ayuda`
                        }
                        className="w-5 h-5 rounded-md border-2 border-ink-line/40 text-gold-500 focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 transition-colors cursor-pointer accent-gold-500 shrink-0"
                        {...register("consentimiento")}
                      />
                    </div>
                    <div className="flex flex-col text-sm text-ink leading-snug">
                      <span className="font-semibold group-hover:text-ink-soft">
                        Acepto que me contacten para la beta y que mis
                        respuestas se usen en un trabajo académico.
                        <span className="text-gold-600 ml-1" aria-hidden="true">
                          *
                        </span>
                      </span>
                      <span
                        id={`${idBase}-consentimiento-ayuda`}
                        className="text-xs text-ink/70 mt-1 leading-relaxed"
                      >
                        Usaremos tus datos solo para contactarte sobre la beta y
                        para un trabajo académico. Puedes pedir que los
                        eliminemos.
                      </span>
                    </div>
                  </label>

                  {errors.consentimiento && (
                    <p
                      id={`${idBase}-consentimiento-error`}
                      role="alert"
                      className="text-xs font-semibold text-red-600 flex items-center gap-1.5 mt-0.5"
                    >
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.consentimiento.message}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <input type="hidden" {...register("origen")} />

        <div
          className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          <label htmlFor={`${idBase}-sitio_web`}>No llenar este campo</label>
          <input
            id={`${idBase}-sitio_web`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("sitio_web")}
          />
        </div>

        {errorEnvio && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3 mt-1"
          >
            <AlertCircle
              className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{errorEnvio}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[50px] px-6 py-3.5 text-base font-bold text-ink bg-gold-500 hover:bg-gold-400 active:bg-gold-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-[0_4px_16px_rgba(242,183,5,0.3)] transition-all flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 cursor-pointer mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Enviando...</span>
            </>
          ) : (
            <span>Quiero participar</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default BetaForm;
