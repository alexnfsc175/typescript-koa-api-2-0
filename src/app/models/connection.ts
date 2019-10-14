import { Sequelize, Options } from 'sequelize';

import { configDatabase } from '../../environments';

const getConection = (config: Options): Sequelize => {
    const { database, username, password } = config;
    return new Sequelize(database || '', username || '', password, config);
};

export const sequelize = getConection(configDatabase);
