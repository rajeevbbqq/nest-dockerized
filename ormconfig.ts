import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [__dirname + '/src/entities/*.entity.ts'],
  migrations: [__dirname + '/src/entities/migrations/*.ts'],
  subscribers: [],
  migrationsTransactionMode: 'each',
  logger: 'advanced-console',
});

export const initializeConnection = async () => {
  const { isInitialized } = AppDataSource;

  if (!isInitialized) {
    return await AppDataSource.initialize();
  }

  console.log('Reusing existing connection');
  return AppDataSource;
};
