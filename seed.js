const { Foo, Bar, Baz } = require('./models');
const seed = async () => {
  
  const foo1 = await Foo.build({first_name: "John", email: "JohnDoe@email.com"});
  foo1.last_name = "Doe"
  foo1.save();
  
  const foo2 = await Foo.create({first_name: "Jane", last_name: "Doe", email: "JaneDoe@email.com"});
  
  await Bar.bulkCreate([
    {example: "first"},
    {example: "second"},
    {example: "third"},
    {example: "fourth"},
  ])
  const bars = await Bar.findAll()


  bars.forEach(async (bar) => {
    bar.setFoo(Math.round(Math.random())?foo1:foo2)
  })

  await Baz.bulkCreate([
    {title: "first"},
    {title: "second"},
    {title: "third"},
    {title: "fourth"},
  ])
  const bazs = await Baz.findAll()


  bazs.forEach(async (baz) => {
    baz.setBar(bars[Math.floor(Math.random()*4)])
    baz.setFoos([[foo1],[foo2],[foo1,foo2]][Math.floor(Math.random()*3)])
  })
console.log(JSON.stringify(test,null,2))
  process.exit();
}

seed();

