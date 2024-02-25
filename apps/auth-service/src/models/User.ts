import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {
    public user_id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'user',
});

export default User;

