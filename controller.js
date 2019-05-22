const { Foo, Bar, Baz } = require('./models');

const main = async () => {

  // =============== Read One ===============
  // const resp = await Foo.findByPk(1)
  // const resp = await Foo.findOne({ where: {first_name: 'John'} })

  // =============== Read All ===============
  // const resp = await Foo.findAll()
  // const resp = await Foo.findAll({ where: {first_name: 'John'} })

  // -------- Eager Loading ----------
  // const resp = await Foo.findAll({ include: [ Bar ] })
  // const resp = await Foo.findAll({
  //   include: [
  //     {model: Bar, include: [
  //       {model: Baz}
  //     ]}
  //   ]
  // })
  // const resp = await Foo.findAll({ include: [{ all: true, nested: true }]});

  // =============== Update ===============
  // await Foo.update({ first_name: "James" }, { where: { first_name: "Jim" } })
  // const resp = await Foo.findOne({ where: {first_name: 'James'} })
  
  // =============== Destroy ===============
  // await Foo.destroy({ where: { first_name: "Jim" } })
  // const resp = await Foo.findOne({ where: {first_name: 'Jim'} })

  // =============== Extras!! ===============
  // const resp = await Foo.count()
  // const resp = await Foo.max('age')
  // const resp = await Foo.min('age')
  // const resp = await Foo.sum('age')

  // const resp = await Foo
  //   .findOrCreate({
  //     where: {first_name: 'Jim', last_name: "Doe"},
  //     defaults: {email: 'JimDoe@email.com', age: 30}
  //   })

  console.log(JSON.stringify(resp, null, 2))
  process.exit();
}
main();