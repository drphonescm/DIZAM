# DIZAM Estudio Contable

Demo comercial estática para DIZAM, construida con Astro, TypeScript, Tailwind CSS 4, GSAP y Lucide. La experiencia presenta cinco escenas: inicio, servicios, confianza, estudio y contacto.

## Instalación

```bash
npm install
npm run dev
```

## Verificación y build

```bash
npm run check
npm run build
```

La demo usa `noindex, nofollow`, no contiene datos de contacto inventados y el formulario muestra una confirmación local sin enviar datos. El logo oficial puede incorporarse en `public/branding/`.

## Arquitectura

Los datos comerciales viven en `src/data/studio.ts`; los componentes visuales están en `src/components/`, la página en `src/pages/` y los tokens en `src/styles/global.css`.

## Pendientes de producción

Validar servicios, matrícula, biografía, fotografía, dirección, email, teléfono, WhatsApp, textos legales, dominio definitivo y conexión del formulario. Configurar el repositorio GitHub y el proyecto Vercel cuando existan credenciales/autorización.
