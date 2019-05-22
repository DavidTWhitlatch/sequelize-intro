const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'foo_bar_baz',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

class Foo extends Model {}
Foo.init({
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  age: Sequelize.INTEGER
}, { sequelize, modelName: 'foo' })

// class Foo extends Model {
//   getFullName(){
//     return [this.first_name, this.last_name].join(' ');
//   }
// }
// Foo.init({
//   first_name: Sequelize.STRING,
//   last_name: Sequelize.STRING,
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: { isEmail: true }
//   },
//   age: {
//     type: Sequelize.INTEGER,
//     defaultValue: 30
//   }
// }, {
//   createdAt: false,
//   updatedAt: 'updateTimestamp',
//   paranoid: true,
//   sequelize,
//   modelName: 'foo',
//   indexes: [
//     // Create a unique index on email
//     {
//       unique: true,
//       fields: ['email']
//     },
//   ]
// })

const Bar = sequelize.define('bar', {
  example: Sequelize.TEXT
})

class Baz extends Model { }
Baz.init({
  title: Sequelize.STRING
}, { sequelize, modelName: 'baz' })



Foo.hasMany(Bar, {
  onDelete: 'cascade',
})
Bar.belongsTo(Foo);

Bar.hasMany(Baz)
Baz.belongsTo(Bar);

Foo.belongsToMany(Baz, { through: "foo_baz" });
Baz.belongsToMany(Foo, { through: "foo_baz" });

// await Foo.sync()
// await Bar.sync()
// await sequelize.sync();
// await sequelize.sync({force: true}) 

module.exports = {
  sequelize,
  Foo,
  Bar,
  Baz
}