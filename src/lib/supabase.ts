import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente único de Supabase para toda la página.
 *
 * Solo usa la clave PÚBLICA (publishable). Esa clave puede verse en el
 * navegador sin riesgo porque las tablas solo permiten insertar (ver las
 * políticas de seguridad por fila en la base de datos). Nunca se debe colocar
 * aquí la clave "service_role" ni ninguna clave privada.
 */
let cliente: SupabaseClient | null = null;

export function obtenerClienteSupabase(): SupabaseClient | null {
  // Se reutiliza el mismo cliente en todos los envíos
  if (cliente) return cliente;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const clave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  // Si faltan las variables, no se rompe la página: los formularios mostrarán
  // el aviso de error de envío y aquí queda el motivo en la consola.
  if (!url || !clave) {
    console.error(
      "Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY en las variables de entorno.",
    );
    return null;
  }

  cliente = createClient(url, clave, {
    // La landing no usa sesiones de usuario, así que se desactivan
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return cliente;
}

/**
 * Convierte un texto vacío o solo con espacios en null, para que los
 * campos opcionales queden vacíos en la base de datos en lugar de guardar "".
 */
export function textoONulo(valor?: string | null): string | null {
  const limpio = valor?.trim();
  return limpio ? limpio : null;
}
