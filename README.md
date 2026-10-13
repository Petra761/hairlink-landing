<div align="center">

# HairLink

**Tu agenda y tus clientes te siguen, aunque cambies de local.**

Landing page de validación para peluqueros y barberos de Tarija, Bolivia.

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel" />
</p>
</div>

---

## Acerca del proyecto

HairLink es una plataforma pensada para que los peluqueros tengan un perfil profesional y una agenda con su disponibilidad visible, y para que los clientes encuentren a su peluquero y reserven sin tener que consultarle.

Este repositorio contiene **solo la landing page**. Su objetivo es doble:

1. Presentar la propuesta y captar peluqueros interesados en una prueba piloto (beta).
2. Recoger, mediante un cuestionario breve, información real para validar el problema y el valor de la aplicación.

> Proyecto académico en etapa de validación. La aplicación completa aún no está construida.

---

## Tecnologías

| Área          | Herramienta                        |
| ------------- | ---------------------------------- |
| Interfaz      | React con TypeScript, sobre Vite   |
| Estilos       | Tailwind CSS                       |
| Formularios   | React Hook Form y Zod (validación) |
| Base de datos | Supabase (PostgreSQL)              |
| Publicación   | Vercel                             |

---

## Requisitos

- Node.js 20.19 o superior (o 22.12 o superior)
- npm
- Git

---

## Puesta en marcha

```bash
# Clonar el repositorio e ingresar a la carpeta
git clone https://github.com/TU_USUARIO/hairlink-landing.git
cd hairlink-landing

# Instalar las dependencias
npm install

# Crear el archivo de variables de entorno a partir de la plantilla
cp .env.example .env

# Iniciar el servidor de desarrollo (http://localhost:5173)
npm run dev
```

---

## Variables de entorno

Se definen en el archivo `.env`, que no se sube al repositorio.

| Variable                        | Descripción                             |
| ------------------------------- | --------------------------------------- |
| `VITE_SUPABASE_URL`             | URL del proyecto de Supabase            |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave pública (publishable) de Supabase |

Todo lo que empieza con `VITE_` queda visible en el navegador. Por eso aquí solo se usan claves públicas y **nunca** la clave `service_role` ni ninguna clave privada.

---

## Scripts disponibles

| Comando           | Función                                     |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo            |
| `npm run build`   | Genera la versión de producción             |
| `npm run preview` | Muestra localmente la versión de producción |
| `npm run lint`    | Revisa el código con ESLint                 |

---

## Estructura del proyecto

```text
src/
  components/
    sections/   Secciones de la landing (inicio, problema, beneficios, etc.)
    form/       Formulario de inscripción y cuestionario
  lib/          Utilidades y cliente de Supabase
  types/        Tipos de TypeScript compartidos
```

---

## Estado

- [x] Entorno de desarrollo configurado
- [ ] Contenido y diseño de la landing
- [ ] Formulario con validación
- [ ] Conexión con Supabase
- [ ] Publicación en Vercel

---

## Privacidad

El formulario recoge datos de contacto y respuestas de un cuestionario con el consentimiento expreso de cada participante. Los datos se usan únicamente para contactar a los interesados en la beta y para fines académicos.
