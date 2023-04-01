const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.post('/eliminar/', async (req, res,) => {
  await prisma.contact.delete({
    where: {
      id: parseInt(req.body.contactId)
    }
  });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Servidor iniciado en: http://localhost:${port}`);
});