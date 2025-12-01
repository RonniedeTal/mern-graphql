const express = require('express');
const colors = require ('colors')
const cors = require ('cors')
const path = require('path');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require ('./config/db')

const port =  process.env.PORT || 5000;


const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/graphql', graphqlHTTP({
schema, 
graphiql: process.env.NODE_ENV === 'development'
}))

app.use(express.static(path.join(__dirname, 'public')));


  app.get( (req, res) => {
     if (req.path.startsWith('/graphql')) return next();
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });



app.listen(port, () => {
  console.log(`Server running on port: ${port}`.yellow.bold);
});