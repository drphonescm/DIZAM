# Arquitectura

Astro genera HTML estático. `src/data/studio.ts` guarda identidad y datos del profesional; `src/data/services.ts` define las tres ofertas comerciales y las seis áreas de la Gestión Integral del Monotributo.

- `/`: cinco escenas con CSS Scroll Snap: presentación, servicio principal, servicios complementarios, David Díaz y cierre comercial.
- `/monotributo/`: página editorial extensa, sin scroll snapping, con detalle del servicio, reportes, ejemplo ilustrativo y proceso de acompañamiento.
- `/servicios/`: catálogo conservado con Monotributo como oferta principal y Responsable Inscripto y Creación de SAS como complementarias.

El menú móvil es una interacción cliente pequeña; GSAP y ScrollTrigger animan la home respetando `prefers-reduced-motion`. El formulario de demostración no envía datos.
