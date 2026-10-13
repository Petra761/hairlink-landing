import { z } from "zod";
import {
  SERVICIOS_PELUQUERIA,
  MODALIDADES_TRABAJO_CUESTIONARIO,
  METODOS_AGENDA,
  FRECUENCIAS_CLIENTE_SE_VA,
  FRECUENCIAS_CAMBIO_LOCAL,
  RETENCIONES_CAMBIO_LOCAL,
  FUNCIONES_UTILES,
} from "../types/cuestionario";

/**
 * Esquema de validación en Zod 4 para el cuestionario anónimo de validación.
 */
export const esquemaCuestionario = z.object({
  // 1. Tu situación
  servicios: z
    .array(z.enum(SERVICIOS_PELUQUERIA))
    .min(1, { error: "Selecciona al menos un servicio" }),

  experiencia_anios: z
    .number({ error: () => "Indica tus años de experiencia" })
    .int()
    .min(0, { error: "Debe ser un número válido" })
    .max(60, { error: "Indica un número razonable" }),

  modalidad_trabajo: z.enum(MODALIDADES_TRABAJO_CUESTIONARIO, {
    error: () => "Selecciona cómo trabajas actualmente",
  }),

  clientes_semana: z
    .number({ error: () => "Indica un aproximado de clientes por semana" })
    .int()
    .min(1, { error: "Debe ser al menos 1 cliente" })
    .max(500, { error: "Indica un número razonable" }),

  // 2. Cómo manejas las citas hoy
  metodos_agenda: z
    .array(z.enum(METODOS_AGENDA))
    .min(1, {
      error: "Selecciona al menos una forma en la que agendan tus clientes",
    }),

  app_actual_detalle: z.string().trim().max(300).optional(),

  // 3. El problema
  frecuencia_cliente_se_va: z.enum(FRECUENCIAS_CLIENTE_SE_VA, {
    error: () => "Selecciona con qué frecuencia ocurre",
  }),

  frecuencia_cambio_local: z.enum(FRECUENCIAS_CAMBIO_LOCAL, {
    error: () => "Selecciona con qué frecuencia te trasladas",
  }),

  retencion_cambio_local: z.enum(RETENCIONES_CAMBIO_LOCAL).optional(),

  dificultad_clientes: z.string().trim().max(300).optional(),

  // 4. Tu interés
  interes_app: z
    .number({ error: () => "Indica qué tan probable es que la uses" })
    .int()
    .min(1)
    .max(5),

  funciones_utiles: z
    .array(z.enum(FUNCIONES_UTILES))
    .min(1, { error: "Elige al menos 1 función" })
    .max(3, { error: "Puedes elegir hasta 3 funciones como máximo" }),

  preocupacion_uso: z.string().trim().max(300).optional(),

  // 5. Disposición de pago
  precio_mensual_bs: z
    .number({ error: () => "Indica un monto en Bs (pon 0 si no pagarías)" })
    .min(0, { error: "El monto no puede ser negativo" })
    .max(1000, { error: "Indica un monto realista" }),

  requisito_para_pagar: z.string().trim().max(300).optional(),

  // 6. Consentimiento
  consentimiento: z.boolean().refine((val) => val === true, {
    error: "Debes aceptar el uso académico anónimo para enviar",
  }),

  origen: z.string(),

  // Trampa antispam honeypot
  sitio_web: z.string().optional(),
});

export type ValoresFormularioCuestionario = z.infer<typeof esquemaCuestionario>;
