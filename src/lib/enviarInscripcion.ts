import type { DatosInscripcion, ResultadoEnvio } from "../types/inscripcion";

/**
 * Función provisional para registrar una inscripción a la beta de HairLink.
 *
 * NOTA DE ARQUITECTURA:
 * Esta función es provisional y simula el tiempo de respuesta de red.
 * Será reemplazada en una fase posterior por la integración real con Supabase.
 * La firma de esta función (parámetro DatosInscripcion y retorno Promise<ResultadoEnvio>)
 * debe mantenerse inalterada para no acoplar la interfaz de usuario con la base de datos.
 */
export async function enviarInscripcion(
  datos: DatosInscripcion,
): Promise<ResultadoEnvio> {
  // Simulación de latencia de red de aproximadamente 800 ms
  await new Promise((resolve) => setTimeout(resolve, 800));

  const correoNormalizado = datos.correo.trim().toLowerCase();

  // Caso de prueba temporal: simula colisión de correo duplicado
  if (correoNormalizado === "duplicado@prueba.com") {
    return { ok: false, motivo: "duplicado" };
  }

  // Caso de prueba temporal: simula fallo de conexión a Internet
  if (correoNormalizado === "error@prueba.com") {
    return { ok: false, motivo: "red" };
  }

  // En cualquier otro caso, se considera una inscripción exitosa
  return { ok: true };
}
