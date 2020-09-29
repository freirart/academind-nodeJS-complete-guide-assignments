const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./src/utils/database');

const adminRoutes = require('./src/routes/admin');
const shopRoutes = require('./src/routes/shop');

const errorController = require('./src/controllers/error');

const Product = require('./src/models/product');
const User = require('./src/models/user');
const Cart = require('./src/models/cart');
const CartItem = require('./src/models/cartItem');


const app = express();

// third party packages settings
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
})

// routes
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

// default 404 page
app.use(errorController.get404Page);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem} );
Product.belongsToMany(Cart, { through: CartItem} );


sequelize.sync({ force: false })
  .then(() => User.findByPk(1))
  .then(user => {
    if (!user) {
      return User.create({ name: 'Artur', email: 'freirart.contato@gmail.com' });
    }
    return Promise.resolve(user);
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
    console.log("\n----------------------\nServer running!\n----------------------\n");
  })
  .catch(err => console.log(err));