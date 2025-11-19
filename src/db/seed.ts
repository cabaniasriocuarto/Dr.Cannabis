import { DbManager } from './dbManager';
import * as schema from './schema';

async function seed() {
  const db = DbManager.getInstance().getDb();

  // Insertar sales comunes
  await db.insert(schema.sal).values([
    { id: 1, nombre: 'Nitrato de Calcio', formula: 'Ca(NO3)2' },
    { id: 2, nombre: 'Nitrato de Potasio', formula: 'KNO3' },
    { id: 3, nombre: 'Sulfato de Magnesio', formula: 'MgSO4' },
    { id: 4, nombre: 'Fosfato Monopotásico', formula: 'KH2PO4' },
    { id: 5, nombre: 'Nitrato de Magnesio', formula: 'Mg(NO3)2' },
    { id: 6, nombre: 'Sulfato de Potasio', formula: 'K2SO4' },
  ]);

  // Insertar iones por sal
  await db.insert(schema.salIon).values([
    // Nitrato de Calcio
    { salId: 1, ion: 'Ca', fraccionIonPorGramo: 0.17 },
    { salId: 1, ion: 'NO3', fraccionIonPorGramo: 0.12 },

    // Nitrato de Potasio
    { salId: 2, ion: 'K', fraccionIonPorGramo: 0.38 },
    { salId: 2, ion: 'NO3', fraccionIonPorGramo: 0.13 },

    // Sulfato de Magnesio
    { salId: 3, ion: 'Mg', fraccionIonPorGramo: 0.098 },
    { salId: 3, ion: 'SO4', fraccionIonPorGramo: 0.39 },

    // Fosfato Monopotásico
    { salId: 4, ion: 'K', fraccionIonPorGramo: 0.28 },
    { salId: 4, ion: 'P', fraccionIonPorGramo: 0.23 },

    // Nitrato de Magnesio
    { salId: 5, ion: 'Mg', fraccionIonPorGramo: 0.092 },
    { salId: 5, ion: 'NO3', fraccionIonPorGramo: 0.11 },

    // Sulfato de Potasio
    { salId: 6, ion: 'K', fraccionIonPorGramo: 0.41 },
    { salId: 6, ion: 'SO4', fraccionIonPorGramo: 0.17 },
  ]);

  // Insertar precios de ejemplo
  const fechaHoy = new Date().toISOString().split('T')[0];
  await db.insert(schema.precioSaldo).values([
    { salId: 1, fecha: fechaHoy, precioUsdKg: 2.5 },
    { salId: 2, fecha: fechaHoy, precioUsdKg: 3.0 },
    { salId: 3, fecha: fechaHoy, precioUsdKg: 1.8 },
    { salId: 4, fecha: fechaHoy, precioUsdKg: 4.2 },
    { salId: 5, fecha: fechaHoy, precioUsdKg: 2.8 },
    { salId: 6, fecha: fechaHoy, precioUsdKg: 3.5 },
  ]);

  // Insertar sector de ejemplo
  await db.insert(schema.sector).values([
    { 
      id: 1, 
      nombre: 'Sector 1', 
      volumenReservorioL: 1000,
      notas: 'Sector de prueba'
    }
  ]);

  // Insertar contenedores de ejemplo
  await db.insert(schema.contenedor).values([
    {
      id: 1,
      nombre: 'Tanque A',
      volumenL: 100,
      tipo: 'CONCENTRADO',
      sectorId: 1,
      notas: 'Sales de calcio'
    },
    {
      id: 2,
      nombre: 'Tanque B',
      volumenL: 100,
      tipo: 'CONCENTRADO',
      sectorId: 1,
      notas: 'Sales sin calcio'
    }
  ]);

  // Insertar campaña de ejemplo
  await db.insert(schema.campania).values([
    {
      id: 1,
      sectorId: 1,
      nombre: 'Campaña 2023 Q4',
      fechaInicio: fechaHoy,
      estadoFenoInicial: 'VEG',
    }
  ]);

  // Insertar objetivos PPM de ejemplo
  await db.insert(schema.objetivoPpm).values([
    // Vegetativo
    { campaniaId: 1, sectorId: 1, estadoFeno: 'VEG', ion: 'N', ppmObjetivo: 200 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'VEG', ion: 'P', ppmObjetivo: 50 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'VEG', ion: 'K', ppmObjetivo: 200 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'VEG', ion: 'Ca', ppmObjetivo: 150 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'VEG', ion: 'Mg', ppmObjetivo: 50 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'VEG', ion: 'S', ppmObjetivo: 65 },
    
    // Floración
    { campaniaId: 1, sectorId: 1, estadoFeno: 'FLO', ion: 'N', ppmObjetivo: 150 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'FLO', ion: 'P', ppmObjetivo: 70 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'FLO', ion: 'K', ppmObjetivo: 250 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'FLO', ion: 'Ca', ppmObjetivo: 150 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'FLO', ion: 'Mg', ppmObjetivo: 60 },
    { campaniaId: 1, sectorId: 1, estadoFeno: 'FLO', ion: 'S', ppmObjetivo: 80 },
  ]);
}

seed().catch(console.error);