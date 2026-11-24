export type ServiceId = 'altas' | 'bajas' | 'monotributo' | 'iva';

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
    id: 'altas',
    number: '01',
    title: 'Nuevos contribuyentes',
    intro: 'Poné en marcha tu actividad con una inscripción ordenada y acorde a tu situación fiscal.',
    homeDescription: 'Altas impositivas para empezar tu actividad.',
    highlights: ['Monotributo y Autónomos', 'CUIT e impuestos'],
    items: [
      'Inscripción en Monotributo',
      'Alta en el régimen de Autónomos',
      'Trámite de alta de CUIT',
      'Inscripción en impuestos nacionales',
      'Alta en Ingresos Brutos',
      'Orientación inicial según la actividad',
    ],
    ctaLabel: 'Consultar por un alta',
    whatsappMessage: 'Hola, quisiera consultar por el alta de una actividad.',
  },
  {
    id: 'bajas',
    number: '02',
    title: 'Baja de contribuyentes',
    intro: 'Revisá los pasos para cerrar una actividad y ordenar las obligaciones relacionadas con el cese.',
    homeDescription: 'Cierre de actividad y revisión de obligaciones pendientes.',
    highlights: ['Bajas impositivas', 'Revisión de deuda'],
    items: [
      'Baja de Monotributo o Autónomos',
      'Baja de CUIT',
      'Cese en Ingresos Brutos',
      'Revisión de deuda previa al cierre',
      'Regularización de obligaciones pendientes',
    ],
    ctaLabel: 'Consultar por una baja',
    whatsappMessage: 'Hola, quisiera consultar por la baja de mi actividad.',
  },
  {
    id: 'monotributo',
    number: '03',
    title: 'Planes Monotributo',
    intro: 'Acompañamiento para revisar tu situación y dar seguimiento a las obligaciones del Monotributo.',
    homeDescription: 'Seguimiento, recategorizaciones y gestión de obligaciones.',
    highlights: ['Recategorizaciones', 'Deuda y planes ARCA'],
    items: [
      'Seguimiento mensual de la situación',
      'Recategorizaciones',
      'Control de facturación',
      'Consulta del estado de deuda',
      'Gestión de planes de pago ante ARCA',
      'Gestión de Ingresos Brutos',
      'Asesoramiento permanente',
    ],
    ctaLabel: 'Consultar por Monotributo',
    whatsappMessage: 'Hola, quisiera consultar por asesoramiento de Monotributo.',
  },
  {
    id: 'iva',
    number: '04',
    title: 'Planes para inscriptos en IVA',
    intro: 'Asistencia contable e impositiva para responsables inscriptos y las obligaciones de su actividad.',
    homeDescription: 'Liquidaciones y seguimiento para responsables inscriptos.',
    highlights: ['Liquidaciones de IVA', 'Seguimiento fiscal'],
    items: [
      'Liquidaciones mensuales de IVA',
      'Liquidaciones impositivas anuales',
      'Control y seguimiento fiscal',
      'Asesoramiento sobre obligaciones impositivas',
      'Análisis de la situación fiscal',
      'Planificación impositiva básica',
    ],
    ctaLabel: 'Consultar por IVA',
    whatsappMessage: 'Hola, quisiera consultar por asesoramiento para responsables inscriptos en IVA.',
  },
] as const satisfies readonly ServiceDefinition[];

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
