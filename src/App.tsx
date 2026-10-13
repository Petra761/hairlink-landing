import React, { useState, useEffect } from "react";
import { Encabezado } from "./components/sections/Encabezado";
import { Inicio } from "./components/sections/Inicio";
import { Problema } from "./components/sections/Problema";
import { PropuestaValor } from "./components/sections/PropuestaValor";
import { Prototipo } from "./components/sections/Prototipo";
import { ParaQuien } from "./components/sections/ParaQuien";
import { Beneficios } from "./components/sections/Beneficios";
import { Inscripcion } from "./components/sections/Inscripcion";
import { SeccionCuestionario } from "./components/sections/SeccionCuestionario";
import { PiePagina } from "./components/sections/PiePagina";
import { BotonFijo } from "./components/ui/BotonFijo";
import { PaginaCuestionario } from "./components/cuestionario/PaginaCuestionario";

export const App: React.FC = () => {
  // Manejo de ruta simple sin necesidad de librerías externas
  const [rutaActual, setRutaActual] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    const alCambiarRuta = () => setRutaActual(window.location.pathname);
    window.addEventListener("popstate", alCambiarRuta);
    return () => window.removeEventListener("popstate", alCambiarRuta);
  }, []);

  // Si la dirección es /cuestionario, mostramos la página del Formulario B
  if (rutaActual === "/cuestionario" || rutaActual === "/cuestionario/") {
    return <PaginaCuestionario />;
  }

  // Estructura principal de la landing page
  return (
    <div className="min-h-screen bg-ink text-white flex flex-col relative selection:bg-gold-500 selection:text-ink">
      <Encabezado />

      <main className="flex-1 flex flex-col">
        {/* 1. Hero sin formulario invasivo */}
        <Inicio />

        {/* 2. Obstáculos cotidianos del profesional */}
        <Problema />

        {/* 3. Propuesta de valor en 3 pasos */}
        <PropuestaValor />

        {/* 4. Demostración del prototipo 3D */}
        <Prototipo />

        {/* 5. Público objetivo en Tarija */}
        <ParaQuien />

        {/* 6. Beneficios en cuadrícula */}
        <Beneficios />

        {/* 7. ÚNICO Formulario A: Registro a la beta */}
        <Inscripcion />

        {/* 8. Sección invitando al cuestionario de validación anónimo */}
        <SeccionCuestionario />
      </main>

      <PiePagina />
      <BotonFijo />
    </div>
  );
};

export default App;
