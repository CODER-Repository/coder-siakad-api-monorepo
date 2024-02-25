import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('coder-siakad', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    port: 6432,
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
    },
});

export default sequelize;
