import { Sequelize, Op, Model, DataTypes, Defferable } from "sequelize";

// const sequelize = new Sequelize("sqlite::memory:");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:')
// const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname"); // Example for postgres

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

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
/* 
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
  {
    freezeTableName: true,
  },
  {
    timestamps: false,
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

class Userextends Model {}

User.init(
  {
// Тут визначаються атрибути моделі
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
// Тут визначаються інші налаштування моделі
    sequelize,// Екземпляр підключення (обов'язково)
    modelName: 'User',// Назва моделі (обов'язково)
  }
)

console.log(User === sequelize.models.User)// true
// Повертається проміс
await User.sync({ force: true })
console.log('Таблиця для моделі `User` щойно наново була створена!')

const sequelize = new Sequelize('sqlite::memory:', {
  // Choose one of the logging options
  logging: console.log, // Default, displays the first parameter of the log function call
  logging: (...msg) => console.log(msg), // Displays all log function call parameters
  logging: false, // Disables logging
  logging: msg => logger.debug(msg), // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
  logging: logger.debug.bind(logger), // Alternative way to use custom logger, displays all messages
});
 */

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

// Створюємо модель для користувача з наступними атрибутами
const User = sequelize.define("User", {
  // ім'я
  name: DataTypes.STRING,
  // улюблений колір — за замовчуванням зелений
  favouriteColor: {
    type: DataTypes.STRING,
    defaultValue: "green",
  },
  // вік
  age: DataTypes.INTEGER,
  // гроші
  cash: DataTypes.INTEGER,
});

(async () => {
  // Пересоздаємо таблицю в БД
  await sequelize.sync({ force: true });
  // подальший код
})();

// Створюємо об'єкт
const jane = User.build({ name: "Jane" });
// та зберігаємо його до БД
await jane.save();

// Скорочений варіант
const jane = await User.create({ name: "Jane" });
console.log(jane.toJSON());
console.log(JSON.stringify(jane, null, 2));

const john = await User.create({ name: "John" });
// Вносимо зміни
john.name = "Bob";
// та оновлюємо відповідний запис до БД
await john.save();

await john.destroy();

const john = await User.create({ name: "John" });
john.name = "Bob";

// Перезавантаження екземпляра призводить до скидання всіх полів до дефолтних значень
await john.reload();
console.log(john.name); // John

const john = await User.create({ name: "John" });
john.name = "Bob";
john.favouriteColor = "blue";
// Зберігаємо лише зміну імені
await john.save({ fields: ["name"] });

await john.reload();
console.log(john.name); // Bob
//Зміну кольору не було зафіксовано
console.log(john.favouriteColor); // green

const john = await User.create({ name: "John", age: 98 });

const incrementResult = await john.increment("age", { by: 2 });
// При збільшенні значення на 1, налаштування `by` можна опустити — increment('age')

// Оновлений користувач буде повернутий тільки в `postres`, в інших БД він матиме значення `undefined`.

const john = await User.create({ name: "John", age: 98, cash: 1000 });

await john.increment({
  age: 2,
  cash: 500,
});
// Також є можливість автоматичного зменшення значень полів (decrement()).
