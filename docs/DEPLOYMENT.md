# Deployment

En Vercel: importar el repositorio, usar framework Astro, comando `npm run build` y salida `dist`. Mantener `noindex` mientras sea demo. `astro.config.mjs` conserva el valor temporal de `site`; definir el dominio final antes de retirar `noindex`.
