const { conn, Product, seed } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use(express.json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', async(req, res, next)=> {
  try {
    res.send(await Product.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/products', async(req, res, next)=> {
  try {
    res.status(201).send(await Product.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

const init = async()=> {
  try {
    await conn.sync({ force: true });
    await seed();
      
    //sync database and seed data here
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
