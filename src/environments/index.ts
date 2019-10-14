import { config, DotenvParseOutput } from 'dotenv';
import { Options, Dialect } from 'sequelize';

const { parsed } = config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

export const environment: DotenvParseOutput = {
    ...parsed,
};

export const configDatabase: Options = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT as Dialect,
    storage: './__tests__/database.sqlite',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        schema: process.env.DB_SCHEMA,
    },
};
