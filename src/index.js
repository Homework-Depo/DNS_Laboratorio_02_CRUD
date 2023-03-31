const express = require('express');
const path = require('path');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', async (req, res) => {

  const contacts = await prisma.contact.findMany({
    orderBy: {
      id: 'asc'
    }
  });

  res.render('index', { contacts: contacts });
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