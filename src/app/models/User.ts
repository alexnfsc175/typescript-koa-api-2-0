import { Model, DataTypes } from 'sequelize';

import { sequelize } from './connection';

export class User extends Model {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;
    public email!: string; // for nullable fields
    public passwordHash!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            unique: true,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize,
        timestamps: true,
        // não permite deletar do banco, mas inseri na coluna deletedAt a data da exclusão
        // se o timestamps estiver ativado
        // paranoid: true,

        // não adiciona camelcase para atributos gerados automaticamente
        // então se definirmos updatedAt ele será criado como updated_at
        // underscored: true,
    },
);
