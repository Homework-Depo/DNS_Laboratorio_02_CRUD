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

app.post('/registrarse', async (req, res) => {

  await prisma.user.create({
    data: {
      email: req.body.inputEmail,
      password: req.body.inputPassword,
      name: req.body.inputName,
      lastName: req.body.inputLastName
    }
  });
  res.redirect('/');
});

app.get('/ingresar', (req, res) => {
  res.render('login');
});

app.post('/ingresar', async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.inputEmail,
      password: req.body.inputPassword
    },
  })

  if (user) {
    res.redirect('/')
  } else {
    res.redirect('/ingresar');
  }
});

app.get('/crear', (req, res) => {
  res.render('create');
});

app.post('/crear', async (req, res) => {
  await prisma.contact.create({
    data: {
      name: req.body.inputName,
      lastName: req.body.inputLastName,
      number: parseInt(req.body.inputNumber),
      email: req.body.inputEmail
    }
  });
  res.redirect('/');
});

app.post('/eliminar/', async (req, res,) => {
  await prisma.contact.delete({
    where: {
      id: parseInt(req.body.contactId)
    }
  });
  res.redirect('/');
});

app.get('/editar/:id', async (req, res) => {
  const contact = await prisma.contact.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  });
  res.render('edit', {contact: contact});
});

app.post('/editar', async (req, res) => {
  await prisma.contact.update({
    where: {
      id: parseInt(req.body.inputId),
    },
    data: {
      name: req.body.inputName,
      lastName: req.body.inputLastName,
      number: parseInt(req.body.inputNumber),
      email: req.body.inputEmail
    },
  });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Servidor iniciado en: http://localhost:${port}`);
});