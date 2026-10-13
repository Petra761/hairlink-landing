import type { DatosInscripcion, ResultadoEnvio } from "../types/inscripcion";
import { obtenerClienteSupabase, textoONulo } from "./supabase";
import {
  limpiarParametroOrigen,
  normalizarWhatsapp,
} from "./validacionInscripcion";

export async function enviarInscripcion(
  datos: DatosInscripcion,
): Promise<ResultadoEnvio> {
  const supabase = obtenerClienteSupabase();
  if (!supabase) return { ok: false, motivo: "desconocido" };

  // Se arma la fila con los nombres exactos de las columnas de la tabla.
  // Aunque el formulario ya limpia los datos, aquí se repite la limpieza
  // para no depender de lo que haga cada pantalla.
  const fila = {
    nombre: datos.nombre.trim(),
    correo: datos.correo.trim().toLowerCase(),
    perfil: datos.perfil,
    necesidad: datos.necesidad,
    interes: datos.interes,
    whatsapp: textoONulo(normalizarWhatsapp(datos.whatsapp)),
    empresa: textoONulo(datos.empresa),
    consentimiento: datos.consentimiento,
    origen: limpiarParametroOrigen(datos.origen),
  };

  try {
    // Solo se inserta: la tabla no permite leer, así que no se pide la fila de vuelta
    const { error } = await supabase.from("beta_inscritos").insert(fila);

    if (!error) return { ok: true };

    // 23505 es el código de Postgres para "valor único repetido":
    // el índice único del correo detectó una inscripción duplicada
    if (error.code === "23505") return { ok: false, motivo: "duplicado" };

    // Sin código de error suele significar que la petición no llegó al servidor
    if (!error.code) return { ok: false, motivo: "red" };

    return { ok: false, motivo: "desconocido" };
  } catch {
    // Fallo de conexión antes de obtener respuesta
    return { ok: false, motivo: "red" };
  }
}
