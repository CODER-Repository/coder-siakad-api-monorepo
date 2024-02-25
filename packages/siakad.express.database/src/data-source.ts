import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [__dirname + '/entities/**/*.entity.{js,ts}'],
    migrations: []
});
