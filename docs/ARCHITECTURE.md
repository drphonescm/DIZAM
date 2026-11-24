# Arquitectura

Astro genera HTML estático. `src/data/studio.ts` separa contenido comercial de presentación. Los componentes son Astro islands mínimas: menú móvil, formulario demo y animaciones GSAP en el documento. CSS Scroll Snap se usa como base sin scroll hijacking.
