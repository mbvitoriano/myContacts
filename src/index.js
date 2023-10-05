const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();
// Implementando Middlewares
app.use(express.json());
app.use(routes);
// O Error Handles deve vir sempra após a definição das rotas
app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

app.listen(3000, () => console.log('Server started at http://localhost/3000'));
