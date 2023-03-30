const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/registrarse', (req, res) => {
  res.render('register');
});

app.get('/ingresar', (req, res) => {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Servidor iniciado en: http://localhost:${port}`);
});