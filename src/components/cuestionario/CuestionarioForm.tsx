import React, { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle, Check, ArrowLeft } from "lucide-react";
import type {
  ServicioPeluqueria,
  MetodoAgenda,
  FuncionUtil,
} from "../../types/cuestionario";
import {
  SERVICIOS_PELUQUERIA,
  MODALIDADES_TRABAJO_CUESTIONARIO,
  METODOS_AGENDA,
  FRECUENCIAS_CLIENTE_SE_VA,
  FRECUENCIAS_CAMBIO_LOCAL,
  RETENCIONES_CAMBIO_LOCAL,
  FUNCIONES_UTILES,
} from "../../types/cuestionario";
import {
  esquemaCuestionario,
  type ValoresFormularioCuestionario,
} from "../../lib/validacionCuestionario";
import { limpiarParametroOrigen } from "../../lib/validacionInscripcion";
import { enviarCuestionario } from "../../lib/enviarCuestionario";

export const CuestionarioForm: React.FC = () => {
  const idBase = useId();
  const [completado, setCompletado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaCuestionario),
    mode: "onTouched",
    defaultValues: {
      servicios: [] as ServicioPeluqueria[],
      metodos_agenda: [] as MetodoAgenda[],
      app_actual_detalle: "",
      dificultad_clientes: "",
      funciones_utiles: [] as FuncionUtil[],
      preocupacion_uso: "",
      requisito_para_pagar: "",
      consentimiento: false,
      origen: parametroOrigen,
      sitio_web: "",
    },
  });

  const serviciosSeleccionados = watch("servicios") || [];
  const metodosSeleccionados = watch("metodos_agenda") || [];
  const funcionesSeleccionadas = watch("funciones_utiles") || [];
  const modalidadSeleccionada = watch("modalidad_trabajo");
  const frecSeVaSeleccionada = watch("frecuencia_cliente_se_va");
  const frecCambioSeleccionada = watch("frecuencia_cambio_local");
  const retencionSeleccionada = watch("retencion_cambio_local");
  const interesSeleccionado = watch("interes_app");

  const alternarServicio = (valor: ServicioPeluqueria) => {
    const actuales = (watch("servicios") || []) as ServicioPeluqueria[];
    const nuevos = actuales.includes(valor)
      ? actuales.filter((item) => item !== valor)
      : [...actuales, valor];
    setValue("servicios", nuevos, { shouldValidate: true });
  };

  const alternarMetodo = (valor: MetodoAgenda) => {
    const actuales = (watch("metodos_agenda") || []) as MetodoAgenda[];
    const nuevos = actuales.includes(valor)
      ? actuales.filter((item) => item !== valor)
      : [...actuales, valor];
    setValue("metodos_agenda", nuevos, { shouldValidate: true });
  };

  const alternarFuncion = (valor: FuncionUtil, maximo = 3) => {
    const actuales = (watch("funciones_utiles") || []) as FuncionUtil[];
    if (actuales.includes(valor)) {
      setValue(
        "funciones_utiles",
        actuales.filter((item) => item !== valor),
        { shouldValidate: true },
      );
    } else {
      if (actuales.length >= maximo) return;
      setValue("funciones_utiles", [...actuales, valor], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (valores: ValoresFormularioCuestionario) => {
    setErrorEnvio(null);

    if (valores.sitio_web && valores.sitio_web.trim().length > 0) {
      setCompletado(true);
      return;
    }

    try {
      const res = await enviarCuestionario({
        servicios: valores.servicios,
        experiencia_anios: valores.experiencia_anios,
        modalidad_trabajo: valores.modalidad_trabajo,
        clientes_semana: valores.clientes_semana,
        metodos_agenda: valores.metodos_agenda,
        app_actual_detalle: valores.app_actual_detalle?.trim() || undefined,
        frecuencia_cliente_se_va: valores.frecuencia_cliente_se_va,
        frecuencia_cambio_local: valores.frecuencia_cambio_local,
        retencion_cambio_local: valores.retencion_cambio_local || undefined,
        dificultad_clientes: valores.dificultad_clientes?.trim() || undefined,
        interes_app: valores.interes_app,
        funciones_utiles: valores.funciones_utiles,
        preocupacion_uso: valores.preocupacion_uso?.trim() || undefined,
        precio_mensual_bs: valores.precio_mensual_bs,
        requisito_para_pagar: valores.requisito_para_pagar?.trim() || undefined,
        consentimiento: valores.consentimiento,
        origen: valores.origen || "",
      });

      if (res.ok) {
        setCompletado(true);
      } else {
        setErrorEnvio(
          "No pudimos guardar tus respuestas. Revisa tu conexión e inténtalo de nuevo.",
        );
      }
    } catch {
      setErrorEnvio("Ocurrió un error inesperado al enviar las respuestas.");
    }
  };

  if (completado) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white rounded-3xl p-8 sm:p-12 border border-ink-line/20 shadow-xl text-center max-w-2xl mx-auto"
      >
        <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-600 border border-gold-400/50 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 stroke-[2.5]" aria-hidden="true" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-ink tracking-tight mb-3">
          Gracias por ayudarnos
        </h2>
        <p className="text-base text-ink-soft/80 leading-relaxed mb-8">
          Tus respuestas son totalmente anónimas y nos ayudan a diseñar una
          herramienta adecuada para los profesionales de Tarija. Si aún no te
          inscribiste en la beta, puedes hacerlo aquí:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/#inscripcion"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 active:bg-gold-600 text-ink font-bold text-base transition-colors shadow-sm"
          >
            Inscribirme a la beta
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink-soft/5 hover:bg-ink-soft/10 text-ink font-semibold text-base transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver a la página principal
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-ink rounded-3xl p-6 sm:p-10 border border-ink-line/20 shadow-xl max-w-3xl mx-auto text-left">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        {/* PARTE 1: TU SITUACIÓN */}
        <section
          aria-labelledby={`${idBase}-bloque-situacion`}
          className="flex flex-col gap-6"
        >
          <div className="border-b border-ink-line/15 pb-3">
            <span className="text-xs font-bold text-gold-600 tracking-wider uppercase">
              Parte 1 de 5
            </span>
            <h3
              id={`${idBase}-bloque-situacion`}
              className="text-2xl font-black text-ink"
            >
              Tu situación
            </h3>
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-ink mb-1">
              Servicios que ofreces <span className="text-gold-600">*</span>
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SERVICIOS_PELUQUERIA.map((serv) => {
                const activo = serviciosSeleccionados.includes(serv);
                return (
                  <button
                    type="button"
                    key={serv}
                    onClick={() => alternarServicio(serv)}
                    className={`py-3 px-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer select-none ${
                      activo
                        ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                        : "bg-white text-ink border-ink-line/30 hover:border-gold-500/50"
                    }`}
                  >
                    <span>{serv}</span>
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        activo
                          ? "bg-ink border-ink text-gold-400"
                          : "border-ink-line/40"
                      }`}
                    >
                      {activo && <Check className="w-3 h-3 stroke-3" />}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.servicios && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.servicios.message}</span>
              </p>
            )}
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${idBase}-anios`}
              className="text-sm font-bold text-ink"
            >
              Años trabajando como peluquero o barbero{" "}
              <span className="text-gold-600">*</span>
            </label>
            <input
              id={`${idBase}-anios`}
              type="number"
              min="0"
              placeholder="Ej. 4"
              className="w-full min-h-12 px-3.5 py-2.5 text-base text-ink bg-white rounded-xl border border-ink-line/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none"
              {...register("experiencia_anios", { valueAsNumber: true })}
            />
            {errors.experiencia_anios && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.experiencia_anios.message}</span>
              </p>
            )}
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-ink mb-1">
              Cómo trabajas <span className="text-gold-600">*</span>
            </legend>
            <div className="flex flex-col gap-2">
              {MODALIDADES_TRABAJO_CUESTIONARIO.map((mod) => {
                const activo = modalidadSeleccionada === mod;
                return (
                  <label
                    key={mod}
                    className={`p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer select-none ${
                      activo
                        ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                        : "bg-white text-ink border-ink-line/30 hover:border-gold-500/50"
                    }`}
                  >
                    <span>{mod}</span>
                    <input
                      type="radio"
                      value={mod}
                      className="sr-only"
                      {...register("modalidad_trabajo")}
                    />
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        activo ? "border-ink bg-ink" : "border-ink-line/40"
                      }`}
                    >
                      {activo && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.modalidad_trabajo && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.modalidad_trabajo.message}</span>
              </p>
            )}
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${idBase}-clientes-sem`}
              className="text-sm font-bold text-ink"
            >
              Clientes que atiendes en una semana normal{" "}
              <span className="text-gold-600">*</span>
            </label>
            <input
              id={`${idBase}-clientes-sem`}
              type="number"
              min="1"
              placeholder="Ej. 35"
              className="w-full min-h-12 px-3.5 py-2.5 text-base text-ink bg-white rounded-xl border border-ink-line/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none"
              {...register("clientes_semana", { valueAsNumber: true })}
            />
            {errors.clientes_semana && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.clientes_semana.message}</span>
              </p>
            )}
          </div>
        </section>

        {/* PARTE 2: CÓMO MANEJAS LAS CITAS HOY */}
        <section
          aria-labelledby={`${idBase}-bloque-citas`}
          className="flex flex-col gap-6"
        >
          <div className="border-b border-ink-line/15 pb-3">
            <span className="text-xs font-bold text-gold-600 tracking-wider uppercase">
              Parte 2 de 5
            </span>
            <h3
              id={`${idBase}-bloque-citas`}
              className="text-2xl font-black text-ink"
            >
              Cómo manejas las citas hoy
            </h3>
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-ink mb-1">
              Cómo agendas a tus clientes (marca todas las que apliquen){" "}
              <span className="text-gold-600">*</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {METODOS_AGENDA.map((metodo) => {
                const activo = metodosSeleccionados.includes(metodo);
                return (
                  <button
                    type="button"
                    key={metodo}
                    onClick={() => alternarMetodo(metodo)}
                    className={`py-3 px-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer select-none ${
                      activo
                        ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                        : "bg-white text-ink border-ink-line/30 hover:border-gold-500/50"
                    }`}
                  >
                    <span>{metodo}</span>
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        activo
                          ? "bg-ink border-ink text-gold-400"
                          : "border-ink-line/40"
                      }`}
                    >
                      {activo && <Check className="w-3 h-3 stroke-3" />}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.metodos_agenda && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.metodos_agenda.message}</span>
              </p>
            )}
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${idBase}-app-detalle`}
              className="text-sm font-bold text-ink"
            >
              Si usas una aplicación, ¿cuál y qué no te gusta?{" "}
              <span className="text-xs text-ink/60 font-normal">
                (Opcional)
              </span>
            </label>
            <textarea
              id={`${idBase}-app-detalle`}
              rows={2}
              placeholder="Ej. Uso Google Calendar pero mis clientes no pueden verla..."
              className="w-full p-3.5 text-base text-ink bg-white rounded-xl border border-ink-line/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none resize-none"
              {...register("app_actual_detalle")}
            />
          </div>
        </section>

        {/* PARTE 3: EL PROBLEMA */}
        <section
          aria-labelledby={`${idBase}-bloque-problema`}
          className="flex flex-col gap-6"
        >
          <div className="border-b border-ink-line/15 pb-3">
            <span className="text-xs font-bold text-gold-600 tracking-wider uppercase">
              Parte 3 de 5
            </span>
            <h3
              id={`${idBase}-bloque-problema`}
              className="text-2xl font-black text-ink"
            >
              El problema
            </h3>
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-ink mb-1">
              Con qué frecuencia un cliente llega cuando estás ocupado y se va{" "}
              <span className="text-gold-600">*</span>
            </legend>
            <div className="flex flex-col gap-1.5">
              {FRECUENCIAS_CLIENTE_SE_VA.map((frec) => {
                const activo = frecSeVaSeleccionada === frec;
                return (
                  <label
                    key={frec}
                    className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer select-none ${
                      activo
                        ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                        : "bg-white text-ink border-ink-line/30 hover:border-gold-500/50"
                    }`}
                  >
                    <span>{frec}</span>
                    <input
                      type="radio"
                      value={frec}
                      className="sr-only"
                      {...register("frecuencia_cliente_se_va")}
                    />
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        activo ? "border-ink bg-ink" : "border-ink-line/40"
                      }`}
                    >
                      {activo && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.frecuencia_cliente_se_va && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.frecuencia_cliente_se_va.message}</span>
              </p>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-ink mb-1">
              Con qué frecuencia cambias de local{" "}
              <span className="text-gold-600">*</span>
            </legend>
            <div className="flex flex-col gap-1.5">
              {FRECUENCIAS_CAMBIO_LOCAL.map((frec) => {
                const activo = frecCambioSeleccionada === frec;
                return (
                  <label
                    key={frec}
                    className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer select-none ${
                      activo
                        ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                        : "bg-white text-ink border-ink-line/30 hover:border-gold-500/50"
                    }`}
                  >
                    <span>{frec}</span>
                    <input
                      type="radio"
                      value={frec}
                      className="sr-only"
                      {...register("frecuencia_cambio_local")}
                    />
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        activo ? "border-ink bg-ink" : "border-ink-line/40"
                      }`}
                    >
                      {activo && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.frecuencia_cambio_local && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.frecuencia_cambio_local.message}</span>
              </p>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-ink mb-1">
              Qué parte de tus clientes te sigue cuando cambias de local{" "}
              <span className="text-xs text-ink/60 font-normal">
                (Opcional)
              </span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {RETENCIONES_CAMBIO_LOCAL.map((ret) => {
                const activo = retencionSeleccionada === ret;
                return (
                  <label
                    key={ret}
                    className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer select-none ${
                      activo
                        ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                        : "bg-white text-ink border-ink-line/30 hover:border-gold-500/50"
                    }`}
                  >
                    <span>{ret}</span>
                    <input
                      type="radio"
                      value={ret}
                      className="sr-only"
                      {...register("retencion_cambio_local")}
                    />
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        activo ? "border-ink bg-ink" : "border-ink-line/40"
                      }`}
                    >
                      {activo && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${idBase}-dif-clientes`}
              className="text-sm font-bold text-ink"
            >
              Tu mayor dificultad para conseguir o mantener clientes{" "}
              <span className="text-xs text-ink/60 font-normal">
                (Opcional)
              </span>
            </label>
            <textarea
              id={`${idBase}-dif-clientes`}
              rows={2}
              placeholder="Ej. Cuando abro otro horario o me ausento unos días..."
              className="w-full p-3.5 text-base text-ink bg-white rounded-xl border border-ink-line/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none resize-none"
              {...register("dificultad_clientes")}
            />
          </div>
        </section>

        {/* PARTE 4: TU INTERÉS */}
        <section
          aria-labelledby={`${idBase}-bloque-interes`}
          className="flex flex-col gap-6"
        >
          <div className="border-b border-ink-line/15 pb-3">
            <span className="text-xs font-bold text-gold-600 tracking-wider uppercase">
              Parte 4 de 5
            </span>
            <h3
              id={`${idBase}-bloque-interes`}
              className="text-2xl font-black text-ink"
            >
              Tu interés
            </h3>
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-ink mb-1">
              Qué tan probable es que uses una app donde tus clientes ven tu
              disponibilidad y reservan <span className="text-gold-600">*</span>
            </legend>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((num) => {
                const activo = Number(interesSeleccionado) === num;
                return (
                  <button
                    type="button"
                    key={num}
                    onClick={() =>
                      setValue("interes_app", num, { shouldValidate: true })
                    }
                    className={`p-3 rounded-xl border text-lg font-black min-h-12 flex items-center justify-center cursor-pointer transition-all select-none ${
                      activo
                        ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                        : "bg-white text-ink border-ink-line/30 hover:border-gold-500/50"
                    }`}
                  >
                    <span>{num}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-ink/70 font-semibold px-1">
              <span>1 = Nada probable</span>
              <span>5 = Muy probable</span>
            </div>
            {errors.interes_app && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.interes_app.message}</span>
              </p>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="text-sm font-bold text-ink mb-1">
              Qué te serviría más (elige hasta 3 opciones){" "}
              <span className="text-gold-600">*</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FUNCIONES_UTILES.map((func) => {
                const activo = funcionesSeleccionadas.includes(func);
                return (
                  <button
                    type="button"
                    key={func}
                    onClick={() => alternarFuncion(func, 3)}
                    className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between text-left cursor-pointer select-none ${
                      activo
                        ? "bg-gold-500 text-ink border-gold-600 shadow-sm"
                        : "bg-white text-ink border-ink-line/30 hover:border-gold-500/50"
                    }`}
                  >
                    <span className="pr-2">{func}</span>
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        activo
                          ? "bg-ink border-ink text-gold-400"
                          : "border-ink-line/40"
                      }`}
                    >
                      {activo && <Check className="w-3 h-3 stroke-3" />}
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-ink/60">
              Seleccionadas: {funcionesSeleccionadas.length} de 3
            </span>
            {errors.funciones_utiles && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.funciones_utiles.message}</span>
              </p>
            )}
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${idBase}-preocupacion`}
              className="text-sm font-bold text-ink"
            >
              Qué te preocuparía de usarla{" "}
              <span className="text-xs text-ink/60 font-normal">
                (Opcional)
              </span>
            </label>
            <textarea
              id={`${idBase}-preocupacion`}
              rows={2}
              placeholder="Ej. Que sea difícil de usar para mis clientes mayores..."
              className="w-full p-3.5 text-base text-ink bg-white rounded-xl border border-ink-line/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none resize-none"
              {...register("preocupacion_uso")}
            />
          </div>
        </section>

        {/* PARTE 5: DISPOSICIÓN DE PAGO */}
        <section
          aria-labelledby={`${idBase}-bloque-pago`}
          className="flex flex-col gap-6"
        >
          <div className="border-b border-ink-line/15 pb-3">
            <span className="text-xs font-bold text-gold-600 tracking-wider uppercase">
              Parte 5 de 5
            </span>
            <h3
              id={`${idBase}-bloque-pago`}
              className="text-2xl font-black text-ink"
            >
              Disposición de pago
            </h3>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${idBase}-precio`}
              className="text-sm font-bold text-ink"
            >
              Cuántos Bs al mes pagarías por una versión completa (pon 0 si no
              pagarías) <span className="text-gold-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/60 font-bold text-sm">
                Bs
              </span>
              <input
                id={`${idBase}-precio`}
                type="number"
                min="0"
                placeholder="0"
                className="w-full min-h-12 pl-10 pr-3.5 py-2.5 text-base text-ink bg-white rounded-xl border border-ink-line/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none"
                {...register("precio_mensual_bs", { valueAsNumber: true })}
              />
            </div>
            {errors.precio_mensual_bs && (
              <p
                role="alert"
                className="text-xs font-semibold text-red-600 flex items-center gap-1"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.precio_mensual_bs.message}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${idBase}-requisito-pago`}
              className="text-sm font-bold text-ink"
            >
              Qué tendría que ofrecer para que pagaras{" "}
              <span className="text-xs text-ink/60 font-normal">
                (Opcional)
              </span>
            </label>
            <textarea
              id={`${idBase}-requisito-pago`}
              rows={2}
              placeholder="Ej. Recordatorios automáticos por WhatsApp..."
              className="w-full p-3.5 text-base text-ink bg-white rounded-xl border border-ink-line/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none resize-none"
              {...register("requisito_para_pagar")}
            />
          </div>
        </section>

        {/* CONSENTIMIENTO Y ENVÍO */}
        <div className="pt-4 border-t border-ink-line/20 flex flex-col gap-6">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-ink-line/40 text-gold-500 focus:ring-2 focus:ring-gold-500 accent-gold-500 shrink-0 mt-0.5"
              {...register("consentimiento")}
            />
            <div className="text-sm text-ink leading-snug">
              <span className="font-semibold">
                Acepto que mis respuestas anónimas se usen en un trabajo
                académico.
                <span className="text-gold-600 ml-1">*</span>
              </span>
              <p className="text-xs text-ink/65 mt-1">
                No recopilamos tu nombre, teléfono ni ningún dato que permita
                identificarte.
              </p>
            </div>
          </label>
          {errors.consentimiento && (
            <p
              role="alert"
              className="text-xs font-semibold text-red-600 flex items-center gap-1 -mt-3"
            >
              <AlertCircle
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{errors.consentimiento.message}</span>
            </p>
          )}

          <div
            className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden opacity-0 pointer-events-none"
            aria-hidden="true"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("sitio_web")}
            />
          </div>

          {errorEnvio && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5"
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
            className="w-full min-h-[50px] px-6 py-3.5 text-base font-bold text-ink bg-gold-500 hover:bg-gold-400 active:bg-gold-600 disabled:opacity-60 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>Enviando respuestas...</span>
              </>
            ) : (
              <span>Enviar cuestionario anónimo</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
