import type {
  RespuestasCuestionario,
  ResultadoEnvioCuestionario,
} from "../types/cuestionario";
import { obtenerClienteSupabase, textoONulo } from "./supabase";
import { limpiarParametroOrigen } from "./validacionInscripcion";

export async function enviarCuestionario(
  respuestas: RespuestasCuestionario,
): Promise<ResultadoEnvioCuestionario> {
  const supabase = obtenerClienteSupabase();
  if (!supabase) return { ok: false, motivo: "desconocido" };

  // Se envía campo por campo (sin copiar el objeto completo) para que nunca
  // viaje a la base de datos algo que no sea una columna de la tabla,
  // como el campo trampa contra spam. Las listas viajan como arreglos de texto.
  const fila = {
    servicios: respuestas.servicios,
    experiencia_anios: respuestas.experiencia_anios,
    modalidad_trabajo: respuestas.modalidad_trabajo,
    clientes_semana: respuestas.clientes_semana,
    metodos_agenda: respuestas.metodos_agenda,
    app_actual_detalle: textoONulo(respuestas.app_actual_detalle),
    frecuencia_cliente_se_va: respuestas.frecuencia_cliente_se_va,
    frecuencia_cambio_local: respuestas.frecuencia_cambio_local,
    retencion_cambio_local: respuestas.retencion_cambio_local ?? null,
    dificultad_clientes: textoONulo(respuestas.dificultad_clientes),
    interes_app: respuestas.interes_app,
    funciones_utiles: respuestas.funciones_utiles,
    preocupacion_uso: textoONulo(respuestas.preocupacion_uso),
    // La columna admite dos decimales
    precio_mensual_bs: Math.round(respuestas.precio_mensual_bs * 100) / 100,
    requisito_para_pagar: textoONulo(respuestas.requisito_para_pagar),
    consentimiento: respuestas.consentimiento,
    origen: limpiarParametroOrigen(respuestas.origen),
  };

  try {
    // Solo se inserta: no se piden datos de vuelta
    const { error } = await supabase
      .from("respuestas_cuestionario_validacion")
      .insert(fila);

    if (!error) return { ok: true };

    // Sin código de error suele significar que la petición no llegó al servidor
    if (!error.code) return { ok: false, motivo: "red" };

    return { ok: false, motivo: "desconocido" };
  } catch {
    // Fallo de conexión antes de obtener respuesta
    return { ok: false, motivo: "red" };
  }
}
