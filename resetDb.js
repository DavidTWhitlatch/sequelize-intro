
const { sequelize } = require('./models');

const reset = async () => {
  await sequelize.sync({ force: true });
  process.exit();
};

reset();