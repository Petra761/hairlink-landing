import { z } from "zod";
import type { OpcionPerfil, OpcionNecesidad } from "../types/inscripcion";

/**
 * Listado constante de opciones para el perfil de trabajo.
 */
export const OPCIONES_PERFIL: readonly [OpcionPerfil, ...OpcionPerfil[]] = [
  "Peluquero en una peluquería",
  "Peluquero independiente",
  "Dueño de una peluquería",
  "Otro",
];

/**
 * Listado constante de opciones para la mayor dificultad.
 */
export const OPCIONES_NECESIDAD: readonly [
  OpcionNecesidad,
  ...OpcionNecesidad[],
] = [
  "Clientes que se van cuando estoy ocupado",
  "Coordinar citas por WhatsApp o llamadas",
  "Perder clientes al cambiar de local",
  "Conseguir clientes nuevos",
  "Otra",
];

/**
 * Normaliza un número de celular de Bolivia:
 * Extrae solo los dígitos y el signo +, y remueve el prefijo +591 o 591.
 * Expresión regular limpia sin escapes innecesarios.
 */
export function normalizarWhatsapp(valor?: string | null): string {
  if (!valor) return "";
  const soloNumerosYMas = valor.replace(/[^\d+]/g, "");
  return soloNumerosYMas.replace(/^(\+?591)/, "");
}

/**
 * Limpia y desinfecta el parámetro de recomendación/origen.
 * Solo permite caracteres alfanuméricos, guiones bajos y guiones comunes.
 */
export function limpiarParametroOrigen(ref?: string | null): string {
  if (!ref) return "";
  return ref.replace(/[^\w-]/g, "").slice(0, 50);
}

/**
 * Esquema de validación con Zod 4 para el formulario de inscripción a la beta.
 * Mantiene tipos simétricos de entrada y salida para compatibilidad con @hookform/resolvers 5.
 */
export const esquemaInscripcion = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, { error: "Escribe tu nombre (mínimo 2 letras)" })
    .max(80, { error: "El nombre no puede superar los 80 caracteres" }),

  correo: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { error: "Escribe un correo válido" })
    .email({ error: "Escribe un correo válido" }),

  perfil: z.enum(OPCIONES_PERFIL, {
    error: () => "Elige cómo trabajas",
  }),

  necesidad: z.enum(OPCIONES_NECESIDAD, {
    error: () => "Elige tu mayor dificultad",
  }),

  interes: z
    .number({ error: () => "Indica qué tan probable es que lo uses" })
    .int()
    .min(1, { error: "Indica qué tan probable es que lo uses" })
    .max(5, { error: "Indica qué tan probable es que lo uses" }),

  whatsapp: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const norm = normalizarWhatsapp(val);
        return /^[67]\d{7}$/.test(norm);
      },
      { error: "El WhatsApp debe tener 8 dígitos y empezar con 6 o 7" },
    ),

  empresa: z
    .string()
    .trim()
    .max(80, { error: "Máximo 80 caracteres" })
    .optional(),

  consentimiento: z.boolean().refine((val) => val === true, {
    error: "Debes aceptar para continuar",
  }),

  origen: z.string(),

  sitio_web: z.string().optional(),
});

/**
 * Tipo inferido de los valores validados del formulario.
 */
export type ValoresFormularioInscripcion = z.infer<typeof esquemaInscripcion>;
