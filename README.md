# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Sequelize Intro

## Getting started

Required NPM packages for Sequelize:

```bash

npm install sequelize pg

```

In order for Sequelize to work with a Postgresq base, we also need to install `pg` and `pg-hstore`

## [Instance Constructor](http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)

### Example

```js

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'foo_bar_baz',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

```

When instantiating a new instance of Sequelize, we need to define the database name as `database` and the language for our DB as `dialect`. The value for `define` sets default options for all of our tables. `underscored`, when set to true, will make our table names snake case.

## [Models](http://docs.sequelizejs.com/manual/models-definition.html)

There are two ways to define a model to interact with our DB tables. We can either extend the `Model` class from Sequelize or use a built in method for sequelize called `.define`

### Example 1

```js

class Foo extends Model {}
Foo.init({
  example: Sequelize.TEXT
}, { sequelize, modelName: 'foo' })

```


In our first example, we first define a new class that inherits from `Model`. We can also define custom methods for our class inside the `{}` after `Model`.

Then we use the `.init` method which takes two arguments. The first, is an object to define our column attributes. Here is a list of different data types that we can use:

[Data Types](http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes)
<details>
<summary>Examples</summary>

```js

Sequelize.STRING                      // VARCHAR(255)
Sequelize.STRING(1234)                // VARCHAR(1234)
Sequelize.STRING.BINARY               // VARCHAR BINARY
Sequelize.TEXT                        // TEXT
Sequelize.TEXT('tiny')                // TINYTEXT
Sequelize.CITEXT                      // CITEXT      PostgreSQL and SQLite only.

Sequelize.INTEGER                     // INTEGER
Sequelize.BIGINT                      // BIGINT
Sequelize.BIGINT(11)                  // BIGINT(11)

Sequelize.FLOAT                       // FLOAT
Sequelize.FLOAT(11)                   // FLOAT(11)
Sequelize.FLOAT(11, 10)               // FLOAT(11,10)

Sequelize.REAL                        // REAL        PostgreSQL only.
Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.

Sequelize.DOUBLE                      // DOUBLE
Sequelize.DOUBLE(11)                  // DOUBLE(11)
Sequelize.DOUBLE(11, 10)              // DOUBLE(11,10)

Sequelize.DECIMAL                     // DECIMAL
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)

Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
Sequelize.DATEONLY                    // DATE without time.
Sequelize.BOOLEAN                     // TINYINT(1)

Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
Sequelize.ARRAY(Sequelize.ENUM)       // Defines an array of ENUM. PostgreSQL only.

Sequelize.JSON                        // JSON column. PostgreSQL, SQLite and MySQL only.
Sequelize.JSONB                       // JSONB column. PostgreSQL only.

Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)

Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)

Sequelize.CIDR                        // CIDR datatype for PostgreSQL
Sequelize.INET                        // INET datatype for PostgreSQL
Sequelize.MACADDR                     // MACADDR datatype for PostgreSQL

Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.

Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.

Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT')           // Spatial column with geometry type. PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geometry type and SRID.  PostgreSQL (with PostGIS) or MySQL only.

```

</details>

The second, argument is an object of options for our table. In our example, we include which instance of Sequelize we are using (e.x. `sequelize`). Also the table name as `modelName`. Sequelize uses an external npm package for pluralizing table names called [inflection](https://www.npmjs.com/package/inflection)

### Example 2

```js

const Foo = sequelize.define('foo', {
  example: Sequelize.TEXT
})

```

In example 2, `.define` can take three arguments. The table name, the table attributes and table options, in that order.

## [Validations](http://docs.sequelizejs.com/manual/models-definition.html#validations)

```js

class Foo extends Model {}
Foo.init({
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
}, { sequelize, modelName: 'foo' })

```

Validation can be added to a column definition. Sequelize leverages an external JS package called [validator.js](https://github.com/chriso/validator.js) to assist with this. Here are some additional options for validation:

<details>
<summary>Validations</summary>

```js

class ValidateMe extends Model {}
ValidateMe.init({
  bar: {
    type: Sequelize.STRING,
    validate: {
      is: ["^[a-z]+$",'i'],     // will only allow letters
      is: /^[a-z]+$/i,          // same as the previous example using real RegExp
      not: ["[a-z]",'i'],       // will not allow letters
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (http://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true,          // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isCreditCard: true,       // check for valid credit card numbers

      // Examples of custom validators:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      }
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
    }
  }
}, { sequelize });

```

</details>

## [Associations](http://docs.sequelizejs.com/manual/associations.html)

```js

Foo.hasMany(Bar, {
  onDelete: 'cascade',
})
Bar.belongsTo(Foo);


Foo.belongsToMany(Baz, { through: "foo_baz" });
Baz.belongsToMany(Foo, { through: "foo_baz" });

```

Association methods like `.hasMany` can be called on any of our define model classes. [hasMany](http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-hasMany) takes another class as this first argument. We can optionally pass an additional argument to add options like cascade on delete. When paired with `.belongsTo`, we have access to a variety of methods for our association. In our above example, we can use `.getBars()` on any to retrieve all Bar objects that are associated with a particular instance of the `Foo` class. Also we have `.setBars()`, which takes an array of instances of `Bar` and add the association to an instance of `Foo` in our DB. Notice how both methods are plural when called on the parent "hasMany" class. If we call these methods on the child "belongsTo" class, both methods would be singular `.getFoo()` and `.setFoo()`.

For a many-to-many association, we can use the `.belongsToMany()` method. This works very similarly to our previous methods except that a second `through` argument is required. We can either pass in a string as a name for a through table that will be created or we can pass in a model class who's table will be used as the through table.

## Seed/Create Methods

To add data to our DB, We have several methods available to us. `.build()` will make a non-persistent object which we can further modify before calling `.save()` on it to add it to our DB.

```js

const foo1 = await Foo.build({example: "orange"});
  foo1.example = "apple"
  foo1.save();

```

`.create()` will do the same but immediately add our class object to the DB when called.

```js

const foo2 = await Foo.create({example: "banana"});

```

`.bulkCreate()` will takes an array of objects and adds them to our DB. One thing to note, the response from this method is an array of the objects before they are added to the DB and do not have `id`'s. If we would like to add associations, we will need to use a method like `.findAll()` to get the our desired objects from the DB first.

## Controller/Router Methods

### Read One

```js

// returns an from our DB by it's id
await Foo.findByPk(1)
// returns the first object that has a matching specified attribute
await Foo.findOne({ where: {name: 'John'} })

```

### Read All

```js

// returns everything from the table
await Foo.findAll()
// returns everything from the table that has a matching specified attribute
await Foo.findAll({ where: {name: 'John'} })

```

### Update

```js

// updates the column specified in the first argument
// for every object that matches the second argument
await Foo.update({ name: "Jonathan" }, { where: { first_name: "John" } })
// .update can also be called on a single instance of a model class
await foo1.update({name: "Jonathan"})

```

### Delete/Destroy

```js

// destroy all objects from our DB that match the passed in argument
await Foo.destroy({ where: { first_name: "John" } })
// destroy a single model class instance from our DB
await foo1.destroy()

```

## More from the Docs

Check out [Sequelize Instance Methods](http://docs.sequelizejs.com/manual/instances.html) and [Model Usage](http://docs.sequelizejs.com/manual/models-usage.html) for more info interacting with our DB.
