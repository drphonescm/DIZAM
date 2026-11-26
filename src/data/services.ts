export type ServiceId = 'monotributo' | 'responsable-inscripto' | 'creacion-sas';

export interface ServiceDefinition {
  readonly id: ServiceId;
  readonly number: string;
  readonly title: string;
  readonly intro: string;
  readonly homeDescription: string;
  readonly highlights: readonly [string, string];
  readonly items: readonly string[];
  readonly ctaLabel: string;
  readonly whatsappMessage: string;
}

export const serviceCatalog = [
  {
    id: 'monotributo',
    number: '01',
    title: 'Gestión Integral del Monotributo',
    intro: 'Un servicio continuo para ordenar tus obligaciones y saber qué requiere atención en cada etapa del año.',
    homeDescription: 'Acompañamiento, seguimiento y control de tu situación fiscal durante todo el año.',
    highlights: ['Seguimiento mensual', 'ARCA y obligaciones'],
    items: ['Alta y configuración', 'Administración y seguimiento mensual', 'Facturación electrónica', 'Recategorizaciones', 'Gestión ante ARCA', 'Deudas y planes de pago'],
    ctaLabel: 'Consultar por Monotributo',
    whatsappMessage: 'Hola, quisiera consultar por la Gestión Integral del Monotributo.',
  },
  {
    id: 'responsable-inscripto',
    number: '02',
    title: 'Responsable Inscripto',
    intro: 'Acompañamiento contable e impositivo según la actividad y las obligaciones fiscales aplicables.',
    homeDescription: 'Liquidaciones, declaraciones juradas y gestiones fiscales de acuerdo con tu actividad.',
    highlights: ['IVA e Ingresos Brutos', 'Declaraciones juradas'],
    items: ['IVA', 'Ingresos Brutos locales', 'Convenio Multilateral', 'Ganancias', 'Declaraciones juradas', 'Gestiones ante ARCA según corresponda'],
    ctaLabel: 'Consultar por Responsable Inscripto',
    whatsappMessage: 'Hola, quisiera consultar por servicios para Responsable Inscripto.',
  },
  {
    id: 'creacion-sas',
    number: '03',
    title: 'Creación de SAS',
    intro: 'Orientación y coordinación para organizar el proceso de constitución y puesta en funcionamiento.',
    homeDescription: 'Asesoramiento inicial, coordinación de trámites y alta fiscal para iniciar la actividad.',
    highlights: ['Constitución', 'Puesta en funcionamiento'],
    items: ['Asesoramiento inicial', 'Organización del proceso de constitución', 'Coordinación de trámites', 'Alta fiscal', 'Puesta en funcionamiento'],
    ctaLabel: 'Consultar por creación de SAS',
    whatsappMessage: 'Hola, quisiera consultar por la creación de una SAS.',
  },
] as const satisfies readonly ServiceDefinition[];

export const monotributoAreas = [
  {
    number: '01', title: 'Alta y configuración',
    description: 'Alta inicial, elección de actividad, análisis de categoría, configuración fiscal, punto de venta, facturación electrónica y orientación sobre obligaciones.',
  },
  {
    number: '02', title: 'Administración y seguimiento mensual',
    description: 'Control de situación fiscal, vencimientos y obligaciones; revisión de categoría; análisis de evolución y seguimiento de límites de facturación.',
  },
  {
    number: '03', title: 'Facturación electrónica',
    description: 'Asesoramiento sobre comprobantes, control de comprobantes emitidos e ingresos, notas de crédito y débito, e impacto en la categoría.',
  },
  {
    number: '04', title: 'Recategorizaciones',
    description: 'Análisis previo, revisión de ingresos y parámetros, gestión de la recategorización y seguimiento posterior.',
  },
  {
    number: '05', title: 'Gestión ante ARCA',
    description: 'Control del domicilio fiscal electrónico, revisión de notificaciones, presentaciones digitales, seguimiento de trámites y respuesta a requerimientos.',
  },
  {
    number: '06', title: 'Deudas y planes de pago',
    description: 'Consulta y análisis de deuda, generación y seguimiento de planes, control de cuotas, generación y envío de VEP hasta la cancelación.',
  },
] as const;

export function getServiceWhatsAppHref(contact: string | null, message: string): string | null {
  if (!contact) return null;

  try {
    const url = new URL(contact);
    url.searchParams.set('text', message);
    return url.toString();
  } catch {
    return null;
  }
}
