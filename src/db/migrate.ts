import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { join } from 'path';

// Get user data path from environment
const userDataPath = process.env.APPDATA || (
  process.platform === 'darwin' 
    ? join(process.env.HOME || '', 'Library/Application Support') 
    : join(process.env.HOME || '', '.config')
);

const dbPath = join(userDataPath, 'FertiCalc', 'ferticalc.db');
const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

// Run migrations
async function main() {
  console.log('Running migrations...');
  
  await migrate(db, {
    migrationsFolder: './drizzle'
  });

  console.log('Migrations complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed!');
  console.error(err);
  process.exit(1);
});