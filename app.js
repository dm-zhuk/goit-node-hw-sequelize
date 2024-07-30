import { Sequelize, DataTypes } from "sequelize";

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:')
const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname"); // Example for postgres

// Option 2: Passing parameters separately (sqlite)
/* const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
}); */

// Option 3: Passing parameters separately (other dialects)
/* const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'  // * one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'
}); */

const User = sequelize.define(
  "User",
  {
    // Тут визначаються атрибути моделі
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull за замовчуванням має значення true
    },
  },
  {
    // Тут визначаються інші налаштування моделі
  }
);

// `sequelize.define` повертає модель
console.log(User === sequelize.models.User); // true

sequelize.define(
  "User",
  {
    // ...
  },
  {
    freezeTableName: true,
  }
);

sequelize.close();
