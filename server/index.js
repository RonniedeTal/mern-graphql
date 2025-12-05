const express = require('express');
const colors = require('colors');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development', // solo habilitar GraphiQL en desarrollo
}));

// Servir archivos estáticos de React
app.use(express.static(path.join(__dirname, 'public')));

// Fallback para React Router (cualquier ruta que no sea /graphql ni archivos estáticos)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running on port: ${port}`.yellow.bold);
});
