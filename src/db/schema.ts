import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Tablas principales
export const sal = sqliteTable('sal', {
  id: integer('id').primaryKey(),
  nombre: text('nombre').notNull(),
  formula: text('formula'),
  notas: text('notas'),
});

export const salIon = sqliteTable('sal_ion', {
  id: integer('id').primaryKey(),
  salId: integer('sal_id').references(() => sal.id),
  ion: text('ion').notNull(),
  fraccionIonPorGramo: real('fraccion_ion_por_gramo').notNull(),
  ajustePorPureza: real('ajuste_por_pureza').default(1),
});

export const precioSaldo = sqliteTable('precio_saldo', {
  id: integer('id').primaryKey(),
  salId: integer('sal_id').references(() => sal.id),
  fecha: text('fecha').notNull(),
  precioUsdKg: real('precio_usd_kg').notNull(),
});

export const stockLote = sqliteTable('stock_lote', {
  id: integer('id').primaryKey(),
  salId: integer('sal_id').references(() => sal.id),
  lote: text('lote').notNull(),
  purezaPct: real('pureza_pct').notNull(),
  kgDisponibles: real('kg_disponibles').notNull(),
  fechaAlta: text('fecha_alta').notNull(),
  costoUsdKg: real('costo_usd_kg').notNull(),
});

export const sector = sqliteTable('sector', {
  id: integer('id').primaryKey(),
  nombre: text('nombre').notNull(),
  volumenReservorioL: real('volumen_reservorio_l'),
  notas: text('notas'),
});

export const campania = sqliteTable('campania', {
  id: integer('id').primaryKey(),
  sectorId: integer('sector_id').references(() => sector.id),
  nombre: text('nombre').notNull(),
  fechaInicio: text('fecha_inicio').notNull(),
  fechaFin: text('fecha_fin'),
  estadoFenoInicial: text('estado_feno_inicial').notNull(),
  estadoFenoFinal: text('estado_feno_final'),
});

export const objetivoPpm = sqliteTable('objetivo_ppm', {
  id: integer('id').primaryKey(),
  campaniaId: integer('campania_id').references(() => campania.id),
  sectorId: integer('sector_id').references(() => sector.id),
  estadoFeno: text('estado_feno').notNull(),
  ion: text('ion').notNull(),
  ppmObjetivo: real('ppm_objetivo').notNull(),
  toleranciaPct: real('tolerancia_pct').default(10),
});

export const formulacion = sqliteTable('formulacion', {
  id: integer('id').primaryKey(),
  fecha: text('fecha').notNull(),
  sectorId: integer('sector_id').references(() => sector.id),
  campaniaId: integer('campania_id').references(() => campania.id),
  volumenL: real('volumen_l').notNull(),
  ecObjetivoMsCm: real('ec_objetivo_ms_cm'),
  ecEstimadaMsCm: real('ec_estimada_ms_cm').notNull(),
  ecMedidaMsCm: real('ec_medida_ms_cm'),
  costoTotal: real('costo_total').notNull(),
});

export const formulacionSal = sqliteTable('formulacion_sal', {
  id: integer('id').primaryKey(),
  formulacionId: integer('formulacion_id').references(() => formulacion.id),
  salId: integer('sal_id').references(() => sal.id),
  gramos: real('gramos').notNull(),
});

export const formulacionIonResult = sqliteTable('formulacion_ion_result', {
  id: integer('id').primaryKey(),
  formulacionId: integer('formulacion_id').references(() => formulacion.id),
  ion: text('ion').notNull(),
  ppmLogrado: real('ppm_logrado').notNull(),
});

export const alerta = sqliteTable('alerta', {
  id: integer('id').primaryKey(),
  fecha: text('fecha').notNull(),
  tipo: text('tipo').notNull(),
  referenciaId: text('referencia_id'),
  mensaje: text('mensaje').notNull(),
  ack: integer('ack').default(0),
});

export const contenedor = sqliteTable('contenedor', {
  id: integer('id').primaryKey(),
  nombre: text('nombre').notNull(),
  volumenL: real('volumen_l'),
  tipo: text('tipo').notNull(),
  sectorId: integer('sector_id').references(() => sector.id),
  notas: text('notas'),
});