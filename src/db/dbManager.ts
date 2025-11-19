import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { join } from 'path';
import { app } from 'electron';
import { migrateSync } from 'drizzle-orm/better-sqlite3/migrator';
import { eq, desc } from 'drizzle-orm';
import * as schema from './schema';

export class DbManager {
  private static instance: DbManager;
  private db: ReturnType<typeof drizzle>;
  private sqlite: Database.Database;

  private constructor() {
    const dbPath = join(app.getPath('userData'), 'ferticalc.db');
    this.sqlite = new Database(dbPath);
    this.db = drizzle(this.sqlite, { schema });
    
    // Aplicar migraciones
    migrateSync(this.db, {
      migrationsFolder: join(__dirname, 'migrations')
    });
  }

  public static getInstance(): DbManager {
    if (!DbManager.instance) {
      DbManager.instance = new DbManager();
    }
    return DbManager.instance;
  }

  public getDb() {
    return this.db;
  }

  public async close() {
    await this.sqlite.close();
  }

  // Métodos de utilidad para manejar transacciones
  public async transaction<T>(callback: (tx: any) => Promise<T>): Promise<T> {
    return this.sqlite.transaction(callback)();
  }

  // Sales y sus relaciones
  public async getSales() {
    return this.db.select().from(schema.sal);
  }

  public async getSalById(id: number) {
    return this.db.select().from(schema.sal).where(eq(schema.sal.id, id));
  }

  public async getIonesBySalId(salId: number) {
    return this.db.select().from(schema.salIon).where(eq(schema.salIon.salId, salId));
  }

  public async getPreciosBySalId(salId: number) {
    return this.db.select().from(schema.precioSaldo)
      .where(eq(schema.precioSaldo.salId, salId))
      .orderBy(desc(schema.precioSaldo.fecha));
  }

  public async getLotesBySalId(salId: number) {
    return this.db.select().from(schema.stockLote)
      .where(eq(schema.stockLote.salId, salId))
      .orderBy(desc(schema.stockLote.fechaAlta));
  }

  // Sectores y Campañas
  public async getSectores() {
    return this.db.select().from(schema.sector);
  }

  public async getCampaniasBySectorId(sectorId: number) {
    return this.db.select().from(schema.campania)
      .where(eq(schema.campania.sectorId, sectorId))
      .orderBy(desc(schema.campania.fechaInicio));
  }

  public async getObjetivosByCampania(campaniaId: number) {
    return this.db.select().from(schema.objetivoPpm)
      .where(eq(schema.objetivoPpm.campaniaId, campaniaId));
  }

  // Formulaciones
  public async getFormulacionesByCampania(campaniaId: number) {
    return this.db.select().from(schema.formulacion)
      .where(eq(schema.formulacion.campaniaId, campaniaId))
      .orderBy(desc(schema.formulacion.fecha));
  }

  public async getFormulacionById(id: number) {
    const formulacion = await this.db.select().from(schema.formulacion)
      .where(eq(schema.formulacion.id, id));

    if (!formulacion) return null;

    // Obtener sales y resultados
    const sales = await this.db.select().from(schema.formulacionSal)
      .where(eq(schema.formulacionSal.formulacionId, id));
      
    const resultados = await this.db.select().from(schema.formulacionIonResult)
      .where(eq(schema.formulacionIonResult.formulacionId, id));

    return {
      ...formulacion,
      sales,
      resultados
    };
  }

  // Alertas
  public async getAlertasNoAck() {
    return this.db.select().from(schema.alerta)
      .where(eq(schema.alerta.ack, 0))
      .orderBy(desc(schema.alerta.fecha));
  }

  public async setAlertaAck(id: number) {
    return this.db.update(schema.alerta)
      .set({ ack: 1 })
      .where(eq(schema.alerta.id, id));
  }

  // Contenedores
  public async getContenedoresBySector(sectorId: number) {
    return this.db.select().from(schema.contenedor)
      .where(eq(schema.contenedor.sectorId, sectorId));
  }
}