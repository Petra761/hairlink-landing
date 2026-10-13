/**
 * Opciones disponibles para la modalidad de trabajo del profesional.
 */
export type OpcionPerfil =
  | "Peluquero en una peluquería"
  | "Peluquero independiente"
  | "Dueño de una peluquería"
  | "Otro";

/**
 * Opciones para la dificultad principal identificada en el día a día.
 */
export type OpcionNecesidad =
  | "Clientes que se van cuando estoy ocupado"
  | "Coordinar citas por WhatsApp o llamadas"
  | "Perder clientes al cambiar de local"
  | "Conseguir clientes nuevos"
  | "Otra";

/**
 * Estructura de los datos depurados que se envían al backend o base de datos.
 * Los nombres en snake_case coinciden con las columnas de la tabla.
 */
export interface DatosInscripcion {
  nombre: string;
  correo: string;
  perfil: OpcionPerfil;
  necesidad: OpcionNecesidad;
  interes: number;
  whatsapp?: string;
  empresa?: string;
  consentimiento: boolean;
  origen: string;
}

/**
 * Respuesta devuelta por la función de envío de inscripción.
 */
export type ResultadoEnvio =
  | { ok: true }
  | { ok: false; motivo: "duplicado" | "red" | "desconocido" };
