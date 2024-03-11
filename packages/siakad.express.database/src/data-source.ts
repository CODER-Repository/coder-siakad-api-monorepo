import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 6432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'coder-siakad',
    synchronize: false,
    logging: true,
    entities: [
        __dirname + '/entities/**/*.entity.{js,ts}',
        __dirname + '/views/**/*.view.{js,ts}'
    ],
    migrations: [],
    connectTimeoutMS: 5000,
    useUTC: true,
    maxQueryExecutionTime: 5000
});
