import type {
  RespuestasCuestionario,
  ResultadoEnvioCuestionario,
} from "../types/cuestionario";

/**
 * Función provisional para guardar respuestas anónimas de validación.
 *
 * NOTA DE ARQUITECTURA:
 * Esta función guardará en una tabla de Supabase INDEPENDIENTE a la de suscripciones beta
 * (por ejemplo: `respuestas_cuestionario_validacion`). No registra ni almacena datos
 * de contacto personal.
 */
export async function enviarCuestionario(
  respuestas: RespuestasCuestionario,
): Promise<ResultadoEnvioCuestionario> {
  // Simulación de latencia de red de unos 700 ms
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Simulación de error si el campo origen contiene la palabra "error"
  if (respuestas.origen === "error") {
    return { ok: false, motivo: "red" };
  }

  return { ok: true };
}
