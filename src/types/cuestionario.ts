/**
 * Opciones para los servicios brindados por el peluquero/barbero.
 */
export const SERVICIOS_PELUQUERIA = [
  "Corte",
  "Barba",
  "Lavado",
  "Tintes",
  "Peinados",
  "Otro",
] as const;

export type ServicioPeluqueria = (typeof SERVICIOS_PELUQUERIA)[number];

/**
 * Modalidad laboral del profesional.
 */
export const MODALIDADES_TRABAJO_CUESTIONARIO = [
  "En una peluquería pagando alquiler",
  "En una peluquería como empleado",
  "Independiente o a domicilio",
  "Tengo mi propio local",
] as const;

export type ModalidadTrabajoCuestionario =
  (typeof MODALIDADES_TRABAJO_CUESTIONARIO)[number];

/**
 * Métodos de coordinación de citas actuales.
 */
export const METODOS_AGENDA = [
  "Llegan sin aviso",
  "WhatsApp",
  "Llamadas",
  "Cuaderno o papel",
  "Aplicación",
  "Otro",
] as const;

export type MetodoAgenda = (typeof METODOS_AGENDA)[number];

/**
 * Opciones de frecuencia del problema de fuga de clientes.
 */
export const FRECUENCIAS_CLIENTE_SE_VA = [
  "Nunca",
  "Rara vez",
  "A veces",
  "Seguido",
  "Casi todos los días",
] as const;

export type FrecuenciaClienteSeVa = (typeof FRECUENCIAS_CLIENTE_SE_VA)[number];

/**
 * Frecuencia de cambio de salón o local.
 */
export const FRECUENCIAS_CAMBIO_LOCAL = [
  "Nunca",
  "Alguna vez",
  "Cada año o menos",
  "Varias veces al año",
] as const;

export type FrecuenciaCambioLocal = (typeof FRECUENCIAS_CAMBIO_LOCAL)[number];

/**
 * Proporción de clientes que siguen al peluquero tras una mudanza.
 */
export const RETENCIONES_CAMBIO_LOCAL = [
  "Casi ninguno",
  "Menos de la mitad",
  "La mitad",
  "La mayoría",
] as const;

export type RetencionCambioLocal = (typeof RETENCIONES_CAMBIO_LOCAL)[number];

/**
 * Funcionalidades hipotéticas más valoradas (máximo 3).
 */
export const FUNCIONES_UTILES = [
  "Agenda con disponibilidad visible",
  "Recordatorios",
  "Perfil con fotos",
  "Clientes nuevos",
  "Reseñas",
  "Que mis clientes me sigan si cambio de local",
] as const;

export type FuncionUtil = (typeof FUNCIONES_UTILES)[number];

/**
 * Estructura de respuestas anónimas del cuestionario de validación.
 * Nótese la ausencia deliberada de datos de contacto (nombre, email, teléfono).
 */
export interface RespuestasCuestionario {
  // 1. Tu situación
  servicios: ServicioPeluqueria[];
  experiencia_anios: number;
  modalidad_trabajo: ModalidadTrabajoCuestionario;
  clientes_semana: number;

  // 2. Cómo manejas las citas hoy
  metodos_agenda: MetodoAgenda[];
  app_actual_detalle?: string;

  // 3. El problema
  frecuencia_cliente_se_va: FrecuenciaClienteSeVa;
  frecuencia_cambio_local: FrecuenciaCambioLocal;
  retencion_cambio_local?: RetencionCambioLocal;
  dificultad_clientes?: string;

  // 4. Tu interés
  interes_app: number;
  funciones_utiles: FuncionUtil[];
  preocupacion_uso?: string;

  // 5. Disposición de pago
  precio_mensual_bs: number;
  requisito_para_pagar?: string;

  // 6. Cierre
  consentimiento: boolean;
  origen: string;
}

export type ResultadoEnvioCuestionario =
  | { ok: true }
  | { ok: false; motivo: "red" | "desconocido" };
