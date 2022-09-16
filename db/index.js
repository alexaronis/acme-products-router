const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_products_redux_db');



const Product = conn.define('product', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

const seed = async()=> {
  await Promise.all([
    Product.create({ name: 'foo' }),
    Product.create({ name: 'bar' }),
    Product.create({ name: 'bazz' }),
    Product.create({ name: 'quq' })
  ]);
};

module.exports = {
  conn,
  seed,
  Product
};
