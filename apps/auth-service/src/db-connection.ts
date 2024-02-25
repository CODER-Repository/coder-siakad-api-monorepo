import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 6432,
    username: 'postgres',
    password: 'postgres',
    database: 'coder-siakad',
    synchronize: true,
    logging: false,
    entities: [
        'src/models/**/*.ts',
    ],
    migrations: [
        'src/migrations/**/*.ts',
    ],
    subscribers: [
        'src/subscribers/**/*.ts',
    ]
});


// import { Pool } from 'pg';

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'coder-siakad',
//     password: 'postgres',
//     port: 6432,
// });

// export default {
//     query: (text, params) => pool.query(text, params),
//     pool,
// }