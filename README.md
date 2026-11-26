# Grupo Norte | Servicios Contables e Impositivos

Demo comercial estática para Grupo Norte, construida con Astro, TypeScript, Tailwind CSS 4, GSAP y Lucide. La home presenta cinco escenas; `/monotributo/` desarrolla el servicio principal y `/servicios/` organiza el catálogo comercial. La marca permanece en `noindex` hasta definir el dominio final.

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

La demo usa `noindex, nofollow` y el formulario, cuando se utilice, solo muestra una confirmación local sin enviar datos. Las variantes oficiales de Grupo Norte están en `public/branding/`; el isotipo se utiliza como favicon.

## Arquitectura

Los datos comerciales viven en `src/data/studio.ts`; los componentes visuales están en `src/components/`, la página en `src/pages/` y los tokens en `src/styles/global.css`.

## Pendientes de producción

Validar prestaciones, matrícula y biografía, revisar los datos de contacto, definir textos legales y dominio definitivo, y conectar el formulario. El dominio final debe definirse antes de retirar `noindex`.
