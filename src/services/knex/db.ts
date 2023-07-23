// https://knexjs.org/guide/schema-builder.html#createtablelike

import { Knex, knex } from 'knex';
import path from 'path';

import LoginHistoryEntry from './models/loginHistoryEntry';
import User from './models/user';

export const db = knex({
  client: 'better-sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve('./src/services/databases/database.db'),
  },
});

export const getUsers = (): Knex.QueryBuilder<User, User[]> => db('users');
export const getLoginHistory = (): Knex.QueryBuilder<LoginHistoryEntry, LoginHistoryEntry[]> => db('loginHistory');

export const initializeTables = async () => {
  try {
    const user = await db.schema.hasTable('users');
    const loginHistory = await db.schema.hasTable('loginHistory');
    if (!user) {
      await db.schema.createTable('users', table => {
        table.increments('id', { primaryKey: true });
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.integer('age').defaultTo(1);
        table.string('gender').defaultTo('other');
        table.integer('points').defaultTo(100);
        table.integer('leastSwitches').defaultTo(-1);
        table.boolean('isAdmin').defaultTo(false);
      });
    }

    if (!loginHistory) {
      await db.schema.createTable('loginHistory', table => {
        table.increments('id', { primaryKey: true });
        table.string('username').notNullable();
        table.bigInteger('date').notNullable();
        table.boolean('successful').notNullable();
      });
    }
  } catch (error) {
    //@ts-ignore
    console.error(error?.message);
  }
};
